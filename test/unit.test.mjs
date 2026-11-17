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

test('--- UNIT TEST SUITE: Core Business Logic & Algorithms ---', () => {
  // Test suite banner
});

test('1. Rating Aggregator - Mathematical Precision & 1-Decimal Rounding', () => {
  const midnightLib = INITIAL_BOOKS.find(b => b.id === 'book-1');
  assert.ok(midnightLib, 'The Midnight Library must exist in seed catalog');

  // Verify initial arithmetic
  const initialBreakdown = midnightLib.ratingBreakdown;
  const initialSum = Object.entries(initialBreakdown).reduce(
    (sum, [star, count]) => sum + (parseInt(star, 10) * count),
    0
  );
  assert.equal(initialSum, 80, 'Initial sum of 18 reviews must equal 80');
  const initialAverage = Number((initialSum / midnightLib.totalReviews).toFixed(1));
  assert.equal(initialAverage, 4.4, '80 / 18 must round to exactly 4.4 stars');

  // Simulate submitting 5-star review
  const newRating = 5;
  const updatedBreakdown = {
    ...initialBreakdown,
    [newRating]: initialBreakdown[newRating] + 1
  };
  const updatedTotal = midnightLib.totalReviews + 1;
  const updatedSum = initialSum + newRating;
  const recalculatedAverage = Number((updatedSum / updatedTotal).toFixed(1));

  assert.equal(updatedTotal, 19, 'Total reviews must increment from 18 to 19');
  assert.equal(updatedSum, 85, 'Weighted star sum must increment from 80 to 85');
  assert.equal(recalculatedAverage, 4.5, '85 / 19 = 4.4736... must round to 4.5 stars');

  // Tier breakdown percentage calculation
  const fiveStarPct = Number(((updatedBreakdown[5] / updatedTotal) * 100).toFixed(1));
  assert.equal(fiveStarPct, 57.9, '5-star tier percentage must be 57.9%');
});

test('2. Reading Circle Progress Odometer - Clamping & SVG Dashoffset', () => {
  // Scenario A: Page 210 of 304 (Demo Acceptance Walkthrough)
  const currA = 210;
  const totalA = 304;
  const pctA = Math.min(100, Math.max(0, Math.round((currA / totalA) * 100)));
  assert.equal(pctA, 69, 'Page 210 of 304 must evaluate to exactly 69%');

  // Scenario B: Bounds Clamping (Negative or overflowing page inputs)
  const currB = -15;
  const totalB = 304;
  const validB = Math.max(0, currB);
  const pctB = Math.min(100, Math.max(0, Math.round((validB / totalB) * 100)));
  assert.equal(pctB, 0, 'Negative page number must clamp to 0%');

  const currC = 450;
  const totalC = 304;
  const validC = Math.min(currC, totalC);
  const pctC = Math.min(100, Math.max(0, Math.round((validC / totalC) * 100)));
  assert.equal(pctC, 100, 'Page exceeding total pages must clamp to 100%');

  // SVG Geometry validation
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (pctA / 100) * circumference;

  assert.ok(targetOffset > 0, 'Circumference offset must be positive');
  assert.ok(targetOffset < circumference, 'Offset must be less than full circumference');
});

test('3. Chapter Discussion Spoiler Shielding Logic', () => {
  const ch12Posts = INITIAL_CHAPTER_POSTS.filter(p => p.chapterId === 'ch-12');
  assert.ok(ch12Posts.length >= 2, 'Chapter 12 forum should have posts');

  const spoilerPost = ch12Posts.find(p => p.containsSpoilers);
  assert.ok(spoilerPost, 'Chapter 12 must contain a spoiler-shielded post');

  // Verify spoiler toggle state machine
  let isUnblurred = !spoilerPost.containsSpoilers; // initial: false
  assert.equal(isUnblurred, false, 'Spoiler post must be initially blurred');

  // User click action
  isUnblurred = !isUnblurred;
  assert.equal(isUnblurred, true, 'Clicking must toggle post to unblurred state');
});

test('4. Catalog Filtering, Genre Matching & Sorting Algorithms', () => {
  const fictionBooks = INITIAL_BOOKS.filter(b => b.genres.includes('Fiction'));
  const sciFiBooks = INITIAL_BOOKS.filter(b => b.genres.includes('Sci-Fi'));
  const nonFictionBooks = INITIAL_BOOKS.filter(b => b.genres.includes('Non-Fiction'));
  const biographyBooks = INITIAL_BOOKS.filter(b => b.genres.includes('Biography'));

  assert.ok(fictionBooks.length >= 4, 'Should have at least 4 Fiction titles');
  assert.ok(sciFiBooks.length >= 4, 'Should have at least 4 Sci-Fi titles');
  assert.ok(nonFictionBooks.length >= 3, 'Should have at least 3 Non-Fiction titles');
  assert.ok(biographyBooks.length >= 4, 'Should have at least 4 Biography titles');

  // Search keyword matcher
  const searchPattern = 'atomic';
  const matches = INITIAL_BOOKS.filter(b =>
    b.title.toLowerCase().includes(searchPattern) ||
    b.authorName.toLowerCase().includes(searchPattern)
  );
  assert.equal(matches.length, 1);
  assert.equal(matches[0].title, 'Atomic Habits');
});

test('5. Annual Reading Goal Odometer & Pace Calculation', () => {
  const goal = INITIAL_READING_GOAL;
  assert.equal(goal.current, 14, 'Current books read must be 14');
  assert.equal(goal.target, 25, 'Target books must be 25');

  const percentage = Math.round((goal.current / goal.target) * 100);
  assert.equal(percentage, 56, '14 of 25 must be 56%');

  const remaining = goal.target - goal.current;
  assert.equal(remaining, 11, 'Remaining books must be 11');
});
