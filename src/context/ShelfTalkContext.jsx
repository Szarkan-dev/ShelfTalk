import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  INITIAL_AUTHORS,
  INITIAL_BOOKS,
  INITIAL_REVIEWS,
  INITIAL_CIRCLES,
  INITIAL_CHAPTER_POSTS,
  INITIAL_QUOTES,
  INITIAL_READING_GOAL
} from '../data/seedData';
import { ApiService } from '../services/api';

const ShelfTalkContext = createContext(null);

const STORAGE_KEYS = {
  BOOKS: 'shelftalk_books_v2',
  AUTHORS: 'shelftalk_authors_v2',
  REVIEWS: 'shelftalk_reviews_v2',
  CIRCLES: 'shelftalk_circles_v2',
  CHAPTER_POSTS: 'shelftalk_chapter_posts_v2',
  QUOTES: 'shelftalk_quotes_v2',
  READING_GOAL: 'shelftalk_reading_goal_v2'
};

export const ShelfTalkProvider = ({ children }) => {
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Initial State from LocalStorage / Seed
  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKS;
    } catch {
      return INITIAL_BOOKS;
    }
  });

  const [authors, setAuthors] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTHORS);
      return saved ? JSON.parse(saved) : INITIAL_AUTHORS;
    } catch {
      return INITIAL_AUTHORS;
    }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [circles, setCircles] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CIRCLES);
      return saved ? JSON.parse(saved) : INITIAL_CIRCLES;
    } catch {
      return INITIAL_CIRCLES;
    }
  });

  const [chapterPosts, setChapterPosts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHAPTER_POSTS);
      return saved ? JSON.parse(saved) : INITIAL_CHAPTER_POSTS;
    } catch {
      return INITIAL_CHAPTER_POSTS;
    }
  });

  const [quotes, setQuotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUOTES);
      return saved ? JSON.parse(saved) : INITIAL_QUOTES;
    } catch {
      return INITIAL_QUOTES;
    }
  });

  const [readingGoal, setReadingGoal] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.READING_GOAL);
      return saved ? JSON.parse(saved) : INITIAL_READING_GOAL;
    } catch {
      return INITIAL_READING_GOAL;
    }
  });

  // Attempt backend handshake on mount
  useEffect(() => {
    let isMounted = true;

    async function checkBackend() {
      try {
        const isHealthy = await ApiService.checkHealth();
        if (isMounted && isHealthy) {
          setIsBackendConnected(true);
          const [apiBooks, apiCircles, apiGoal] = await Promise.all([
            ApiService.getBooks().catch(() => null),
            ApiService.getCircles().catch(() => null),
            ApiService.getGoal().catch(() => null)
          ]);

          if (isMounted) {
            if (apiBooks && apiBooks.length > 0) setBooks(apiBooks);
            if (apiCircles && apiCircles.length > 0) setCircles(apiCircles);
            if (apiGoal) setReadingGoal(apiGoal);
          }
        } else if (isMounted) {
          setIsBackendConnected(false);
        }
      } catch {
        if (isMounted) setIsBackendConnected(false);
      }
    }

    checkBackend();
    return () => { isMounted = false; };
  }, []);

  // Synchronize LocalStorage cache
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

  // Submit review: sends to Express/SQLite API if connected, and performs deterministic score recalculation
  const addReview = async ({ bookId, reviewerName, starRating, headline, critiqueText, containsSpoilers }) => {
    const numericRating = Math.min(5, Math.max(1, parseInt(starRating, 10)));
    const newReview = {
      id: `rev-${Date.now()}`,
      bookId,
      reviewerName: reviewerName?.trim() || "Campus Reader",
      starRating: numericRating,
      headline: headline?.trim() || "Engaging Read",
      critiqueText: critiqueText?.trim() || "",
      containsSpoilers: Boolean(containsSpoilers),
      timestamp: new Date().toISOString()
    };

    // Optimistic Local State Update
    setReviews(prevReviews => [newReview, ...prevReviews]);

    setBooks(prevBooks =>
      prevBooks.map(book => {
        if (book.id !== bookId) return book;

        const updatedBreakdown = {
          ...book.ratingBreakdown,
          [numericRating]: (book.ratingBreakdown[numericRating] || 0) + 1
        };

        const totalReviews = book.totalReviews + 1;
        const weightedSum = Object.entries(updatedBreakdown).reduce(
          (sum, [star, count]) => sum + (parseInt(star, 10) * count),
          0
        );

        const averageRating = Number((weightedSum / totalReviews).toFixed(1));

        return {
          ...book,
          totalReviews,
          averageRating,
          ratingBreakdown: updatedBreakdown
        };
      })
    );

    // If backend connected, sync with SQLite
    if (isBackendConnected) {
      try {
        await ApiService.submitReview({
          bookId,
          reviewerName: newReview.reviewerName,
          starRating: numericRating,
          headline: newReview.headline,
          critiqueText: newReview.critiqueText,
          containsSpoilers
        });
      } catch (err) {
        console.warn('Backend sync deferred, saved to local store:', err.message);
      }
    }

    return newReview;
  };

  // Update Reading Circle Progress Odometer
  const updateReadingProgress = async (circleId, currentPage, totalPages) => {
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

    if (isBackendConnected) {
      try {
        await ApiService.updateCircleProgress(circleId, validCurrent, total);
      } catch (err) {
        console.warn('Backend progress sync deferred:', err.message);
      }
    }
  };

  // Add Chapter Discussion Post
  const addChapterPost = async ({ circleId, chapterId, chapterTitle, authorName, content, containsSpoilers }) => {
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

    if (isBackendConnected) {
      try {
        await ApiService.submitDiscussionPost({
          circleId,
          chapterId,
          chapterTitle,
          authorName: newPost.authorName,
          content: newPost.content,
          containsSpoilers
        });
      } catch (err) {
        console.warn('Backend post sync deferred:', err.message);
      }
    }

    return newPost;
  };

  // Add Quote
  const addQuote = async ({ bookTitle, author, quote, note }) => {
    const newQuote = {
      id: `quote-${Date.now()}`,
      bookTitle: bookTitle?.trim(),
      author: author?.trim(),
      quote: quote?.trim(),
      note: note?.trim() || "",
      savedAt: new Date().toISOString()
    };

    setQuotes(prev => [newQuote, ...prev]);

    if (isBackendConnected) {
      try {
        await ApiService.addQuote(newQuote);
      } catch (err) {
        console.warn('Backend quote sync deferred:', err.message);
      }
    }

    return newQuote;
  };

  // Delete Quote
  const deleteQuote = async (quoteId) => {
    setQuotes(prev => prev.filter(q => q.id !== quoteId));
    if (isBackendConnected) {
      try {
        await ApiService.deleteQuote(quoteId);
      } catch (err) {
        console.warn('Backend quote delete deferred:', err.message);
      }
    }
  };

  // Update Reading Goal
  const updateReadingGoal = async (newCurrent, newTarget) => {
    const updated = {
      ...readingGoal,
      current: typeof newCurrent === 'number' ? Math.max(0, newCurrent) : readingGoal.current,
      target: typeof newTarget === 'number' ? Math.max(1, newTarget) : readingGoal.target
    };

    setReadingGoal(updated);

    if (isBackendConnected) {
      try {
        await ApiService.updateGoal(updated);
      } catch (err) {
        console.warn('Backend goal sync deferred:', err.message);
      }
    }
  };

  // Mark Book Completed in Goal
  const markBookCompleted = async (bookTitle) => {
    const alreadyCompleted = readingGoal.completedTitles.includes(bookTitle);
    const updatedTitles = alreadyCompleted ? readingGoal.completedTitles : [...readingGoal.completedTitles, bookTitle];
    const updated = {
      ...readingGoal,
      current: alreadyCompleted ? readingGoal.current : readingGoal.current + 1,
      completedTitles: updatedTitles
    };

    setReadingGoal(updated);

    if (isBackendConnected) {
      try {
        await ApiService.updateGoal(updated);
      } catch (err) {
        console.warn('Backend goal sync deferred:', err.message);
      }
    }
  };

  // Reset to original seed state
  const resetToDefaultData = async () => {
    localStorage.clear();
    setBooks(INITIAL_BOOKS);
    setReviews(INITIAL_REVIEWS);
    setCircles(INITIAL_CIRCLES);
    setChapterPosts(INITIAL_CHAPTER_POSTS);
    setQuotes(INITIAL_QUOTES);
    setReadingGoal(INITIAL_READING_GOAL);

    if (isBackendConnected) {
      try {
        await ApiService.resetDemoData();
      } catch (err) {
        console.warn('Backend reset deferred:', err.message);
      }
    }
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
        isBackendConnected,
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
