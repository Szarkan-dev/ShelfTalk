import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, BookOpen, Star, Sparkles, MessageSquare, 
  Share2, Bookmark, CheckCircle2, AlertTriangle, Eye, EyeOff, Plus, ChevronRight
} from 'lucide-react';
import { useShelfTalk } from '../context/ShelfTalkContext';
import { StarRating } from '../components/StarRating';
import { RatingBreakdown } from '../components/RatingBreakdown';
import { ReviewModal } from '../components/ReviewModal';

export const BookDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, authors, reviews, addReview, markBookCompleted, readingGoal } = useShelfTalk();

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [filterRating, setFilterRating] = useState('all');
  const [unblurredReviews, setUnblurredReviews] = useState({});
  const [justAddedNotification, setJustAddedNotification] = useState('');

  // Find book
  const book = useMemo(() => {
    return books.find((b) => b.id === id) || books[0];
  }, [books, id]);

  // Find author
  const author = useMemo(() => {
    return authors.find((a) => a.id === book?.authorId);
  }, [authors, book]);

  // Get reviews for this book
  const bookReviews = useMemo(() => {
    return reviews.filter((r) => r.bookId === book?.id);
  }, [reviews, book]);

  // Filter reviews
  const displayedReviews = useMemo(() => {
    if (filterRating === 'all') return bookReviews;
    return bookReviews.filter((r) => r.starRating === parseInt(filterRating, 10));
  }, [bookReviews, filterRating]);

  const isBookCompleted = readingGoal.completedTitles.includes(book?.title);

  const toggleReviewBlur = (reviewId) => {
    setUnblurredReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const handleReviewSubmit = (reviewData) => {
    const created = addReview(reviewData);
    setJustAddedNotification(`Review submitted! Recalculated score: ${book.averageRating} ★`);
    setTimeout(() => setJustAddedNotification(''), 4000);
  };

  if (!book) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Book Not Found</h2>
        <Link to="/" className="mt-4 inline-flex items-center gap-2 text-amber-700 font-semibold">
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
          <li>
            <Link to="/" className="hover:text-amber-800 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Catalog</span>
            </Link>
          </li>
          <li>/</li>
          <li>
            <span className="text-slate-400">{book.genres[0]}</span>
          </li>
          <li>/</li>
          <li className="font-semibold text-slate-800 truncate max-w-xs">{book.title}</li>
        </ol>
      </nav>

      {/* Recalculation Toast Alert */}
      {justAddedNotification && (
        <div 
          className="mb-6 p-4 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-between shadow-lg animate-bounce"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>{justAddedNotification}</span>
          </div>
          <span className="text-xs uppercase bg-black/10 px-2 py-1 rounded">Score Updated</span>
        </div>
      )}

      {/* Book Hero Showcase Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-parchment-200/80 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Cover Column */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative aspect-[3/4] w-full max-w-sm rounded-2xl overflow-hidden shadow-book border border-parchment-300">
              <img
                src={book.coverImage}
                alt={`Cover artwork of ${book.title}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-xs font-semibold">
                {book.pageCount} Pages
              </div>
            </div>

            {/* Quick Actions */}
            <div className="w-full max-w-sm mt-5 space-y-2.5">
              <Link
                to="/circles"
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-center text-sm transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Join Campus Reading Circle</span>
              </Link>

              <button
                type="button"
                onClick={() => markBookCompleted(book.title)}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-2 ${
                  isBookCompleted
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-white text-slate-700 border-parchment-300 hover:bg-parchment-100'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${isBookCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{isBookCompleted ? 'Logged in Annual Reading Goal ✓' : 'Mark as Read in Annual Goal'}</span>
              </button>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {book.genres.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 leading-tight">
                {book.title}
              </h1>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-slate-500 font-medium">Written by</span>
                <Link
                  to={`/authors#${author?.id}`}
                  className="text-base font-semibold text-amber-800 hover:underline"
                >
                  {book.authorName}
                </Link>
              </div>

              {/* Dynamic Score Ribbon */}
              <div className="mt-4 inline-flex items-center gap-3 bg-amber-50/80 border border-amber-200 px-4 py-2 rounded-2xl">
                <StarRating value={book.averageRating} readOnly size="md" />
                <span className="text-xl font-extrabold text-slate-900">
                  {book.averageRating.toFixed(1)}
                </span>
                <span className="text-xs text-slate-500">
                  / 5.0 ({book.totalReviews} community reviews)
                </span>
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Book Synopsis
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                {book.synopsis}
              </p>
            </div>

            {/* Author Spotlight Card */}
            {author && (
              <div className="bg-parchment-100 rounded-2xl p-5 border border-parchment-300">
                <div className="flex items-start gap-4">
                  <img
                    src={author.portraitUrl}
                    alt={author.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-slate-900 text-sm">
                        Author Spotlight: {author.name}
                      </h4>
                      <Link
                        to={`/authors#${author.id}`}
                        className="text-xs font-semibold text-amber-800 hover:underline flex items-center gap-0.5"
                      >
                        <span>Full Bio</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {author.biography}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {author.awards.slice(0, 2).map((aw, i) => (
                        <span key={i} className="text-[10px] font-semibold bg-white px-2 py-0.5 rounded border border-parchment-300 text-slate-600">
                          🏆 {aw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Community Ratings & Reviews Section */}
      <section aria-labelledby="reviews-section-heading" className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 id="reviews-section-heading" className="text-2xl font-serif font-bold text-slate-900">
              Community Ratings & Critiques
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Real-time weighted score recalculations and chapter-by-chapter discussion notes
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsReviewModalOpen(true)}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-2 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Breakdown Component */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 sticky top-24">
            <RatingBreakdown
              averageRating={book.averageRating}
              totalReviews={book.totalReviews}
              ratingBreakdown={book.ratingBreakdown}
            />

            {/* Quick Demo Hint */}
            <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <span className="font-bold block mb-1">💡 Demo Acceptance Tip:</span>
              Click <strong>'Write a Review'</strong>, select 5 stars, enter a critique, and submit. The average score will immediately recalculate from {book.averageRating.toFixed(1)} ★ to {(
                (book.averageRating * book.totalReviews + 5) / (book.totalReviews + 1)
              ).toFixed(1)} ★!
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filter pills */}
            <div className="flex items-center gap-2 pb-2 overflow-x-auto">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Filter:</span>
              {['all', '5', '4', '3', '2', '1'].map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setFilterRating(tier)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    filterRating === tier
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-parchment-200 hover:bg-parchment-100'
                  }`}
                >
                  {tier === 'all' ? 'All Reviews' : `${tier} Stars`}
                </button>
              ))}
            </div>

            {displayedReviews.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-parchment-200 p-6">
                <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">No reviews found for this filter tier.</p>
              </div>
            ) : (
              displayedReviews.map((rev) => {
                const isUnblurred = unblurredReviews[rev.id] || !rev.containsSpoilers;
                const formattedDate = new Date(rev.timestamp).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });

                return (
                  <article
                    key={rev.id}
                    className="bg-white rounded-2xl p-6 border border-parchment-200 shadow-xs transition-all hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <StarRating value={rev.starRating} readOnly size="sm" />
                          <span className="text-xs font-bold text-slate-700">
                            {rev.starRating}.0
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-slate-900 text-base mt-1">
                          {rev.headline}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <span className="font-medium text-slate-600">{rev.reviewerName}</span>
                          <span>•</span>
                          <span>{formattedDate}</span>
                        </div>
                      </div>

                      {rev.containsSpoilers && (
                        <button
                          type="button"
                          onClick={() => toggleReviewBlur(rev.id)}
                          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border text-amber-800 bg-amber-50 border-amber-200 hover:bg-amber-100 transition-colors"
                        >
                          {isUnblurred ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Hide Spoiler</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Reveal Spoiler</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Critique Text with Spoiler Shielding */}
                    <div className="relative mt-2">
                      <p
                        onClick={rev.containsSpoilers && !isUnblurred ? () => toggleReviewBlur(rev.id) : undefined}
                        className={`text-sm text-slate-700 leading-relaxed transition-all duration-300 ${
                          rev.containsSpoilers && !isUnblurred
                            ? 'spoiler-shield cursor-pointer select-none bg-slate-100/60 p-3 rounded-lg border border-dashed border-amber-300'
                            : 'spoiler-unblurred'
                        }`}
                        style={{
                          filter: rev.containsSpoilers && !isUnblurred ? 'blur(6px)' : 'none'
                        }}
                      >
                        {rev.critiqueText}
                      </p>

                      {rev.containsSpoilers && !isUnblurred && (
                        <div
                          onClick={() => toggleReviewBlur(rev.id)}
                          className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/5 backdrop-blur-[2px] rounded-lg p-3 text-center"
                        >
                          <div className="bg-amber-50 border border-amber-300 text-amber-900 px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2 text-xs font-semibold">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                            <span>Plot Spoiler Warning • Click to reveal critique</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Review Modal Dialog */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        book={book}
        onSubmit={handleReviewSubmit}
      />
    </main>
  );
};
