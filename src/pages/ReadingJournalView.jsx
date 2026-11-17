import React from 'react';
import { Printer, Download, BookOpen, Quote, Target, Star, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { useShelfTalk } from '../context/ShelfTalkContext';
import { StarRating } from '../components/StarRating';

export const ReadingJournalView = () => {
  const { readingGoal, circles, reviews, quotes, books } = useShelfTalk();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    let md = `# ShelfTalk — Personal Reading Journal\n\n`;
    md += `*Generated on: ${new Date().toLocaleDateString()}*\n\n`;
    md += `## Annual Reading Goal (${readingGoal.year})\n`;
    md += `- **Progress:** ${readingGoal.current} of ${readingGoal.target} books read (${Math.round((readingGoal.current / readingGoal.target) * 100)}% completed)\n`;
    md += `- **Completed Titles:** ${readingGoal.completedTitles.join(', ')}\n\n`;

    md += `## Active Reading Circles\n`;
    circles.forEach(c => {
      const pct = Math.round((c.userProgress.currentPage / c.userProgress.totalPages) * 100);
      md += `### ${c.name}\n`;
      md += `- Book: *${c.bookTitle}* by ${c.bookAuthor}\n`;
      md += `- Current Page: ${c.userProgress.currentPage} of ${c.userProgress.totalPages} (${pct}% completed)\n`;
      md += `- Schedule: ${c.schedule}\n\n`;
    });

    md += `## Saved Quotes & Margin Notes\n`;
    quotes.forEach(q => {
      md += `> "${q.quote}"\n`;
      md += `> — **${q.author}**, *${q.bookTitle}*\n`;
      if (q.note) md += `> *Note:* ${q.note}\n`;
      md += `\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ShelfTalk_Reading_Journal_${new Date().toISOString().slice(0, 10)}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
      {/* Action Bar (hidden when printing) */}
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-parchment-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-1 border border-amber-200">
            <FileText className="w-3.5 h-3.5 text-amber-700" />
            <span>Exportable Journal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900">
            Personal Literary Reading Journal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Formatted for printing, PDF export, or markdown backup.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleDownloadMarkdown}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-parchment-100 hover:bg-parchment-200 border border-parchment-300 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Download .MD</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Journal Document Container */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-parchment-300 shadow-sm print-page space-y-10">
        
        {/* Document Title Header */}
        <div className="border-b-2 border-slate-900 pb-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-slate-900 uppercase">
            Campus Literary Journal
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-serif italic mt-1">
            ShelfTalk Reading Circle Progress, Critical Reviews & Margin Annotations
          </p>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <span>Academic Year {readingGoal.year}</span>
            <span>•</span>
            <span>Compiled {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Section 1: Annual Reading Goal Summary */}
        <section aria-labelledby="journal-goal-heading" className="space-y-4">
          <h3 id="journal-goal-heading" className="text-sm font-bold uppercase tracking-wider text-amber-800 border-b border-parchment-200 pb-2 flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>Annual Reading Goal Milestone</span>
          </h3>

          <div className="p-4 bg-parchment-50 rounded-2xl border border-parchment-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-2xl font-bold font-serif text-slate-900">
                {readingGoal.current} of {readingGoal.target} Books Read
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                {Math.round((readingGoal.current / readingGoal.target) * 100)}% of your {readingGoal.year} academic reading target achieved
              </p>
            </div>
            <div className="flex flex-wrap gap-1 max-w-md">
              {readingGoal.completedTitles.map((title, i) => (
                <span key={i} className="text-[11px] font-medium bg-white px-2 py-0.5 rounded border border-parchment-300 text-slate-700">
                  ✓ {title}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Active Reading Circles & Page Progress */}
        <section aria-labelledby="journal-circles-heading" className="space-y-4">
          <h3 id="journal-circles-heading" className="text-sm font-bold uppercase tracking-wider text-amber-800 border-b border-parchment-200 pb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Active Reading Circles & Page Odometers</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {circles.map((c) => {
              const pct = Math.round((c.userProgress.currentPage / c.userProgress.totalPages) * 100);

              return (
                <div key={c.id} className="p-4 rounded-2xl bg-parchment-50 border border-parchment-200 space-y-2">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">{c.name}</span>
                  <h4 className="font-serif font-bold text-slate-900 text-sm">{c.bookTitle}</h4>
                  <p className="text-xs text-slate-500">by {c.bookAuthor}</p>
                  <div className="pt-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Page {c.userProgress.currentPage} of {c.userProgress.totalPages}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-parchment-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Highlighted Quotes & Scrapbook */}
        <section aria-labelledby="journal-quotes-heading" className="space-y-4">
          <h3 id="journal-quotes-heading" className="text-sm font-bold uppercase tracking-wider text-amber-800 border-b border-parchment-200 pb-2 flex items-center gap-2">
            <Quote className="w-4 h-4" />
            <span>Saved Margin Quotes ({quotes.length})</span>
          </h3>

          <div className="space-y-3">
            {quotes.map((q) => (
              <blockquote key={q.id} className="p-4 rounded-xl border-l-4 border-amber-500 bg-parchment-50 text-slate-800 text-sm font-serif italic">
                "{q.quote}"
                <footer className="text-xs font-sans not-italic text-slate-600 font-semibold mt-1">
                  — {q.author}, <cite>{q.bookTitle}</cite>
                  {q.note && <span className="block text-slate-400 font-normal italic mt-0.5">Note: {q.note}</span>}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Section 4: Critical Reviews Sample */}
        <section aria-labelledby="journal-reviews-heading" className="space-y-4">
          <h3 id="journal-reviews-heading" className="text-sm font-bold uppercase tracking-wider text-amber-800 border-b border-parchment-200 pb-2 flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span>Recent Community Critiques</span>
          </h3>

          <div className="space-y-3">
            {reviews.slice(0, 5).map((r) => {
              const matchedBook = books.find(b => b.id === r.bookId);

              return (
                <div key={r.id} className="p-4 rounded-xl bg-white border border-parchment-200 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{matchedBook?.title || 'Book'}</span>
                    <span className="text-amber-700 font-semibold">{r.starRating} of 5 Stars ★</span>
                  </div>
                  <h5 className="font-serif font-bold text-sm text-slate-800">{r.headline}</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">{r.critiqueText}</p>
                  <span className="text-[11px] text-slate-400 block pt-1">Reviewed by {r.reviewerName}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Journal Footer */}
        <div className="border-t border-parchment-300 pt-6 text-center text-xs text-slate-400 font-serif">
          <p>ShelfTalk Reading Club Application • Produced for Campus Literature Circles</p>
        </div>
      </div>
    </main>
  );
};
