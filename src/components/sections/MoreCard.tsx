import { Link } from 'react-router-dom';
import { githubUser } from '../../data/site';

/**
 * Closing card for the Work grid — hints there are more projects than shown
 * and points to the full list / GitHub. `count` is the number already displayed.
 */
export default function MoreCard({ count, showAllLink }: { count: number; showAllLink?: boolean }) {
  return (
    <div
      style={{
        borderRadius: 28,
        padding: 32,
        height: '100%',
        minHeight: 200,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '1px dashed rgba(56,217,245,0.3)',
        background: 'linear-gradient(135deg, rgba(56,217,245,0.07), rgba(123,140,222,0.06))',
      }}
    >
      <div className="dot-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="glow-text"
          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 44, lineHeight: 1, letterSpacing: '-0.03em' }}
        >
          {count}+
        </div>
        <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 17, margin: '12px 0 8px' }}>
          More projects &amp; counting
        </h3>
        <p style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 22 }}>
          {count}+ projects shipped, with new ones onboarding every month. Yours could be next.
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {showAllLink ? (
            <Link to="/work" className="btn-primary" style={{ fontSize: 12 }}>
              See all work →
            </Link>
          ) : (
            <a href={`https://github.com/${githubUser}`} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: 12 }}>
              View GitHub →
            </a>
          )}
          <Link to="/contact" className="btn-ghost" style={{ fontSize: 12 }}>
            Start yours
          </Link>
        </div>
      </div>
    </div>
  );
}
