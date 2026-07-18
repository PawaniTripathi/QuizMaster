import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Target, Dumbbell, BookOpen, Sparkles, Star } from 'lucide-react';

function getScoreTier(score, total) {
  const pct = (score / total) * 100;
  if (pct >= 90) return { Icon: Trophy,   title: 'Flawless Victory!',      color: '#FCD34D', bg: 'rgba(245,158,11,0.15)',   border: 'rgba(245,158,11,0.45)' };
  if (pct >= 70) return { Icon: Target,   title: 'Well Played!',           color: '#34D399', bg: 'rgba(16,185,129,0.15)',   border: 'rgba(16,185,129,0.45)' };
  if (pct >= 50) return { Icon: Dumbbell, title: 'Halfway There!',         color: '#22D3EE', bg: 'rgba(6,182,212,0.15)',    border: 'rgba(6,182,212,0.45)' };
  return           { Icon: BookOpen,  title: 'Just Getting Started!', color: '#A78BFA', bg: 'rgba(139,92,246,0.15)',  border: 'rgba(139,92,246,0.45)' };
}

export default function ResultSummary({ score, total, feedbackText }) {
  const tier = getScoreTier(score, total);
  const fired = useRef(false);
  const pct = Math.round((score / total) * 100);

  useEffect(() => {
    if (score / total >= 0.7 && !fired.current) {
      fired.current = true;
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#58CC02', '#FFC800', '#1CB0F6', '#CE82FF'] });
      setTimeout(() => {
        confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0, y: 0.7 } });
        confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.7 } });
      }, 400);
    }
  }, [score, total]);

  return (
    <div className="text-center py-5" style={{ animation: 'var(--animate-bounce-in)' }}>
      {/* Score ring */}
      <div
        className="flex flex-col items-center justify-center rounded-full mx-auto gap-1"
        style={{
          width: '160px',
          height: '160px',
          background: tier.bg,
          border: `4px solid ${tier.border}`,
          boxShadow: `0 0 0 8px ${tier.bg}, 0 0 32px ${tier.border}`,
          marginBottom: '24px',
        }}
      >
        <tier.Icon size={34} color={tier.color} strokeWidth={2} />
        <span
          className="font-black leading-none"
          style={{ fontSize: '1.9rem', color: tier.color }}
        >
          {score}/{total}
        </span>
        <span
          className="font-bold text-xs"
          style={{ color: tier.color, opacity: 0.75 }}
        >
          {pct}%
        </span>
      </div>

      <h1
        className="font-black"
        style={{
          fontSize: '2rem',
          color: '#F1F5F9',
          fontFamily: "'Space Grotesk', sans-serif",
          marginBottom: '8px',
        }}
      >
        {tier.title}
      </h1>
      <p className="text-base" style={{ color: '#94A3B8', marginBottom: '24px' }}>
        You got <strong style={{ color: tier.color }}>{score}</strong> out of{' '}
        <strong style={{ color: '#F1F5F9' }}>{total}</strong> correct
      </p>
    </div>
  );
}
