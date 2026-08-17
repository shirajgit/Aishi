import { stats } from '../../data/site';
import Reveal from '../ui/Reveal';

export default function StatsBar() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
      <Reveal>
        <div
          style={{
            borderRadius: 28,
            border: '1px solid var(--border)',
            background:
              'linear-gradient(135deg, rgba(56,217,245,0.06) 0%, rgba(8,14,31,0.9) 50%, rgba(123,140,222,0.06) 100%)',
            padding: '40px 48px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 32,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }} className="dot-bg" />
          {stats.map((s, i) => (
            <div key={i} style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 36, letterSpacing: '-0.04em', background: 'linear-gradient(135deg, #f0f4ff, rgba(240,244,255,0.6))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, letterSpacing: '0.02em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
