import { before, after, test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/server.js';
import { resetDatabase } from '../server/db/database.js';

let server;
let baseUrl;

// Start server before any API tests run
before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

// Close server after all tests conclude
after(async () => {
  resetDatabase();
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
});

// Helper to make HTTP requests against test server
function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const reqHeaders = { ...headers };
    let payload = null;

    if (body) {
      payload = JSON.stringify(body);
      reqHeaders['Content-Type'] = 'application/json';
      reqHeaders['Content-Length'] = Buffer.byteLength(payload);
    }

    const req = http.request(
      url,
      {
        method,
        headers: reqHeaders
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          let json = null;
          try {
            json = JSON.parse(raw);
          } catch {
            json = raw;
          }
          resolve({ status: res.statusCode, headers: res.headers, body: json });
        });
      }
    );

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

test('1. Health Check & Database Connectivity', async () => {
  const res = await request('GET', '/api/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'healthy');
  assert.match(res.body.database, /SQLite/i);
});

test('2. Books Catalog API (GET /api/books)', async () => {
  const res = await request('GET', '/api/books');
  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.count, 16, 'Must return exactly 16 curated seed books');
});

test('3. Genre Filtering via API (GET /api/books?genre=Sci-Fi)', async () => {
  const res = await request('GET', '/api/books?genre=Sci-Fi');
  assert.equal(res.status, 200);
  assert.ok(res.body.count >= 4, 'Must return Sci-Fi titles');
  assert.ok(res.body.data.every(b => b.genres.includes('Sci-Fi')));
});

test('4. The Midnight Library Initial Specs (GET /api/books/book-1)', async () => {
  const res = await request('GET', '/api/books/book-1');
  assert.equal(res.status, 200);
  const book = res.body.data;
  assert.equal(book.title, 'The Midnight Library');
  assert.equal(book.pageCount, 304);
  assert.equal(book.totalReviews, 18);
  assert.equal(book.averageRating, 4.4);
});

test('5. Dynamic Review Recalculation (POST /api/reviews)', async () => {
  // Reset DB first to ensure clean state
  await request('POST', '/api/reset');

  const reviewPayload = {
    bookId: 'book-1',
    reviewerName: 'Campus Reader',
    starRating: 5,
    headline: 'A poignant exploration of life choices and parallel regrets',
    critiqueText: 'Haig touches existential themes with genuine heart. Highly recommended.',
    containsSpoilers: false
  };

  const res = await request('POST', '/api/reviews', reviewPayload);
  assert.equal(res.status, 201, 'Review creation must return HTTP 201 Created');
  assert.equal(res.body.success, true);

  // Verify recalculated score
  const score = res.body.data.recalculatedScore;
  assert.equal(score.totalReviews, 19, 'Total reviews must increment to 19');
  assert.equal(score.averageRating, 4.5, 'Score must dynamically recalculate to 4.5 stars');

  // Verify persistence via GET
  const verifyRes = await request('GET', '/api/books/book-1');
  assert.equal(verifyRes.body.data.averageRating, 4.5, 'Persistent SQLite rating must equal 4.5');
  assert.equal(verifyRes.body.data.totalReviews, 19);
});

test('6. Reading Circles & Progress Update (PUT /api/circles/:id/progress)', async () => {
  const progressPayload = {
    currentPage: 210,
    totalPages: 304
  };

  const res = await request('PUT', '/api/circles/circle-1/progress', progressPayload);
  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.currentPage, 210);
  assert.equal(res.body.data.totalPages, 304);
  assert.equal(res.body.data.completionPercentage, 69, 'Page 210 of 304 must evaluate to 69%');
});

test('7. Chapter Discussions & Spoiler Shielding (GET /api/discussions)', async () => {
  const res = await request('GET', '/api/discussions?circleId=circle-1&chapterId=ch-12');
  assert.equal(res.status, 200);
  assert.ok(res.body.count >= 2, 'Chapter 12 discussion must return seeded posts');

  const hasSpoilers = res.body.data.some(p => p.containsSpoilers === true);
  assert.ok(hasSpoilers, 'Chapter 12 posts must contain spoiler-tagged entries');
});

test('8. Algorithmic Recommendation Matcher (POST /api/recommendations/match)', async () => {
  const quizPayload = {
    genre: 'Fiction',
    pacing: 'reflective',
    theme: { targetBookId: 'book-1' }
  };

  const res = await request('POST', '/api/recommendations/match', quizPayload);
  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.ok(res.body.topMatch, 'Should return top recommendation');
  assert.equal(res.body.topMatch.book.title, 'The Midnight Library');
  assert.ok(res.body.topMatch.affinityPercentage >= 90);
});

test('9. Security & Validation: Reject Invalid Star Rating', async () => {
  const invalidReview = {
    bookId: 'book-1',
    starRating: 8, // Invalid!
    headline: 'Invalid Star Rating'
  };

  const res = await request('POST', '/api/reviews', invalidReview);
  assert.equal(res.status, 400, 'Should reject star ratings out of bounds with HTTP 400');
  assert.equal(res.body.success, false);
});

test('10. Security & Validation: Reject Invalid Page Progress Bounds', async () => {
  const invalidProgress = {
    currentPage: 500,
    totalPages: 304 // currentPage > totalPages!
  };

  const res = await request('PUT', '/api/circles/circle-1/progress', invalidProgress);
  assert.equal(res.status, 400, 'Should reject page bounds violation with HTTP 400');
  assert.equal(res.body.success, false);
});

test('11. Security Headers: Helmet Integration', async () => {
  const res = await request('GET', '/api/health');
  assert.equal(res.headers['x-content-type-options'], 'nosniff', 'Must include nosniff header');
  assert.equal(res.headers['x-frame-options'], 'SAMEORIGIN', 'Must protect against clickjacking');
});
