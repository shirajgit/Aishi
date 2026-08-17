import { processSteps } from '../../data/site';
import Tag from '../ui/Tag';
import Reveal from '../ui/Reveal';

export default function Process() {
  return (
    <section id="process" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 100px' }}>
      <Reveal>
        <div style={{ borderRadius: 32, border: '1px solid var(--border)', background: 'var(--surface)', padding: '56px 48px', position: 'relative', overflow: 'hidden' }}>
          <div className="dot-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Tag>How We Work</Tag>
            <h2 className="section-title" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', margin: '16px 0 12px' }}>How we work</h2>
            <p style={{ fontSize: 15, color: 'var(--text-dim)', maxWidth: 560, lineHeight: 1.75, marginBottom: 44 }}>
              Whether it is a web app, an AI assistant, a school system, or an IoT setup, every project
              runs through the same six steps. You always know where things stand and never have to chase
              us for an update.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {processSteps.map((step, i) => (
                <Reveal key={step.n} delay={i * 60} style={{ height: '100%' }}>
                  <div
                    style={{ padding: 26, borderRadius: 20, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', position: 'relative', height: '100%', transition: 'border-color 0.2s, background 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(56,217,245,0.2)';
                      e.currentTarget.style.background = 'rgba(56,217,245,0.04)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <span style={{ fontSize: 24, color: 'var(--cyan)', opacity: 0.55 }}>{step.icon}</span>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: '0.14em', color: 'rgba(56,217,245,0.35)' }}>
                        {step.n}
                      </span>
                    </div>

                    <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{step.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 16 }}>{step.desc}</div>

                    <ul style={{ listStyle: 'none', display: 'grid', gap: 8, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                      {step.points.map((p) => (
                        <li key={p} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.55 }}>
                          <span style={{ color: 'var(--cyan)', fontSize: 10, marginTop: 3, flexShrink: 0 }}>✓</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Promise strip */}
            <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['Fixed price, no surprises', 'Updates at every step', 'You own everything', 'Support after launch'].map((item) => (
                <span
                  key={item}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', borderRadius: 100, padding: '9px 16px', fontSize: 12.5, color: 'var(--text-dim)' }}
                >
                  <span style={{ color: 'var(--cyan)', fontSize: 9 }}>◆</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
