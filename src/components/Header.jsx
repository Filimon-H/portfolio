import { useEffect, useRef, useState } from 'react'
import { profile, navLinks } from '../data/portfolio'
import useActiveSection from '../hooks/useActiveSection'
import Icon from './Icon'
import { openPalette, isMac } from './CommandPalette'

const sectionIds = navLinks.map((l) => l.id)

export default function Header() {
  const active = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)
  const progressRef = useRef(null)

  // Hairline reading-progress bar along the bottom edge of the header.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
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
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const linkClass = (id) =>
    `font-label-mono text-label-mono uppercase transition-colors duration-quick py-1 border-b ${
      active === id ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-primary'
    }`

  return (
    <header className="print:hidden fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b border-hairline">
      <div className="h-16 max-w-[1240px] mx-auto px-gutter-sm lg:px-gutter flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <a className="flex items-center h-10 gap-space-xs font-label-mono text-label-mono uppercase tracking-wider" href="#about">
            <span className="text-primary font-bold">FH</span>
            <span className="text-outline-variant" aria-hidden="true">//</span>
            <span className="text-on-surface-variant">ML.AI</span>
          </a>
          <div className="hidden 2xl:flex items-center gap-space-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">{profile.availability}</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-space-lg" aria-label="Main">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={linkClass(l.id)} aria-current={active === l.id ? 'location' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-space-sm">
          <button
            type="button"
            onClick={openPalette}
            className="hidden md:inline-flex items-center gap-space-sm h-10 px-3 border border-hairline hover:border-primary font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors duration-quick"
            aria-label="Open command palette"
          >
            Search
            <kbd className="text-outline">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
          </button>
          <a className="inline-flex items-center justify-center h-10 bg-primary text-on-primary hover:bg-surface hover:text-primary border border-primary px-3 font-label-mono text-label-mono uppercase transition-colors" href={`mailto:${profile.email}`}>
            Get in Touch
          </a>
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-primary border border-hairline hover:border-primary transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} className="text-[18px]" />
          </button>
        </div>
      </div>

      <div className="absolute left-0 bottom-[-1px] h-px w-full origin-left bg-primary/70 pointer-events-none" ref={progressRef} style={{ transform: 'scaleX(0)' }} aria-hidden="true" />

      {menuOpen && (
        <nav id="mobile-nav" className="md:hidden border-t border-hairline bg-surface animate-panel-in" aria-label="Mobile">
          <div className="max-w-[1240px] mx-auto px-gutter-sm lg:px-gutter py-space-sm flex flex-col">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={() => setMenuOpen(false)} className={`${linkClass(l.id)} py-3 border-b-0`}>
                {l.label}
              </a>
            ))}
            <button type="button" onClick={() => { setMenuOpen(false); openPalette() }} className="text-left font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary py-3 transition-colors duration-quick">
              Commands…
            </button>
          </div>
        </nav>
      )}
    </header>
  )
}
