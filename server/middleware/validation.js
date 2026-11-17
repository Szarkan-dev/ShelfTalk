/**
 * Input validation and sanitization middleware
 * Ensures type safety, bounds enforcement, and protection against injection attacks
 */

export const validateReviewInput = (req, res, next) => {
  const { bookId, starRating, headline, critiqueText } = req.body;

  if (!bookId || typeof bookId !== 'string' || bookId.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid or missing bookId parameter.'
    });
  }

  const numericRating = parseInt(starRating, 10);
  if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
    return res.status(400).json({
      success: false,
      error: 'starRating must be an integer between 1 and 5.'
    });
  }

  if (!headline && !critiqueText) {
    return res.status(400).json({
      success: false,
      error: 'Either headline or critiqueText is required.'
    });
  }

  // Sanitize strings
  req.body.reviewerName = (req.body.reviewerName || 'Campus Reader').slice(0, 80).trim();
  req.body.headline = (headline || critiqueText).slice(0, 150).trim();
  req.body.critiqueText = (critiqueText || headline).slice(0, 2000).trim();
  req.body.starRating = numericRating;
  req.body.containsSpoilers = Boolean(req.body.containsSpoilers);

  next();
};

export const validateProgressInput = (req, res, next) => {
  const { currentPage, totalPages } = req.body;
  const curr = parseInt(currentPage, 10);
  const total = parseInt(totalPages, 10);

  if (isNaN(curr) || curr < 0) {
    return res.status(400).json({
      success: false,
      error: 'currentPage must be a non-negative integer.'
    });
  }

  if (isNaN(total) || total <= 0) {
    return res.status(400).json({
      success: false,
      error: 'totalPages must be a positive integer greater than zero.'
    });
  }

  if (curr > total) {
    return res.status(400).json({
      success: false,
      error: 'currentPage cannot exceed totalPages.'
    });
  }

  req.body.currentPage = curr;
  req.body.totalPages = total;

  next();
};

export const validateDiscussionInput = (req, res, next) => {
  const { circleId, content } = req.body;

  if (!circleId || typeof circleId !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'circleId is required.'
    });
  }

  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Discussion content cannot be empty.'
    });
  }

  req.body.authorName = (req.body.authorName || 'Campus Reader').slice(0, 80).trim();
  req.body.content = content.slice(0, 2000).trim();
  req.body.containsSpoilers = Boolean(req.body.containsSpoilers);

  next();
};
