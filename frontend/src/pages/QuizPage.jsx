import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizContext } from '../context/QuizContext';
import QuizCard from '../components/QuizCard';
import AnswerOption from '../components/AnswerOption';
import ProgressBar from '../components/ProgressBar';
import FeedbackBanner from '../components/FeedbackBanner';
import Sidebar from '../components/Sidebar';
import Timer from '../components/Timer';
import { ChevronRight, ChevronLeft, Trophy, Loader2, Target } from 'lucide-react';

export default function QuizPage() {
  const navigate = useNavigate();
  const {
    questions, answerKey, currentIndex, answers, highestVisitedIndex, liveScore,
    answerQuestion, nextQuestion, goToQuestion, submitAnswers,
    phase, submitting, topic, difficulty,
  } = useQuizContext();

  useEffect(() => {
    if (phase !== 'playing' && phase !== 'submitting') navigate('/', { replace: true });
  }, [phase, navigate]);

  if (!questions.length || phase === 'setup' || phase === 'generating') return null;

  const question       = questions[currentIndex];
  const selectedAnswer = answers[question.id];
  const hasAnswered    = selectedAnswer !== undefined;
  const isLastQuestion = currentIndex === questions.length - 1;
  const answerData     = answerKey?.find((q) => q.id === question.id);
  const correctIndex   = answerData?.correctIndex;
  const explanation    = answerData?.explanation;

  const handleAnswer = (idx) => { if (!hasAnswered) answerQuestion(question.id, idx); };

  const handleSkip = () => {
    if (!hasAnswered) answerQuestion(question.id, -1);
  };

  const isSkipped = selectedAnswer === -1;
  const isReviewing = currentIndex < highestVisitedIndex;
  const canGoNext = hasAnswered || isReviewing;
  const canGoPrev = currentIndex > 0;

  const handleNext = async () => {
    if (isLastQuestion) {
      if (!hasAnswered) return;
      const ok = await submitAnswers();
      if (ok) navigate('/results');
    } else if (isReviewing) {
      goToQuestion(currentIndex + 1);
    } else {
      nextQuestion();
    }
  };

  const handlePrev = () => {
    if (canGoPrev) goToQuestion(currentIndex - 1);
  };

  return (
    <div className="app-shell">
      {/* ── Sidebar ───────────────────────────────── */}
      <Sidebar
        variant="quiz"
        topic={topic}
        difficulty={difficulty}
        questions={questions}
        answerKey={answerKey}
        answers={answers}
        currentIndex={currentIndex}
        highestVisitedIndex={highestVisitedIndex}
        goToQuestion={goToQuestion}
      />

      {/* ── Main content ─────────────────────────── */}
      <div className="content-area" style={{ paddingTop: '16px', paddingRight: '40px', paddingLeft: '40px' }}>

        {/* ── Sticky progress header ─────────────── */}
        <div
          className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b"
          style={{
            padding: '12px 24px',
            background: 'rgba(8,12,24,0.92)',
            backdropFilter: 'blur(20px)',
            borderColor: 'rgba(148,163,184,0.08)',
          }}
        >
          <div style={{ flex: 1, maxWidth: '55%' }}>
            <ProgressBar current={currentIndex + 1} total={questions.length} />
          </div>

          <div className="flex items-center gap-4">
            {!hasAnswered && (
              <Timer duration={30} onTimeUp={handleSkip} questionIndex={currentIndex} />
            )}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border font-bold text-sm"
              style={{
                background: 'rgba(13,18,37,0.85)',
                borderColor: 'rgba(148,163,184,0.12)',
                color: '#F1F5F9',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Target size={16} color="#A78BFA" strokeWidth={2.5} />
              <span style={{ color: '#A78BFA' }}>{liveScore}</span>
              <span style={{ color: '#475569' }}>/ {questions.length}</span>
            </div>
          </div>
        </div>

        {/* ── Question area ─────────────────────── */}
        <main className="w-full" style={{ maxWidth: '860px', paddingTop: '12px', paddingBottom: '16px' }}>
          {/*
           * WRONG-ANSWER BUG FIX:
           * FeedbackBanner and the Continue button are rendered OUTSIDE the
           * answer options list. Previously they were siblings inside .stagger
           * which re-triggered CSS animations on all .stagger > * children
           * whenever they were added to the DOM. Now the options list is a
           * stable set of 4 items that never changes structure after render.
           */}
          <QuizCard key={question.id} question={question} questionIndex={currentIndex}>
            {/* Answer options — stable list, never re-mounts on answer */}
            <div className="flex flex-col gap-4">
              {question.options.map((option, idx) => (
                <AnswerOption
                  key={idx}
                  option={option}
                  index={idx}
                  isSelected={selectedAnswer === idx}
                  isCorrect={idx === correctIndex}
                  isRevealed={hasAnswered}
                  disabled={hasAnswered}
                  onClick={() => handleAnswer(idx)}
                />
              ))}
            </div>

            {/* Feedback — rendered outside the options list to avoid stagger re-trigger */}
            {hasAnswered && explanation != null && (
              <FeedbackBanner isCorrect={selectedAnswer === correctIndex} isSkipped={isSkipped} explanation={explanation} />
            )}

            {/* Next / Submit button */}
            {(canGoNext || canGoPrev || !hasAnswered) && (
              <div
                className="flex justify-between items-center"
                style={{ marginTop: '24px', animation: 'var(--animate-fade-up)' }}
              >
                <div className="flex gap-2">
                  {canGoPrev && (
                    <button
                      onClick={handlePrev}
                      className="flex items-center gap-2 font-bold rounded-xl border transition-all"
                      style={{
                        padding: '12px 20px',
                        fontSize: '1rem',
                        background: 'rgba(13,18,37,0.7)',
                        color: '#94A3B8',
                        borderColor: 'rgba(148,163,184,0.15)',
                        backdropFilter: 'blur(8px)',
                        cursor: 'pointer',
                      }}
                      type="button"
                    >
                      <ChevronLeft size={15} strokeWidth={2.5} /> Back
                    </button>
                  )}
                  {!hasAnswered && (
                    <button
                      onClick={handleSkip}
                      className="flex items-center gap-2 font-bold rounded-xl border transition-all"
                      style={{
                        padding: '12px 20px',
                        fontSize: '1rem',
                        background: 'rgba(13,18,37,0.5)',
                        color: '#94A3B8',
                        borderColor: 'rgba(148,163,184,0.12)',
                        backdropFilter: 'blur(8px)',
                        cursor: 'pointer',
                      }}
                      type="button"
                    >
                      Pass <ChevronRight size={15} strokeWidth={2.5} />
                    </button>
                  )}
                </div>

                <div>
                  {canGoNext && (
                    <button
                      onClick={handleNext}
                      disabled={submitting || (isLastQuestion && !hasAnswered)}
                      className="flex items-center gap-2 font-bold rounded-xl transition-all"
                      type="button"
                      id="next-question-btn"
                      style={{
                        minWidth: '172px',
                        padding: '12px 28px',
                        fontSize: '1rem',
                        background: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 55%, #A78BFA 100%)',
                        color: 'white',
                        border: '1px solid rgba(139,92,246,0.45)',
                        boxShadow: '0 4px 16px rgba(139,92,246,0.35)',
                        cursor: submitting || (isLastQuestion && !hasAnswered) ? 'not-allowed' : 'pointer',
                        opacity: submitting || (isLastQuestion && !hasAnswered) ? 0.5 : 1,
                        justifyContent: 'center',
                      }}
                    >
                      {submitting ? (
                        <><Loader2 size={15} strokeWidth={2.5} style={{ animation: 'spin-slow 1s linear infinite' }} /> Submitting…</>
                      ) : (isLastQuestion && !isReviewing) ? (
                        <><Trophy size={15} strokeWidth={2.5} /> View Results</>
                      ) : (
                        <>{isReviewing && !hasAnswered ? 'Next' : 'Continue'} <ChevronRight size={15} strokeWidth={2.5} /></>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </QuizCard>
        </main>
      </div>
    </div>
  );
}
