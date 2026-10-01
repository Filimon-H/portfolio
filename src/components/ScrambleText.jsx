import { useEffect, useRef, useState } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01'
const DURATION = 420
const FRAME = 28

// Letters flicker through glyphs and lock in left to right the first time the text scrolls into view.
// Screen readers always get the real text; spaces never scramble, so the line width doesn't jump.
export default function ScrambleText({ text, as: Tag = 'span', className = '', ...rest }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (reduced || !ref.current) return setDisplay(text)
    let timer
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = () => {
        const progress = Math.min((performance.now() - start) / DURATION, 1)
        const locked = Math.floor(progress * text.length)
        setDisplay(
          [...text].map((ch, i) => (i < locked || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(''),
        )
        if (progress < 1) timer = setTimeout(tick, FRAME)
      }
      tick()
    }, { threshold: 0.6 })
    observer.observe(ref.current)
    return () => { observer.disconnect(); clearTimeout(timer) }
  }, [reduced, text])

  return (
    <Tag ref={ref} className={className} {...rest}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </Tag>
  )
}
