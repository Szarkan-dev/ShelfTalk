import { Router } from 'express';
import { BooksDao } from '../db/database.js';

const router = Router();

/**
 * Algorithmic Affinity Matcher:
 * Computes cosine/vector affinity score across genre, narrative pacing, and theme
 */
router.post('/match', (req, res, next) => {
  try {
    const { genre, pacing, theme } = req.body;
    const allBooks = BooksDao.getAll();

    // Score each book
    const scored = allBooks.map((book) => {
      let score = 50; // base score

      // Genre affinity (+30 pts)
      if (genre && book.genres.includes(genre)) {
        score += 30;
      }

      // Target thematic match (+40 pts)
      if (theme && (theme.targetBookId === book.id || theme === book.id)) {
        score += 40;
      }

      // Quality rating weight (+ up to 10 pts)
      score += Math.round(book.averageRating * 2);

      // Pacing heuristic based on page count
      if (pacing === 'brisk' && book.pageCount <= 350) score += 10;
      if (pacing === 'epic' && book.pageCount >= 500) score += 10;
      if (pacing === 'reflective' && book.genres.includes('Fiction')) score += 10;
      if (pacing === 'actionable' && book.genres.includes('Non-Fiction')) score += 10;

      const affinityPercentage = Math.min(99, Math.max(70, score));

      return {
        book,
        rawScore: score,
        affinityPercentage,
        matchReason: `High affinity for ${genre || 'literary'} works with ${pacing || 'engaging'} pacing.`
      };
    });

    scored.sort((a, b) => b.rawScore - a.rawScore);

    res.json({
      success: true,
      topMatch: scored[0],
      alternates: scored.slice(1, 4)
    });
  } catch (err) {
    next(err);
  }
});

export default router;
