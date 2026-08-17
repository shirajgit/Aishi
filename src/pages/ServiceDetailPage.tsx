import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';
import PageHero from '../components/ui/PageHero';
import ContactCTA from '../components/sections/ContactCTA';
import Reveal from '../components/ui/Reveal';
import Tag from '../components/ui/Tag';
import { getService, services, site, offer } from '../data/site';
import { setMeta } from '../utils/seo';

function StepList({ title, steps }: { title: string; steps: { title: string; desc: string }[] }) {
  return (
    <Reveal style={{ marginTop: 48 }}>
      <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3vw, 32px)', marginBottom: 24 }}>{title}</h2>
      <div style={{ display: 'grid', gap: 14 }}>
        {steps.map((s, i) => (
          <div key={s.title} style={{ display: 'flex', gap: 18, padding: '20px 22px', borderRadius: 18, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ flexShrink: 0, fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 20, color: 'rgba(56,217,245,0.4)' }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.7 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getService(slug) : undefined;

  useEffect(() => {
    if (service) {
      setMeta(`${service.title} — Aishi Technologies`, service.intro.slice(0, 155));
    }
  }, [service]);

  if (!service) {
    return (
      <section style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: '160px 24px' }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 32, marginBottom: 16 }}>Service not found</h1>
          <Link to="/services" className="btn-primary"><FiArrowLeft /> Back to Services</Link>
        </div>
      </section>
    );
  }

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero tag={service.tag} title={service.title} subtitle={service.intro} />

      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 24px 40px' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 0.9fr', gap: 40, alignItems: 'start' }}>
          {/* Main */}
          <div>
            {/* What's included */}
            <Reveal>
              <Tag>What you get</Tag>
              <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3vw, 32px)', margin: '14px 0 24px' }}>
                What's included
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                {service.includes.map((item) => (
                  <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '14px 16px', borderRadius: 14, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
                    <FiCheck style={{ color: 'var(--cyan)', fontSize: 14, marginTop: 1, flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <StepList title="How we make it" steps={service.build} />
            <StepList title="How we launch it" steps={service.launch} />

            {/* Tech */}
            <Reveal style={{ marginTop: 48 }}>
              <Tag>Tech we use</Tag>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                {service.tech.map((t) => (
                  <span key={t} style={{ fontSize: 13, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.03)', borderRadius: 100, padding: '8px 16px', color: 'var(--text-dim)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <Reveal delay={100}>
            <div style={{ position: 'sticky', top: 100, borderRadius: 24, border: '1px solid var(--border)', background: 'rgba(8,14,31,0.7)', backdropFilter: 'blur(20px)', padding: 28 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Starting from</span>
                    {offer.active && (
                      <span style={{ fontSize: 10, fontFamily: 'Poppins, sans-serif', fontWeight: 800, letterSpacing: '0.06em', color: '#001018', background: 'linear-gradient(135deg, #38d9f5, #7b8cde)', borderRadius: 100, padding: '2px 8px' }}>
                        {offer.percent}% OFF
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                    <span className="glow-text" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 30 }}>{service.startingPrice}</span>
                    {offer.active && (
                      <s style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, color: 'var(--text-muted)', opacity: 0.7 }}>{service.oldPrice}</s>
                    )}
                  </div>
                  {offer.active && (
                    <div style={{ fontSize: 11.5, color: 'var(--cyan)', marginTop: 6 }}>{offer.note}</div>
                  )}
                </div>
                <div style={{ height: 1, background: 'var(--border)' }} />
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Typical timeline</div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{service.timeline}</div>
                </div>
                <div style={{ height: 1, background: 'var(--border)' }} />
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Ideal for</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {service.idealFor.map((f) => (
                      <span key={f} style={{ fontSize: 12, border: '1px solid var(--border)', borderRadius: 8, padding: '4px 10px', color: 'var(--text-muted)' }}>{f}</span>
                    ))}
                  </div>
                </div>
                <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
                  Start this project <FiArrowRight />
                </Link>
                <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other services */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px 40px' }}>
        <Reveal>
          <h2 className="section-title" style={{ fontSize: 'clamp(22px, 2.5vw, 28px)', marginBottom: 24 }}>Other services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {others.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="card-glass" style={{ borderRadius: 20, padding: 24, textDecoration: 'none', color: 'inherit' }}>
                <div style={{ fontSize: 24, color: 'var(--cyan)', opacity: 0.6, marginBottom: 12, display: 'flex' }}><s.icon /></div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.65, marginBottom: 12 }}>{s.desc}</div>
                <span style={{ fontSize: 12.5, fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: 'var(--cyan)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>Learn more <FiArrowRight /></span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <ContactCTA />
    </>
  );
}
