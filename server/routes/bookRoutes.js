import { Router } from 'express';
import { BooksDao, ReviewsDao } from '../db/database.js';

const router = Router();

// GET /api/books - List catalog with optional genre filter and search
router.get('/', (req, res, next) => {
  try {
    const { genre, search } = req.query;
    const books = BooksDao.getAll(genre, search);
    res.json({ success: true, count: books.length, data: books });
  } catch (err) {
    next(err);
  }
});

// GET /api/books/:id - Get single book details
router.get('/:id', (req, res, next) => {
  try {
    const book = BooksDao.getById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }
    res.json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
});

// GET /api/books/:id/reviews - Get community reviews for book
router.get('/:id/reviews', (req, res, next) => {
  try {
    const reviews = ReviewsDao.getByBookId(req.params.id);
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    next(err);
  }
});

export default router;
