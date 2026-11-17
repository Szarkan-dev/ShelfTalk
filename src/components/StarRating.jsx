import React, { useState, useRef } from 'react';

/**
 * Accessible 5-Star Rating Radiogroup Component
 * Meets WCAG 2.1 AA:
 * - role="radiogroup" and aria-label
 * - Visually hidden radio inputs (sr-only)
 * - Styled SVG star labels with hover preview
 * - Left/Down arrow decrements, Right/Up arrow increments
 * - Spacebar/Enter confirms
 * - Keyboard focus ring visible
 */
export const StarRating = ({
  value = 5,
  onChange,
  name = "star-rating",
  readOnly = false,
  size = "md",
  ariaLabel = "Book Rating"
}) => {
  const [hoverValue, setHoverValue] = useState(0);
  const containerRef = useRef(null);

  const starSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10"
  };

  const handleKeyDown = (e, starIndex) => {
    if (readOnly || !onChange) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(5, starIndex + 1);
      onChange(next);
      focusStar(next);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      const prev = Math.max(1, starIndex - 1);
      onChange(prev);
      focusStar(prev);
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange(starIndex);
    }
  };

  const focusStar = (starIndex) => {
    if (!containerRef.current) return;
    const input = containerRef.current.querySelector(`input[value="${starIndex}"]`);
    if (input) input.focus();
  };

  if (readOnly) {
    return (
      <div className="flex items-center gap-1" aria-label={`Rating: ${value} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= Math.round(value);
          return (
            <svg
              key={star}
              className={`${starSizes[size] || starSizes.md} ${
                isFilled ? 'text-amber-400 fill-amber-400' : 'text-slate-300 fill-slate-100'
              } transition-colors`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          );
        })}
      </div>
    );
  }

  const effectiveValue = hoverValue || value;

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-1.5 focus:outline-none"
      onMouseLeave={() => setHoverValue(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isSelected = star === value;
        const isHighlighted = star <= effectiveValue;
        const inputId = `${name}-star-${star}`;

        return (
          <label
            key={star}
            htmlFor={inputId}
            className="cursor-pointer group p-1 rounded-lg focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 transition-transform duration-150 hover:scale-110 active:scale-95"
            onMouseEnter={() => setHoverValue(star)}
            title={`${star} Star${star > 1 ? 's' : ''}`}
          >
            <input
              type="radio"
              id={inputId}
              name={name}
              value={star}
              checked={isSelected}
              onChange={() => onChange(star)}
              onKeyDown={(e) => handleKeyDown(e, star)}
              className="sr-only"
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
            />
            <svg
              className={`${starSizes[size] || starSizes.md} transition-all duration-150 ${
                isHighlighted
                  ? 'text-amber-400 fill-amber-400 drop-shadow-sm'
                  : 'text-slate-300 fill-transparent group-hover:text-amber-300'
              }`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </label>
        );
      })}
      <span className="ml-2 text-sm font-semibold text-amber-700 min-w-[3rem]">
        {effectiveValue} of 5
      </span>
    </div>
  );
};
