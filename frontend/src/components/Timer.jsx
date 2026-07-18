import { useState, useEffect, useRef } from 'react';
import { Clock, AlarmClock } from 'lucide-react';

export default function Timer({ duration = 30, onTimeUp, questionIndex }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(duration);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(intervalRef.current); onTimeUp?.(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [questionIndex, duration, onTimeUp]);

  const isLow = timeLeft <= 5;
  const color = isLow ? '#F87171' : '#22D3EE';
  const Icon  = isLow ? AlarmClock : Clock;

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
      style={{
        background: isLow ? 'rgba(239,68,68,0.12)' : 'rgba(6,182,212,0.12)',
        borderColor: isLow ? 'rgba(239,68,68,0.4)' : 'rgba(6,182,212,0.35)',
        backdropFilter: 'blur(8px)',
        boxShadow: isLow ? '0 0 12px rgba(239,68,68,0.2)' : '0 0 12px rgba(6,182,212,0.15)',
      }}
      aria-label={`${timeLeft} seconds remaining`}
    >
      <Icon size={14} color={color} strokeWidth={2.5} />
      <span
        className="font-bold text-sm tabular-nums"
        style={{ color, minWidth: '28px' }}
      >
        {timeLeft}s
      </span>
    </div>
  );
}
