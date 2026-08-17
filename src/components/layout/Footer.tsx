import { Link } from 'react-router-dom';
import { navItems, site } from '../../data/site';

const linkHover = {
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = 'var(--text)'),
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) =>
    (e.currentTarget.style.color = 'var(--text-muted)'),
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.25 }} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(56,217,245,0.3), transparent)',
        }}
      />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px 32px', position: 'relative', zIndex: 1 }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 0.8fr', gap: 56, marginBottom: 56 }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', marginBottom: 20 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  border: '1px solid rgba(56,217,245,0.2)',
                  background: 'rgba(56,217,245,0.08)',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <img src="/Aishi.png" alt="Aishi" style={{ borderRadius: 10, width: 30, height: 30, objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 16 }}>{site.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{site.tagline}</div>
              </div>
            </Link>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 360 }}>
              We build custom web apps, automation, and IoT systems for businesses, schools, and shops
              that are ready to stop doing everything by hand.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
              {['Custom Web Apps', 'AI Automation', 'IoT Solutions', 'Modern UI/UX'].map((item) => (
                <span key={item} style={{ fontSize: 11, border: '1px solid var(--border)', borderRadius: 8, padding: '4px 10px', color: 'var(--text-muted)' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 20 }}>
              Navigation
            </div>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{ display: 'block', fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 12, transition: 'color 0.2s' }}
                {...linkHover}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Connect */}
          <div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 20 }}>
              Connect
            </div>
            <a href={`mailto:${site.email}`} style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 12, transition: 'color 0.2s' }} {...linkHover}>
              {site.email}
            </a>
            <a href={site.whatsapp} target="_blank" rel="noreferrer" style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 20, transition: 'color 0.2s' }} {...linkHover}>
              WhatsApp →
            </a>
            <div style={{ borderRadius: 16, border: '1px solid var(--border)', background: 'rgba(2,5,15,0.6)', padding: 16 }}>
              <div style={{ fontSize: 10, fontFamily: 'Poppins, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>
                Reply Time
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80', display: 'inline-block', animation: 'blink 2s ease infinite' }} />
                {site.replyTime}
              </div>
            </div>
          </div>
        </div>

        <div className="divider" style={{ marginBottom: 24 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>© {year} {site.name}. All rights reserved.</p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Designed &amp; Developed by{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--cyan), var(--indigo))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 700 }}>
              Aishi Tech
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
