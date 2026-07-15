interface ProgressBarProps {
  current: number; // 0-indexed
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="w-full h-1 bg-line rounded-full overflow-hidden">
      <div
        className="h-full bg-gold transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={total}
      />
    </div>
  );
}
