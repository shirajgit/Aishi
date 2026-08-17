import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { site } from '../../data/site';

/**
 * Catch-all card for the services grid — for anything not listed.
 * Styled distinctly (dashed border) and links straight to contact.
 */
export default function AnyServiceCard() {
  return (
    <div
      style={{
        borderRadius: 24,
        padding: 28,
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        border: '1px dashed rgba(56,217,245,0.3)',
        background: 'linear-gradient(135deg, rgba(56,217,245,0.07), rgba(123,140,222,0.06))',
      }}
    >
      <div className="dot-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ fontSize: 28, color: 'var(--cyan)', opacity: 0.7, marginBottom: 20, lineHeight: 1, display: 'flex' }}><FiPlus /></div>

        <div style={{ display: 'inline-block', width: 'fit-content', background: 'rgba(56,217,245,0.1)', border: '1px solid rgba(56,217,245,0.2)', borderRadius: 100, padding: '3px 10px', fontSize: 10, fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: 14 }}>
          Anything Tech
        </div>

        <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 12, lineHeight: 1.35 }}>
          Something else in mind?
        </h3>
        <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.75 }}>
          If it's tech, we can probably build it. Websites, apps, automation, integrations, whatever your
          company needs. Tell us the idea and we'll figure out the rest.
        </p>

        <div style={{ marginTop: 'auto', paddingTop: 20 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary" style={{ fontSize: 12 }}>
              Talk to us <FiArrowRight />
            </Link>
            <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize: 12 }}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
