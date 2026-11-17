import { Router } from 'express';
import { QuotesDao } from '../db/database.js';

const router = Router();

router.get('/', (req, res, next) => {
  try {
    const quotes = QuotesDao.getAll();
    res.json({ success: true, count: quotes.length, data: quotes });
  } catch (err) {
    next(err);
  }
});

router.post('/', (req, res, next) => {
  try {
    const { bookTitle, author, quote, note } = req.body;
    if (!quote || !quote.trim()) {
      return res.status(400).json({ success: false, error: 'Quote text is required.' });
    }

    const created = QuotesDao.create({
      bookTitle: (bookTitle || 'Unknown Title').slice(0, 100),
      author: (author || 'Unknown Author').slice(0, 80),
      quote: quote.slice(0, 1000).trim(),
      note: note ? note.slice(0, 300).trim() : ''
    });

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    QuotesDao.delete(req.params.id);
    res.json({ success: true, message: 'Quote deleted.' });
  } catch (err) {
    next(err);
  }
});

export default router;
