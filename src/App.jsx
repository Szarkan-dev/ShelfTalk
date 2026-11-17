import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ShelfTalkProvider } from './context/ShelfTalkContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CatalogView } from './pages/CatalogView';
import { BookDetailView } from './pages/BookDetailView';
import { AuthorSpotlightView } from './pages/AuthorSpotlightView';
import { ReadingCirclesView } from './pages/ReadingCirclesView';
import { ReadingGoalView } from './pages/ReadingGoalView';
import { QuoteScrapbookView } from './pages/QuoteScrapbookView';
import { BookQuizView } from './pages/BookQuizView';
import { ReadingJournalView } from './pages/ReadingJournalView';

export function App() {
  return (
    <ShelfTalkProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-parchment-50 text-slate-800">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<CatalogView />} />
              <Route path="/book/:id" element={<BookDetailView />} />
              <Route path="/authors" element={<AuthorSpotlightView />} />
              <Route path="/circles" element={<ReadingCirclesView />} />
              <Route path="/goal" element={<ReadingGoalView />} />
              <Route path="/quotes" element={<QuoteScrapbookView />} />
              <Route path="/quiz" element={<BookQuizView />} />
              <Route path="/journal" element={<ReadingJournalView />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ShelfTalkProvider>
  );
}

export default App;
