import { useEffect } from 'react'

// Marks every [data-reveal] element with [data-revealed] the first time it scrolls into view.
// The CSS in index.css does the animating, and only under prefers-reduced-motion: no-preference.
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.setAttribute('data-revealed', ''))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.setAttribute('data-revealed', '')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// Spread onto an element to reveal it, optionally staggered by its index.
export const reveal = (index = 0, step = 60) => ({ 'data-reveal': '', style: { '--d': `${index * step}ms` } })
