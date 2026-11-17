import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

/**
 * Enterprise-grade security middleware:
 * - Helmet for HTTP security headers (CSP, HSTS, X-Frame-Options)
 * - Restrictive CORS
 * - Anti-abuse Rate limiting
 */
export const configureSecurity = (app) => {
  // Helmet with customized CSP to allow Google Fonts & Unsplash book covers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          connectSrc: ["'self'", "http://localhost:3000", "http://localhost:5000", "http://127.0.0.1:5000"]
        }
      },
      crossOriginEmbedderPolicy: false
    })
  );

  // CORS configuration
  app.use(
    cors({
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5000'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  );

  // Global API Rate Limiter
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // limit each IP to 200 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: 'Too many requests from this IP. Please try again after 15 minutes.'
    }
  });

  app.use('/api/', apiLimiter);
};
