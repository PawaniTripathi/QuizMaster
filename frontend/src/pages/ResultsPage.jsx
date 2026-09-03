import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizContext } from '../context/QuizContext';
import ResultSummary from '../components/ResultSummary';
import LoadingState from '../components/LoadingState';
import Sidebar from '../components/Sidebar';
import { CheckCircle2, XCircle, Lightbulb, MinusCircle } from 'lucide-react';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function ResultsPage() {
  const navigate = useNavigate();
  const { score, total, results, topic, difficulty, resetQuiz, retryTopic, phase, loading, feedbackText } = useQuizContext();

  useEffect(() => {
    if (phase !== 'results' && phase !== 'generating') navigate('/', { replace: true });
  }, [phase, navigate]);

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

  if (phase !== 'results' || !results) return null;

  const handleNewTopic = () => { resetQuiz(); navigate('/'); };
  const handleRetry    = async () => { const ok = await retryTopic(); if (ok) navigate('/quiz'); };

  return (
    <div className="app-shell">
      {/* ── Sidebar ───────────────────────────────── */}
      <Sidebar
        variant="results"
        topic={topic}
        difficulty={difficulty}
        score={score}
        total={total}
        onNewTopic={handleNewTopic}
        onRetry={handleRetry}
        retryLoading={loading}
      />

      {/* ── Main content ─────────────────────────── */}
      <div className="content-area">
        <main className="w-full" style={{ padding: '32px 48px', overflowY: 'auto' }}>

          {/* Score summary */}
          <ResultSummary score={score} total={total} feedbackText={feedbackText} />

          {/* Divider */}
          <div
            style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)', marginTop: '16px', marginBottom: '24px' }}
          />

          {/* Section heading */}
          <div className="flex items-center gap-3" style={{ marginBottom: '24px' }}>
            <h2
              className="font-black text-xl"
              style={{ color: '#F1F5F9', fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Your Answer Log
            </h2>
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border"
              style={{
                background: 'rgba(139,92,246,0.1)',
                borderColor: 'rgba(139,92,246,0.25)',
                color: '#A78BFA',
              }}
            >
              {results.length} questions
            </span>
          </div>

          {/* Question breakdown — single column cards */}
          <div className="flex flex-col gap-[32px]" style={{ minWidth: 0 }}>
            {results.map((r, idx) => (
              <article
                key={r.id}
                className="rounded-2xl overflow-hidden border"
                style={{
                  borderColor: r.isCorrect ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)',
                  background: 'rgba(13,18,37,0.85)',
                  backdropFilter: 'blur(16px)',
                  animation: 'var(--animate-fade-up)',
                  animationDelay: `${idx * 0.05}s`,
                  animationFillMode: 'both',
                  opacity: 0,
                  minWidth: 0,
                }}
              >
                {/* Top accent stripe */}
                <div
                  className="h-0.5 w-full"
                  style={{
                    background: r.isCorrect
                      ? 'linear-gradient(90deg, #10B981, transparent)'
                      : 'linear-gradient(90deg, #EF4444, transparent)',
                  }}
                />

                <div style={{ padding: '20px 24px' }}>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4" style={{ marginBottom: '20px' }}>
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Question number badge */}
                      <div
                        className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg font-black text-xs mt-0.5"
                        style={{
                          background: r.isCorrect ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.12)',
                          color: r.isCorrect ? '#34D399' : '#F87171',
                          fontFamily: 'monospace',
                          border: `1px solid ${r.isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                        }}
                      >
                        {idx + 1}
                      </div>
                      <h3
                        className="font-semibold text-sm leading-relaxed"
                        style={{ color: '#F1F5F9', flex: 1, wordBreak: 'break-word', overflowWrap: 'break-word', minWidth: 0 }}
                      >
                        {r.question}
                      </h3>
                    </div>

                    {/* Status badge */}
                    <span
                      className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-xs border"
                      style={{
                        background: r.isCorrect ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                        color: r.isCorrect ? '#34D399' : '#F87171',
                        borderColor: r.isCorrect ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)',
                      }}
                    >
                      {r.isCorrect
                        ? <><CheckCircle2 size={12} strokeWidth={2.5} /> Right</>
                        : r.selectedIndex === -1
                          ? <><MinusCircle size={12} strokeWidth={2.5} /> Skipped</>
                          : <><XCircle size={12} strokeWidth={2.5} /> Missed</>}
                    </span>
                  </div>

                  {/* Options — 2x2 grid */}
                  <div className="grid grid-cols-2 gap-2" style={{ marginBottom: '16px' }}>
                    {r.options.map((opt, oi) => {
                      const isRight    = oi === r.correctIndex;
                      const isUserPick = oi === r.selectedIndex;
                      const isWrong    = isUserPick && !r.isCorrect;

                      let bg     = 'transparent';
                      let color  = '#475569';
                      let border = '1px solid rgba(148,163,184,0.1)';

                      if (isRight)  { bg = 'rgba(16,185,129,0.1)'; color = '#34D399'; border = '1px solid rgba(16,185,129,0.35)'; }
                      if (isWrong)  { bg = 'rgba(239,68,68,0.1)';  color = '#F87171'; border = '1px solid rgba(239,68,68,0.35)'; }

                      return (
                        <div
                          key={oi}
                          className="flex items-center gap-2.5 rounded-xl text-xs font-medium min-w-0"
                          style={{ padding: '16px 20px', background: bg, border, color, minWidth: 0 }}
                        >
                          <span
                            className="flex items-center justify-center rounded font-black text-xs shrink-0"
                            style={{
                              width: '20px',
                              height: '20px',
                              background: isRight ? '#10B981' : isWrong ? '#EF4444' : 'rgba(148,163,184,0.1)',
                              color: isRight || isWrong ? 'white' : '#475569',
                              borderRadius: '4px',
                            }}
                          >
                            {LETTERS[oi]}
                          </span>
                          <span
                            className="flex-1 leading-snug"
                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word', minWidth: 0 }}
                          >
                            {opt}
                            {isRight && <CheckCircle2 size={11} color="#34D399" strokeWidth={3} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />}
                            {isWrong && <XCircle size={11} color="#F87171" strokeWidth={3} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div
                    className="flex items-start gap-2.5 rounded-xl text-xs leading-relaxed"
                    style={{
                      padding: '10px 14px',
                      background: 'rgba(139,92,246,0.07)',
                      border: '1px solid rgba(139,92,246,0.18)',
                      color: '#94A3B8',
                    }}
                  >
                    <Lightbulb size={14} color="#FCD34D" strokeWidth={2.5} className="shrink-0 mt-0.5" />
                    <span>{r.explanation}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
