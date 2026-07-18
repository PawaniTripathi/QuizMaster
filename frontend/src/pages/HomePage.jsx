import { useNavigate } from 'react-router-dom';
import { useQuizContext } from '../context/QuizContext';
import TopicSelector from '../components/TopicSelector';
import DifficultySelector from '../components/DifficultySelector';
import LoadingState from '../components/LoadingState';
import Sidebar from '../components/Sidebar';
import {
  Sparkles, Loader2, AlertTriangle, X,
  Brain, Zap, Shield, Clock,
  Minus, Plus, ArrowRight,
} from 'lucide-react';

/* ── How-It-Works step ───────────────────────────────────────────── */
function HowStep({ n, text, sub }) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full font-black text-xs text-white"
        style={{
          background: 'linear-gradient(135deg, #6D28D9, #8B5CF6)',
          boxShadow: '0 0 14px rgba(139,92,246,0.45)',
          fontFamily: "'Space Grotesk', sans-serif",
          minWidth: '32px',
        }}
      >
        {n}
      </div>
      <div style={{ paddingTop: '2px' }}>
        <p className="font-bold text-sm" style={{ color: '#F1F5F9', lineHeight: 1.4 }}>{text}</p>
        {sub && <p className="text-xs" style={{ color: '#475569', marginTop: '4px' }}>{sub}</p>}
      </div>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const {
    topic, setTopic,
    difficulty, setDifficulty,
    numQuestions, setNumQuestions,
    startQuiz, loading, error, clearError, phase,
  } = useQuizContext();

  const handleStart = async () => {
    const ok = await startQuiz();
    if (ok) navigate('/quiz');
  };

  /* ── Loading / generating state ─────────────────────────────────── */
  if (phase === 'generating') {
    return (
      <div className="app-shell">
        <Sidebar variant="loading" topic={topic} />
        <div className="content-area">
          <LoadingState topic={topic} />
        </div>
      </div>
    );
  }

  /* ── Normal setup state (no sidebar — full page) ─────────────────── */
  return (
    <div className="flex flex-col" style={{ background: '#080C18', overflow: 'hidden', height: '100dvh' }}>

      {/* ── Top navbar ──────────────────────────────────────────────── */}
      <header
        className="flex items-center justify-between border-b"
        style={{
          borderColor: 'rgba(148,163,184,0.08)',
          background: 'rgba(13,18,37,0.8)',
          backdropFilter: 'blur(20px)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          paddingTop: '22px',
          paddingBottom: '22px',
          paddingLeft: '40px',
          paddingRight: '40px',
          minHeight: '80px',
        }}
      >
        {/* Brand */}
        <div className="flex items-center gap-[14px]">
          <div
            className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
            style={{
              background: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 55%, #A78BFA 100%)',
              boxShadow: '0 4px 16px rgba(139,92,246,0.4)',
            }}
          >
            <Brain size={20} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h2
              className="font-black"
              style={{ color: '#F1F5F9', fontFamily: "'Space Grotesk', sans-serif", fontSize: '26px', lineHeight: 1 }}
            >
              QuizGenius
            </h2>
          </div>
        </div>

        {/* Nav badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full text-sm font-bold border"
          style={{
            padding: '6px 12px',
            background: 'rgba(139,92,246,0.1)',
            borderColor: 'rgba(139,92,246,0.3)',
            color: '#A78BFA',
          }}
        >
          <Zap size={12} strokeWidth={2.5} />
          Powered by Groq AI
        </div>
      </header>

      {/* ── Main body: split layout ──────────────────────────────────── */}
      <main className="flex-1 flex" style={{ minHeight: 0 }}>

        {/* ── LEFT PANEL: hero + how it works ─────────────────────── */}
        <div
          className="hidden lg:flex flex-col justify-start"
          style={{
            flex: '0 0 44%',
            padding: '32px 48px 24px 48px',
            borderRight: '1px solid rgba(148,163,184,0.07)',
            background: 'linear-gradient(145deg, rgba(109,40,217,0.06) 0%, transparent 60%)',
          }}
        >
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold self-start border"
            style={{
              background: 'rgba(13,18,37,0.7)',
              borderColor: 'rgba(148,163,184,0.12)',
              color: '#A78BFA',
              marginBottom: '16px',
            }}
          >
            <Sparkles size={12} strokeWidth={2.5} />
            New quiz in under 10 seconds
          </div>

          {/* Headline */}
          <h1
            className="font-black leading-none"
            style={{
              fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)',
              color: '#F1F5F9',
              fontFamily: "'Space Grotesk', sans-serif",
              lineHeight: 1.05,
              marginBottom: '12px',
            }}
          >
            Build Your{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 55%, #C4B5FD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Challenge.
            </span>
          </h1>

          <p
            className="text-lg font-medium leading-relaxed"
            style={{ color: '#94A3B8', maxWidth: '420px', marginBottom: '20px' }}
          >
            Pick any subject, dial in the difficulty, and let Groq AI assemble a
            fully-unique quiz — just for you.
          </p>

          {/* How it works */}
          <div
            className="rounded-2xl"
            style={{
              padding: '16px 20px',
              background: 'rgba(13,18,37,0.75)',
              border: '1px solid rgba(148,163,184,0.09)',
              backdropFilter: 'blur(12px)',
              maxWidth: '400px',
            }}
          >
            <p
              className="text-xs font-bold uppercase"
              style={{ color: '#475569', letterSpacing: '0.08em', marginBottom: '12px' }}
            >
              How it works
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <HowStep n="1" text="Enter any topic you want to be quizzed on" sub="Or pick one of the quick suggestions" />
              <HowStep n="2" text="Choose your difficulty and question count" sub="5 to 15 questions, three challenge levels" />
              <HowStep n="3" text="AI builds a fresh quiz in seconds" sub="Unique every time — no repeat questions" />
              <HowStep n="4" text="Answer, get instant feedback, and see your score" sub="With detailed explanations for every answer" />
            </div>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2" style={{ marginTop: '16px' }}>
            {[
              { Icon: Zap, text: 'Lightning Fast', color: '#FCD34D' },
              { Icon: Shield, text: 'Server-Scored', color: '#22D3EE' },
              { Icon: Clock, text: '30s Per Question', color: '#A78BFA' },
            ].map(({ Icon, text, color }) => (
              <div
                key={text}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
                style={{
                  background: 'rgba(13,18,37,0.7)',
                  borderColor: 'rgba(148,163,184,0.12)',
                  color,
                }}
              >
                <Icon size={12} strokeWidth={2.5} />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL: quiz config form ─────────────────────────── */}
        <div
          className="flex-1 flex flex-col items-center justify-start"
          style={{
            padding: '32px 40px 24px 40px',
            maxWidth: '100%',
            overflowY: 'auto',
          }}
        >
          <div className="w-full" style={{ maxWidth: '640px' }}>

            {/* Panel heading (visible on mobile only) */}
            <div className="lg:hidden mb-6">
              <h1
                className="font-black text-3xl mb-1"
                style={{ color: '#F1F5F9', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Build Your Challenge
              </h1>
              <p className="text-sm" style={{ color: '#94A3B8' }}>
                Pick a topic and let the AI do the rest.
              </p>
            </div>

            {/* Error banner */}
            {error && (
              <div
                className="flex items-start gap-4 rounded-xl border"
                style={{
                  padding: '20px',
                  marginBottom: '24px',
                  background: 'rgba(239,68,68,0.1)',
                  borderColor: 'rgba(239,68,68,0.35)',
                  backdropFilter: 'blur(8px)',
                }}
                role="alert"
              >
                <AlertTriangle size={18} color="#F87171" strokeWidth={2.5} className="shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm" style={{ color: '#F87171' }}>{error}</p>
                  <button
                    onClick={clearError}
                    type="button"
                    className="text-xs font-semibold"
                    style={{ color: '#F87171', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: '6px' }}
                  >
                    Dismiss
                  </button>
                </div>
                <button
                  onClick={clearError}
                  type="button"
                  aria-label="Dismiss error"
                  className="shrink-0 flex"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F87171' }}
                >
                  <X size={15} strokeWidth={2.5} />
                </button>
              </div>
            )}

            {/* ── Form card ─────────────────────────────────────────── */}
            <div
              className="rounded-2xl"
              style={{
                padding: '20px 20px 16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
                background: 'rgba(13,18,37,0.88)',
                border: '1px solid rgba(148,163,184,0.1)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 0 1px rgba(148,163,184,0.08), 0 8px 40px rgba(0,0,0,0.5)',
              }}
            >
              {/* Section: Topic Selector */}
              <div>
                <TopicSelector value={topic} onChange={setTopic} />
              </div>

              {/* Divider */}
              <div
                style={{
                  height: '1px',
                  margin: '16px 0',
                  background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)',
                }}
              />

              {/* Section: Difficulty */}
              <div>
                <DifficultySelector value={difficulty} onChange={setDifficulty} />
              </div>

              {/* Divider */}
              <div
                style={{
                  height: '1px',
                  margin: '16px 0',
                  background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)',
                }}
              />

              {/* ── Question count — stepper ───────────────────────── */}
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: '#94A3B8', letterSpacing: '0.08em', marginBottom: '10px' }}
                >
                  Number of Questions
                </p>
                <div className="flex items-center gap-4">
                  {/* Minus button */}
                  <button
                    type="button"
                    onClick={() => setNumQuestions(Math.max(5, numQuestions - 1))}
                    disabled={numQuestions <= 5}
                    className="flex items-center justify-center w-9 h-9 rounded-xl border font-bold text-base transition-all"
                    style={{
                      background: numQuestions <= 5 ? 'rgba(71,85,105,0.1)' : 'rgba(139,92,246,0.1)',
                      borderColor: numQuestions <= 5 ? 'rgba(148,163,184,0.12)' : 'rgba(139,92,246,0.3)',
                      color: numQuestions <= 5 ? '#475569' : '#A78BFA',
                      cursor: numQuestions <= 5 ? 'not-allowed' : 'pointer',
                      flexShrink: 0,
                    }}
                    aria-label="Decrease question count"
                  >
                    <Minus size={16} strokeWidth={2.5} />
                  </button>

                  {/* Count display */}
                  <div className="flex-1 text-center">
                    <span
                      className="font-black"
                      style={{
                        fontSize: '2.0rem',
                        lineHeight: 1,
                        color: '#A78BFA',
                        fontFamily: "'Space Grotesk', sans-serif",
                        display: 'block',
                      }}
                    >
                      {numQuestions}
                    </span>
                    <p className="text-xs font-medium" style={{ color: '#475569', marginTop: '4px' }}>
                      {numQuestions === 1 ? 'question' : 'questions'}
                    </p>
                  </div>

                  {/* Plus button */}
                  <button
                    type="button"
                    onClick={() => setNumQuestions(Math.min(15, numQuestions + 1))}
                    disabled={numQuestions >= 15}
                    className="flex items-center justify-center w-9 h-9 rounded-xl border font-bold text-base transition-all"
                    style={{
                      background: numQuestions >= 15 ? 'rgba(71,85,105,0.1)' : 'rgba(139,92,246,0.1)',
                      borderColor: numQuestions >= 15 ? 'rgba(148,163,184,0.12)' : 'rgba(139,92,246,0.3)',
                      color: numQuestions >= 15 ? '#475569' : '#A78BFA',
                      cursor: numQuestions >= 15 ? 'not-allowed' : 'pointer',
                      flexShrink: 0,
                    }}
                    aria-label="Increase question count"
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Range hint */}
                <div className="flex justify-between px-1" style={{ marginTop: '8px' }}>
                  {[5, 8, 10, 12, 15].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setNumQuestions(v)}
                      className="text-xs font-semibold transition-colors"
                      style={{ color: numQuestions === v ? '#A78BFA' : '#475569', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px' }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── CTA button ─────────────────────────────────────── */}
              <div style={{ marginTop: '16px' }}>
                <button
                  onClick={handleStart}
                  disabled={!topic.trim() || loading}
                  type="button"
                  id="start-quiz-btn"
                  className="w-full flex items-center justify-center gap-3 font-bold rounded-xl transition-all"
                  style={{
                    padding: '11px 20px',
                    fontSize: '0.95rem',
                    background: !topic.trim() || loading
                      ? 'rgba(109,40,217,0.35)'
                      : 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 55%, #A78BFA 100%)',
                    color: 'white',
                    border: '1px solid rgba(139,92,246,0.45)',
                    boxShadow: !topic.trim() || loading
                      ? 'none'
                      : '0 4px 20px rgba(139,92,246,0.4), inset 0 1px 0 rgba(255,255,255,0.12)',
                    cursor: !topic.trim() || loading ? 'not-allowed' : 'pointer',
                    opacity: !topic.trim() || loading ? 0.6 : 1,
                    letterSpacing: '0.02em',
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} strokeWidth={2.5} style={{ animation: 'spin-slow 1s linear infinite' }} />
                      Generating your quiz…
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} strokeWidth={2.5} />
                      Launch the Quiz
                      <ArrowRight size={16} strokeWidth={2.5} />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Footer note */}
            <p
              className="text-center text-xs font-medium"
              style={{ color: '#475569', marginTop: '10px' }}
            >
              Unique questions generated fresh every session
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
