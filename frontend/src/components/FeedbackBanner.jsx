import { CheckCircle2, XCircle, MinusCircle } from 'lucide-react';

export default function FeedbackBanner({ isCorrect, isSkipped, explanation }) {
  const isWrong = !isCorrect && !isSkipped;
  
  let bgClass = '';
  if (isCorrect) bgClass = 'correct';
  else if (isWrong) bgClass = 'wrong';
  else if (isSkipped) bgClass = 'skipped'; // We'll add this class to index.css or just style inline

  let Icon = XCircle;
  let iconColor = '#F87171';
  let title = 'Not quite — keep it up';
  let titleColor = '#F87171';

  if (isCorrect) {
    Icon = CheckCircle2;
    iconColor = '#34D399';
    title = 'Nailed it! ✓';
    titleColor = '#34D399';
  } else if (isSkipped) {
    Icon = MinusCircle;
    iconColor = '#94A3B8';
    title = 'Timed Out';
    titleColor = '#94A3B8';
  }

  return (
    <div
      className="feedback-strip"
      role="alert"
      style={{
        background: isCorrect ? 'rgba(16,185,129,0.12)' : isSkipped ? 'rgba(148,163,184,0.06)' : 'rgba(239,68,68,0.12)',
        border: `1px solid ${isCorrect ? 'rgba(16,185,129,0.4)' : isSkipped ? 'rgba(148,163,184,0.15)' : 'rgba(239,68,68,0.4)'}`,
      }}
    >
      <div className="shrink-0 mt-0.5">
        <Icon size={26} color={iconColor} strokeWidth={2.5} />
      </div>
      <div>
        <p
          className="font-bold text-base mb-1"
          style={{ color: titleColor }}
        >
          {title}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
          {explanation}
        </p>
      </div>
    </div>
  );
}
