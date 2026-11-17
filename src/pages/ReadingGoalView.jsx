import React, { useState } from 'react';
import { Target, BookCheck, Flame, Trophy, Plus, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShelfTalk } from '../context/ShelfTalkContext';
import { CircularProgressOdometer } from '../components/CircularProgressOdometer';

export const ReadingGoalView = () => {
  const { readingGoal, updateReadingGoal, books, markBookCompleted } = useShelfTalk();
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempTarget, setTempTarget] = useState(readingGoal.target);
  const [newTitle, setNewTitle] = useState('');

  const percentage = Math.min(100, Math.round((readingGoal.current / readingGoal.target) * 100));
  const remaining = Math.max(0, readingGoal.target - readingGoal.current);

  const handleGoalSave = (e) => {
    e.preventDefault();
    updateReadingGoal(readingGoal.current, parseInt(tempTarget, 10));
    setIsEditingGoal(false);
  };

  const handleCustomAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    markBookCompleted(newTitle.trim());
    setNewTitle('');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
      {/* View Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
          <Target className="w-3.5 h-3.5 text-amber-700" />
          <span>Annual Milestone Tracker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
          {readingGoal.year} Annual Reading Target
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Keep your campus reading momentum strong with visual progress tracking and goal milestones.
        </p>
      </div>

      {/* Main Stats Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-parchment-200/90 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Progress Circular Odometer */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-parchment-100/60 rounded-2xl border border-parchment-200">
            <CircularProgressOdometer
              currentPage={readingGoal.current}
              totalPages={readingGoal.target}
              size={210}
              strokeWidth={16}
              label={`${readingGoal.year} Annual Reading Goal`}
            />
            <span className="mt-4 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
              {readingGoal.current} of {readingGoal.target} Books Read
            </span>
          </div>

          {/* Metrics & Adjustment */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Pace</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
                {percentage}% Towards Your Target
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                You've completed <strong className="text-slate-900">{readingGoal.current} books</strong> this year! Just <strong className="text-amber-800">{remaining} more books</strong> to hit your target.
              </p>
            </div>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                <Flame className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <span className="block text-xl font-bold text-slate-900">12 Wks</span>
                <span className="text-[11px] font-semibold text-amber-800 uppercase">Streak</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <BookCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <span className="block text-xl font-bold text-slate-900">{readingGoal.current}</span>
                <span className="text-[11px] font-semibold text-emerald-800 uppercase">Completed</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-center">
                <Trophy className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                <span className="block text-xl font-bold text-slate-900">{readingGoal.target}</span>
                <span className="text-[11px] font-semibold text-indigo-800 uppercase">Target</span>
              </div>
            </div>

            {/* Edit Target Form */}
            {isEditingGoal ? (
              <form onSubmit={handleGoalSave} className="flex items-center gap-3 pt-2">
                <label htmlFor="goal-target" className="text-xs font-semibold text-slate-700">Set Goal Target:</label>
                <input
                  id="goal-target"
                  type="number"
                  min="1"
                  max="100"
                  value={tempTarget}
                  onChange={(e) => setTempTarget(e.target.value)}
                  className="w-24 px-3 py-1.5 text-sm bg-white border border-parchment-300 rounded-lg text-slate-800 font-bold focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-bold hover:bg-amber-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingGoal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingGoal(true)}
                  className="px-4 py-2 bg-parchment-100 hover:bg-parchment-200 text-slate-700 text-xs font-bold rounded-xl border border-parchment-300 transition-colors"
                >
                  Adjust Annual Target ({readingGoal.target})
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Completed Books Shelf */}
      <section aria-labelledby="completed-shelf-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 id="completed-shelf-heading" className="text-2xl font-serif font-bold text-slate-900">
              Completed Bookshelf ({readingGoal.completedTitles.length})
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              All the books you've logged this academic year toward your goal.
            </p>
          </div>

          {/* Quick Custom Title Adder */}
          <form onSubmit={handleCustomAdd} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add another book title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white border border-parchment-300 rounded-lg text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:outline-none w-48 sm:w-60"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log</span>
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {readingGoal.completedTitles.map((title, idx) => {
            const matchedBook = books.find(b => b.title.toLowerCase() === title.toLowerCase());

            return (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-parchment-200 flex items-center gap-3 shadow-xs hover:border-amber-300 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  ✓
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{title}</h4>
                  <span className="text-[11px] text-slate-400 block truncate">
                    {matchedBook ? `${matchedBook.authorName} • ${matchedBook.pageCount} pgs` : 'Completed Reading'}
                  </span>
                </div>
                {matchedBook && (
                  <Link
                    to={`/book/${matchedBook.id}`}
                    className="p-1 rounded text-slate-400 hover:text-amber-800"
                    title="View book"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};
