const Stars = ({ className }) => (
  <span className={`flex gap-0.5 ${className}`}>
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
        <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
      </svg>
    ))}
  </span>
);

const Rating = ({ value = 0, showValue = true }) => {
  const rating = Math.max(0, Math.min(5, Number(value) || 0));

  return (
    <span className="inline-flex items-center gap-1.5" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      <span className="relative inline-flex" aria-hidden="true">
        <Stars className="text-line" />
        <span className="absolute inset-0 overflow-hidden" style={{ width: `${(rating / 5) * 100}%` }}>
          <Stars className="text-ink" />
        </span>
      </span>
      {showValue && (
        <span className="text-xs tabular-nums text-muted" aria-hidden="true">
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  );
};

export default Rating;
