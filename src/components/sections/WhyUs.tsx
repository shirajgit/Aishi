import { FiUsers, FiTag, FiTarget, FiLifeBuoy, FiZap, FiMessageCircle } from 'react-icons/fi';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

const reasons = [
  {
    icon: FiUsers,
    title: 'You talk to the builders',
    desc: 'No account managers or middlemen. You deal directly with the people writing your code.',
  },
  {
    icon: FiTag,
    title: 'Fixed scope, fixed price',
    desc: 'You know the cost and the timeline before we start. No surprise invoices halfway through.',
  },
  {
    icon: FiTarget,
    title: 'Built around your work',
    desc: 'We learn how you actually run things first, then build software that fits it, not the other way around.',
  },
  {
    icon: FiLifeBuoy,
    title: 'We stick around after',
    desc: 'Launch is not the end. We fix, tweak, and add to your project long after it goes live.',
  },
  {
    icon: FiZap,
    title: 'Fast turnaround',
    desc: 'Most projects go live in 2 to 8 days. We keep things moving without cutting corners.',
  },
  {
    icon: FiMessageCircle,
    title: 'Honest advice',
    desc: 'If you do not need something, we will tell you. We would rather build the right thing than the biggest thing.',
  },
];

export default function WhyUs() {
  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 24px 100px' }}>
      <SectionHeader
        tag="Why Aishi"
        title={<>Why teams <span className="glow-text">work with us</span></>}
        subtitle="We are a small team, so every project gets real attention. Here is what that looks like in practice."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 40 }}>
        {reasons.map((r, i) => (
          <Reveal key={r.title} delay={i * 70} style={{ height: '100%' }}>
            <div className="card-glass" style={{ borderRadius: 22, padding: 26, height: '100%' }}>
              <div style={{ fontSize: 26, color: 'var(--cyan)', opacity: 0.6, marginBottom: 16, display: 'flex' }}><r.icon /></div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{r.title}</h3>
              <p style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.75 }}>{r.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
