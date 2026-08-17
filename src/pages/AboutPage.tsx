import { useEffect } from 'react';
import {
  FiPenTool,
  FiShield,
  FiMessageSquare,
  FiActivity,
  FiMonitor,
  FiServer,
  FiCpu,
  FiWifi,
  FiTarget,
  FiRefreshCw,
  FiFeather,
  FiCheck,
  FiX,
  FiStar,
} from 'react-icons/fi';
import PageHero from '../components/ui/PageHero';
import Industries from '../components/sections/Industries';
import StatsBar from '../components/sections/StatsBar';
import ContactCTA from '../components/sections/ContactCTA';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import { site, offer } from '../data/site';
import { setMeta } from '../utils/seo';

const values = [
  { icon: FiPenTool, title: 'Built from scratch', desc: 'No templates and no clutter. Every site is designed around what you actually need.' },
  { icon: FiShield, title: 'Made to last', desc: 'We test properly and build on a solid stack, so it keeps working after we hand it over.' },
  { icon: FiMessageSquare, title: 'Straight talk', desc: 'You always know the timeline and the cost up front. We don\'t spring things on you.' },
  { icon: FiActivity, title: 'Built for daily use', desc: 'Schools, clinics, shops, and growing businesses run on what we make.' },
];

const techGroups = [
  {
    icon: FiMonitor,
    title: 'Frontend',
    desc: 'Fast, responsive interfaces that feel effortless on any phone, tablet, or desktop.',
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    icon: FiServer,
    title: 'Backend & APIs',
    desc: 'Secure server logic, clean APIs, and databases that scale as your data grows.',
    tools: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'Auth & Roles'],
  },
  {
    icon: FiCpu,
    title: 'AI & Automation',
    desc: 'Smart features and automated workflows that take repetitive work off your team.',
    tools: ['Claude API', 'Python', 'FastAPI', 'Smart Search', 'Automations'],
  },
  {
    icon: FiWifi,
    title: 'IoT & Hardware',
    desc: 'Real-world devices wired to live dashboards you can watch and control from your phone.',
    tools: ['ESP32 / ESP8266', 'Arduino', 'MQTT', 'Sensors', 'Live Dashboards'],
  },
];

/** Where we ship, pay, and connect — the tooling around the code. */
const infra = ['Vercel', 'Render', 'Git & GitHub', 'Cloudflare', 'Razorpay', 'WhatsApp API'];

const principles = [
  {
    icon: FiTarget,
    title: 'The right tool, not the trendy one',
    desc: 'We pick what actually fits your problem and budget, not whatever is loudest on social media this month.',
  },
  {
    icon: FiShield,
    title: 'Latest stable, never bleeding edge',
    desc: 'We stay current with modern, well-supported versions, so your project is fast today and easy to maintain tomorrow.',
  },
  {
    icon: FiFeather,
    title: 'Simple beats clever',
    desc: 'Less code, fewer moving parts. Software that is easy to run, cheap to host, and simple to hand over.',
  },
  {
    icon: FiRefreshCw,
    title: 'Built to grow with you',
    desc: 'We structure projects so new features, users, and integrations can be added later without a rebuild.',
  },
];

/** Honest side-by-side so the value is obvious. Aishi column is highlighted. */
const comparison: { name: string; price: string; was?: string; note: string; highlight: boolean; rows: { ok: boolean; text: string }[] }[] = [
  {
    name: 'Big Agency',
    price: '₹80,000+',
    note: 'Typical project quote',
    highlight: false,
    rows: [
      { ok: false, text: '4–8 week timelines' },
      { ok: false, text: 'You talk to an account manager' },
      { ok: true, text: 'Polished final product' },
      { ok: false, text: 'Support billed as extra' },
      { ok: false, text: 'Contracts, paperwork & lock-in' },
    ],
  },
  {
    name: 'Aishi',
    price: site.pricingFrom,
    was: site.pricingWas,
    note: '50% launch offer on new projects',
    highlight: true,
    rows: [
      { ok: true, text: 'Live in 2–8 days' },
      { ok: true, text: 'You talk straight to the builders' },
      { ok: true, text: 'Agency-grade design & code' },
      { ok: true, text: 'Support included after launch' },
      { ok: true, text: 'You own everything, zero lock-in' },
    ],
  },
  {
    name: 'Freelancer',
    price: '₹15,000+',
    note: 'Rough going rate',
    highlight: false,
    rows: [
      { ok: false, text: 'Unpredictable delivery' },
      { ok: true, text: 'You talk to one person' },
      { ok: false, text: 'Quality varies a lot' },
      { ok: false, text: 'Often gone after launch' },
      { ok: true, text: 'Usually your code' },
    ],
  },
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
                <div style={{ fontSize: 26, color: 'var(--cyan)', opacity: 0.6, marginBottom: 14, display: 'flex' }}><v.icon /></div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{v.title}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.7 }}>{v.desc}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Tech stack */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px 80px' }}>
        <Reveal>
          <SectionHeader
            tag="Our Stack"
            title={<>The tech we <span className="glow-text">build on</span></>}
            subtitle="We keep our stack modern and deliberately lean. Every tool here earns its place by making your project faster to build, cheaper to run, and easier to maintain later."
          />
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 40 }}>
          {techGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 70} style={{ height: '100%' }}>
              <div className="card-glass" style={{ borderRadius: 22, padding: 26, height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <span style={{ fontSize: 22, color: 'var(--cyan)', display: 'inline-flex', width: 44, height: 44, borderRadius: 12, border: '1px solid rgba(56,217,245,0.2)', background: 'rgba(56,217,245,0.08)', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <g.icon />
                  </span>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 17 }}>{g.title}</h3>
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 18 }}>{g.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {g.tools.map((t) => (
                    <span key={t} style={{ fontSize: 12, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.03)', borderRadius: 100, padding: '5px 12px', color: 'var(--text-dim)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Infra / tooling strip */}
        <Reveal delay={120} style={{ marginTop: 24 }}>
          <div style={{ borderRadius: 24, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', padding: '24px 28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase', flexShrink: 0 }}>
              We also ship &amp; connect with
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {infra.map((item) => (
                <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid var(--border)', borderRadius: 100, padding: '7px 15px', fontSize: 13, color: 'var(--text-dim)' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--cyan)', display: 'inline-block' }} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* How we choose tech */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 90px' }}>
        <Reveal>
          <div style={{ borderRadius: 32, border: '1px solid var(--border)', background: 'var(--surface)', padding: '56px 48px', position: 'relative', overflow: 'hidden' }}>
            <div className="dot-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 48, alignItems: 'start' }}>
                <div>
                  <SectionHeader
                    tag="How We Think"
                    title={<>How we choose <span className="glow-text">our tools</span></>}
                    titleSize="clamp(26px, 3vw, 40px)"
                  />
                  <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.85, marginTop: 20 }}>
                    Technology is never the point. The point is a business that runs smoother, a school that
                    spends less time on paperwork, a shop that sells more. We choose tools that get you there
                    with the least fuss, and we are happy to explain every choice in plain language.
                  </p>
                  <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.85, marginTop: 16 }}>
                    That means no over-engineering, no lock-in, and no tech you will need us forever to touch.
                    You own the code and the accounts, and it is built to be picked up by any competent
                    developer down the line.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
                  {principles.map((p, i) => (
                    <Reveal key={p.title} delay={i * 70}>
                      <div style={{ padding: 22, borderRadius: 18, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', height: '100%' }}>
                        <div style={{ fontSize: 22, color: 'var(--cyan)', opacity: 0.7, marginBottom: 12, display: 'flex' }}><p.icon /></div>
                        <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14.5, marginBottom: 8, lineHeight: 1.4 }}>{p.title}</div>
                        <div style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.7 }}>{p.desc}</div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Why Aishi — price & value comparison */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 24px 90px' }}>
        <Reveal>
          <SectionHeader
            tag="Why Aishi"
            title={<>Premium work at <span className="glow-text">local prices</span></>}
            subtitle="You do not have to choose between good and affordable. We give you agency-level quality for a fraction of the cost, because we run lean and skip the overhead you would end up paying for."
          />
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 40, alignItems: 'stretch' }}>
          {comparison.map((col, i) => (
            <Reveal key={col.name} delay={i * 80} style={{ height: '100%' }}>
              <div
                style={{
                  height: '100%',
                  borderRadius: 24,
                  padding: 28,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  border: col.highlight ? '1px solid rgba(56,217,245,0.4)' : '1px solid var(--border)',
                  background: col.highlight
                    ? 'linear-gradient(135deg, rgba(56,217,245,0.1), rgba(123,140,222,0.08))'
                    : 'rgba(255,255,255,0.02)',
                  boxShadow: col.highlight ? '0 24px 60px rgba(56,217,245,0.15)' : 'none',
                  transform: col.highlight ? 'translateY(-6px)' : 'none',
                }}
              >
                {col.highlight && (
                  <span style={{ position: 'absolute', top: 18, right: 18, display: 'inline-flex', alignItems: 'center', gap: 5, background: 'linear-gradient(135deg, var(--cyan), var(--indigo))', color: '#000', fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: 100, padding: '5px 11px' }}>
                    <FiStar /> Best value
                  </span>
                )}

                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, color: col.highlight ? 'var(--cyan)' : 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>
                  {col.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                  <span className={col.highlight ? 'glow-text' : undefined} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 32, color: col.highlight ? undefined : 'var(--text)' }}>
                    {col.price}
                  </span>
                  {col.was && (
                    <s style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 17, color: 'var(--text-muted)', opacity: 0.7 }}>{col.was}</s>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6, marginBottom: 22 }}>{col.note}</div>

                <ul style={{ listStyle: 'none', display: 'grid', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 20, marginTop: 'auto' }}>
                  {col.rows.map((r) => (
                    <li key={r.text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: r.ok ? 'var(--text-dim)' : 'var(--text-muted)', lineHeight: 1.5 }}>
                      <span style={{ flexShrink: 0, marginTop: 1, color: r.ok ? '#4ade80' : '#f87171', display: 'inline-flex' }}>
                        {r.ok ? <FiCheck /> : <FiX />}
                      </span>
                      {r.text}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Savings callout */}
        <Reveal delay={140} style={{ marginTop: 24 }}>
          <div style={{ borderRadius: 24, border: '1px solid rgba(56,217,245,0.15)', background: 'rgba(56,217,245,0.05)', padding: '28px 32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
              <div>
                <div className="glow-text" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 30, lineHeight: 1 }}>{offer.percent}% OFF</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-dim)', marginTop: 6 }}>launch offer on new projects</div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span className="glow-text" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 30, lineHeight: 1 }}>From {site.pricingFrom}</span>
                  <s style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--text-muted)', opacity: 0.7 }}>{site.pricingWas}</s>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-dim)', marginTop: 6 }}>fixed price, quoted up front</div>
              </div>
              <div>
                <div className="glow-text" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 30, lineHeight: 1 }}>₹0</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-dim)', marginTop: 6 }}>for the first consultation</div>
              </div>
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: 320, margin: 0 }}>
              No surprise invoices, no retainer traps. You get a clear price before we start and you own
              everything once it is paid for.
            </p>
          </div>
        </Reveal>
      </section>

      <StatsBar />
      <Industries />
      <ContactCTA />
    </>
  );
}
