import React, { useState, useMemo } from 'react';
import { Award, BookOpen, Search, ArrowRight, Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShelfTalk } from '../context/ShelfTalkContext';

export const AuthorSpotlightView = () => {
  const { authors, books } = useShelfTalk();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAuthors = useMemo(() => {
    return authors.filter((a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.biography.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.celebratedWorks.some(work => work.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [authors, searchQuery]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
          <Award className="w-3.5 h-3.5 text-amber-700" />
          <span>Literary Spotlights</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
          Celebrated Authors & Bibliographies
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Explore the masterminds behind our curated catalog—their personal biographies, major literary awards, and celebrated works.
        </p>

        {/* Search */}
        <div className="mt-6 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search authors, books, awards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-parchment-300 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            aria-label="Search authors"
          />
        </div>
      </div>

      {/* Authors Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8" aria-label="Author Biographies">
        {filteredAuthors.map((author) => {
          // Find any books in our catalog by this author
          const catalogBooks = books.filter((b) => b.authorId === author.id);

          return (
            <article
              key={author.id}
              id={author.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-parchment-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between scroll-mt-24"
            >
              <div>
                {/* Author Info Header */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={author.portraitUrl}
                    alt={author.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-amber-400 shadow-md flex-shrink-0"
                  />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      {author.name}
                    </h2>
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 block mt-0.5">
                      Distinguished Author
                    </span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {author.awards.map((award, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[11px] font-medium bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200"
                        >
                          🏆 {award}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Biography */}
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {author.biography}
                </p>

                {/* Celebrated Works */}
                <div className="mt-5 pt-4 border-t border-parchment-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Celebrated Works
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {author.celebratedWorks.map((work, idx) => {
                      const matchedBook = books.find((b) => b.title.toLowerCase() === work.toLowerCase());

                      if (matchedBook) {
                        return (
                          <Link
                            key={idx}
                            to={`/book/${matchedBook.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs font-semibold transition-colors border border-amber-300"
                          >
                            <BookOpen className="w-3 h-3" />
                            <span>{work}</span>
                            <span className="text-[10px] text-amber-700 font-bold">(In Catalog)</span>
                          </Link>
                        );
                      }

                      return (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-parchment-100 text-slate-700 rounded-lg text-xs font-medium border border-parchment-200"
                        >
                          {work}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* In-Catalog CTA */}
              {catalogBooks.length > 0 && (
                <div className="mt-6 pt-4 border-t border-parchment-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    Available in ShelfTalk: <strong className="text-slate-800">{catalogBooks[0].title}</strong>
                  </span>
                  <Link
                    to={`/book/${catalogBooks[0].id}`}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                  >
                    <span>View Title</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
};
