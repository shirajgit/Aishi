import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import type { Service } from '../../data/site';

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="card-glass"
      style={{ borderRadius: 24, padding: 28, position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}
    >
      <div style={{ position: 'absolute', top: 20, right: 20, fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 800, color: 'rgba(56,217,245,0.25)', letterSpacing: '0.1em' }}>
        0{index + 1}
      </div>

      <div style={{ fontSize: 28, color: 'var(--cyan)', opacity: 0.6, marginBottom: 20, lineHeight: 1 }}>
        <service.icon />
      </div>

      <div style={{ display: 'inline-block', width: 'fit-content', background: 'rgba(56,217,245,0.08)', border: '1px solid rgba(56,217,245,0.15)', borderRadius: 100, padding: '3px 10px', fontSize: 10, fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: 14 }}>
        {service.tag}
      </div>

      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 12, lineHeight: 1.35 }}>{service.title}</h3>
      <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.75 }}>{service.desc}</p>

      <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>From {service.startingPrice}</span>
        <span style={{ fontSize: 12.5, fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: 'var(--cyan)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          Learn more <FiArrowRight aria-hidden />
        </span>
      </div>
    </Link>
  );
}
