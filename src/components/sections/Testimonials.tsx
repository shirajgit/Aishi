import { FiStar } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { testimonials, type Testimonial } from '../../data/site';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

/** Initials for the avatar, e.g. "Rohan Sharma" -> "RS". */
const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="card-glass" style={{ borderRadius: 24, padding: 28, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${t.color}40, transparent)` }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <FaQuoteLeft style={{ fontSize: 22, color: t.color, opacity: 0.5 }} />
        <div style={{ display: 'flex', gap: 3 }} aria-label={`${t.rating} out of 5 stars`}>
          {Array.from({ length: t.rating }).map((_, i) => (
            <FiStar key={i} style={{ fontSize: 14, color: '#fbbf24', fill: '#fbbf24' }} aria-hidden />
          ))}
        </div>
      </div>

      <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: 24, flexGrow: 1 }}>
        “{t.quote}”
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto', paddingTop: 18, borderTop: '1px solid var(--border)' }}>
        <div
          aria-hidden
          style={{
            flexShrink: 0,
            width: 44,
            height: 44,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            fontSize: 15,
            color: '#001018',
            background: `linear-gradient(135deg, ${t.color}, #7b8cde)`,
          }}
        >
          {initials(t.name)}
        </div>
        <div>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14.5 }}>{t.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {t.role} · {t.city}
          </div>
        </div>
      </div>
    </div>
  );
}

/** "What clients say" — social-proof grid on the home page. */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 24px 100px' }}>
      <SectionHeader
        center
        tag="Testimonials"
        title={<>What our <span className="glow-text">clients say</span></>}
        subtitle="Businesses, schools, and shops across India that replaced manual work with software we built for them."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginTop: 40 }}>
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 70} style={{ height: '100%', position: 'relative' }}>
            <TestimonialCard t={t} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
