import { reveal } from '../hooks/useReveal'

// Small "02 / Projects" label, plus an optional large visible title.
// Without a title the label doubles as the section's (screen-reader) heading.
export default function SectionHeading({ index, label, title }) {
  return (
    <div {...reveal()} className="space-y-space-sm">
      <div className="eyebrow" aria-hidden={title ? undefined : 'true'}>{String(index).padStart(2, '0')} / {label}</div>
      {title
        ? <h2 className="font-display-hero text-display-hero-mobile lg:text-display-hero text-primary tracking-tight">{title}</h2>
        : <h2 className="sr-only">{label}</h2>}
    </div>
  )
}
