import { useEffect } from 'react'

const SELECTOR = '[data-reveal]:not([data-revealed])'

// Marks every [data-reveal] element with [data-revealed] the first time it scrolls into view.
// Elements added later (e.g. switching the Projects view) are picked up via a MutationObserver.
// The CSS in index.css does the animating, and only under prefers-reduced-motion: no-preference.
export default function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      const revealAll = () => document.querySelectorAll(SELECTOR).forEach((el) => el.setAttribute('data-revealed', ''))
      revealAll()
      const mo = new MutationObserver(revealAll)
      mo.observe(document.body, { childList: true, subtree: true })
      return () => mo.disconnect()
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.setAttribute('data-revealed', '')
          io.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    const observeAll = (root = document) => root.querySelectorAll(SELECTOR).forEach((el) => io.observe(el))

    observeAll()
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return
        if (node.matches(SELECTOR)) io.observe(node)
        observeAll(node)
      }))
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => { io.disconnect(); mo.disconnect() }
  }, [])
}

// Spread onto an element to reveal it, optionally staggered by its index.
export const reveal = (index = 0, step = 60) => ({ 'data-reveal': '', style: { '--d': `${index * step}ms` } })
