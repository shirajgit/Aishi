import { useState } from 'react';
import { faqs } from '../../data/site';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderRadius: 18,
        border: `1px solid ${open ? 'rgba(56,217,245,0.2)' : 'var(--border)'}`,
        background: open ? 'rgba(56,217,245,0.04)' : 'rgba(255,255,255,0.02)',
        overflow: 'hidden',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '20px 22px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          color: 'var(--text)',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        {q}
        <span
          style={{
            flexShrink: 0,
            width: 26,
            height: 26,
            display: 'grid',
            placeItems: 'center',
            borderRadius: '50%',
            border: '1px solid var(--border)',
            color: 'var(--cyan)',
            fontSize: 16,
            transform: open ? 'rotate(45deg)' : 'none',
            transition: 'transform 0.25s',
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 240 : 0,
          opacity: open ? 1 : 0,
          transition: 'max-height 0.3s ease, opacity 0.3s ease',
        }}
      >
        <p style={{ padding: '0 22px 22px', fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.75 }}>{a}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 100px' }}>
      <SectionHeader
        center
        tag="FAQ"
        title={<>Questions people <span className="glow-text">usually ask</span></>}
        subtitle="If something is not covered here, just message us and we will answer it."
      />

      <div style={{ display: 'grid', gap: 12, marginTop: 40 }}>
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 60}>
            <FaqItem q={f.q} a={f.a} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
