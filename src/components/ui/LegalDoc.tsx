import type { ReactNode } from 'react';

export type LegalSection = { title: string; body: ReactNode };

/** Long-form text layout shared by the Privacy Policy and Terms pages. */
export default function LegalDoc({ updated, sections }: { updated: string; sections: LegalSection[] }) {
  return (
    <section style={{ maxWidth: 820, margin: '0 auto', padding: '64px 24px 100px' }}>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 40 }}>
        Last updated: {updated}
      </p>

      {sections.map((s, i) => (
        <div key={s.title} style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 20, marginBottom: 14 }}>
            {i + 1}. {s.title}
          </h2>
          <div style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.85, display: 'grid', gap: 12 }}>
            {s.body}
          </div>
        </div>
      ))}
    </section>
  );
}

/** Bulleted list styled for legal pages. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul style={{ paddingLeft: 20, display: 'grid', gap: 8 }}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
