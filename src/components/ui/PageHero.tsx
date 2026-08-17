import type { ReactNode } from 'react';
import Tag from './Tag';

/** Compact hero banner shown at the top of interior pages. */
export default function PageHero({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
      <div
        style={{
          position: 'absolute',
          top: '-40%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,217,245,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '160px 24px 72px',
          textAlign: 'center',
        }}
      >
        <div className="anim-fade-up" style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <Tag>{tag}</Tag>
        </div>
        <h1
          className="section-title anim-fade-up-d1"
          style={{ fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.05, maxWidth: 800, margin: '0 auto' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="anim-fade-up-d2"
            style={{
              marginTop: 20,
              fontSize: 16,
              color: 'var(--text-dim)',
              maxWidth: 560,
              margin: '20px auto 0',
              lineHeight: 1.8,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
