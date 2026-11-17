import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_BOOKS,
  INITIAL_AUTHORS,
  INITIAL_REVIEWS,
  INITIAL_CIRCLES,
  INITIAL_CHAPTER_POSTS,
  INITIAL_READING_GOAL
} from '../src/data/seedData.js';

test('1. Seed Catalog & Authors Integrity', () => {
  assert.equal(INITIAL_BOOKS.length, 16, 'Catalog should contain exactly 16 titles');
  assert.ok(INITIAL_AUTHORS.length >= 15, 'Should have dedicated author biographies');
  assert.equal(INITIAL_REVIEWS.length, 40, 'Should have 40 preloaded seed reviews');

  // Verify genres
  const genres = new Set(INITIAL_BOOKS.flatMap(b => b.genres));
  assert.ok(genres.has('Fiction'), 'Fiction genre should exist');
  assert.ok(genres.has('Sci-Fi'), 'Sci-Fi genre should exist');
  assert.ok(genres.has('Non-Fiction'), 'Non-Fiction genre should exist');
  assert.ok(genres.has('Biography'), 'Biography genre should exist');
});

test('2. The Midnight Library Initial Specs', () => {
  const midnightLib = INITIAL_BOOKS.find(b => b.id === 'book-1');
  assert.ok(midnightLib, 'The Midnight Library must exist');
  assert.equal(midnightLib.title, 'The Midnight Library');
  assert.equal(midnightLib.pageCount, 304, 'Must have 304 pages');
  assert.equal(midnightLib.totalReviews, 18, 'Must have 18 initial reviews');
  assert.equal(midnightLib.averageRating, 4.4, 'Must have 4.4 initial rating');

  // Verify breakdown sum
  const breakdown = midnightLib.ratingBreakdown;
  const countSum = Object.values(breakdown).reduce((a, b) => a + b, 0);
  assert.equal(countSum, 18, 'Breakdown counts must sum to 18');

  const ratingSum = Object.entries(breakdown).reduce((sum, [star, count]) => sum + (parseInt(star) * count), 0);
  assert.equal(ratingSum, 80, 'Rating sum should be 80');
  const avg = Number((ratingSum / 18).toFixed(1));
  assert.equal(avg, 4.4, 'Average rounded to 1 decimal place must equal 4.4');
});

test('3. Dynamic Score Recalculation Algorithm on 5-Star Review', () => {
  const midnightLib = INITIAL_BOOKS.find(b => b.id === 'book-1');
  
  // Submit new review: 5 stars
  const newRating = 5;
  const updatedBreakdown = {
    ...midnightLib.ratingBreakdown,
    [newRating]: midnightLib.ratingBreakdown[newRating] + 1
  };
  const updatedTotal = midnightLib.totalReviews + 1;
  const updatedSum = Object.entries(updatedBreakdown).reduce(
    (sum, [star, count]) => sum + (parseInt(star) * count),
    0
  );

  const updatedAverage = Number((updatedSum / updatedTotal).toFixed(1));

  assert.equal(updatedTotal, 19, 'Total reviews should become 19');
  assert.equal(updatedSum, 85, 'Total sum should become 85');
  assert.equal(updatedAverage, 4.5, 'Average score must recalculate to exactly 4.5 stars');

  // Verify percentage calculation
  const fiveStarPctOld = ((midnightLib.ratingBreakdown[5] / 18) * 100).toFixed(1);
  const fiveStarPctNew = ((updatedBreakdown[5] / 19) * 100).toFixed(1);
  assert.equal(fiveStarPctOld, '55.6', '5-star tier was 55.6%');
  assert.equal(fiveStarPctNew, '57.9', '5-star tier increases to 57.9%');
});

test('4. Reading Circle Progress Odometer: Page 210 of 304', () => {
  const currentPage = 210;
  const totalPages = 304;

  const rawPercentage = (currentPage / totalPages) * 100;
  const completionPercentage = Math.min(100, Math.max(0, Math.round(rawPercentage)));

  assert.equal(completionPercentage, 69, 'Page 210 of 304 must evaluate to 69%');

  // Verify SVG ring circumference formula
  const radius = (180 - 14) / 2; // size=180, strokeWidth=14
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (completionPercentage / 100) * circumference;

  assert.ok(targetOffset > 0 && targetOffset < circumference, 'Offset must be properly within range');
});

test('5. Chapter 12 Discussion Thread & Spoiler Shielding', () => {
  const chapter12Posts = INITIAL_CHAPTER_POSTS.filter(p => p.chapterId === 'ch-12');
  assert.ok(chapter12Posts.length >= 2, 'Chapter 12 discussion should contain seed posts');

  const spoilerPost = chapter12Posts.find(p => p.containsSpoilers === true);
  assert.ok(spoilerPost, 'Should have posts tagged with containsSpoilers: true');
  assert.match(spoilerPost.content, /polar bear/i, 'Spoiler post references Arctic/polar bear');
});

test('6. Annual Reading Goal Odometer', () => {
  assert.equal(INITIAL_READING_GOAL.current, 14, 'Initial books read should be 14');
  assert.equal(INITIAL_READING_GOAL.target, 25, 'Target books should be 25');
  const pct = Math.round((INITIAL_READING_GOAL.current / INITIAL_READING_GOAL.target) * 100);
  assert.equal(pct, 56, '14 of 25 books should be 56% completion');
});
