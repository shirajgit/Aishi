import { Link } from 'react-router-dom';
import { services } from '../../data/site';
import ServiceCard from './ServiceCard';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

const capabilities = [
  'Custom dashboards',
  'CRM & billing',
  'Booking systems',
  'Admin panels',
  'AI chatbots',
  'Payment gateways',
  'WhatsApp integration',
  'Inventory & orders',
  'Analytics & reports',
  'Role-based logins',
];

/** Services grid. `showCta` adds the "Ask Pricing" link (used on the home page). */
export default function Services({ showCta = true }: { showCta?: boolean }) {
  return (
    <section id="services" style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
        <SectionHeader
          tag="Services"
          title={<>What we can <span className="glow-text">build for you</span></>}
          subtitle="From websites to full systems. Tap any service to see exactly what's included, how we build it, and how we launch it."
        />
        {showCta && (
          <Reveal delay={100}>
            <Link to="/contact" className="btn-ghost">Ask Pricing →</Link>
          </Reveal>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 80} style={{ height: '100%' }}>
            <ServiceCard service={s} index={i} />
          </Reveal>
        ))}
      </div>

      {/* Capabilities strip */}
      <Reveal delay={120} style={{ marginTop: 40 }}>
        <div style={{ borderRadius: 24, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', padding: '28px 32px' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
            Things we build into projects
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {capabilities.map((cap) => (
              <span key={cap} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid var(--border)', borderRadius: 100, padding: '8px 16px', fontSize: 13, color: 'var(--text-dim)' }}>
                <span style={{ color: 'var(--cyan)', fontSize: 9 }}>◆</span>
                {cap}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
