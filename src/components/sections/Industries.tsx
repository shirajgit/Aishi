import { industries } from '../../data/site';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

export default function Industries() {
  return (
    <section id="industries" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 100px' }}>
      <SectionHeader
        tag="Industries"
        title="Who we work with"
        titleSize="clamp(28px, 3.5vw, 44px)"
        subtitle="Small businesses, schools, clinics, and shops that are ready to run on proper software instead of spreadsheets and paper."
      />
      <Reveal delay={120} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
        {industries.map((industry) => (
          <span
            key={industry}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.03)', borderRadius: 100, padding: '10px 20px', fontSize: 13, color: 'var(--text-dim)', transition: 'border-color 0.2s, color 0.2s, background 0.2s', cursor: 'default' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(56,217,245,0.25)';
              e.currentTarget.style.color = 'var(--text)';
              e.currentTarget.style.background = 'rgba(56,217,245,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text-dim)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            }}
          >
            <span style={{ color: 'var(--cyan)', fontSize: 8 }}>◆</span>
            {industry}
          </span>
        ))}
      </Reveal>
    </section>
  );
}
