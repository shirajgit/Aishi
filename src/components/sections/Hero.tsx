import { lazy, Suspense, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiGlobe, FiSmartphone, FiCpu } from 'react-icons/fi';
import { site, techStack } from '../../data/site';
import StaticGlowBackground from '../three/StaticGlowBackground';

// 3D background is heavy (three.js) — load it as a separate chunk, desktop only.
const ThreeBackground = lazy(() => import('../three/ThreeBackground'));

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div style={{ borderRadius: 16, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.03)', padding: '14px 16px', backdropFilter: 'blur(12px)' }}>
    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
    <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14 }}>{value}</div>
  </div>
);

const heroCardItems = [
  { title: 'Websites & Online Stores', desc: 'Fast sites and e-commerce that bring in enquiries and sales.', icon: FiGlobe },
  { title: 'Web & Mobile Apps', desc: 'Business systems, portals, and Android / iOS apps.', icon: FiSmartphone },
  { title: 'AI, Automation & IoT', desc: 'Smart assistants, automated workflows, and IoT dashboards.', icon: FiCpu },
];

// Enable the heavy 3D background only on desktop with motion allowed. Read via
// useSyncExternalStore so it stays in sync with the media queries without a
// setState-in-effect, and renders the static fallback during SSG (server snapshot).
const desktopMotionQueries = ['(min-width: 769px)', '(prefers-reduced-motion: reduce)'];

function subscribe(onChange: () => void) {
  const mqls = desktopMotionQueries.map((q) => window.matchMedia(q));
  mqls.forEach((mql) => mql.addEventListener('change', onChange));
  return () => mqls.forEach((mql) => mql.removeEventListener('change', onChange));
}

function getUse3DSnapshot() {
  const isDesktop = window.matchMedia('(min-width: 769px)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return isDesktop && !prefersReduced;
}

export default function Hero() {
  const use3D = useSyncExternalStore(subscribe, getUse3DSnapshot, () => false);

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      {use3D ? (
        <Suspense fallback={<StaticGlowBackground />}>
          <ThreeBackground />
        </Suspense>
      ) : (
        <StaticGlowBackground />
      )}

      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

      <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,217,245,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,140,222,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '140px 24px 100px', width: '100%' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Left */}
          <div>
            <div className="anim-fade-up" style={{ marginBottom: 24 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(56,217,245,0.06)', border: '1px solid rgba(56,217,245,0.15)', borderRadius: 100, padding: '8px 16px', fontSize: 11, fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--cyan)', textTransform: 'uppercase' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)', display: 'inline-block', animation: 'pulse-border 2s ease infinite' }} />
                Available for New Projects
              </span>
            </div>

            <h1 className="section-title anim-fade-up-d1" style={{ fontSize: 'clamp(40px, 5vw, 68px)', lineHeight: 1.03, marginBottom: 24 }}>
              We build the <span className="glow-text">software, sites &amp; apps</span> your business actually runs on.
            </h1>

            <p className="anim-fade-up-d2" style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-dim)', maxWidth: 520, marginBottom: 40 }}>
              We're {site.name}. We build custom websites, web &amp; mobile apps, e-commerce stores, AI tools,
              digital marketing, and IoT systems for businesses, schools, and shops that are tired of doing
              everything by hand.
            </p>

            <div className="anim-fade-up-d3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
              <Link to="/contact" className="btn-primary">Start a Project <FiArrowRight /></Link>
              <Link to="/work" className="btn-ghost">See Our Work</Link>
            </div>

            <div className="anim-fade-up-d4" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, maxWidth: 460 }}>
              <StatCard label="Delivery" value="2–8 days" />
              <StatCard label="First call" value="Free" />
              <StatCard label="Response" value="< 24 hrs" />
            </div>

            <p className="anim-fade-up-d5" style={{ marginTop: 20, fontSize: 12, color: 'var(--text-muted)' }}>
              First consultation is free. Based in {site.location}.
            </p>
          </div>

          {/* Right - feature card */}
          <div className="anim-fade-up-d2 hero-card-hide">
            <div style={{ borderRadius: 28, border: '1px solid var(--border)', background: 'rgba(8,14,31,0.8)', padding: 28, backdropFilter: 'blur(24px)', boxShadow: '0 32px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(56,217,245,0.04)', position: 'relative', overflow: 'hidden' }}>
              <div className="scan-line" />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>AISHI Solutions</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Popular client requests</div>
                </div>
                <div style={{ background: 'rgba(56,217,245,0.1)', border: '1px solid rgba(56,217,245,0.2)', borderRadius: 100, padding: '4px 12px', fontSize: 11, color: 'var(--cyan)', fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: '0.08em' }}>
                  CUSTOM
                </div>
              </div>

              {heroCardItems.map((item, i) => (
                <div
                  key={i}
                  style={{ padding: 16, borderRadius: 16, border: '1px solid var(--border)', marginBottom: 10, background: 'rgba(255,255,255,0.02)', transition: 'border-color 0.2s, background 0.2s', cursor: 'default' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(56,217,245,0.2)';
                    e.currentTarget.style.background = 'rgba(56,217,245,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ fontSize: 20, color: 'var(--cyan)', opacity: 0.7, lineHeight: 1, marginTop: 2, display: 'inline-flex' }}><item.icon /></span>
                    <div>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 16, padding: 16, borderRadius: 16, background: 'rgba(2,5,15,0.8)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Tech Stack</div>
                <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7 }}>{techStack.join(' · ')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.4 }}>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--cyan), transparent)', animation: 'float 2s ease-in-out infinite' }} />
        <span style={{ fontSize: 10, fontFamily: 'Poppins, sans-serif', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Scroll</span>
      </div>
    </section>
  );
}
