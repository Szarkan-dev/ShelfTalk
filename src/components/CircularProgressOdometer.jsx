import React, { useEffect, useState } from 'react';

/**
 * Reading Circle Progress Odometer
 * Computes exact completion percentage:
 * Completion = min(100, (currentPage / totalPages) * 100)
 * Animates SVG circular completion ring smoothly to the target percentage
 */
export const CircularProgressOdometer = ({
  currentPage = 0,
  totalPages = 100,
  size = 180,
  strokeWidth = 14,
  label = "Reading Progress",
  showControls = false,
  onProgressChange = null
}) => {
  const [animatedOffset, setAnimatedOffset] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const validCurrent = Math.max(0, parseInt(currentPage, 10) || 0);
  const validTotal = Math.max(1, parseInt(totalPages, 10) || 1);
  const rawPercentage = (validCurrent / validTotal) * 100;
  const percentage = Math.min(100, Math.max(0, Math.round(rawPercentage)));

  const targetOffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    // Small timeout ensures initial render triggers the CSS animation transition
    const timer = setTimeout(() => {
      setAnimatedOffset(targetOffset);
    }, 50);
    return () => clearTimeout(timer);
  }, [targetOffset]);

  const [inputPage, setInputPage] = useState(validCurrent);

  useEffect(() => {
    setInputPage(validCurrent);
  }, [validCurrent]);

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (onProgressChange) {
      onProgressChange(inputPage, validTotal);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative flex items-center justify-center"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={`${label}: ${percentage}% completed (${validCurrent} of ${validTotal} pages)`}
      >
        <svg
          width={size}
          height={size}
          className="transform -rotate-90 drop-shadow-sm"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F1E9D7"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="transition-colors"
          />

          {/* Foreground animated completion ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={animatedOffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />

          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            {percentage}%
          </span>
          <span className="text-xs uppercase tracking-wider font-semibold text-amber-700 mt-0.5">
            {percentage === 100 ? "Finished! 🎉" : "Completed"}
          </span>
          <span className="text-xs text-slate-500 font-medium mt-1">
            Page {validCurrent} of {validTotal}
          </span>
        </div>
      </div>

      {/* Optional Interactive Quick-Updater */}
      {showControls && onProgressChange && (
        <form onSubmit={handleInputSubmit} className="mt-4 flex items-center gap-2">
          <label htmlFor="odometer-page-input" className="sr-only">Update Current Page</label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">Pg</span>
            <input
              id="odometer-page-input"
              type="number"
              min="0"
              max={validTotal}
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              className="w-24 pl-8 pr-2 py-1.5 text-sm bg-white border border-parchment-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
          <span className="text-xs text-slate-500">/ {validTotal}</span>
          <button
            type="submit"
            className="px-3 py-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors shadow-sm focus:ring-2 focus:ring-amber-500 focus:ring-offset-1"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
};
