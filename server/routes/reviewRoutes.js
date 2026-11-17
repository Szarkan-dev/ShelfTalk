import { Router } from 'express';
import { ReviewsDao } from '../db/database.js';
import { validateReviewInput } from '../middleware/validation.js';

const router = Router();

// POST /api/reviews - Submit review and dynamically recalculate book score
router.post('/', validateReviewInput, (req, res, next) => {
  try {
    const { bookId, reviewerName, starRating, headline, critiqueText, containsSpoilers } = req.body;

    const result = ReviewsDao.create({
      bookId,
      reviewerName,
      starRating,
      headline,
      critiqueText,
      containsSpoilers
    });

    if (!result.updatedBook) {
      return res.status(404).json({ success: false, error: 'Target book not found.' });
    }

    res.status(201).json({
      success: true,
      message: 'Review successfully recorded and book score recalculated.',
      data: {
        review: result.review,
        recalculatedScore: {
          averageRating: result.updatedBook.averageRating,
          totalReviews: result.updatedBook.totalReviews,
          ratingBreakdown: result.updatedBook.ratingBreakdown
        }
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
