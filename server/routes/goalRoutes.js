import { Router } from 'express';
import { GoalDao } from '../db/database.js';

const router = Router();

router.get('/', (req, res, next) => {
  try {
    const goal = GoalDao.get();
    res.json({ success: true, data: goal });
  } catch (err) {
    next(err);
  }
});

router.put('/', (req, res, next) => {
  try {
    const { current, target, completedTitles } = req.body;
    const updated = GoalDao.update({ current, target, completedTitles });
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

export default router;
