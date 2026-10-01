import { reveal } from '../hooks/useReveal'
import ScrambleText from './ScrambleText'

// Small "02 / Projects" label, plus an optional large visible title.
// Without a title the label doubles as the section's (screen-reader) heading.
export default function SectionHeading({ index, label, title }) {
  const eyebrow = `${String(index).padStart(2, '0')} / ${label}`
  return (
    <div {...reveal()} className="section-heading space-y-space-sm">
      <ScrambleText text={eyebrow} className="eyebrow block" {...(!title && { "aria-hidden": "true" })} />
      {title
        ? <ScrambleText as="h2" text={title} className="font-display-hero text-display-hero-mobile lg:text-display-hero text-primary tracking-tight" />
        : <h2 className="sr-only">{label}</h2>}
    </div>
  )
}
