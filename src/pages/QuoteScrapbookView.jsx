import React, { useState, useMemo } from 'react';
import { Quote, Search, Plus, Copy, Check, Trash2, BookOpen, Sparkles } from 'lucide-react';
import { useShelfTalk } from '../context/ShelfTalkContext';

export const QuoteScrapbookView = () => {
  const { quotes, addQuote, deleteQuote, books } = useShelfTalk();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // New quote form fields
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [quoteText, setQuoteText] = useState('');
  const [note, setNote] = useState('');

  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) =>
      q.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.note && q.note.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [quotes, searchQuery]);

  const handleCopy = (quoteItem) => {
    navigator.clipboard.writeText(`"${quoteItem.quote}" — ${quoteItem.author}, ${quoteItem.bookTitle}`);
    setCopiedId(quoteItem.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!quoteText.trim()) return;

    addQuote({
      bookTitle: bookTitle.trim() || 'Selected Book',
      author: author.trim() || 'Author',
      quote: quoteText.trim(),
      note: note.trim()
    });

    setQuoteText('');
    setNote('');
    setShowAddForm(false);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
          <Quote className="w-3.5 h-3.5 text-amber-700" />
          <span>Literary Scrapbook</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
          Favorite Quotes & Margin Notes
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Capture memorable lines, inspirational passages, and margin notes across your campus reading journey.
        </p>

        {/* Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="max-w-md relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search quotes, books, thoughts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-parchment-300 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              aria-label="Search quotes"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? 'Close Form' : 'Save New Quote'}</span>
          </button>
        </div>
      </div>

      {/* Add Quote Drawer / Form */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-300 shadow-md space-y-4 mb-10 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-parchment-200">
            <h3 className="font-serif font-bold text-slate-900 text-lg">Add Quote to Scrapbook</h3>
            <span className="text-xs text-amber-700 font-semibold">Margin Highlighter</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="quote-book" className="block text-xs font-semibold text-slate-700 mb-1">
                Book Title
              </label>
              <input
                id="quote-book"
                type="text"
                list="books-list"
                required
                placeholder="e.g., The Midnight Library"
                value={bookTitle}
                onChange={(e) => {
                  setBookTitle(e.target.value);
                  const matched = books.find(b => b.title.toLowerCase() === e.target.value.toLowerCase());
                  if (matched) setAuthor(matched.authorName);
                }}
                className="w-full px-3.5 py-2 text-sm bg-white border border-parchment-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <datalist id="books-list">
                {books.map(b => <option key={b.id} value={b.title} />)}
              </datalist>
            </div>

            <div>
              <label htmlFor="quote-author" className="block text-xs font-semibold text-slate-700 mb-1">
                Author
              </label>
              <input
                id="quote-author"
                type="text"
                required
                placeholder="e.g., Matt Haig"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-parchment-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="quote-text" className="block text-xs font-semibold text-slate-700 mb-1">
              Passage / Quote Text
            </label>
            <textarea
              id="quote-text"
              rows={3}
              required
              placeholder="Paste or type the quote that inspired you..."
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white border border-parchment-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none font-serif text-base italic leading-relaxed"
            />
          </div>

          <div>
            <label htmlFor="quote-note" className="block text-xs font-semibold text-slate-700 mb-1">
              Personal Note / Context (Optional)
            </label>
            <input
              id="quote-note"
              type="text"
              placeholder="e.g., Shared at our Thursday reading circle"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white border border-parchment-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-parchment-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm"
            >
              Save Quote
            </button>
          </div>
        </form>
      )}

      {/* Quotes Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Quotes Grid">
        {filteredQuotes.map((q) => (
          <article
            key={q.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-parchment-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
          >
            <div>
              <Quote className="w-8 h-8 text-amber-200 group-hover:text-amber-300 transition-colors mb-3" />
              <blockquote className="font-serif italic text-base sm:text-lg text-slate-800 leading-relaxed">
                "{q.quote}"
              </blockquote>

              <div className="mt-4 pt-3 border-t border-parchment-100">
                <span className="block text-sm font-bold text-slate-900 font-serif">
                  — {q.author}
                </span>
                <span className="text-xs text-amber-800 font-medium">
                  {q.bookTitle}
                </span>
                {q.note && (
                  <p className="text-xs text-slate-500 mt-2 bg-parchment-50 p-2.5 rounded-lg border border-parchment-200 italic">
                    Note: {q.note}
                  </p>
                )}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="mt-6 pt-3 border-t border-parchment-100 flex items-center justify-between text-xs text-slate-400">
              <span>{new Date(q.savedAt).toLocaleDateString()}</span>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(q)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-amber-800 hover:bg-parchment-100 transition-colors flex items-center gap-1"
                  title="Copy quote"
                >
                  {copiedId === q.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold text-[11px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => deleteQuote(q.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Remove quote"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};
