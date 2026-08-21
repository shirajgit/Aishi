import { useEffect, useState } from 'react';
import { clients, githubExclude, githubLinkOverrides, githubUser, type Client } from '../data/site';

type GithubRepo = {
  name: string;
  description: string | null;
  homepage: string | null;
  html_url: string;
  language: string | null;
  topics?: string[];
  fork: boolean;
  stargazers_count: number;
  pushed_at: string;
  updated_at: string;
};

const CARD_COLORS = ['#38d9f5', '#a5b4fc'];
const CACHE_KEY = 'aishi_gh_repos_v2';
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

/** Title-case a repo slug: "workforce-OS" -> "Workforce OS". */
function prettifyName(name: string): string {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function truncate(text: string, max = 130): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

function toClient(repo: GithubRepo, i: number): Client {
  const stack = (repo.topics && repo.topics.length ? repo.topics : [repo.language])
    .filter(Boolean)
    .slice(0, 3)
    .map((t) => String(t)) as string[];

  return {
    name: prettifyName(repo.name),
    type: repo.language || 'Web Project',
    year: new Date(repo.pushed_at || repo.updated_at).getFullYear().toString(),
    desc: truncate(repo.description || 'A project by Aishi Technologies.'),
    link: githubLinkOverrides[repo.name] || repo.homepage || repo.html_url,
    repo: repo.html_url,
    stack: stack.length ? stack : ['Web'],
    color: CARD_COLORS[i % CARD_COLORS.length],
  };
}

function mapRepos(repos: GithubRepo[]): Client[] {
  const exclude = new Set(githubExclude.map((n) => n.toLowerCase()));
  const seen = new Set<string>();

  return repos
    .filter((r) => !r.fork && r.homepage && !exclude.has(r.name.toLowerCase()))
    // drop duplicates that point at the same live URL
    .filter((r) => {
      const key = (r.homepage || '').replace(/\/$/, '').toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .map(toClient);
}

type State = { repos: Client[]; loading: boolean; error: boolean };

/**
 * Fetches public repos from GitHub and maps the presentable ones (live link,
 * not a fork, not excluded) to project cards. Falls back to the curated
 * `clients` list on error or rate-limit, and caches results for an hour.
 */
export function useGithubRepos(): State {
  const [state, setState] = useState<State>({ repos: [], loading: true, error: false });

  useEffect(() => {
    let active = true;

    // Serve from session cache when fresh.
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { ts, repos } = JSON.parse(cached) as { ts: number; repos: Client[] };
        if (Date.now() - ts < CACHE_TTL && Array.isArray(repos) && repos.length) {
          // Client-only sync from sessionStorage (unavailable during SSG, so it
          // can't move to a lazy useState initialiser).
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setState({ repos, loading: false, error: false });
          return;
        }
      }
    } catch {
      /* ignore cache errors */
    }

    fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100&sort=pushed`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json();
      })
      .then((data: GithubRepo[]) => {
        if (!active) return;
        const mapped = mapRepos(data);
        if (!mapped.length) throw new Error('no repos matched');
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), repos: mapped }));
        } catch {
          /* ignore quota errors */
        }
        setState({ repos: mapped, loading: false, error: false });
      })
      .catch(() => {
        if (!active) return;
        // Fall back to the hand-curated list so the section is never empty.
        setState({ repos: clients, loading: false, error: true });
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}
