import { Router } from 'express';
import { resetDatabase } from '../db/database.js';

const router = Router();

// GET /api/health - Backend & database health check
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: 'SQLite (native node:sqlite WAL mode)'
  });
});

// POST /api/demo/reset - Reset SQLite state to seed data
router.post('/reset', (req, res, next) => {
  try {
    resetDatabase();
    res.json({
      success: true,
      message: 'SQLite database restored to initial seed state (4.4 stars across 18 reviews for The Midnight Library).'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
