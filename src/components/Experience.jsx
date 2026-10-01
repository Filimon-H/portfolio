import { useEffect, useRef } from 'react'
import { experience } from '../data/portfolio'
import { reveal } from '../hooks/useReveal'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import Container from './Container'
import SectionHeading from './SectionHeading'

// A rail runs down the left of the timeline and fills as the reader scrolls past each role;
// each role's marker lights up once the fill reaches it.
function useTimelineProgress(listRef, fillRef) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const list = listRef.current
    const fill = fillRef.current
    if (!list || !fill) return
    const items = [...list.querySelectorAll('[data-role]')]
    if (reduced) {
      fill.style.transform = 'scaleY(1)'
      items.forEach((li) => li.setAttribute('data-passed', ''))
      return
    }
    let frame = 0
    const update = () => {
      frame = 0
      const rect = list.getBoundingClientRect()
      const anchor = window.innerHeight * 0.6
      const progress = Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1)
      fill.style.transform = `scaleY(${progress})`
      items.forEach((li) => {
        const passed = li.getBoundingClientRect().top + 28 < anchor
        li.toggleAttribute('data-passed', passed)
      })
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [reduced, listRef, fillRef])
}

export default function Experience() {
  const listRef = useRef(null)
  const fillRef = useRef(null)
  useTimelineProgress(listRef, fillRef)

  return (
    <section className="w-full bg-surface-container-lowest py-margin-lg" id="experience">
      <Container className="space-y-space-xl">
        <SectionHeading index={3} label="Experience" />
        <div className="relative pl-space-lg md:pl-gutter-lg print:pl-0">
          {/* Rail: hairline track + white fill down the left edge. */}
          <div className="print:hidden absolute top-0 bottom-0 left-0 w-px bg-hairline" aria-hidden="true">
            <div ref={fillRef} className="absolute inset-0 bg-primary origin-top" style={{ transform: 'scaleY(0)' }} />
          </div>
          <ol ref={listRef}>
            {experience.map((job) => (
              <li
                key={`${job.role}-${job.org}`}
                data-role=""
                {...reveal()}
                className="group/role relative py-space-lg md:py-space-xl"
              >
                <span
                  className="print:hidden absolute top-[34px] md:top-[50px] -left-space-lg md:-left-gutter-lg w-2 h-2 -translate-x-1/2 border border-outline bg-surface-container-lowest transition-colors duration-standard group-data-[passed]/role:bg-primary group-data-[passed]/role:border-primary"
                  aria-hidden="true"
                />
                <div className="space-y-space-sm">
                  <div>
                    <h3 className="flex flex-wrap items-center gap-x-space-sm gap-y-1 font-headline-md text-headline-md text-primary">
                      {job.role}
                      {job.current && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-hairline font-label-mono text-label-mono uppercase text-primary">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true"></span>
                          Current
                        </span>
                      )}
                    </h3>
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
        </div>
      </Container>
    </section>
  )
}
