import type { Client } from '../../data/site';

export default function ClientCard({ client, onOpen }: { client: Client; onOpen?: () => void }) {
  const c = client;
  const clickable = Boolean(onOpen);

  // Keep the Live/Code links from also triggering the card's open handler.
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="card-glass"
      onClick={onOpen}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpen?.();
              }
            }
          : undefined
      }
      style={{ borderRadius: 28, padding: 32, position: 'relative', overflow: 'hidden', height: '100%', cursor: clickable ? 'pointer' : 'default', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${c.color}40, transparent)` }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 20, marginBottom: 4 }}>{c.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 8 }}>
            <span>{c.type}</span>
            <span>·</span>
            <span>{c.year}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          {c.repo && (
            <a
              href={c.repo}
              target="_blank"
              rel="noreferrer"
              onClick={stop}
              aria-label="View source code"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 100, padding: '6px 12px', fontSize: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: 'var(--text-dim)', textDecoration: 'none', transition: 'background 0.2s' }}
            >
              Code
            </a>
          )}
          {c.link && (
            <a
              href={c.link}
              target="_blank"
              rel="noreferrer"
              onClick={stop}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: `${c.color}14`, border: `1px solid ${c.color}30`, borderRadius: 100, padding: '6px 14px', fontSize: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: c.color, textDecoration: 'none', transition: 'background 0.2s' }}
            >
              Live →
            </a>
          )}
        </div>
      </div>

      <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.75, marginBottom: 20 }}>{c.desc}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
        {c.stack.map((t) => (
          <span key={t} style={{ fontSize: 11, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: '4px 10px', color: 'var(--text-muted)' }}>
            {t}
          </span>
        ))}
      </div>

      {clickable && (
        <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--border)', fontSize: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: c.color, display: 'flex', alignItems: 'center', gap: 6 }}>
          View details <span aria-hidden>→</span>
        </div>
      )}
    </div>
  );
}
