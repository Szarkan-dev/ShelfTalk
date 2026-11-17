import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  INITIAL_AUTHORS,
  INITIAL_BOOKS,
  INITIAL_REVIEWS,
  INITIAL_CIRCLES,
  INITIAL_CHAPTER_POSTS,
  INITIAL_QUOTES,
  INITIAL_READING_GOAL
} from '../../src/data/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'shelftalk.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

// Initialize SQLite database instance
export const db = new DatabaseSync(DB_PATH);

// Enable foreign keys and WAL mode for reliability
db.exec('PRAGMA foreign_keys = ON;');

export function initDatabase() {
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
  db.exec(schema);

  // Check if data already seeded
  const countStmt = db.prepare('SELECT COUNT(*) as count FROM books');
  const result = countStmt.get();

  if (result.count === 0) {
    seedDatabase();
  }
}

export function seedDatabase() {
  db.exec('BEGIN TRANSACTION;');

  try {
    // 1. Seed Authors
    const insertAuthor = db.prepare(`
      INSERT INTO authors (id, name, portrait_url, biography, celebrated_works, awards)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const a of INITIAL_AUTHORS) {
      insertAuthor.run(
        a.id,
        a.name,
        a.portraitUrl,
        a.biography,
        JSON.stringify(a.celebratedWorks),
        JSON.stringify(a.awards)
      );
    }

    // 2. Seed Books
    const insertBook = db.prepare(`
      INSERT INTO books (id, title, author_id, author_name, genres, page_count, cover_image, synopsis, average_rating, total_reviews, rating_breakdown)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const b of INITIAL_BOOKS) {
      insertBook.run(
        b.id,
        b.title,
        b.authorId,
        b.authorName,
        JSON.stringify(b.genres),
        b.pageCount,
        b.coverImage,
        b.synopsis,
        b.averageRating,
        b.totalReviews,
        JSON.stringify(b.ratingBreakdown)
      );
    }

    // 3. Seed Reviews
    const insertReview = db.prepare(`
      INSERT INTO reviews (id, book_id, reviewer_name, star_rating, headline, critique_text, contains_spoilers, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const r of INITIAL_REVIEWS) {
      insertReview.run(
        r.id,
        r.bookId,
        r.reviewerName,
        r.starRating,
        r.headline,
        r.critiqueText,
        r.containsSpoilers ? 1 : 0,
        r.timestamp
      );
    }

    // 4. Seed Reading Circles
    const insertCircle = db.prepare(`
      INSERT INTO reading_circles (id, name, current_book_id, book_title, book_author, cover_image, member_count, schedule, description, current_page, total_pages, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertChapter = db.prepare(`
      INSERT INTO circle_chapters (id, circle_id, chapter_number, title)
      VALUES (?, ?, ?, ?)
    `);

    for (const c of INITIAL_CIRCLES) {
      insertCircle.run(
        c.id,
        c.name,
        c.currentBookId,
        c.bookTitle,
        c.bookAuthor,
        c.coverImage,
        c.memberCount,
        c.schedule,
        c.description,
        c.userProgress.currentPage,
        c.userProgress.totalPages,
        c.userProgress.updatedAt
      );

      for (const ch of c.chapters || []) {
        insertChapter.run(ch.id, c.id, ch.number, ch.title);
      }
    }

    // 5. Seed Chapter Posts
    const insertPost = db.prepare(`
      INSERT INTO chapter_posts (id, circle_id, chapter_id, chapter_title, author_name, content, contains_spoilers, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const p of INITIAL_CHAPTER_POSTS) {
      insertPost.run(
        p.id,
        p.circleId,
        p.chapterId,
        p.chapterTitle,
        p.authorName,
        p.content,
        p.containsSpoilers ? 1 : 0,
        p.timestamp
      );
    }

    // 6. Seed Quotes
    const insertQuote = db.prepare(`
      INSERT INTO quotes (id, book_title, author, quote, note, saved_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const q of INITIAL_QUOTES) {
      insertQuote.run(
        q.id,
        q.bookTitle,
        q.author,
        q.quote,
        q.note || '',
        q.savedAt
      );
    }

    // 7. Seed Reading Goal
    const insertGoal = db.prepare(`
      INSERT INTO reading_goals (id, year, current_count, target_count, completed_titles)
      VALUES (?, ?, ?, ?, ?)
    `);

    insertGoal.run(
      'goal-2026',
      INITIAL_READING_GOAL.year,
      INITIAL_READING_GOAL.current,
      INITIAL_READING_GOAL.target,
      JSON.stringify(INITIAL_READING_GOAL.completedTitles)
    );

    db.exec('COMMIT;');
  } catch (err) {
    db.exec('ROLLBACK;');
    throw err;
  }
}

// Data Access Layer (Prepared Statements for Security & Speed)

export const BooksDao = {
  getAll: (genre, search) => {
    let sql = 'SELECT * FROM books';
    const params = [];
    const conditions = [];

    if (search && search.trim()) {
      conditions.push('(title LIKE ? OR author_name LIKE ? OR synopsis LIKE ?)');
      const pattern = `%${search.trim()}%`;
      params.push(pattern, pattern, pattern);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY average_rating DESC';

    const rows = db.prepare(sql).all(...params);
    return rows
      .map(r => ({
        ...r,
        genres: JSON.parse(r.genres),
        ratingBreakdown: JSON.parse(r.rating_breakdown),
        coverImage: r.cover_image,
        pageCount: r.page_count,
        averageRating: r.average_rating,
        totalReviews: r.total_reviews,
        authorId: r.author_id,
        authorName: r.author_name
      }))
      .filter(b => (!genre || genre === 'All' ? true : b.genres.includes(genre)));
  },

  getById: (id) => {
    const row = db.prepare('SELECT * FROM books WHERE id = ?').get(id);
    if (!row) return null;
    return {
      ...row,
      genres: JSON.parse(row.genres),
      ratingBreakdown: JSON.parse(row.rating_breakdown),
      coverImage: row.cover_image,
      pageCount: row.page_count,
      averageRating: row.average_rating,
      totalReviews: row.total_reviews,
      authorId: row.author_id,
      authorName: row.author_name
    };
  },

  updateRating: (bookId, newRating) => {
    const book = BooksDao.getById(bookId);
    if (!book) return null;

    const breakdown = { ...book.ratingBreakdown };
    breakdown[newRating] = (breakdown[newRating] || 0) + 1;
    const totalReviews = book.totalReviews + 1;

    const weightedSum = Object.entries(breakdown).reduce(
      (sum, [star, count]) => sum + (parseInt(star, 10) * count),
      0
    );

    const averageRating = Number((weightedSum / totalReviews).toFixed(1));

    db.prepare(`
      UPDATE books 
      SET average_rating = ?, total_reviews = ?, rating_breakdown = ?
      WHERE id = ?
    `).run(averageRating, totalReviews, JSON.stringify(breakdown), bookId);

    return BooksDao.getById(bookId);
  }
};

export const AuthorsDao = {
  getAll: () => {
    const rows = db.prepare('SELECT * FROM authors ORDER BY name ASC').all();
    return rows.map(r => ({
      ...r,
      portraitUrl: r.portrait_url,
      celebratedWorks: JSON.parse(r.celebrated_works),
      awards: JSON.parse(r.awards)
    }));
  },

  getById: (id) => {
    const row = db.prepare('SELECT * FROM authors WHERE id = ?').get(id);
    if (!row) return null;
    return {
      ...row,
      portraitUrl: row.portrait_url,
      celebratedWorks: JSON.parse(row.celebrated_works),
      awards: JSON.parse(row.awards)
    };
  }
};

export const ReviewsDao = {
  getByBookId: (bookId) => {
    const rows = db.prepare(`
      SELECT * FROM reviews 
      WHERE book_id = ? 
      ORDER BY timestamp DESC
    `).all(bookId);

    return rows.map(r => ({
      ...r,
      bookId: r.book_id,
      reviewerName: r.reviewer_name,
      starRating: r.star_rating,
      critiqueText: r.critique_text,
      containsSpoilers: Boolean(r.contains_spoilers)
    }));
  },

  create: ({ bookId, reviewerName, starRating, headline, critiqueText, containsSpoilers }) => {
    const id = `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const timestamp = new Date().toISOString();

    db.prepare(`
      INSERT INTO reviews (id, book_id, reviewer_name, star_rating, headline, critique_text, contains_spoilers, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      bookId,
      reviewerName,
      starRating,
      headline,
      critiqueText,
      containsSpoilers ? 1 : 0,
      timestamp
    );

    // Update book score
    const updatedBook = BooksDao.updateRating(bookId, starRating);

    return {
      review: {
        id,
        bookId,
        reviewerName,
        starRating,
        headline,
        critiqueText,
        containsSpoilers: Boolean(containsSpoilers),
        timestamp
      },
      updatedBook
    };
  }
};

export const CirclesDao = {
  getAll: () => {
    const rows = db.prepare('SELECT * FROM reading_circles').all();
    return rows.map(c => {
      const chapters = db.prepare(`
        SELECT id, chapter_number as number, title 
        FROM circle_chapters 
        WHERE circle_id = ? 
        ORDER BY chapter_number ASC
      `).all(c.id);

      return {
        id: c.id,
        name: c.name,
        currentBookId: c.current_book_id,
        bookTitle: c.book_title,
        bookAuthor: c.book_author,
        coverImage: c.cover_image,
        memberCount: c.member_count,
        schedule: c.schedule,
        description: c.description,
        userProgress: {
          currentPage: c.current_page,
          totalPages: c.total_pages,
          updatedAt: c.updated_at
        },
        chapters
      };
    });
  },

  updateProgress: (circleId, currentPage, totalPages) => {
    const validCurrent = Math.max(0, parseInt(currentPage, 10) || 0);
    const validTotal = Math.max(1, parseInt(totalPages, 10) || 1);
    const now = new Date().toISOString();

    db.prepare(`
      UPDATE reading_circles
      SET current_page = ?, total_pages = ?, updated_at = ?
      WHERE id = ?
    `).run(validCurrent, validTotal, now, circleId);

    return {
      circleId,
      currentPage: validCurrent,
      totalPages: validTotal,
      completionPercentage: Math.min(100, Math.round((validCurrent / validTotal) * 100)),
      updatedAt: now
    };
  }
};

export const DiscussionsDao = {
  getByCircle: (circleId, chapterId) => {
    let sql = 'SELECT * FROM chapter_posts WHERE circle_id = ?';
    const params = [circleId];

    if (chapterId && chapterId !== 'all') {
      sql += ' AND chapter_id = ?';
      params.push(chapterId);
    }

    sql += ' ORDER BY timestamp DESC';

    const rows = db.prepare(sql).all(...params);
    return rows.map(p => ({
      id: p.id,
      circleId: p.circle_id,
      chapterId: p.chapter_id,
      chapterTitle: p.chapter_title,
      authorName: p.author_name,
      content: p.content,
      containsSpoilers: Boolean(p.contains_spoilers),
      timestamp: p.timestamp
    }));
  },

  create: ({ circleId, chapterId, chapterTitle, authorName, content, containsSpoilers }) => {
    const id = `post-${Date.now()}`;
    const timestamp = new Date().toISOString();

    db.prepare(`
      INSERT INTO chapter_posts (id, circle_id, chapter_id, chapter_title, author_name, content, contains_spoilers, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      circleId,
      chapterId,
      chapterTitle,
      authorName,
      content,
      containsSpoilers ? 1 : 0,
      timestamp
    );

    return {
      id,
      circleId,
      chapterId,
      chapterTitle,
      authorName,
      content,
      containsSpoilers: Boolean(containsSpoilers),
      timestamp
    };
  }
};

export const QuotesDao = {
  getAll: () => {
    const rows = db.prepare('SELECT * FROM quotes ORDER BY saved_at DESC').all();
    return rows.map(q => ({
      id: q.id,
      bookTitle: q.book_title,
      author: q.author,
      quote: q.quote,
      note: q.note,
      savedAt: q.saved_at
    }));
  },

  create: ({ bookTitle, author, quote, note }) => {
    const id = `quote-${Date.now()}`;
    const savedAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO quotes (id, book_title, author, quote, note, saved_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, bookTitle, author, quote, note || '', savedAt);

    return { id, bookTitle, author, quote, note, savedAt };
  },

  delete: (id) => {
    db.prepare('DELETE FROM quotes WHERE id = ?').run(id);
    return { success: true, id };
  }
};

export const GoalDao = {
  get: () => {
    const row = db.prepare('SELECT * FROM reading_goals WHERE id = ?').get('goal-2026');
    if (!row) {
      return INITIAL_READING_GOAL;
    }
    return {
      year: row.year,
      current: row.current_count,
      target: row.target_count,
      completedTitles: JSON.parse(row.completed_titles)
    };
  },

  update: ({ current, target, completedTitles }) => {
    const existing = GoalDao.get();
    const newCurrent = typeof current === 'number' ? current : existing.current;
    const newTarget = typeof target === 'number' ? target : existing.target;
    const newTitles = completedTitles || existing.completedTitles;

    db.prepare(`
      UPDATE reading_goals
      SET current_count = ?, target_count = ?, completed_titles = ?
      WHERE id = ?
    `).run(newCurrent, newTarget, JSON.stringify(newTitles), 'goal-2026');

    return GoalDao.get();
  }
};

export function resetDatabase() {
  db.exec(`
    DELETE FROM reviews;
    DELETE FROM chapter_posts;
    DELETE FROM circle_chapters;
    DELETE FROM reading_circles;
    DELETE FROM quotes;
    DELETE FROM reading_goals;
    DELETE FROM books;
    DELETE FROM authors;
  `);
  seedDatabase();
}
