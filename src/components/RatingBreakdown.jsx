import React from 'react';
import { StarRating } from './StarRating';

/**
 * Visual 5-Star Distribution Breakdown Component
 * Displays weighted average rating and dynamic percentage bars for tiers 5 down to 1
 */
export const RatingBreakdown = ({ averageRating, totalReviews, ratingBreakdown }) => {
  const tiers = [5, 4, 3, 2, 1];

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-parchment-200 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-parchment-200">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {Number(averageRating).toFixed(1)}
            </span>
            <span className="text-lg font-medium text-slate-500">/ 5.0</span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Based on <span className="font-semibold text-slate-800">{totalReviews}</span> verified community reviews
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-1">
          <StarRating value={averageRating} readOnly size="md" />
          <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            {averageRating >= 4.5 ? '⭐ Highly Recommended' : averageRating >= 4.0 ? '👍 Well Regarded' : '📖 Fair Read'}
          </span>
        </div>
      </div>

      {/* Tier Bars */}
      <div className="space-y-3 mt-5">
        {tiers.map((star) => {
          const count = ratingBreakdown[star] || 0;
          const percentage = totalReviews > 0 ? ((count / totalReviews) * 100).toFixed(1) : 0;

          return (
            <div key={star} className="flex items-center gap-3 text-sm">
              <span className="w-12 font-medium text-slate-700 flex items-center gap-1 justify-end">
                <span>{star}</span>
                <span className="text-amber-500 text-xs">★</span>
              </span>

              {/* Progress track */}
              <div 
                className="flex-1 h-3 bg-parchment-200/80 rounded-full overflow-hidden p-0.5" 
                role="progressbar" 
                aria-valuenow={percentage} 
                aria-valuemin="0" 
                aria-valuemax="100"
                aria-label={`${star} star reviews: ${percentage}% (${count} reviews)`}
              >
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Percentage & Count */}
              <div className="w-20 text-right flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold">{percentage}%</span>
                <span className="text-slate-400">({count})</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
