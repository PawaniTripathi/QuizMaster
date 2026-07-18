import {
  FlaskConical,
  BookMarked,
  Clapperboard,
  Code2,
  Rocket,
  Medal,
  Music,
  Smartphone,
  X,
  Search,
} from 'lucide-react';

const SUGGESTIONS = [
  { Icon: FlaskConical,  label: 'Science',  value: 'Science' },
  { Icon: BookMarked,    label: 'History',  value: 'History' },
  { Icon: Clapperboard,  label: 'Movies',   value: 'Movies' },
  { Icon: Code2,         label: 'Coding',   value: 'Coding' },
  { Icon: Rocket,        label: 'Space',    value: 'Space' },
  { Icon: Medal,         label: 'Sports',   value: 'Sports' },
  { Icon: Music,         label: 'Music',    value: 'Music' },
  { Icon: Smartphone,    label: 'Tech',     value: 'Tech' },
];

export default function TopicSelector({ value, onChange }) {
  return (
    <div>
      <label
        htmlFor="topic-input"
        className="block text-xs font-bold uppercase tracking-widest"
        style={{ color: '#94A3B8', letterSpacing: '0.08em', marginBottom: '16px' }}
      >
        What would you like to explore?
      </label>

      {/* Text input */}
      <div className="relative" style={{ marginBottom: '20px' }}>
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: '#475569' }}
        >
          <Search size={16} strokeWidth={2} />
        </div>
        <input
          type="text"
          id="topic-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Quantum Physics, History of Rome, JavaScript Fundamentals..."
          className="w-full font-medium transition-all"
          style={{
            width: '100%',
            padding: '11px 40px',
            border: '1px solid rgba(148,163,184,0.18)',
            borderRadius: '12px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: '0.9rem',
            color: '#F1F5F9',
            background: 'rgba(8,12,24,0.7)',
            outline: 'none',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
            transition: 'all 0.18s ease',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#8B5CF6';
            e.target.style.boxShadow = '0 0 0 1px rgba(139,92,246,0.3), 0 0 16px rgba(139,92,246,0.12)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(148,163,184,0.18)';
            e.target.style.boxShadow = 'none';
          }}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear topic"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full transition-colors"
            style={{ background: 'rgba(148,163,184,0.12)', color: '#475569' }}
          >
            <X size={13} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Topic suggestions">
        {SUGGESTIONS.map((s) => {
          const isActive = value === s.value;
          return (
            <button
              key={s.value}
              type="button"
              onClick={() => onChange(s.value)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all duration-150"
              style={{
                background: isActive ? 'rgba(139,92,246,0.15)' : 'rgba(148,163,184,0.06)',
                borderColor: isActive ? '#8B5CF6' : 'rgba(148,163,184,0.15)',
                color: isActive ? '#A78BFA' : '#94A3B8',
                boxShadow: isActive ? '0 0 12px rgba(139,92,246,0.25)' : 'none',
                transform: isActive ? 'translateY(-1px)' : 'none',
              }}
            >
              <s.Icon size={12} strokeWidth={2.5} />
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
