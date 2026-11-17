# ShelfTalk — ReadingCircle Book Club & Review Suite

ShelfTalk is a responsive, accessible web application designed for campus book clubs, literary societies, and avid readers. It combines curated book showcases with real-time dynamic score recalculations, animated SVG reading progress rings, spoiler-shielded chapter forums, and personal literary tools.

---

## 🌟 Key Features

### 1. Curated Book Showcase & Author Spotlight
- **16 Celebrated Titles**: Spanning Fiction (*The Midnight Library*, *Klara and the Sun*, *Tomorrow, and Tomorrow, and Tomorrow*, *The Song of Achilles*, *Circe*), Sci-Fi (*Project Hail Mary*, *Dune*, *Neuromancer*, *Foundation*), Non-Fiction (*Atomic Habits*, *Sapiens*, *Thinking, Fast and Slow*), and Biographies (*Educated*, *Steve Jobs*, *Born a Crime*, *A Promised Land*).
- **Genre Filter Pills**: Instant filtering across Fiction, Non-Fiction, Sci-Fi, and Biography.
- **Dedicated Author Spotlights**: Biographies, portraits, lists of celebrated works with catalog cross-links, and literary awards.

### 2. Accessible 5-Star Rating Engine (WCAG 2.1 AA)
- Custom `<div role="radiogroup">` with hidden `<input type="radio" class="sr-only">` elements and styled SVG stars.
- Full keyboard support:
  - **Left / Down Arrow**: Decrement star rating
  - **Right / Up Arrow**: Increment star rating
  - **Spacebar / Enter**: Select and confirm rating
- Smooth hover preview states and visible focus-visible rings.

### 3. Dynamic Score Aggregator & Rating Distribution
- Real-time recalculation of average ratings rounded to 1 decimal place upon review submission:
  $$\text{Average Rating} = \frac{\sum_{i=1}^5 (i \times \text{Count}_i)}{N_{total}}$$
- Dynamic 5-bar distribution breakdown displaying counts and percentages for tiers 5 down to 1.
- Initial seed state for *The Midnight Library*: 4.4 stars across 18 reviews (Sum = 80).
- Submitting a 5-star review updates the book to **4.5 stars** across 19 reviews (Sum = 85) instantly!

### 4. Reading Circle Progress Odometer
- Personal page tracking: calculates completion percentage:
  $$\text{Completion} = \min\left(100, \left(\frac{\text{Current Page}}{\text{Total Pages}}\right) \times 100\right)$$
- Animated SVG circular completion ring with smooth CSS `stroke-dashoffset` transition.
- Entering **Page 210 of 304** animates the odometer smoothly to **69%**.

### 5. Chapter Discussion Threads with Spoiler Shielding
- Discussions segmented by specific chapters (e.g., Chapter 1, Chapter 5, Chapter 12).
- Spoiler protection: Posts flagged with `containsSpoilers: true` are obscured with `filter: blur(6px)`.
- Clicking anywhere on the blurred text or the "Reveal Spoiler" button toggles unblurring.

### 6. Stretch Features
- **Annual Reading Goal Odometer**: Tracks progress toward the user's annual target (e.g. '14 of 25 Books Read' = 56%), with milestone streaks and completed bookshelf.
- **Digital Quote Highlighter Scrapbook**: Save, filter, copy, and share inspiring quotes and margin notes.
- **3-Question Match Quiz**: Recommends personalized reads based on mood, pacing, and core thematic preferences.
- **Exportable Reading Journal**: Formatted printable / PDF literary journal summarizing reading circle progress, reviews, and quotes (`window.print()` and Markdown download).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Development
```bash
# Install dependencies
npm install

# Run Vite development server
npm run dev
# -> Local server opens at http://localhost:3000/

# Run acceptance test suite
npm test

# Build for production
npm run build
```

---

## 🎯 Acceptance Demo Walkthrough Script

Follow these steps to demonstrate complete system compliance:

1. **Catalog Navigation & Selection**:
   - Open [http://localhost:3000/](http://localhost:3000/).
   - Click the **"Fiction"** genre filter pill.
   - Click on ***The Midnight Library***.
   - Verify that the page displays an initial average score of **4.4 stars** across **18 reviews**.
2. **Review Submission & Real-Time Recalculation**:
   - Click **"Write a Review"**.
   - Select **5 stars** using the interactive star rating control.
   - Enter Headline: `"A poignant exploration of life choices and parallel regrets"`.
   - Enter Critique text and click **"Submit Review"**.
   - Notice the toast confirmation and verify that the average score instantly recalculates to **4.5 stars** and total reviews updates to **19**.
3. **Reading Circle Progress Odometer**:
   - Click **"Reading Circles"** in the navigation bar (`/circles`).
   - In the **Campus Book Club** panel, update progress to **Page 210 of 304**.
   - Watch the SVG progress ring animate to **69%** completion.
4. **Spoiler Shielding Verification**:
   - Scroll down to the Chapter Discussion section and filter to **Chapter 12**.
   - Observe that the spoiler post regarding Nora's Svalbard Arctic encounter is blurred with `filter: blur(6px)`.
   - Click the blurred text or the **"Reveal Spoiler"** button to unblur the text.
5. **Reset Demo Data**:
   - Click **"Reset Demo Data"** in the top navigation bar at any time to restore the initial seed state.
