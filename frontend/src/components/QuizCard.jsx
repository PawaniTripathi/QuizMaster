export default function QuizCard({ question, questionIndex, children }) {
  return (
    <div key={questionIndex} style={{ animation: 'var(--animate-slide-right)' }}>
      {/* Question number eyebrow */}
      <div className="flex items-center gap-3" style={{ marginBottom: '8px' }}>
        <div
          className="flex items-center justify-center rounded-xl font-black text-sm shrink-0"
          style={{
            width: '42px',
            height: '42px',
            background: 'linear-gradient(135deg, rgba(109,40,217,0.5) 0%, rgba(139,92,246,0.4) 100%)',
            border: '1px solid rgba(139,92,246,0.35)',
            color: '#C4B5FD',
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: '0 0 16px rgba(139,92,246,0.2)',
          }}
        >
          {questionIndex + 1}
        </div>
        <p
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: '#6D28D9', letterSpacing: '0.1em' }}
        >
          Question {questionIndex + 1}
        </p>
      </div>

      {/* Question text */}
      <h2
        className="font-bold leading-snug"
        style={{
          fontSize: '1.4rem',
          color: '#F1F5F9',
          fontFamily: "'Space Grotesk', sans-serif",
          lineHeight: 1.4,
          marginBottom: '16px',
        }}
      >
        {question.question}
      </h2>

      {children}
    </div>
  );
}
