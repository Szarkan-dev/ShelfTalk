-- ShelfTalk SQLite Relational Database Schema
-- Implements complete 3-tier persistence for books, authors, reviews, reading circles, and chapter forums

CREATE TABLE IF NOT EXISTS authors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    portrait_url TEXT NOT NULL,
    biography TEXT NOT NULL,
    celebrated_works TEXT NOT NULL, -- JSON array of strings
    awards TEXT NOT NULL             -- JSON array of strings
);

CREATE TABLE IF NOT EXISTS books (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    author_id TEXT NOT NULL,
    author_name TEXT NOT NULL,
    genres TEXT NOT NULL,           -- JSON array of strings
    page_count INTEGER NOT NULL,
    cover_image TEXT NOT NULL,
    synopsis TEXT NOT NULL,
    average_rating REAL NOT NULL DEFAULT 0.0,
    total_reviews INTEGER NOT NULL DEFAULT 0,
    rating_breakdown TEXT NOT NULL,  -- JSON object {1:n, 2:n, 3:n, 4:n, 5:n}
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    book_id TEXT NOT NULL,
    reviewer_name TEXT NOT NULL,
    star_rating INTEGER NOT NULL CHECK (star_rating >= 1 AND star_rating <= 5),
    headline TEXT NOT NULL,
    critique_text TEXT NOT NULL,
    contains_spoilers INTEGER NOT NULL DEFAULT 0, -- 0 = false, 1 = true
    timestamp TEXT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id)
);

CREATE TABLE IF NOT EXISTS reading_circles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    current_book_id TEXT NOT NULL,
    book_title TEXT NOT NULL,
    book_author TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    member_count INTEGER NOT NULL DEFAULT 1,
    schedule TEXT NOT NULL,
    description TEXT NOT NULL,
    current_page INTEGER NOT NULL DEFAULT 0,
    total_pages INTEGER NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (current_book_id) REFERENCES books(id)
);

CREATE TABLE IF NOT EXISTS circle_chapters (
    id TEXT PRIMARY KEY,
    circle_id TEXT NOT NULL,
    chapter_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    FOREIGN KEY (circle_id) REFERENCES reading_circles(id)
);

CREATE TABLE IF NOT EXISTS chapter_posts (
    id TEXT PRIMARY KEY,
    circle_id TEXT NOT NULL,
    chapter_id TEXT NOT NULL,
    chapter_title TEXT NOT NULL,
    author_name TEXT NOT NULL,
    content TEXT NOT NULL,
    contains_spoilers INTEGER NOT NULL DEFAULT 0,
    timestamp TEXT NOT NULL,
    FOREIGN KEY (circle_id) REFERENCES reading_circles(id)
);

CREATE TABLE IF NOT EXISTS quotes (
    id TEXT PRIMARY KEY,
    book_title TEXT NOT NULL,
    author TEXT NOT NULL,
    quote TEXT NOT NULL,
    note TEXT,
    saved_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS reading_goals (
    id TEXT PRIMARY KEY,
    year INTEGER NOT NULL,
    current_count INTEGER NOT NULL,
    target_count INTEGER NOT NULL,
    completed_titles TEXT NOT NULL -- JSON array
);

CREATE INDEX IF NOT EXISTS idx_reviews_book_id ON reviews(book_id);
CREATE INDEX IF NOT EXISTS idx_chapter_posts_circle ON chapter_posts(circle_id);
CREATE INDEX IF NOT EXISTS idx_chapter_posts_chapter ON chapter_posts(chapter_id);
