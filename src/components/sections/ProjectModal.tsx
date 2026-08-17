import { useEffect, useState, type ReactNode } from 'react';
import { FiStar, FiX, FiArrowUpRight, FiGithub } from 'react-icons/fi';
import type { Client } from '../../data/site';

type RepoDetail = {
  description: string | null;
  homepage: string | null;
  html_url: string;
  topics?: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  created_at: string;
  pushed_at: string;
  license: { name: string } | null;
  default_branch: string;
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  EJS: '#a91e50',
  Java: '#b07219',
  'C++': '#f34b7d',
  Shell: '#89e051',
};
const FALLBACK_COLORS = ['#38d9f5', '#a5b4fc', '#7b8cde', '#4ade80', '#f59e0b'];

function ownerRepo(url?: string): { owner: string; name: string } | null {
  if (!url) return null;
  const m = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  return m ? { owner: m[1], name: m[2] } : null;
}

function fmtDate(iso?: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div style={{ borderRadius: 14, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', padding: '12px 14px' }}>
      <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', gap: 6 }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{label}</div>
    </div>
  );
}

export default function ProjectModal({ project, onClose }: { project: Client; onClose: () => void }) {
  const [detail, setDetail] = useState<RepoDetail | null>(null);
  const [languages, setLanguages] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Fetch richer detail for GitHub-sourced projects.
  useEffect(() => {
    const ref = ownerRepo(project.repo);
    if (!ref) {
      setLoading(false);
      return;
    }
    let active = true;
    Promise.all([
      fetch(`https://api.github.com/repos/${ref.owner}/${ref.name}`).then((r) => (r.ok ? r.json() : null)),
      fetch(`https://api.github.com/repos/${ref.owner}/${ref.name}/languages`).then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([repo, langs]) => {
        if (!active) return;
        setDetail(repo);
        setLanguages(langs);
        setLoading(false);
      })
      .catch(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [project.repo]);

  const description = detail?.description || project.desc;
  const topics = detail?.topics?.length ? detail.topics : project.stack;
  const langEntries = languages ? Object.entries(languages) : [];
  const langTotal = langEntries.reduce((sum, [, v]) => sum + v, 0) || 1;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(2,5,15,0.7)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '24px',
        overflowY: 'auto',
        animation: 'fadeIn 0.2s ease both',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} details`}
        style={{
          width: '100%',
          maxWidth: 640,
          margin: 'auto',
          borderRadius: 26,
          border: `1px solid ${project.color}30`,
          background: 'var(--surface)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
          position: 'relative',
          overflow: 'hidden',
          animation: 'fadeUp 0.35s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        <div style={{ height: 4, background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

        <div style={{ padding: '28px 30px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
            <div>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 26, marginBottom: 6 }}>{project.name}</h2>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', gap: 8, alignItems: 'center' }}>
                <span>{project.type}</span>
                <span>·</span>
                <span>{project.year}</span>
                {detail?.license && (
                  <>
                    <span>·</span>
                    <span>{detail.license.name}</span>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)', color: 'var(--text)', cursor: 'pointer', fontSize: 18, lineHeight: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <FiX />
            </button>
          </div>

          {/* Description */}
          <p style={{ fontSize: 14.5, color: 'var(--text-dim)', lineHeight: 1.8, margin: '20px 0' }}>{description}</p>

          {/* Language breakdown */}
          {langEntries.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                Built with
              </div>
              <div style={{ display: 'flex', height: 8, borderRadius: 100, overflow: 'hidden', marginBottom: 12 }}>
                {langEntries.map(([lang, val], i) => (
                  <div key={lang} title={lang} style={{ width: `${(val / langTotal) * 100}%`, background: LANG_COLORS[lang] || FALLBACK_COLORS[i % FALLBACK_COLORS.length] }} />
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {langEntries.map(([lang, val], i) => (
                  <span key={lang} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-dim)' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: LANG_COLORS[lang] || FALLBACK_COLORS[i % FALLBACK_COLORS.length] }} />
                    {lang} {Math.round((val / langTotal) * 100)}%
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Topics / stack tags */}
          {topics.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
              {topics.map((t) => (
                <span key={t} style={{ fontSize: 11, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: '4px 10px', color: 'var(--text-muted)' }}>
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Stats grid */}
          {detail && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10, marginBottom: 24 }}>
              <Stat label="Stars" value={<><FiStar /> {detail.stargazers_count}</>} />
              <Stat label="Forks" value={detail.forks_count} />
              <Stat label="Started" value={fmtDate(detail.created_at)} />
              <Stat label="Last update" value={fmtDate(detail.pushed_at)} />
            </div>
          )}

          {loading && <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Loading more details…</p>}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: 12 }}>
                Visit live site <FiArrowUpRight />
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize: 12 }}>
                <FiGithub /> View code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
