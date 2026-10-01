import { profile, highlightMetrics, socialLinks } from '../data/portfolio'
import useResumeLink from '../hooks/useResumeLink'
import { reveal } from '../hooks/useReveal'
import Container from './Container'
import CountUp from './CountUp'
import BlueprintGrid from './BlueprintGrid'

export default function Hero() {
  const resume = useResumeLink()

  return (
    <section className="relative overflow-hidden w-full bg-surface pt-margin-lg pb-space-xl lg:pt-24 lg:pb-margin-lg" id="about">
      <BlueprintGrid />
      <Container className="relative space-y-margin-lg">
        <div className="max-w-3xl space-y-space-lg">
          <div className="space-y-space-md" {...reveal(0, 80)}>
            <div className="eyebrow flex flex-wrap items-center gap-x-space-sm gap-y-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true"></span>
              <span className="text-on-surface">{profile.role}</span>
              <span className="hidden sm:inline" aria-hidden="true">·</span>
              <span className="basis-full sm:basis-auto">{profile.formerRole}</span>
            </div>
            <h1 className="font-display-hero text-display-hero-mobile sm:text-display-hero text-primary tracking-tight">{profile.name}</h1>
            <p className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface-variant">{profile.tagline}</p>
          </div>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl" {...reveal(1, 80)}>{profile.summary}</p>
          {/* Print-only contact line, CV style */}
          <p className="hidden print:block font-body-sm text-body-sm">
            {[profile.email, profile.phone, profile.location, ...socialLinks.map((l) => l.href.replace('https://', '').replace('www.', ''))].join('  ·  ')}
          </p>

          <div className="print:hidden flex flex-wrap items-center gap-space-sm pt-space-xs" {...reveal(2, 80)}>
            <a className="btn-primary" href="#projects">View Projects</a>
            <a className="btn-secondary" href="#contact">Contact Me</a>
            <a className="inline-flex items-center min-h-[40px] px-3 font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors duration-quick" {...resume}>
              Resume ↓
            </a>
          </div>
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-gutter gap-y-space-lg border-t border-hairline pt-space-lg">
          {highlightMetrics.map((m, i) => (
            <div key={m.note} {...reveal(i)} className="flex flex-col-reverse justify-end gap-space-xs">
              <dt className="font-body-sm text-body-sm text-outline">{m.note}</dt>
              <dd className="font-metric-number text-metric-number text-primary"><CountUp value={m.value} /></dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
