import { Router } from 'express';
import { AuthorsDao } from '../db/database.js';

const router = Router();

router.get('/', (req, res, next) => {
  try {
    const authors = AuthorsDao.getAll();
    res.json({ success: true, count: authors.length, data: authors });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    const author = AuthorsDao.getById(req.params.id);
    if (!author) {
      return res.status(404).json({ success: false, error: 'Author not found' });
    }
    res.json({ success: true, data: author });
  } catch (err) {
    next(err);
  }
});

export default router;
