import { marqueeItems } from '../../data/site';

/** Infinite scrolling tech/keyword strip. Items are duplicated for a seamless loop. */
export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '16px 0', background: 'rgba(8,14,31,0.5)' }}>
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={i}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 24, paddingRight: 48, whiteSpace: 'nowrap', fontSize: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' }}
          >
            {item}
            <span style={{ color: 'var(--cyan)', opacity: 0.5, fontSize: 8 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
