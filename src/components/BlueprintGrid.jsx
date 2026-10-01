import { useEffect, useRef } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

// Faint 1px blueprint grid behind the hero. On devices with a fine pointer, a brighter copy of the
// grid is revealed in a soft circle around the cursor. Decorative only.
export default function BlueprintGrid() {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    const section = el?.parentElement
    if (!el || !section || reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let frame = 0
    let x = 0
    let y = 0
    const apply = () => {
      frame = 0
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
    }
    const onMove = (e) => {
      const r = section.getBoundingClientRect()
      x = e.clientX - r.left
      y = e.clientY - r.top
      el.dataset.active = ''
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onLeave = () => delete el.dataset.active
    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
    return () => {
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [reduced])

  return (
    <div ref={ref} className="blueprint print:hidden" aria-hidden="true">
      <div className="blueprint-base" />
      <div className="blueprint-spot" />
    </div>
  )
}
