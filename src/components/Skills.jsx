import { skillGroups } from '../data/portfolio'
import { reveal } from '../hooks/useReveal'
import Container from './Container'
import SectionHeading from './SectionHeading'

export default function Skills() {
  return (
    <section className="w-full bg-surface-container-lowest py-margin-lg" id="skills">
      <Container className="space-y-space-xl">
        <SectionHeading index={1} label="Skills" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-gutter gap-y-space-xl">
          {skillGroups.map((g, i) => (
            <div key={g.title} {...reveal(i)} className="space-y-space-md">
              <h3 className="font-headline-sm text-headline-sm text-primary">{g.title}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((s) => <li key={s} className="tag">{s}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
