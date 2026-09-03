/**
 * Shared Sidebar — used on every page/state so the sidebar structure
 * is identical across home, loading, quiz, and results screens.
 *
 * Props:
 *   variant: 'home' | 'quiz' | 'results'
 *   topic, difficulty, numQuestions — quiz metadata
 *   questions, answers, currentIndex — quiz progress (variant=quiz)
 *   score, total — result data (variant=results)
 *   onNewTopic, onRetry, retryLoading — result actions (variant=results)
 */

import { useNavigate } from 'react-router-dom';
import { useQuizContext } from '../context/QuizContext';

import {
  Brain,
  Infinity as InfinityIcon,
  Bot,
  List,
  CheckCircle2,
  XCircle,
  Circle,
  CircleDashed,
  Dot,
  Leaf,
  Flame,
  Skull,
  Trophy,
  Home,
  RefreshCw,
  BookOpen,
  Layers,
  Hash,
  RotateCcw,
} from 'lucide-react';

/* ── Brand header (always visible) ───────────────────────────────────── */
function SidebarBrand() {
  const navigate = useNavigate();
  const { resetQuiz } = useQuizContext();

  return (
    <button
      onClick={() => { resetQuiz(); navigate('/'); }}
      className="flex items-center gap-3 w-full text-left"
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '24px' }}
      aria-label="Go to Home"
    >
      <div
        className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
        style={{
          background: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 55%, #A78BFA 100%)',
          boxShadow: '0 4px 16px rgba(139,92,246,0.4)',
        }}
      >
        <Brain size={22} color="white" strokeWidth={2.5} />
      </div>
      <div>
        <h2
          className="font-black"
          style={{ color: '#F1F5F9', fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', lineHeight: 1 }}
        >
          QuizGenius
        </h2>
      </div>
    </button>
  );
}

/* ── Difficulty badge ─────────────────────────────────────────────────── */
function DifficultyBadge({ level }) {
  const map = {
    easy:   { Icon: Leaf,  color: '#34D399', bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.4)',  label: 'Easy' },
    medium: { Icon: Flame, color: '#FCD34D', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.35)', label: 'Medium' },
    hard:   { Icon: Skull, color: '#F87171', bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.4)',   label: 'Hard' },
  };
  const d = map[level] || map.medium;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs border"
      style={{ background: d.bg, color: d.color, borderColor: d.border }}
    >
      <d.Icon size={12} strokeWidth={2.5} />
      {d.label}
    </span>
  );
}

/* ── Info row (results sidebar) ───────────────────────────────────────── */
function InfoRow({ label, value, highlight }) {
  return (
    <div className="pb-2.5" style={{ borderBottom: '1px solid rgba(148,163,184,0.1)' }}>
      <p className="text-xs font-bold uppercase mb-0.5" style={{ color: '#475569', letterSpacing: '0.06em' }}>
        {label}
      </p>
      <p className="font-bold text-sm capitalize" style={{ color: highlight ? '#A78BFA' : '#F1F5F9' }}>
        {value}
      </p>
    </div>
  );
}

/* ── Divider ──────────────────────────────────────────────────────────── */
function SidebarDivider() {
  return (
    <div
      style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)', marginBottom: '24px' }}
    />
  );
}

/* ── Section label ────────────────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <p
      className="text-xs font-bold uppercase"
      style={{ color: '#475569', letterSpacing: '0.07em', marginBottom: '10px' }}
    >
      {children}
    </p>
  );
}

/* ── Stat card ─────────────────────────────────────────────────────────── */
function StatCard({ icon: Icon, iconColor, iconBg, label, value }) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl p-3 border"
      style={{
        background: 'rgba(13,18,37,0.6)',
        borderColor: 'rgba(148,163,184,0.08)',
      }}
    >
      <div
        className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
        style={{ background: iconBg }}
      >
        <Icon size={16} color={iconColor} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-xs font-bold uppercase" style={{ color: '#475569', letterSpacing: '0.05em' }}>
          {label}
        </p>
        <p className="text-sm font-bold mt-0.5" style={{ color: '#F1F5F9' }}>{value}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/* Main Sidebar export                                                    */
/* ══════════════════════════════════════════════════════════════════════ */
export default function Sidebar({
  variant = 'home',
  topic,
  difficulty,
  numQuestions,
  questions = [],
  answerKey = [],
  answers = {},
  currentIndex = 0,
  highestVisitedIndex = 0,
  score,
  total,
  onNewTopic,
  onRetry,
  retryLoading,
  goToQuestion,
}) {
  /* ── HOME variant ─────────────────────────────────────────────────── */
  if (variant === 'home') {
    return (
      <aside className="sidebar">
        <SidebarBrand />

        <p className="text-sm font-medium mb-5 leading-relaxed" style={{ color: '#94A3B8' }}>
          Any subject, any depth — your quiz, built by AI in seconds.
        </p>

        <SidebarDivider />

        <div className="flex-1 flex flex-col gap-2.5">
          <StatCard
            icon={InfinityIcon}
            iconColor="#22D3EE"
            iconBg="rgba(6,182,212,0.15)"
            label="Topics Available"
            value="Unlimited"
          />
          <StatCard
            icon={Bot}
            iconColor="#A78BFA"
            iconBg="rgba(139,92,246,0.15)"
            label="Powered by"
            value="Groq AI"
          />
          <StatCard
            icon={List}
            iconColor="#34D399"
            iconBg="rgba(16,185,129,0.15)"
            label="Questions per Quiz"
            value="5 – 15"
          />
          <StatCard
            icon={Layers}
            iconColor="#FCD34D"
            iconBg="rgba(245,158,11,0.15)"
            label="Difficulty Modes"
            value="Easy · Medium · Hard"
          />
        </div>
      </aside>
    );
  }

  /* ── QUIZ variant ─────────────────────────────────────────────────── */
  if (variant === 'quiz') {
    return (
      <aside className="sidebar">
        <SidebarBrand />

        {/* Topic */}
        <div style={{ marginBottom: '24px' }}>
          <SectionLabel>Topic</SectionLabel>
          <p className="font-bold text-sm leading-snug" style={{ color: '#F1F5F9' }}>{topic}</p>
        </div>

        {/* Level */}
        <div style={{ marginBottom: '24px' }}>
          <SectionLabel>Level</SectionLabel>
          <DifficultyBadge level={difficulty} />
        </div>

        <SidebarDivider />

        {/* Question map — compact grid */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div style={{ marginBottom: '24px' }}>
            <SectionLabel>Question Map</SectionLabel>
            <div className="grid grid-cols-4 gap-2">
              {questions.map((q, i) => {
                const isDone    = answers[q.id] !== undefined;
                const isCurrent = i === currentIndex;
                const isVisited = i <= highestVisitedIndex;

                let bg = 'rgba(148,163,184,0.07)';
                let border = 'rgba(148,163,184,0.12)';
                let color = '#475569';
                let icon = null;

                if (isDone) {
                  const isCorrect = answerKey.find(k => k.id === q.id)?.correctIndex === answers[q.id];
                  bg = isCorrect ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)';
                  border = isCorrect ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)';
                  color = isCorrect ? '#34D399' : '#F87171';
                } else if (isCurrent) {
                  bg = 'rgba(139,92,246,0.2)';
                  border = 'rgba(139,92,246,0.5)';
                  color = '#A78BFA';
                } else if (isVisited) {
                  bg = 'rgba(148,163,184,0.07)';
                  border = 'rgba(148,163,184,0.2)';
                  color = '#94A3B8';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => { if (isVisited && goToQuestion) goToQuestion(i); }}
                    disabled={!isVisited}
                    className="flex items-center justify-center rounded-lg font-bold text-xs transition-all"
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      background: bg,
                      border: `1px solid ${border}`,
                      color,
                      cursor: isVisited ? 'pointer' : 'default',
                      opacity: isVisited ? 1 : 0.35,
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.78rem',
                    }}
                    aria-label={`Go to question ${i + 1}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-[10px]" style={{ marginBottom: '24px' }}>
            {[
              { color: '#34D399', border: 'rgba(16,185,129,0.4)', label: 'Correct' },
              { color: '#F87171', border: 'rgba(239,68,68,0.4)', label: 'Wrong' },
              { color: '#A78BFA', border: 'rgba(139,92,246,0.5)', label: 'Current' },
            ].map(({ color, border, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm border"
                  style={{ background: color + '22', borderColor: border }}
                />
                <span className="text-xs font-medium" style={{ color: '#475569' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  /* ── RESULTS variant ──────────────────────────────────────────────── */
  if (variant === 'results') {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <aside className="sidebar">
        <SidebarBrand />

        {/* Score highlight */}
        <div
          className="rounded-xl p-4 text-center border"
          style={{
            background: 'rgba(139,92,246,0.1)',
            borderColor: 'rgba(139,92,246,0.25)',
            marginBottom: '24px',
          }}
        >
          <p className="text-xs font-bold uppercase mb-1" style={{ color: '#475569', letterSpacing: '0.07em' }}>
            Final Score
          </p>
          <p
            className="font-black"
            style={{ fontSize: '2.2rem', color: '#A78BFA', lineHeight: 1, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {score}/{total}
          </p>
          <p className="text-sm font-bold mt-1" style={{ color: '#6D28D9' }}>
            {pct}%
          </p>
        </div>

        <div className="flex flex-col gap-[24px]" style={{ marginBottom: '24px' }}>
          <InfoRow label="Topic" value={topic} />
          <InfoRow label="Difficulty" value={difficulty} />
          <InfoRow label="Questions" value={`${total} total`} />
        </div>

        <SidebarDivider />

        <div className="mt-auto flex flex-col gap-[24px]">
          <button
            onClick={onNewTopic}
            type="button"
            id="new-topic-btn"
            className="w-full flex items-center justify-center gap-2 font-bold rounded-xl transition-all"
            style={{
              padding: '12px 20px',
              fontSize: '1rem',
              background: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 55%, #A78BFA 100%)',
              color: 'white',
              border: '1px solid rgba(139,92,246,0.45)',
              boxShadow: '0 4px 16px rgba(139,92,246,0.35)',
              cursor: 'pointer',
            }}
          >
            <Home size={15} strokeWidth={2.5} />
            Try Another Topic
          </button>
          <button
            onClick={onRetry}
            disabled={retryLoading}
            type="button"
            id="retry-btn"
            className="w-full flex items-center justify-center gap-2 font-bold rounded-xl transition-all border"
            style={{
              padding: '12px 20px',
              fontSize: '1rem',
              background: 'transparent',
              color: '#A78BFA',
              borderColor: 'rgba(139,92,246,0.3)',
              cursor: retryLoading ? 'not-allowed' : 'pointer',
              opacity: retryLoading ? 0.5 : 1,
            }}
          >
            <RotateCcw size={15} strokeWidth={2.5} />
            Go Again
          </button>
        </div>
      </aside>
    );
  }

  /* ── LOADING / default variant ──────────────────────────────────── */
  return (
    <aside className="sidebar">
      <SidebarBrand />

      {topic && (
        <div className="mb-4">
          <SectionLabel>Generating quiz for</SectionLabel>
          <p className="font-bold text-sm mb-3" style={{ color: '#F1F5F9' }}>{topic}</p>
          {difficulty && (
            <>
              <SectionLabel>Level</SectionLabel>
              <DifficultyBadge level={difficulty} />
            </>
          )}
        </div>
      )}

      <SidebarDivider />

      <div className="flex-1 flex flex-col gap-2.5">
        <StatCard
          icon={InfinityIcon}
          iconColor="#22D3EE"
          iconBg="rgba(6,182,212,0.15)"
          label="Topics Available"
          value="Unlimited"
        />
        <StatCard
          icon={Bot}
          iconColor="#A78BFA"
          iconBg="rgba(139,92,246,0.15)"
          label="Powered by"
          value="Groq AI"
        />
        <StatCard
          icon={List}
          iconColor="#34D399"
          iconBg="rgba(16,185,129,0.15)"
          label="Questions per Quiz"
          value={numQuestions ? numQuestions.toString() : "5 – 15"}
        />
      </div>
    </aside>
  );
}
