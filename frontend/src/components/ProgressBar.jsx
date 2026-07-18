import { Zap } from 'lucide-react';

export default function ProgressBar({ current, total }) {
  const progress = (current / total) * 100;

  return (
    <div className="flex items-center gap-4">
      {/* Bar */}
      <div className="progress-track flex-1">
        <div
          className="progress-fill"
          style={{ width: `${Math.max(progress, 2)}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
        />
      </div>

      {/* Question counter pill */}
      <div
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs border shrink-0"
        style={{
          background: 'rgba(139,92,246,0.1)',
          borderColor: 'rgba(139,92,246,0.25)',
          color: '#A78BFA',
          whiteSpace: 'nowrap',
        }}
      >
        <Zap size={11} strokeWidth={2.5} />
        {current} / {total}
      </div>
    </div>
  );
}
