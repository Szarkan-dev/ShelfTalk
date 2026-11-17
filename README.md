# ShelfTalk: ReadingRing Hack

[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v5.0-blue.svg)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-v3%20WAL-orange.svg)](https://www.sqlite.org/)
[![React](https://img.shields.io/badge/React-v18.3-cyan.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Test Suite](https://img.shields.io/badge/Tests-23%20Passing-brightgreen.svg)](#automated-testing-suite)

> ShelfTalk is an interactive reading-circle web application and book review suite designed for campus book clubs and literature enthusiasts. It enables readers to organize discussions by chapter, track reading progress with animated completion odometers, submit accessible community reviews with real-time score recalculation, and persist data across a 3-tier Node.js/Express + SQLite architecture.

---

## 🏛️ System Architecture & Engineering Design

ShelfTalk implements a modern 3-Tier Client-Server Architecture adhering to clean separation of concerns:

```
┌─────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER (CLIENT)                 │
│  React 18 (Hooks, Context API) • React Router v6 • Tailwind CSS │
│  - Accessible Star Rating Radiogroup (WCAG 2.1 AA)              │
│  - Animated SVG Circular Progress Rings                         │
│  - Spoiler-Shielded Discussion Components (blur filter)         │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTP / REST & SSE
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER (EXPRESS API)               │
│  Node.js • Express Router • MVC Architecture                    │
│  - Security: Helmet CSP/HSTS, CORS, Rate Limiting               │
│  - Input Validation & Sanitization Middleware                   │
│  - Dynamic Score Aggregator & Vector Affinity Matcher Engine    │
└────────────────────────────────┬────────────────────────────────┘
                                 │ Prepared Statements
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATA PERSISTENCE LAYER (SQLITE)              │
│  SQLite Relational Database (shelftalk.db) • WAL Mode           │
│  - Foreign Keys, Indexes on book_id & circle_id                 │
│  - Tables: authors, books, reviews, reading_circles, posts      │
│  - Hybrid Client Fallback to LocalStorage for zero-setup demos  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 Core Functional Specifications

### 1. Curated Book Showcase & Author Spotlight
- **16 Literary Titles**: Spanning Fiction (*The Midnight Library*, *Klara and the Sun*, *Tomorrow, and Tomorrow, and Tomorrow*, *The Song of Achilles*, *Circe*), Sci-Fi (*Project Hail Mary*, *Dune*, *Neuromancer*, *Foundation*), Non-Fiction (*Atomic Habits*, *Sapiens*, *Thinking, Fast and Slow*), and Biographies (*Educated*, *Steve Jobs*, *Born a Crime*, *A Promised Land*).
- **Genre Filter Pills**: Dynamic filtering with badge count indicators.
- **Dedicated Author Spotlights**: Complete biographical dossiers for 15 authors including celebrated bibliographies and literary awards.

### 2. Accessible 5-Star Rating Engine (WCAG 2.1 AA)
- Form control using `<div role="radiogroup">` with styled SVG star `<label>` elements and hidden `<input type="radio" class="sr-only">`.
- Keyboard accessibility:
  - `Left / Down Arrow`: Decrement rating
  - `Right / Up Arrow`: Increment rating
  - `Spacebar / Enter`: Confirm rating
  - Visual `:focus-visible` focus rings and hover state previews.

### 3. Automated Average Score Recalculation
- Dynamic calculation of weighted average star scores rounded to 1 decimal place:
  $$\text{Average Rating} = \frac{\sum_{i=1}^5 (i \times \text{Count}_i)}{N_{total}}$$
- Initial seed state for *The Midnight Library*: **4.4 stars** across 18 reviews (Sum = 80).
- Submitting a 5-star review instantly updates the score to **4.5 stars** ($85 / 19 = 4.4736 \rightarrow 4.5$) and recalculates the 5-star tier bar to $57.9\%$.

### 4. Reading Circle Progress Odometer
- Personal page tracker:
  $$\text{Completion Percentage} = \min\left(100, \left(\frac{\text{Current Page}}{\text{Total Pages}}\right) \times 100\right)$$
- Animated SVG completion ring with CSS `stroke-dashoffset` transition.
- Entering **Page 210 of 304** animates smoothly to **69%**.

### 5. Chapter Discussion Threads with Spoiler Shield
- Discussions segmented by chapter (e.g. Chapter 1, Chapter 5, Chapter 12).
- Spoiler protection: Posts with `containsSpoilers: true` apply `filter: blur(6px)`.
- Clicking the blurred post removes the blur and reveals the text.

### 6. Stretch Capabilities
- **Annual Reading Goal Odometer**: Tracks target progress (e.g. '14 of 25 Books Read' = 56%), with milestone streaks and completed bookshelf.
- **Digital Quote Highlighter Scrapbook**: Save, filter, copy, and share inspirational passages.
- **3-Question Match Quiz**: Algorithmic vector affinity engine recommending reads based on mood, pacing, and theme.
- **Exportable Reading Journal**: Formatted printable/PDF layout (`window.print()`) and Markdown export.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check & SQLite database status |
| `GET` | `/api/books` | List books (supports `?genre=...&search=...`) |
| `GET` | `/api/books/:id` | Get book details & rating breakdown |
| `GET` | `/api/books/:id/reviews` | List community reviews for a book |
| `POST` | `/api/reviews` | Submit review & recalculate average rating in SQLite |
| `GET` | `/api/authors` | List author biography dossiers |
| `GET` | `/api/circles` | List reading circles with active progress |
| `PUT` | `/api/circles/:id/progress` | Update reading progress odometer |
| `GET` | `/api/discussions` | Get chapter posts (`?circleId=...&chapterId=...`) |
| `POST` | `/api/discussions` | Post thought with spoiler flag |
| `GET` | `/api/discussions/stream` | Server-Sent Events (SSE) live discussion stream |
| `GET` | `/api/quotes` | Get saved quotes scrapbook |
| `POST` | `/api/quotes` | Save inspirational quote |
| `DELETE` | `/api/quotes/:id` | Remove quote |
| `GET` | `/api/goal` | Get annual reading target |
| `PUT` | `/api/goal` | Update reading goal |
| `POST` | `/api/recommendations/match` | Algorithmic book recommendation engine |
| `POST` | `/api/reset` | Reset SQLite database to seed state |

---

## 🧪 Automated Testing Suite

ShelfTalk includes a comprehensive automated test suite with **23 tests** covering unit calculations, edge cases, and API integration:

```bash
# Run all tests (Unit + Integration + Demo Acceptance)
npm test

# Run unit tests only
npm run test:unit

# Run API & SQLite integration tests only
npm run test:api
```

### Verified Test Cases:
1. `Seed Catalog & Authors Integrity`: Verifies 16 books, 15 authors, and 40 reviews.
2. `Rating Aggregator Mathematical Rounding`: Verifies 80/18 = 4.4 $\rightarrow$ 85/19 = 4.5.
3. `Progress Odometer Clamping & SVG Geometry`: Verifies 210/304 = 69%, bounds clamping [0, 100].
4. `Chapter 12 Spoiler Shielding`: Verifies blurred initial state and click unblur.
5. `Security & Validation Enforcement`: Rejects out-of-bounds ratings (HTTP 400), invalid page numbers, missing text.
6. `Security Headers`: Verifies Helmet protection (`nosniff`, `SAMEORIGIN`).

---

## 🚀 Quickstart & Setup Guide

### 1. Installation
```bash
# Clone or extract repository
cd ShelfTalk

# Install dependencies
npm install
```

### 2. Running in Full-Stack Mode (Express + SQLite + React)
```bash
# Start Express backend server (Port 5000)
npm run server

# In a second terminal, start Vite frontend dev server (Port 3000)
npm run dev

# Open http://localhost:3000 in your browser
```

### 3. Production Deployment Mode
```bash
# Build React production bundle
npm run build

# Start production server (serves both API and optimized React frontend)
npm start
# -> Server running on http://localhost:5000
```

---

## 🎯 Acceptance Demo Walkthrough Script

1. **Catalog Navigation**: Open [http://localhost:3000](http://localhost:3000), click the **"Fiction"** genre pill, and select ***The Midnight Library***. Verify initial rating displays **4.4 stars** across **18 reviews**.
2. **Review Submission & Recalculation**: Click **"Write a Review"**, select **5 stars**, enter headline `"A poignant exploration of life choices and parallel regrets"`, critique text, and submit. The average rating dynamically recalculates to **4.5 stars** in SQLite and total reviews updates to **19**.
3. **Reading Circle Progress**: Navigate to **"Reading Circles"** (`/circles`), select **Campus Book Club**, and update progress to **"Page 210 of 304"**. Confirm the SVG progress ring animates smoothly to **69%**.
4. **Spoiler Shielding**: Filter to **Chapter 12**. Observe that the Arctic glaciology post is blurred with `filter: blur(6px)`. Click the post or *"Reveal Spoiler"* to unblur.
5. **Reset Demo State**: Click **"Reset Demo Data"** in the navigation bar to restore the initial seed state.
