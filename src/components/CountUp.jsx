import { useEffect, useRef, useState } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const DURATION = 1000
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t))

// Counts the numeric part of a value like "+18%", "0.94" or "4+ YRS" up from zero when it scrolls into view.
export default function CountUp({ value }) {
  const reduced = usePrefersReducedMotion()
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/)
  const ref = useRef(null)
  const [progress, setProgress] = useState(reduced || !match ? 1 : 0)

  useEffect(() => {
    if (reduced || !match || !ref.current) return setProgress(1)
    let frame
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min((now - start) / DURATION, 1)
        setProgress(easeOutExpo(t))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    observer.observe(ref.current)
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, value])

  if (!match) return value
  const [, prefix, number, suffix] = match
  const decimals = number.includes('.') ? number.split('.')[1].length : 0
  const current = (parseFloat(number) * progress).toFixed(decimals)

  return (
    <span ref={ref}>
      <span aria-hidden="true">{prefix}{current}{suffix}</span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
