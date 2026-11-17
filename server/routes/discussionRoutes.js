import { Router } from 'express';
import { DiscussionsDao } from '../db/database.js';
import { validateDiscussionInput } from '../middleware/validation.js';

const router = Router();

// In-memory SSE client registry for real-time chapter discussions
const sseClients = new Set();

export const broadcastDiscussionPost = (post) => {
  const data = JSON.stringify({ type: 'NEW_CHAPTER_POST', post });
  for (const client of sseClients) {
    client.write(`data: ${data}\n\n`);
  }
};

// GET /api/discussions - Fetch chapter posts
router.get('/', (req, res, next) => {
  try {
    const { circleId, chapterId } = req.query;
    if (!circleId) {
      return res.status(400).json({ success: false, error: 'circleId query parameter is required.' });
    }

    const posts = DiscussionsDao.getByCircle(circleId, chapterId);
    res.json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    next(err);
  }
});

// POST /api/discussions - Post thought with spoiler flag
router.post('/', validateDiscussionInput, (req, res, next) => {
  try {
    const { circleId, chapterId, chapterTitle, authorName, content, containsSpoilers } = req.body;

    const post = DiscussionsDao.create({
      circleId,
      chapterId: chapterId || 'general',
      chapterTitle: chapterTitle || 'Chapter Discussion',
      authorName,
      content,
      containsSpoilers
    });

    broadcastDiscussionPost(post);

    res.status(201).json({
      success: true,
      message: 'Chapter post submitted.',
      data: post
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/discussions/stream - Real-time Server-Sent Events stream
router.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  sseClients.add(res);

  req.on('close', () => {
    sseClients.delete(res);
  });
});

export default router;
