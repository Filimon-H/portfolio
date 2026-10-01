import { featuredProjects, moreProjects, profile } from '../data/portfolio'
import { reveal } from '../hooks/useReveal'
import Container from './Container'
import SectionHeading from './SectionHeading'
import ProjectVisual from './ProjectVisual'
import Icon from './Icon'
import CodeBlock from './CodeBlock'
import CompareBars from './CompareBars'
import { useEffect, useState } from 'react'
import { projectToYaml, slug } from '../lib/projectSpec'

const VIEW_KEY = 'fh_projects_view'
const readView = () => { try { return localStorage.getItem(VIEW_KEY) || 'overview' } catch { return 'overview' } }
const saveView = (v) => { try { localStorage.setItem(VIEW_KEY, v) } catch { /* private mode */ } }

const external = { target: '_blank', rel: 'noopener noreferrer' }

function ProjectRow({ project: p, index }) {
  const [open, setOpen] = useState(false)
  return (
    <article {...reveal()} className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-gutter-lg border-t border-hairline pt-space-xl">
      <div className="lg:col-span-7 space-y-space-md">
        <div className="eyebrow">{String(index + 1).padStart(2, '0')} · {p.category}</div>
        <h3 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{p.title}</h3>
        <p className="font-body-lg text-body-lg text-on-surface-variant">{p.summary}</p>
        <p className="hidden print:block font-body-sm text-body-sm">{p.repo}</p>
        <ul className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => <li key={t} className="tag">{t}</li>)}
        </ul>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-space-md pt-space-sm">
          {p.metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse justify-end gap-0.5">
              <dt className="font-label-mono text-label-mono uppercase text-outline">{m.label}</dt>
              <dd className="font-metric-number-sm text-metric-number-sm text-primary">{m.value}</dd>
            </div>
          ))}
        </dl>

        {p.comparison && <div className="pt-space-sm print:hidden"><CompareBars comparison={p.comparison} /></div>}

        <details className="print:hidden group pt-space-xs" onToggle={(e) => setOpen(e.currentTarget.open)}>
          <summary className="inline-flex items-center gap-space-xs min-h-[40px] cursor-pointer list-none font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors duration-quick [&::-webkit-details-marker]:hidden">
            <span className="inline-block w-3 text-center transition-transform duration-quick ease-instrument group-open:rotate-45" aria-hidden="true">+</span>
            How it works
          </summary>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-sm font-body-md text-body-md text-on-surface-variant animate-panel-in">
            {p.details.map(([heading, body]) => (
              <div key={heading} className="space-y-1">
                <div className="font-label-mono text-label-mono uppercase text-primary">{heading}</div>
                <p>{body}</p>
              </div>
            ))}
          </div>
          {open && p.code && (
            <div className="pt-space-md animate-panel-in">
              <CodeBlock code={p.code.source} lang={p.code.lang} path={p.code.path} url={p.code.url} />
            </div>
          )}
        </details>
      </div>

      <div className="print:hidden lg:col-span-5 lg:self-start flex flex-col gap-space-sm">
        <div className="flex items-center min-h-[220px] bg-surface-container-lowest border border-hairline p-space-md">
          <ProjectVisual kind={p.visual} />
        </div>
        <a href={p.repo} {...external} className="self-end inline-flex items-center gap-1 min-h-[40px] font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors duration-quick">
          Source <Icon name="arrow_outward" className="text-[14px]" />
        </a>
      </div>
    </article>
  )
}

function EngineerRow({ project: p, index }) {
  return (
    <article {...reveal()} className="space-y-space-md border-t border-hairline pt-space-xl">
      <div className="flex flex-wrap items-baseline justify-between gap-space-sm">
        <h3 className="font-headline-md text-headline-md text-primary">
          <span className="font-label-mono text-label-mono text-outline mr-space-sm">{String(index + 1).padStart(2, '0')}</span>
          {p.title}
        </h3>
        <a href={p.repo} {...external} className="inline-flex items-center gap-1 min-h-[40px] font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors duration-quick">
          Source <Icon name="arrow_outward" className="text-[14px]" />
        </a>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
        <CodeBlock code={projectToYaml(p)} lang="yaml" path={`projects/${slug(p.title)}.yaml`} />
        {p.code && <CodeBlock code={p.code.source} lang={p.code.lang} path={p.code.path} url={p.code.url} />}
      </div>
    </article>
  )
}

function ViewToggle({ view, onChange }) {
  const options = [['overview', 'Overview'], ['engineer', 'Engineer']]
  return (
    <div className="inline-flex border border-hairline font-label-mono text-label-mono uppercase" role="group" aria-label="Project view">
      {options.map(([value, label]) => (
        <button
          key={value}
          type="button"
          aria-pressed={view === value}
          onClick={() => onChange(value)}
          className={`min-h-[40px] px-space-md transition-colors duration-quick ${view === value ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-primary'}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default function Projects() {
  const [view, setView] = useState(readView)
  const changeView = (v) => { setView(v); saveView(v) }
  useEffect(() => {
    const onView = (e) => changeView(e.detail)
    window.addEventListener('fh:projects-view', onView)
    return () => window.removeEventListener('fh:projects-view', onView)
  }, [])
  const Row = view === 'engineer' ? EngineerRow : ProjectRow
  const [printing, setPrinting] = useState(false)
  useEffect(() => {
    const before = () => setPrinting(true)
    const after = () => setPrinting(false)
    window.addEventListener('beforeprint', before)
    window.addEventListener('afterprint', after)
    return () => { window.removeEventListener('beforeprint', before); window.removeEventListener('afterprint', after) }
  }, [])
  const RowToRender = printing ? ProjectRow : Row

  return (
    <section className="w-full bg-surface py-margin-lg" id="projects">
      <Container className="space-y-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <SectionHeading index={2} label="Projects" title="Featured Model Systems" />
          <div className="print:hidden"><ViewToggle view={view} onChange={changeView} /></div>
        </div>
        <div className={view === 'engineer' ? 'space-y-space-xl' : 'space-y-margin-lg'}>
          {featuredProjects.map((p, i) => <RowToRender key={`${printing ? 'print' : view}-${p.title}`} project={p} index={i} />)}
        </div>

        <div className="print:hidden border-t border-hairline pt-space-xl space-y-space-md" {...reveal()}>
          <div className="eyebrow">More on GitHub</div>
          <ul className="divide-y divide-hairline-dim">
            {moreProjects.map((p) => (
              <li key={p.title}>
                <a href={p.repo} {...external} className="group flex items-center justify-between gap-space-sm py-space-md">
                  <span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors duration-quick">{p.title}</span>
                  <span className="flex items-center gap-space-sm">
                    <span className="hidden sm:inline font-label-mono text-label-mono uppercase text-outline">{p.meta}</span>
                    <Icon name="arrow_outward" className="text-[18px] text-outline group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-quick ease-instrument" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a href={profile.github} {...external} className="inline-flex items-center min-h-[40px] font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors duration-quick">
            All repositories →
          </a>
        </div>
      </Container>
    </section>
  )
}
