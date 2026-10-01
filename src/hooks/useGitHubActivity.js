import { useEffect, useState } from 'react'

const USER = 'Filimon-H'
const CACHE_KEY = 'fh_github_activity_v1'
const TTL = 60 * 60 * 1000 // 1 hour — keeps us far below GitHub's 60 req/hour anonymous limit

const SOURCES = {
  // Third-party mirror of the public contribution calendar (GitHub's own needs an auth token).
  calendar: `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`,
  repos: `https://api.github.com/users/${USER}/repos?sort=pushed&per_page=12&type=owner`,
}

function readCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY))
    return cached && Date.now() - cached.at < TTL ? cached.data : null
  } catch {
    return null
  }
}

function writeCache(data) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data })) } catch { /* private mode */ }
}

async function getJson(url, signal) {
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`${url} responded ${res.status}`)
  return res.json()
}

// { status: 'loading' | 'ready' | 'error', calendar, total, repos }
export default function useGitHubActivity() {
  const [state, setState] = useState(() => {
    const cached = readCache()
    return cached ? { status: 'ready', ...cached } : { status: 'loading' }
  })

  useEffect(() => {
    if (state.status === 'ready') return
    const controller = new AbortController()
    Promise.all([getJson(SOURCES.calendar, controller.signal), getJson(SOURCES.repos, controller.signal)])
      .then(([cal, repos]) => {
        const data = {
          total: cal.total?.lastYear ?? cal.contributions.reduce((n, d) => n + d.count, 0),
          calendar: cal.contributions.map((d) => [d.date, d.count, d.level]),
          repos: repos
            .filter((r) => !r.fork && !r.archived && r.name !== USER)
            .slice(0, 5)
            .map((r) => ({ name: r.name, url: r.html_url, description: r.description, language: r.language, pushedAt: r.pushed_at })),
        }
        writeCache(data)
        setState({ status: 'ready', ...data })
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setState({ status: 'error' })
      })
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state
}

export const githubProfile = `https://github.com/${USER}`
