import { Check, X } from 'lucide-react';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function AnswerOption({
  option,
  index,
  isSelected,
  isCorrect,
  isRevealed,
  disabled,
  onClick,
}) {
  let stateClass = '';
  let badgeStyle = { color: '#475569', borderColor: '#475569', background: 'transparent' };
  let trailingIcon = null;

  if (isRevealed) {
    if (isCorrect) {
      stateClass = 'correct';
      badgeStyle = { color: '#34D399', borderColor: '#34D399', background: 'rgba(16,185,129,0.15)' };
      trailingIcon = <Check size={18} color="#34D399" strokeWidth={3} style={{ flexShrink: 0, marginLeft: 'auto' }} />;
    } else if (isSelected) {
      stateClass = 'wrong';
      badgeStyle = { color: '#F87171', borderColor: '#F87171', background: 'rgba(239,68,68,0.15)' };
      trailingIcon = <X size={18} color="#F87171" strokeWidth={3} style={{ flexShrink: 0, marginLeft: 'auto' }} />;
    } else {
      stateClass = 'dimmed';
    }
  } else if (isSelected) {
    stateClass = 'selected';
    badgeStyle = { color: '#A78BFA', borderColor: '#A78BFA', background: 'rgba(139,92,246,0.15)' };
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Option ${LETTERS[index]}: ${option}`}
      className={`answer-option stagger-item ${stateClass}`}
      style={{ marginBottom: '10px' }}
    >
      <span className="answer-badge" style={badgeStyle}>
        {LETTERS[index]}
      </span>
      <span style={{ lineHeight: 1.4, flex: 1 }}>{option}</span>
      {trailingIcon}
    </button>
  );
}
