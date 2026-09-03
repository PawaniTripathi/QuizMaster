import { AlertOctagon, RefreshCw } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-5 p-10 text-center"
      style={{ minHeight: '60vh' }}
    >
      {/* Error icon */}
      <div
        className="flex items-center justify-center rounded-full border"
        style={{
          width: '96px',
          height: '96px',
          background: 'rgba(239,68,68,0.1)',
          borderColor: 'rgba(239,68,68,0.35)',
          boxShadow: '0 0 28px rgba(239,68,68,0.15)',
        }}
      >
        <AlertOctagon size={44} color="#F87171" strokeWidth={1.5} />
      </div>

      <div>
        <h2
          className="font-black mb-2.5"
          style={{
            fontSize: '1.55rem',
            color: '#F1F5F9',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Hmm, that didn't work
        </h2>
        <p
          className="text-sm leading-relaxed max-w-sm mx-auto"
          style={{ color: '#94A3B8' }}
        >
          {message || "Couldn't conjure your quiz. Give it another shot."}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          type="button"
          className="inline-flex items-center gap-2 font-bold rounded-xl px-5 py-3 text-sm border transition-all"
          style={{
            background: 'linear-gradient(135deg, #0E7490 0%, #06B6D4 100%)',
            color: 'white',
            borderColor: 'rgba(6,182,212,0.4)',
            boxShadow: '0 4px 16px rgba(6,182,212,0.25)',
            cursor: 'pointer',
          }}
        >
          <RefreshCw size={15} strokeWidth={2.5} />
          Retry
        </button>
      )}
    </div>
  );
}
