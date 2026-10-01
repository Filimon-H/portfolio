import { featuredProjects, moreProjects, profile } from '../data/portfolio'
import { reveal } from '../hooks/useReveal'
import Container from './Container'
import SectionHeading from './SectionHeading'
import ProjectVisual from './ProjectVisual'
import Icon from './Icon'

const external = { target: '_blank', rel: 'noopener noreferrer' }

function ProjectRow({ project: p, index }) {
  return (
    <article {...reveal()} className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-gutter-lg border-t border-hairline pt-space-xl">
      <div className="lg:col-span-7 space-y-space-md">
        <div className="eyebrow">{String(index + 1).padStart(2, '0')} · {p.category}</div>
        <h3 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{p.title}</h3>
        <p className="font-body-lg text-body-lg text-on-surface-variant">{p.summary}</p>
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

        <details className="group pt-space-xs">
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
        </details>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-space-sm">
        <div className="flex-1 flex items-center bg-surface-container-lowest border border-hairline p-space-md">
          <ProjectVisual kind={p.visual} />
        </div>
        <a href={p.repo} {...external} className="self-end inline-flex items-center gap-1 min-h-[40px] font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors duration-quick">
          Source <Icon name="arrow_outward" className="text-[14px]" />
        </a>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section className="w-full bg-surface py-margin-lg" id="projects">
      <Container className="space-y-space-xl">
        <SectionHeading index={2} label="Projects" title="Featured Model Systems" />
        <div className="space-y-margin-lg">
          {featuredProjects.map((p, i) => <ProjectRow key={p.title} project={p} index={i} />)}
        </div>

        <div className="border-t border-hairline pt-space-xl space-y-space-md" {...reveal()}>
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
