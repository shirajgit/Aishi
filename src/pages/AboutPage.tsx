import { useEffect } from 'react';
import PageHero from '../components/ui/PageHero';
import Industries from '../components/sections/Industries';
import StatsBar from '../components/sections/StatsBar';
import ContactCTA from '../components/sections/ContactCTA';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import { site } from '../data/site';
import { setMeta } from '../utils/seo';

const values = [
  { icon: '◈', title: 'Built from scratch', desc: 'No templates and no clutter. Every site is designed around what you actually need.' },
  { icon: '◎', title: 'Made to last', desc: 'We test properly and build on a solid stack, so it keeps working after we hand it over.' },
  { icon: '◇', title: 'Straight talk', desc: 'You always know the timeline and the cost up front. We don\'t spring things on you.' },
  { icon: '⬡', title: 'Built for daily use', desc: 'Schools, clinics, shops, and growing businesses run on what we make.' },
];

export default function AboutPage() {
  useEffect(() => {
    setMeta(
      'About — Aishi Technologies',
      'Aishi Technologies helps businesses, startups, schools, and service companies grow with custom web apps, smart automation, and modern digital systems.'
    );
  }, []);

  return (
    <>
      <PageHero
        tag="About Us"
        title={<>A small team that builds <span className="glow-text">proper software</span></>}
        subtitle={`Based in ${site.location}. We help local businesses and institutes replace manual work with software that fits how they actually run.`}
      />

      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <Reveal>
            <SectionHeader
              tag="Our Story"
              title={<>Why we <span className="glow-text">started this</span></>}
              titleSize="clamp(28px, 3.5vw, 44px)"
            />
            <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.85, marginTop: 20 }}>
              We kept seeing small businesses and schools around us stuck doing everything on paper and
              spreadsheets. So we started {site.name} to fix that: custom web apps, a bit of automation,
              and IoT when it helps. Tools that save real hours, not just look nice.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.85, marginTop: 16 }}>
              We're a small team, and we like it that way. No endless meetings, no account managers you
              never wanted. You talk to the people building your project, and we're still here after it
              goes live.
            </p>
          </Reveal>

          <Reveal delay={120} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {values.map((v) => (
              <div key={v.title} className="card-glass" style={{ borderRadius: 20, padding: 24 }}>
                <div style={{ fontSize: 26, color: 'var(--cyan)', opacity: 0.6, marginBottom: 14 }}>{v.icon}</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{v.title}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.7 }}>{v.desc}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <StatsBar />
      <Industries />
      <ContactCTA />
    </>
  );
}
