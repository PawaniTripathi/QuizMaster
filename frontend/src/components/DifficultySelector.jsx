import { Leaf, Flame, Skull, CheckCircle2 } from 'lucide-react';

const LEVELS = [
  {
    id: 'easy',
    Icon: Leaf,
    label: 'Gentle',
    sub: 'Warm-Up',
    desc: 'Straightforward questions to ease you in',
    activeColor: '#34D399',
    activeBg: 'rgba(16,185,129,0.12)',
    cardClass: 'diff-card-easy',
  },
  {
    id: 'medium',
    Icon: Flame,
    label: 'Solid',
    sub: 'Challenge',
    desc: 'Real knowledge required — no guessing',
    activeColor: '#FCD34D',
    activeBg: 'rgba(245,158,11,0.12)',
    cardClass: 'diff-card-medium',
  },
  {
    id: 'hard',
    Icon: Skull,
    label: 'Brutal',
    sub: 'Gauntlet',
    desc: 'Expert-level — only the bold survive',
    activeColor: '#F87171',
    activeBg: 'rgba(239,68,68,0.12)',
    cardClass: 'diff-card-hard',
  },
];

export default function DifficultySelector({ value, onChange }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8', letterSpacing: '0.08em', marginBottom: '16px' }}>
        Challenge Level
      </p>

      <div className="grid grid-cols-3" style={{ gap: '12px' }} role="radiogroup" aria-label="Difficulty level">
        {LEVELS.map((level) => {
          const isActive = value === level.id;
          return (
            <button
              key={level.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(level.id)}
              className={`diff-card-${level.id} ${isActive ? 'active' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 12px',
                borderRadius: '14px',
                border: '1px solid',
                borderColor: isActive ? 'transparent' : 'rgba(148,163,184,0.12)',
                background: isActive ? level.activeBg : 'rgba(13,18,37,0.6)',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                textAlign: 'center',
              }}
            >
              {/* Active checkmark */}
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    color: level.activeColor,
                  }}
                >
                  <CheckCircle2 size={14} strokeWidth={3} />
                </span>
              )}

              {/* Icon */}
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: isActive ? level.activeBg : 'rgba(148,163,184,0.07)',
                  border: `1px solid ${isActive ? level.activeColor + '55' : 'rgba(148,163,184,0.12)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <level.Icon
                  size={20}
                  color={isActive ? level.activeColor : '#475569'}
                  strokeWidth={2.5}
                />
              </div>

              {/* Label */}
              <div>
                <p
                  style={{
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    color: isActive ? level.activeColor : '#94A3B8',
                    lineHeight: 1.1,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {level.label}
                </p>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: '0.68rem',
                    color: isActive ? level.activeColor : '#475569',
                    opacity: isActive ? 0.85 : 1,
                  }}
                >
                  {level.sub}
                </p>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.66rem',
                  color: isActive ? level.activeColor : '#475569',
                  opacity: isActive ? 0.8 : 1,
                  lineHeight: 1.35,
                  fontWeight: 500,
                }}
              >
                {level.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
