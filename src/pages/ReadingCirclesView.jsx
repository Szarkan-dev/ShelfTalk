import React, { useState, useMemo } from 'react';
import { Users, BookOpen, Clock, Calendar, MessageSquare, Plus, AlertTriangle, Send, Sparkles } from 'lucide-react';
import { useShelfTalk } from '../context/ShelfTalkContext';
import { CircularProgressOdometer } from '../components/CircularProgressOdometer';
import { SpoilerPostCard } from '../components/SpoilerPostCard';

export const ReadingCirclesView = () => {
  const { circles, updateReadingProgress, chapterPosts, addChapterPost } = useShelfTalk();
  const [selectedCircleId, setSelectedCircleId] = useState(circles[0]?.id || 'circle-1');
  const [selectedChapterFilter, setSelectedChapterFilter] = useState('all');

  // New post form state
  const [showPostForm, setShowPostForm] = useState(false);
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newChapterId, setNewChapterId] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newContainsSpoilers, setNewContainsSpoilers] = useState(false);

  // Active circle
  const activeCircle = useMemo(() => {
    return circles.find((c) => c.id === selectedCircleId) || circles[0];
  }, [circles, selectedCircleId]);

  // Chapter filter options for active circle
  const chapters = activeCircle?.chapters || [];

  // Filter chapter posts
  const filteredPosts = useMemo(() => {
    return chapterPosts.filter((post) => {
      if (post.circleId !== activeCircle?.id) return false;
      if (selectedChapterFilter !== 'all' && post.chapterId !== selectedChapterFilter) return false;
      return true;
    });
  }, [chapterPosts, activeCircle, selectedChapterFilter]);

  const handleProgressChange = (newPage, newTotal) => {
    updateReadingProgress(activeCircle.id, newPage, newTotal);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const matchedChapter = chapters.find((ch) => ch.id === newChapterId) || chapters[0];
    const chapterTitle = matchedChapter ? `Chapter ${matchedChapter.number}: ${matchedChapter.title}` : 'General Circle Discussion';

    addChapterPost({
      circleId: activeCircle.id,
      chapterId: matchedChapter ? matchedChapter.id : 'general',
      chapterTitle,
      authorName: newAuthorName.trim() || 'Campus Reader',
      content: newContent.trim(),
      containsSpoilers: newContainsSpoilers
    });

    setNewContent('');
    setShowPostForm(false);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
      {/* View Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
          <Users className="w-3.5 h-3.5 text-amber-700" />
          <span>Campus Reading Circles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
          Reading Circles & Chapter Forums
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Track personal page milestones with animated completion odometers and discuss books chapter-by-chapter with spoiler blur shields.
        </p>
      </div>

      {/* Circle Selection Tabs */}
      <div className="flex items-center gap-2 pb-4 overflow-x-auto border-b border-parchment-200 mb-8" role="tablist">
        {circles.map((circle) => {
          const isSelected = circle.id === activeCircle?.id;
          return (
            <button
              key={circle.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => {
                setSelectedCircleId(circle.id);
                setSelectedChapterFilter('all');
              }}
              className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2.5 whitespace-nowrap ${
                isSelected
                  ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-500 ring-offset-2'
                  : 'bg-white text-slate-700 border border-parchment-300 hover:bg-parchment-100'
              }`}
            >
              <Users className={`w-4 h-4 ${isSelected ? 'text-amber-200' : 'text-slate-400'}`} />
              <span>{circle.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isSelected ? 'bg-amber-700 text-amber-100' : 'bg-parchment-200 text-slate-600'
              }`}>
                {circle.memberCount} members
              </span>
            </button>
          );
        })}
      </div>

      {activeCircle && (
        <div className="space-y-10">
          
          {/* Top Panel: Book Info & Animated Circular Odometer */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-parchment-200/90 shadow-sm" aria-labelledby="circle-active-heading">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Book Info Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={activeCircle.coverImage}
                    alt={activeCircle.bookTitle}
                    className="w-20 h-28 object-cover rounded-xl shadow-md border border-parchment-300 flex-shrink-0"
                  />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Currently Reading</span>
                    <h2 id="circle-active-heading" className="text-2xl font-serif font-bold text-slate-900 mt-0.5">
                      {activeCircle.bookTitle}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">by {activeCircle.bookAuthor}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        {activeCircle.schedule}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                  {activeCircle.description}
                </p>

                {/* Acceptance Walkthrough Highlight */}
                <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900">
                  <span className="font-bold">🎯 Demo Acceptance Test:</span> Update progress to <strong>Page 210 of 304</strong> to see the circular odometer animate smoothly to <strong>69%</strong>!
                </div>
              </div>

              {/* Circular Progress Odometer Column */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-parchment-100/70 rounded-2xl border border-parchment-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                  Your Personal Reading Odometer
                </h3>
                <CircularProgressOdometer
                  currentPage={activeCircle.userProgress.currentPage}
                  totalPages={activeCircle.userProgress.totalPages}
                  size={190}
                  strokeWidth={14}
                  showControls={true}
                  onProgressChange={handleProgressChange}
                />
              </div>
            </div>
          </section>

          {/* Chapter Discussion Forums */}
          <section aria-labelledby="chapter-forum-heading" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 id="chapter-forum-heading" className="text-2xl font-serif font-bold text-slate-900">
                  Chapter Discussion Threads
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Organized by specific chapters. Spoilers are blurred with <code className="bg-parchment-200 px-1 py-0.5 rounded text-[11px] font-mono">filter: blur(6px)</code> until clicked.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPostForm(!showPostForm)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-sm flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{showPostForm ? 'Close Form' : 'Post Chapter Thought'}</span>
              </button>
            </div>

            {/* Chapter Selection Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Chapter:</span>
              <button
                type="button"
                onClick={() => setSelectedChapterFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedChapterFilter === 'all'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-parchment-200 hover:bg-parchment-100'
                }`}
              >
                All Chapters ({filteredPosts.length})
              </button>

              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setSelectedChapterFilter(ch.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedChapterFilter === ch.id
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-parchment-200 hover:bg-parchment-100'
                  }`}
                >
                  Chapter {ch.number}
                </button>
              ))}
            </div>

            {/* New Post Form */}
            {showPostForm && (
              <form onSubmit={handlePostSubmit} className="bg-white rounded-2xl p-6 border border-amber-300 shadow-md space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-parchment-200">
                  <h3 className="font-serif font-bold text-slate-900 text-base">New Chapter Discussion Post</h3>
                  <span className="text-xs text-amber-700 font-medium">Campus Circle Forum</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="post-author" className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name
                    </label>
                    <input
                      id="post-author"
                      type="text"
                      placeholder="e.g., Campus Reader"
                      value={newAuthorName}
                      onChange={(e) => setNewAuthorName(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-parchment-300 rounded-lg text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="post-chapter" className="block text-xs font-semibold text-slate-700 mb-1">
                      Specific Chapter
                    </label>
                    <select
                      id="post-chapter"
                      value={newChapterId || chapters[0]?.id}
                      onChange={(e) => setNewChapterId(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-parchment-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      {chapters.map((ch) => (
                        <option key={ch.id} value={ch.id}>
                          Chapter {ch.number}: {ch.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="post-content" className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Thoughts or Chapter Reaction
                  </label>
                  <textarea
                    id="post-content"
                    rows={3}
                    required
                    placeholder="Discuss the themes, character choices, plot twists, or questions for the group..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-parchment-300 rounded-lg text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <input
                    id="post-spoiler-toggle"
                    type="checkbox"
                    checked={newContainsSpoilers}
                    onChange={(e) => setNewContainsSpoilers(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded border-amber-300 focus:ring-amber-500 cursor-pointer"
                  />
                  <label htmlFor="post-spoiler-toggle" className="text-xs text-slate-800 font-medium cursor-pointer">
                    ⚠️ <strong>This post contains spoilers for this chapter</strong>
                    <span className="block text-[11px] text-slate-500">
                      Applies CSS filter: blur(6px) so other members must click to reveal.
                    </span>
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPostForm(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-parchment-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post to Forum</span>
                  </button>
                </div>
              </form>
            )}

            {/* Posts Grid */}
            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-parchment-200">
                  <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">No posts for this chapter filter yet.</p>
                  <p className="text-xs text-slate-400 mt-1">Be the first to share your thoughts on this chapter!</p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <SpoilerPostCard key={post.id} post={post} />
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
};
