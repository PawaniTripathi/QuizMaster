import { Brain } from 'lucide-react';
import { useState, useEffect } from 'react';

const MESSAGES = [
  'Brewing your questions',
  'Consulting the AI oracle',
  'Weaving tricky distractors',
  'Calibrating difficulty',
  'Almost there',
];

export default function LoadingState({ topic }) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setMsgIndex((p) => (p + 1) % MESSAGES.length), 2500);
    return () => clearInterval(i);
  }, []);

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center gap-7 p-10"
      style={{ minHeight: '100vh' }}
    >
      {/* Animated icon stack */}
      <div className="relative" style={{ width: '96px', height: '96px' }}>
        {/* Outer spinner ring */}
        <div
          className="loading-spinner absolute inset-0 rounded-full"
          style={{
            border: '2px solid rgba(139,92,246,0.15)',
            borderTopColor: '#8B5CF6',
            boxShadow: '0 0 20px rgba(139,92,246,0.25)',
          }}
        />
        {/* Brain icon centre */}
        <div className="loading-icon-wrap absolute inset-0 flex items-center justify-center">
          <Brain size={44} color="#A78BFA" strokeWidth={1.5} />
        </div>
      </div>

      {/* Message */}
      <div className="text-center">
        <p
          className="font-bold mb-2"
          style={{
            fontSize: '1.3rem',
            color: '#F1F5F9',
            minHeight: '2rem',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {MESSAGES[msgIndex]}…
        </p>
        {topic && (
          <p className="text-base" style={{ color: '#94A3B8' }}>
            Topic:{' '}
            <span className="font-semibold" style={{ color: '#A78BFA' }}>{topic}</span>
          </p>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2">
        {MESSAGES.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === msgIndex % MESSAGES.length ? '28px' : '10px',
              height: '10px',
              borderRadius: '999px',
              background: i === msgIndex % MESSAGES.length ? '#8B5CF6' : 'rgba(148,163,184,0.2)',
              transition: 'all 0.35s ease',
              boxShadow: i === msgIndex % MESSAGES.length ? '0 0 10px rgba(139,92,246,0.5)' : 'none',
            }}
          />
        ))}
      </div>

      <p className="text-xs font-medium" style={{ color: '#475569' }}>
        Brewing your questions — usually 5–10 seconds
      </p>
    </div>
  );
}
