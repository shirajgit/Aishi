import { FiMail, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import PageHero from '../components/ui/PageHero';
import ContactForm from '../components/sections/ContactForm';
import Reveal from '../components/ui/Reveal';
import Seo from '../components/ui/Seo';
import { site } from '../data/site';
import { breadcrumbLd } from '../utils/schema';

const methods = [
  { icon: FiMail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: FaWhatsapp, label: 'WhatsApp', value: 'Chat with us', href: site.whatsapp },
  { icon: FaInstagram, label: 'Instagram', value: '@aishitech', href: site.instagram },
  { icon: FiMapPin, label: 'Location', value: site.location, href: null },
];

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact — Aishi Technologies"
        description="Tell us your requirement, deadline, and budget. We'll reply within 24 hours with scope, timeline, and the best approach."
        path="/contact"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <PageHero
        tag="Get in Touch"
        title={<>Let's talk about <span className="glow-text">what you need</span></>}
        subtitle="Tell us your idea and a rough budget. We usually reply within a day."
      />

      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 24px 100px' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 40, alignItems: 'start' }}>
          {/* Left — contact methods */}
          <Reveal>
            <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3vw, 34px)', marginBottom: 16 }}>
              Reach us
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: 32, maxWidth: 380 }}>
              Prefer to message us directly? Pick whichever works for you. Or fill in the form and it
              lands straight in our inbox.
            </p>

            <div style={{ display: 'grid', gap: 12 }}>
              {methods.map((m) => {
                const inner = (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 16, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', transition: 'border-color 0.2s, background 0.2s' }}>
                    <span style={{ fontSize: 20, color: 'var(--cyan)', display: 'inline-flex', flexShrink: 0 }}><m.icon /></span>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{m.label}</div>
                      <div style={{ fontSize: 14, color: 'var(--text)', marginTop: 2 }}>{m.value}</div>
                    </div>
                  </div>
                );
                return m.href ? (
                  <a key={m.label} href={m.href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                    {inner}
                  </a>
                ) : (
                  <div key={m.label}>{inner}</div>
                );
              })}
            </div>

            <div style={{ marginTop: 24, padding: 16, borderRadius: 16, border: '1px solid rgba(56,217,245,0.15)', background: 'rgba(56,217,245,0.05)' }}>
              <div style={{ fontSize: 13, color: 'var(--cyan)', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                Pricing starts from {site.pricingFrom}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>The first chat is always free.</div>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
