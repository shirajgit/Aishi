import { useState } from 'react';
import ClientCard from './ClientCard';
import MoreCard from './MoreCard';
import ProjectModal from './ProjectModal';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import { useGithubRepos } from '../../hooks/useGithubRepos';
import type { Client } from '../../data/site';

/** Skeleton card shown while GitHub data is loading. */
function SkeletonCard() {
  return (
    <div
      className="card-glass"
      style={{ borderRadius: 28, padding: 32, height: 200, opacity: 0.5, animation: 'blink 1.4s ease infinite' }}
    >
      <div style={{ width: '55%', height: 18, borderRadius: 6, background: 'rgba(255,255,255,0.06)', marginBottom: 14 }} />
      <div style={{ width: '35%', height: 11, borderRadius: 6, background: 'rgba(255,255,255,0.05)', marginBottom: 24 }} />
      <div style={{ width: '100%', height: 11, borderRadius: 6, background: 'rgba(255,255,255,0.04)', marginBottom: 8 }} />
      <div style={{ width: '80%', height: 11, borderRadius: 6, background: 'rgba(255,255,255,0.04)' }} />
    </div>
  );
}

/**
 * Client work grid, pulled live from GitHub. Clicking a card opens a detail modal.
 * `limit` trims the list (home preview); `withHeader` toggles the heading.
 */
export default function Work({ limit, withHeader = true }: { limit?: number; withHeader?: boolean }) {
  const { repos, loading } = useGithubRepos();
  const [selected, setSelected] = useState<Client | null>(null);
  const list = limit ? repos.slice(0, limit) : repos;

  return (
    <section id="clients" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 100px' }}>
      {withHeader && (
        <SectionHeader
          center
          tag="Recent Work"
          title={<>Some of our <span className="glow-text">recent work</span></>}
          subtitle="Tap any project to see the full details, or open it live."
        />
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginTop: withHeader ? 24 : 0 }}>
        {loading ? (
          Array.from({ length: limit || 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            {list.map((c, i) => (
              <Reveal key={c.name} delay={i * 70} style={{ height: '100%' }}>
                <ClientCard client={c} onOpen={() => setSelected(c)} />
              </Reveal>
            ))}
            {repos.length > 0 && (
              <Reveal delay={list.length * 70} style={{ height: '100%' }}>
                <MoreCard count={repos.length} showAllLink={Boolean(limit)} />
              </Reveal>
            )}
          </>
        )}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
