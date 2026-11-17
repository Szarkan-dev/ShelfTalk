/**
 * Centralized Application Error Handling Middleware
 * Prevents stack trace leakage in production while logging diagnostics
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[API Error] ${req.method} ${req.url} —`, err.message);

  res.status(statusCode).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString()
  });
};
