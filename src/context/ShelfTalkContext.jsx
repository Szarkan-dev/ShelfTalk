import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_AUTHORS,
  INITIAL_BOOKS,
  INITIAL_REVIEWS,
  INITIAL_CIRCLES,
  INITIAL_CHAPTER_POSTS,
  INITIAL_QUOTES,
  INITIAL_READING_GOAL
} from '../data/seedData';

const ShelfTalkContext = createContext(null);

const STORAGE_KEYS = {
  BOOKS: 'shelftalk_books_v1',
  AUTHORS: 'shelftalk_authors_v1',
  REVIEWS: 'shelftalk_reviews_v1',
  CIRCLES: 'shelftalk_circles_v1',
  CHAPTER_POSTS: 'shelftalk_chapter_posts_v1',
  QUOTES: 'shelftalk_quotes_v1',
  READING_GOAL: 'shelftalk_reading_goal_v1'
};

export const ShelfTalkProvider = ({ children }) => {
  // Load state with LocalStorage fallback
  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKS;
    } catch (e) {
      return INITIAL_BOOKS;
    }
  });

  const [authors] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTHORS);
      return saved ? JSON.parse(saved) : INITIAL_AUTHORS;
    } catch (e) {
      return INITIAL_AUTHORS;
    }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch (e) {
      return INITIAL_REVIEWS;
    }
  });

  const [circles, setCircles] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CIRCLES);
      return saved ? JSON.parse(saved) : INITIAL_CIRCLES;
    } catch (e) {
      return INITIAL_CIRCLES;
    }
  });

  const [chapterPosts, setChapterPosts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHAPTER_POSTS);
      return saved ? JSON.parse(saved) : INITIAL_CHAPTER_POSTS;
    } catch (e) {
      return INITIAL_CHAPTER_POSTS;
    }
  });

  const [quotes, setQuotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUOTES);
      return saved ? JSON.parse(saved) : INITIAL_QUOTES;
    } catch (e) {
      return INITIAL_QUOTES;
    }
  });

  const [readingGoal, setReadingGoal] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.READING_GOAL);
      return saved ? JSON.parse(saved) : INITIAL_READING_GOAL;
    } catch (e) {
      return INITIAL_READING_GOAL;
    }
  });

  // Persist on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CIRCLES, JSON.stringify(circles));
  }, [circles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHAPTER_POSTS, JSON.stringify(chapterPosts));
  }, [chapterPosts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.READING_GOAL, JSON.stringify(readingGoal));
  }, [readingGoal]);

  // Recalculates book average rating and breakdown dynamically
  const addReview = ({ bookId, reviewerName, starRating, headline, critiqueText, containsSpoilers }) => {
    const numericRating = Math.min(5, Math.max(1, parseInt(starRating, 10)));
    const newReview = {
      id: `rev-${Date.now()}`,
      bookId,
      reviewerName: reviewerName?.trim() || "Anonymous Reader",
      starRating: numericRating,
      headline: headline?.trim() || "Great Read",
      critiqueText: critiqueText?.trim() || "",
      containsSpoilers: Boolean(containsSpoilers),
      timestamp: new Date().toISOString()
    };

    setReviews(prevReviews => [newReview, ...prevReviews]);

    setBooks(prevBooks =>
      prevBooks.map(book => {
        if (book.id !== bookId) return book;

        const updatedBreakdown = {
          ...book.ratingBreakdown,
          [numericRating]: (book.ratingBreakdown[numericRating] || 0) + 1
        };

        const totalReviews = book.totalReviews + 1;

        // Weighted sum calculation: sum of (star * count)
        const weightedSum = Object.entries(updatedBreakdown).reduce(
          (sum, [star, count]) => sum + (parseInt(star, 10) * count),
          0
        );

        // Round to exactly 1 decimal place
        const averageRating = Number((weightedSum / totalReviews).toFixed(1));

        return {
          ...book,
          totalReviews,
          averageRating,
          ratingBreakdown: updatedBreakdown
        };
      })
    );

    return newReview;
  };

  // Update reading progress for a reading circle
  const updateReadingProgress = (circleId, currentPage, totalPages) => {
    const pageNum = Math.max(0, parseInt(currentPage, 10) || 0);
    const total = Math.max(1, parseInt(totalPages, 10) || 1);
    const validCurrent = Math.min(pageNum, total);

    setCircles(prevCircles =>
      prevCircles.map(c => {
        if (c.id !== circleId) return c;
        return {
          ...c,
          userProgress: {
            ...c.userProgress,
            currentPage: validCurrent,
            totalPages: total,
            updatedAt: new Date().toISOString()
          }
        };
      })
    );
  };

  // Add chapter discussion post
  const addChapterPost = ({ circleId, chapterId, chapterTitle, authorName, content, containsSpoilers }) => {
    const newPost = {
      id: `post-${Date.now()}`,
      circleId,
      chapterId,
      chapterTitle,
      authorName: authorName?.trim() || "Campus Reader",
      timestamp: new Date().toISOString(),
      content: content?.trim() || "",
      containsSpoilers: Boolean(containsSpoilers)
    };

    setChapterPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  // Add quote to scrapbook
  const addQuote = ({ bookTitle, author, quote, note }) => {
    const newQuote = {
      id: `quote-${Date.now()}`,
      bookTitle: bookTitle?.trim(),
      author: author?.trim(),
      quote: quote?.trim(),
      note: note?.trim() || "",
      savedAt: new Date().toISOString()
    };
    setQuotes(prev => [newQuote, ...prev]);
    return newQuote;
  };

  // Delete quote
  const deleteQuote = (quoteId) => {
    setQuotes(prev => prev.filter(q => q.id !== quoteId));
  };

  // Update reading goal
  const updateReadingGoal = (newCurrent, newTarget) => {
    setReadingGoal(prev => ({
      ...prev,
      current: typeof newCurrent === 'number' ? Math.max(0, newCurrent) : prev.current,
      target: typeof newTarget === 'number' ? Math.max(1, newTarget) : prev.target
    }));
  };

  // Increment completed books
  const markBookCompleted = (bookTitle) => {
    setReadingGoal(prev => {
      const alreadyCompleted = prev.completedTitles.includes(bookTitle);
      const updatedTitles = alreadyCompleted ? prev.completedTitles : [...prev.completedTitles, bookTitle];
      return {
        ...prev,
        current: alreadyCompleted ? prev.current : prev.current + 1,
        completedTitles: updatedTitles
      };
    });
  };

  // Reset to seed data (for demo walkthrough repeatability)
  const resetToDefaultData = () => {
    localStorage.clear();
    setBooks(INITIAL_BOOKS);
    setReviews(INITIAL_REVIEWS);
    setCircles(INITIAL_CIRCLES);
    setChapterPosts(INITIAL_CHAPTER_POSTS);
    setQuotes(INITIAL_QUOTES);
    setReadingGoal(INITIAL_READING_GOAL);
  };

  return (
    <ShelfTalkContext.Provider
      value={{
        books,
        authors,
        reviews,
        circles,
        chapterPosts,
        quotes,
        readingGoal,
        addReview,
        updateReadingProgress,
        addChapterPost,
        addQuote,
        deleteQuote,
        updateReadingGoal,
        markBookCompleted,
        resetToDefaultData
      }}
    >
      {children}
    </ShelfTalkContext.Provider>
  );
};

export const useShelfTalk = () => {
  const context = useContext(ShelfTalkContext);
  if (!context) {
    throw new Error('useShelfTalk must be used within a ShelfTalkProvider');
  }
  return context;
};
