import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Star, Sparkles, ArrowRight, BookMarked, User } from 'lucide-react';
import { useShelfTalk } from '../context/ShelfTalkContext';
import { StarRating } from '../components/StarRating';

export const CatalogView = () => {
  const { books, authors } = useShelfTalk();
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'reviews', 'pages', 'title'

  const genres = ['All', 'Fiction', 'Non-Fiction', 'Sci-Fi', 'Biography'];

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        const matchesGenre = selectedGenre === 'All' || book.genres.includes(selectedGenre);
        const matchesSearch =
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.synopsis.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesGenre && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.averageRating - a.averageRating;
        if (sortBy === 'reviews') return b.totalReviews - a.totalReviews;
        if (sortBy === 'pages') return b.pageCount - a.pageCount;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [books, selectedGenre, searchQuery, sortBy]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
      {/* Hero Showcase Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-shelf-wood via-stone-800 to-amber-950 text-white p-8 sm:p-12 mb-12 shadow-xl border border-amber-900/30">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Campus Reading Circles & Review Suite</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight leading-tight">
            Discover Great Reads. Talk Chapters. Track Pages.
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Welcome to ShelfTalk—where literary minds unite. Join campus reading circles, log your page progress with animated completion rings, and participate in spoiler-shielded chapter discussions.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/circles"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-2"
            >
              <BookMarked className="w-4 h-4" />
              <span>Explore Reading Circles</span>
            </Link>
            <Link
              to="/quiz"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm transition-all border border-white/20"
            >
              Take 3-Question Match Quiz
            </Link>
          </div>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
          <BookOpen className="w-96 h-96" />
        </div>
      </section>

      {/* Catalog Search & Filter Controls */}
      <section aria-labelledby="catalog-controls-heading" className="space-y-6 mb-8">
        <h2 id="catalog-controls-heading" className="sr-only">Catalog Filters and Search</h2>
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Genre Selection Pills */}
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Genre Filter Pills">
            {genres.map((genre) => {
              const isSelected = selectedGenre === genre;
              const count = genre === 'All' 
                ? books.length 
                : books.filter(b => b.genres.includes(genre)).length;

              return (
                <button
                  key={genre}
                  type="button"
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-500 ring-offset-2'
                      : 'bg-white hover:bg-parchment-200 text-slate-700 border border-parchment-300'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span>{genre}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-amber-700 text-amber-100' : 'bg-parchment-200 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Sort Dropdown */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search titles, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-parchment-300 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                aria-label="Search books catalog"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-white border border-parchment-300 rounded-xl px-2.5 py-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs sm:text-sm bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer"
                aria-label="Sort books by"
              >
                <option value="rating">Top Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="pages">Page Count</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Book Grid */}
      <section aria-label="Book Catalog Grid">
        {filteredBooks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-parchment-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No books found</h3>
            <p className="text-sm text-slate-500 mt-1">Try clearing your search query or selecting a different genre.</p>
            <button
              onClick={() => { setSelectedGenre('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <article
                key={book.id}
                className="group bg-white rounded-2xl overflow-hidden border border-parchment-200/80 shadow-sm hover:shadow-book-hover transition-all duration-300 flex flex-col"
              >
                {/* Book Cover Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-parchment-200">
                  <img
                    src={book.coverImage}
                    alt={`Cover artwork of ${book.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <Link
                      to={`/book/${book.id}`}
                      className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg text-center transition-colors shadow-md"
                    >
                      View Details & Reviews
                    </Link>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {book.genres.map((g) => (
                      <span
                        key={g}
                        className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 border border-white/10"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  <div className="absolute top-3 right-3 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-black/60 backdrop-blur-md text-white">
                    {book.pageCount} pgs
                  </div>
                </div>

                {/* Book Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                      <Link to={`/book/${book.id}`}>{book.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      by {book.authorName}
                    </p>

                    {/* Dynamic Rating Score */}
                    <div className="flex items-center gap-2 mt-3">
                      <StarRating value={book.averageRating} readOnly size="sm" />
                      <span className="text-xs font-extrabold text-slate-800">
                        {book.averageRating.toFixed(1)}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({book.totalReviews})
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                      {book.synopsis}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-parchment-100 flex items-center justify-between">
                    <Link
                      to={`/book/${book.id}`}
                      className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 group-hover:gap-1.5 transition-all"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/circles"
                      className="text-xs font-medium text-slate-500 hover:text-slate-800"
                    >
                      Reading Circle
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Author Spotlight Teaser Strip */}
      <section className="mt-16 bg-white/70 backdrop-blur rounded-3xl p-8 border border-parchment-300 shadow-sm" aria-labelledby="author-teaser-heading">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Literary Masters</span>
            <h2 id="author-teaser-heading" className="text-2xl font-serif font-bold text-slate-900">
              Celebrated Authors Spotlight
            </h2>
          </div>
          <Link
            to="/authors"
            className="text-sm font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            <span>View All {authors.length} Authors</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {authors.slice(0, 6).map((author) => (
            <Link
              key={author.id}
              to={`/authors#${author.id}`}
              className="group p-3 rounded-2xl bg-parchment-50 hover:bg-amber-50 border border-parchment-200 transition-all text-center flex flex-col items-center"
            >
              <img
                src={author.portraitUrl}
                alt={author.name}
                className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-amber-300 group-hover:scale-105 transition-transform"
              />
              <span className="text-xs font-bold text-slate-800 group-hover:text-amber-900 line-clamp-1">
                {author.name}
              </span>
              <span className="text-[10px] text-slate-500 line-clamp-1">
                {author.celebratedWorks[0]}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};
