import express from 'express';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { initDatabase } from './db/database.js';
import { configureSecurity } from './middleware/security.js';
import { errorHandler } from './middleware/errorHandler.js';

import bookRoutes from './routes/bookRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import circleRoutes from './routes/circleRoutes.js';
import discussionRoutes from './routes/discussionRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import demoRoutes from './routes/demoRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize SQLite Schema & Seed Data
initDatabase();

// Security Middleware (Helmet, CORS, Rate Limiting)
configureSecurity(app);

// Request Logging & Parsing
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// API Route Mounts
app.use('/api', demoRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/circles', circleRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/goal', goalRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Serve static frontend in production
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback for SPA client routing
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.url.startsWith('/api')) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  next();
});

// Centralized Error Handler
app.use(errorHandler);

// Start server only when executed directly (not when imported in tests)
const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);
if (isMain && process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[ShelfTalk Express] Server listening on http://localhost:${PORT}`);
    console.log(`[ShelfTalk SQLite] Database connected and ready.`);
  });
}

export default app;
