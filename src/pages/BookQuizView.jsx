import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight, RotateCcw, CheckCircle2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShelfTalk } from '../context/ShelfTalkContext';
import { StarRating } from '../components/StarRating';

export const BookQuizView = () => {
  const { books } = useShelfTalk();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    genre: null,
    pacing: null,
    theme: null
  });
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = [
    {
      id: 'genre',
      title: 'Question 1: What literary genre speaks to your current reading mood?',
      subtitle: 'Choose the world you want to step into next',
      options: [
        { label: 'Fiction & Emotional Journeys', value: 'Fiction', icon: '✨' },
        { label: 'Science Fiction & Speculative Frontiers', value: 'Sci-Fi', icon: '🚀' },
        { label: 'Non-Fiction, Science & Psychology', value: 'Non-Fiction', icon: '🧠' },
        { label: 'Inspiring Memoirs & Biographies', value: 'Biography', icon: '📜' }
      ]
    },
    {
      id: 'pacing',
      title: 'Question 2: What reading pacing and atmosphere do you prefer?',
      subtitle: 'How do you want the narrative rhythm to feel?',
      options: [
        { label: 'Brisk & Page-Turning with high personal stakes', value: 'brisk', icon: '⚡' },
        { label: 'Deep, Reflective & Philosophically touching', value: 'reflective', icon: '🕯️' },
        { label: 'Actionable, Practical & Mentally stimulating', value: 'actionable', icon: '🛠️' },
        { label: 'Expansive, Grand in Scope & Epic World-Building', value: 'epic', icon: '🌌' }
      ]
    },
    {
      id: 'theme',
      title: 'Question 3: What central theme resonates most with you right now?',
      subtitle: 'The emotional core of your next read',
      options: [
        { label: 'Second chances, parallel choices & undoing regret', value: 'regret', targetBookId: 'book-1', icon: '🌿' },
        { label: 'Human ingenuity, friendship & survival in the cosmos', value: 'survival', targetBookId: 'book-2', icon: '🪐' },
        { label: 'Continuous self-mastery, systems & micro-habits', value: 'habits', targetBookId: 'book-3', icon: '📈' },
        { label: 'Overcoming staggering adversity & the transformative power of knowledge', value: 'adversity', targetBookId: 'book-11', icon: '🏔️' }
      ]
    }
  ];

  const handleSelectOption = (questionKey, option) => {
    const updated = { ...answers, [questionKey]: option };
    setAnswers(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setAnswers({ genre: null, pacing: null, theme: null });
    setCurrentStep(0);
    setQuizFinished(false);
  };

  // Determine top recommendation
  const recommendedBook = (() => {
    if (!quizFinished) return null;

    // Direct match if question 3 targetBookId is present
    if (answers.theme?.targetBookId) {
      const target = books.find(b => b.id === answers.theme.targetBookId);
      if (target) return target;
    }

    // Match by genre
    if (answers.genre?.value) {
      const match = books.find(b => b.genres.includes(answers.genre.value));
      if (match) return match;
    }

    return books[0];
  })();

  const alternateBooks = books.filter(b => b.id !== recommendedBook?.id).slice(0, 3);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
          <Compass className="w-3.5 h-3.5 text-amber-700" />
          <span>Interactive Match Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
          Book Recommendation Quiz
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-lg mx-auto">
          Answer 3 quick questions about your reading mood, pacing, and core themes to uncover your ideal next campus read.
        </p>
      </div>

      {!quizFinished ? (
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-parchment-200 shadow-sm" aria-label="Quiz Questionnaire">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>Question {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2 bg-parchment-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Question */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                {questions[currentStep].title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {questions[currentStep].subtitle}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(questions[currentStep].id, option)}
                  className="p-5 rounded-2xl border border-parchment-300 bg-parchment-50/50 hover:bg-amber-50 hover:border-amber-400 text-left transition-all duration-150 flex items-start gap-4 group focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <span className="text-2xl p-2 bg-white rounded-xl shadow-xs border border-parchment-200 group-hover:scale-110 transition-transform">
                    {option.icon}
                  </span>
                  <div>
                    <span className="font-bold text-slate-800 text-sm group-hover:text-amber-900 block">
                      {option.label}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      Click to choose this preference
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Recommendation Result */
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-300 shadow-xl space-y-8 animate-in zoom-in-95" aria-label="Recommendation Result">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>98% Literary Affinity Match</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Your Curated Match: {recommendedBook.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Tailored precisely to your preference for {answers.genre?.label} with a {answers.pacing?.value} atmosphere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-parchment-100/60 p-6 rounded-2xl border border-parchment-200">
            <div className="md:col-span-4 flex justify-center">
              <img
                src={recommendedBook.coverImage}
                alt={recommendedBook.title}
                className="w-44 h-64 object-cover rounded-xl shadow-book border border-parchment-300"
              />
            </div>
            <div className="md:col-span-8 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">{recommendedBook.genres.join(', ')}</span>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mt-0.5">{recommendedBook.title}</h3>
                <p className="text-sm font-semibold text-slate-600">by {recommendedBook.authorName}</p>
                <div className="flex items-center gap-2 mt-2">
                  <StarRating value={recommendedBook.averageRating} readOnly size="sm" />
                  <span className="text-xs font-bold text-slate-800">{recommendedBook.averageRating.toFixed(1)} ★</span>
                  <span className="text-xs text-slate-400">({recommendedBook.totalReviews} reviews)</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {recommendedBook.synopsis}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to={`/book/${recommendedBook.id}`}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>View Full Details & Reviews</span>
                </Link>
                <Link
                  to="/circles"
                  className="px-4 py-2.5 bg-white text-slate-700 hover:bg-parchment-200 border border-parchment-300 font-semibold rounded-xl text-xs sm:text-sm"
                >
                  Join Reading Circle
                </Link>
              </div>
            </div>
          </div>

          {/* Alternate Suggestions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Other titles you might also enjoy:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {alternateBooks.map((alt) => (
                <Link
                  key={alt.id}
                  to={`/book/${alt.id}`}
                  className="p-3 rounded-xl bg-parchment-50 hover:bg-amber-50 border border-parchment-200 transition-all flex items-center gap-3"
                >
                  <img src={alt.coverImage} alt={alt.title} className="w-10 h-14 object-cover rounded shadow-xs" />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 block truncate">{alt.title}</span>
                    <span className="text-[11px] text-slate-500 block truncate">{alt.authorName}</span>
                    <span className="text-[10px] text-amber-700 font-semibold">{alt.averageRating.toFixed(1)} ★</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center pt-4 border-t border-parchment-200">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-amber-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz With Different Preferences</span>
            </button>
          </div>
        </section>
      )}
    </main>
  );
};
