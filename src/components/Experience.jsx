import { experience } from '../data/portfolio'
import { reveal } from '../hooks/useReveal'
import Container from './Container'
import SectionHeading from './SectionHeading'

export default function Experience() {
  return (
    <section className="w-full bg-surface-container-lowest py-margin-lg" id="experience">
      <Container className="space-y-space-xl">
        <SectionHeading index={3} label="Experience" />
        <ol className="border-t border-hairline">
          {experience.map((job) => (
            <li key={`${job.role}-${job.org}`} {...reveal()} className="grid grid-cols-1 md:grid-cols-12 gap-space-sm md:gap-gutter py-space-xl border-b border-hairline">
              <div className="md:col-span-3 font-label-mono text-label-mono uppercase text-outline flex items-center gap-space-xs md:items-start md:pt-1.5">
                {job.current && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true"></span>}
                <span className={job.current ? 'text-primary' : ''}>{job.period}</span>
              </div>
              <div className="md:col-span-9 space-y-space-sm">
                <div>
                  <h3 className="font-headline-md text-headline-md text-primary">{job.role}</h3>
                  <div className="font-body-md text-body-md text-outline">{job.org}</div>
                </div>
                <ul className="space-y-space-xs font-body-md text-body-md text-on-surface-variant max-w-3xl">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-space-sm">
                      <span className="text-outline-variant shrink-0" aria-hidden="true">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
