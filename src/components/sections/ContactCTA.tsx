import { Link } from 'react-router-dom';
import { site } from '../../data/site';
import Tag from '../ui/Tag';
import Reveal from '../ui/Reveal';

export default function ContactCTA() {
  return (
    <section id="contact" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 100px' }}>
      <Reveal>
        <div style={{ borderRadius: 32, background: 'linear-gradient(135deg, rgba(56,217,245,0.08) 0%, rgba(8,14,31,0.95) 40%, rgba(123,140,222,0.08) 100%)', border: '1px solid var(--border)', padding: '72px 56px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,217,245,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <Tag style={{ justifyContent: 'center' }}>Get in Touch</Tag>
            <h2 className="section-title" style={{ fontSize: 'clamp(32px, 4vw, 56px)', margin: '20px auto', maxWidth: 680 }}>
              Tell us what you need,<br />
              <span className="glow-text">and we'll send back a plan.</span>
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-dim)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.75 }}>
              Send us your idea, your deadline, and a rough budget. You'll hear back within a day with how we'd build it and what it costs.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
              <Link to="/contact" className="btn-primary">Send Requirement →</Link>
              <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost">WhatsApp Chat</a>
              <Link to="/services" className="btn-ghost">View Services</Link>
            </div>

            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              We usually reply within a day. First consultation is free. Projects start from {site.pricingFrom}.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
