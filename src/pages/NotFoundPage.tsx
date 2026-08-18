import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Seo from '../components/ui/Seo';

export default function NotFoundPage() {
  return (
    <section
      style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '160px 24px 100px', position: 'relative' }}
    >
      <Seo
        title="Page not found — Aishi Technologies"
        description="The page you are looking for does not exist or has moved."
        path="/404"
        noindex
      />
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-title glow-text" style={{ fontSize: 'clamp(80px, 18vw, 180px)', lineHeight: 1 }}>404</div>
        <h1 className="section-title" style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginTop: 16 }}>Page not found</h1>
        <p style={{ fontSize: 15, color: 'var(--text-dim)', maxWidth: 420, margin: '16px auto 32px', lineHeight: 1.75 }}>
          The page you're looking for doesn't exist or has moved. Let's get you back on track.
        </p>
        <Link to="/" className="btn-primary"><FiArrowLeft /> Back to Home</Link>
      </div>
    </section>
  );
}
