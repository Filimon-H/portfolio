import useGitHubActivity, { githubProfile } from '../hooks/useGitHubActivity'
import { reveal } from '../hooks/useReveal'
import Container from './Container'
import SectionHeading from './SectionHeading'
import Icon from './Icon'

const CELL = 10
const GAP = 3
const LEVEL_FILL = ['#201f1f', '#444748', '#8e9192', '#c4c7c8', '#ffffff']

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
function timeAgo(iso) {
  const seconds = (new Date(iso) - Date.now()) / 1000
  const units = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]]
  for (const [unit, s] of units) if (Math.abs(seconds) >= s) return rtf.format(Math.round(seconds / s), unit)
  return 'just now'
}

// Weeks run left→right, weekdays top→bottom (Sunday first), like GitHub's own graph.
function Heatmap({ calendar }) {
  const firstDay = new Date(calendar[0][0]).getUTCDay()
  const cells = calendar.map(([date, count, level], i) => {
    const slot = i + firstDay
    return { date, count, level, col: Math.floor(slot / 7), row: slot % 7 }
  })
  const cols = cells.at(-1).col + 1
  const width = cols * (CELL + GAP) - GAP
  const height = 7 * (CELL + GAP) - GAP

  return (
    <div className="overflow-x-auto pb-space-xs" ref={(el) => { if (el) el.scrollLeft = el.scrollWidth }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Contribution activity over the last year" className="block w-full h-auto min-w-[600px]">
        {cells.map((c) => (
          <rect
            key={c.date}
            x={c.col * (CELL + GAP)}
            y={c.row * (CELL + GAP)}
            width={CELL}
            height={CELL}
            fill={LEVEL_FILL[c.level] ?? LEVEL_FILL[0]}
            className="heat-cell"
            style={{ '--c': c.col }}
          >
            <title>{`${c.count} contribution${c.count === 1 ? '' : 's'} on ${c.date}`}</title>
          </rect>
        ))}
      </svg>
    </div>
  )
}

function Legend() {
  return (
    <div className="flex items-center gap-1.5 font-label-mono text-label-mono uppercase text-outline" aria-hidden="true">
      Less
      {LEVEL_FILL.map((f) => <span key={f} className="w-2.5 h-2.5" style={{ background: f }} />)}
      More
    </div>
  )
}

export default function GitHubActivity() {
  const data = useGitHubActivity()

  return (
    <section className="print:hidden w-full bg-surface py-margin-lg" id="activity">
      <Container className="space-y-space-xl">
        <SectionHeading index={4} label="GitHub Activity" />

        {data.status === 'error' ? (
          <p className="font-body-md text-body-md text-on-surface-variant">
            Live activity is unavailable right now. <a className="text-primary underline underline-offset-4" href={githubProfile} target="_blank" rel="noopener noreferrer">See it on GitHub ↗</a>
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-gutter-lg">
            <div className="lg:col-span-7 space-y-space-md" {...reveal()}>
              <div className="flex flex-wrap items-baseline justify-between gap-space-sm">
                <p className="font-metric-number-sm text-metric-number-sm text-primary">
                  {data.status === 'ready' ? data.total : '—'}
                  <span className="ml-space-sm font-body-md text-body-md text-outline font-normal">contributions in the last year</span>
                </p>
                <Legend />
              </div>
              {data.status === 'ready'
                ? <Heatmap calendar={data.calendar} />
                : <div className="h-[88px] bg-surface-container-lowest border border-hairline animate-pulse" aria-label="Loading contributions" />}
            </div>

            <div className="lg:col-span-5 space-y-space-sm" {...reveal(1)}>
              <div className="eyebrow">Recently pushed</div>
              <ul className="divide-y divide-hairline-dim border-y border-hairline-dim">
                {data.status === 'ready'
                  ? data.repos.map((r) => (
                    <li key={r.name}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-space-md py-space-sm">
                        <span className="min-w-0">
                          <span className="block truncate font-code-body text-code-body text-on-surface group-hover:text-primary transition-colors duration-quick">{r.name}</span>
                          <span className="block truncate font-body-sm text-body-sm text-outline">{[r.language, timeAgo(r.pushedAt)].filter(Boolean).join(' · ')}</span>
                        </span>
                        <Icon name="arrow_outward" className="shrink-0 text-[16px] text-outline group-hover:text-primary transition-colors duration-quick" />
                      </a>
                    </li>
                  ))
                  : Array.from({ length: 5 }, (_, i) => <li key={i} className="h-[58px] animate-pulse bg-surface-container-lowest/60" />)}
              </ul>
              <a href={githubProfile} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[40px] font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors duration-quick">
                Full profile →
              </a>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
