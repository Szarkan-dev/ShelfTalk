import React, { useState } from 'react';
import { Eye, EyeOff, AlertTriangle, MessageSquare, Clock } from 'lucide-react';

/**
 * Spoiler-Shielded Discussion Post Card
 * Prevents spoilers for slower readers by applying CSS filter: blur(6px)
 * Reveals text upon explicit user click/tap or keyboard activation
 */
export const SpoilerPostCard = ({ post }) => {
  const [isUnblurred, setIsUnblurred] = useState(!post.containsSpoilers);

  const toggleBlur = () => {
    setIsUnblurred(prev => !prev);
  };

  const formattedDate = new Date(post.timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="bg-white rounded-xl p-5 border border-parchment-200 shadow-sm transition-all hover:shadow-md">
      {/* Post Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-sm border border-amber-300">
            {post.authorName ? post.authorName.charAt(0).toUpperCase() : 'R'}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">{post.authorName}</h4>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formattedDate}
              </span>
              <span>•</span>
              <span className="font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                {post.chapterTitle || 'Chapter Discussion'}
              </span>
            </div>
          </div>
        </div>

        {post.containsSpoilers && (
          <button
            type="button"
            onClick={toggleBlur}
            aria-label={isUnblurred ? "Hide spoiler" : "Reveal spoiler"}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border transition-all text-amber-800 bg-amber-50 border-amber-200 hover:bg-amber-100"
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

      {/* Post Content with Spoiler Shielding */}
      <div className="relative mt-2">
        <div
          onClick={post.containsSpoilers && !isUnblurred ? toggleBlur : undefined}
          onKeyDown={(e) => {
            if (post.containsSpoilers && !isUnblurred && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              toggleBlur();
            }
          }}
          tabIndex={post.containsSpoilers && !isUnblurred ? 0 : undefined}
          role={post.containsSpoilers && !isUnblurred ? "button" : undefined}
          aria-expanded={isUnblurred}
          className={`text-sm text-slate-700 leading-relaxed rounded-lg transition-all duration-300 ${
            post.containsSpoilers && !isUnblurred
              ? 'spoiler-shield cursor-pointer select-none bg-slate-100/60 p-3 rounded-lg border border-dashed border-amber-300'
              : 'spoiler-unblurred'
          }`}
          style={{
            filter: post.containsSpoilers && !isUnblurred ? 'blur(6px)' : 'none'
          }}
        >
          {post.content}
        </div>

        {/* Overlay Banner when Blurred */}
        {post.containsSpoilers && !isUnblurred && (
          <div
            onClick={toggleBlur}
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/10 backdrop-blur-[2px] rounded-lg p-4 text-center transition-opacity hover:bg-black/15"
          >
            <div className="bg-amber-50 border border-amber-300 text-amber-900 px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Chapter Spoiler Warning • Click to reveal</span>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
