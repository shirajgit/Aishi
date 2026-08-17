import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setMeta } from '../utils/seo';

export default function NotFoundPage() {
  useEffect(() => {
    setMeta('Page not found — Aishi Technologies', 'The page you are looking for does not exist.');
  }, []);

  return (
    <section
      style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '160px 24px 100px', position: 'relative' }}
    >
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-title glow-text" style={{ fontSize: 'clamp(80px, 18vw, 180px)', lineHeight: 1 }}>404</div>
        <h1 className="section-title" style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginTop: 16 }}>Page not found</h1>
        <p style={{ fontSize: 15, color: 'var(--text-dim)', maxWidth: 420, margin: '16px auto 32px', lineHeight: 1.75 }}>
          The page you're looking for doesn't exist or has moved. Let's get you back on track.
        </p>
        <Link to="/" className="btn-primary">← Back to Home</Link>
      </div>
    </section>
  );
}
