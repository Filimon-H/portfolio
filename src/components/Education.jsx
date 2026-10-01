import { education } from '../data/portfolio'
import { reveal } from '../hooks/useReveal'
import Container from './Container'
import SectionHeading from './SectionHeading'

export default function Education() {
  return (
    <section className="w-full bg-surface-container-lowest py-margin-lg" id="education">
      <Container className="space-y-space-xl">
        <SectionHeading index={5} label="Education" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-gutter gap-y-space-xl">
          {education.map((e, i) => (
            <div key={e.title} {...reveal(i)} className="space-y-space-xs border-t border-hairline pt-space-md">
              <div className="eyebrow">{e.eyebrow}</div>
              <h3 className="font-headline-sm text-headline-sm text-primary">{e.title}</h3>
              {e.org && <p className="font-body-md text-body-md text-on-surface-variant">{e.org}</p>}
              {(e.period || e.note) && (
                <p className="font-body-sm text-body-sm text-outline">{[e.period, e.note].filter(Boolean).join(' · ')}</p>
              )}
              {e.list && (
                <ul className="space-y-1 font-body-md text-body-md text-on-surface-variant">
                  {e.list.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
