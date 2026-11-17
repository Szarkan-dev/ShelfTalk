import { Router } from 'express';
import { CirclesDao } from '../db/database.js';
import { validateProgressInput } from '../middleware/validation.js';

const router = Router();

// GET /api/circles - List reading circles
router.get('/', (req, res, next) => {
  try {
    const circles = CirclesDao.getAll();
    res.json({ success: true, count: circles.length, data: circles });
  } catch (err) {
    next(err);
  }
});

// PUT /api/circles/:id/progress - Update reading progress odometer
router.put('/:id/progress', validateProgressInput, (req, res, next) => {
  try {
    const { currentPage, totalPages } = req.body;
    const progress = CirclesDao.updateProgress(req.params.id, currentPage, totalPages);

    res.json({
      success: true,
      message: 'Reading progress updated.',
      data: progress
    });
  } catch (err) {
    next(err);
  }
});

export default router;
