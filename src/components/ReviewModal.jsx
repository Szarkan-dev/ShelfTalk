import React, { useState, useEffect } from 'react';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import { StarRating } from './StarRating';

/**
 * Accessible Review Submission Modal
 * Manages structured critique submission with interactive 5-star rating,
 * headline, spoiler warning, and dynamic real-time recalculation of book scores.
 */
export const ReviewModal = ({ isOpen, onClose, book, onSubmit }) => {
  const [reviewerName, setReviewerName] = useState('');
  const [starRating, setStarRating] = useState(5);
  const [headline, setHeadline] = useState('');
  const [critiqueText, setCritiqueText] = useState('');
  const [containsSpoilers, setContainsSpoilers] = useState(false);
  const [error, setError] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !book) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!headline.trim() && !critiqueText.trim()) {
      setError('Please provide a headline or critique for your review.');
      return;
    }

    setError('');
    onSubmit({
      bookId: book.id,
      reviewerName: reviewerName.trim() || 'Campus Reader',
      starRating,
      headline: headline.trim() || critiqueText.slice(0, 50),
      critiqueText: critiqueText.trim() || headline.trim(),
      containsSpoilers
    });

    // Reset fields
    setReviewerName('');
    setStarRating(5);
    setHeadline('');
    setCritiqueText('');
    setContainsSpoilers(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
    >
      <div 
        className="relative bg-parchment-50 rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-parchment-300 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-parchment-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Write a Review</span>
            <h2 id="review-modal-title" className="text-xl font-bold text-slate-900 mt-0.5">
              {book.title}
            </h2>
            <p className="text-xs text-slate-500">by {book.authorName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-parchment-200 transition-colors"
            aria-label="Close review modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Reviewer Name */}
          <div>
            <label htmlFor="reviewer-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Your Name / Pseudonym
            </label>
            <input
              id="reviewer-name"
              type="text"
              placeholder="e.g., Nora Seed or Campus Reader"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white border border-parchment-300 rounded-lg text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Interactive Accessible 5-Star Rating */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Star Rating <span className="text-red-500">*</span>
            </label>
            <div className="bg-white p-3 rounded-lg border border-parchment-300 flex items-center justify-between">
              <StarRating
                value={starRating}
                onChange={setStarRating}
                name="modal-rating"
                size="lg"
                ariaLabel="Select your star rating from 1 to 5"
              />
              <span className="text-xs text-slate-500 italic hidden sm:inline">
                Use Arrow keys or Click
              </span>
            </div>
          </div>

          {/* Review Headline */}
          <div>
            <label htmlFor="review-headline" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Review Headline <span className="text-red-500">*</span>
            </label>
            <input
              id="review-headline"
              type="text"
              required
              placeholder="e.g., A poignant exploration of life choices and parallel regrets"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white border border-parchment-300 rounded-lg text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:outline-none font-medium"
            />
          </div>

          {/* Detailed Critique Text */}
          <div>
            <label htmlFor="critique-text" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Detailed Critique <span className="text-red-500">*</span>
            </label>
            <textarea
              id="critique-text"
              rows={4}
              required
              placeholder="Share your thoughts on the characters, pacing, themes, and emotional impact on your reading circle..."
              value={critiqueText}
              onChange={(e) => setCritiqueText(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white border border-parchment-300 rounded-lg text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Spoiler Warning Toggle */}
          <div className="flex items-center gap-3 p-3 bg-amber-50/70 border border-amber-200 rounded-lg">
            <input
              id="spoiler-toggle"
              type="checkbox"
              checked={containsSpoilers}
              onChange={(e) => setContainsSpoilers(e.target.checked)}
              className="w-4 h-4 text-amber-600 border-amber-300 rounded focus:ring-amber-500 focus:ring-2 cursor-pointer"
            />
            <label htmlFor="spoiler-toggle" className="text-xs text-slate-700 font-medium cursor-pointer">
              ⚠️ <span className="font-semibold text-slate-900">Contains Plot Spoilers</span>
              <span className="block text-slate-500 text-[11px]">
                Shields your text with blur(6px) so fellow club members can unblur only when ready.
              </span>
            </label>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-parchment-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-parchment-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
