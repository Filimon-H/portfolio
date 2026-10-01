import { useEffect, useMemo, useRef, useState } from 'react'
import { profile } from '../data/portfolio'
import useResumeLink from '../hooks/useResumeLink'

export const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
export const openPalette = () => window.dispatchEvent(new Event('fh:palette'))

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
const openUrl = (href) => window.open(href, '_blank', 'noopener,noreferrer')

// Subsequence match: "gh" matches "Open GitHub". Lower score = better.
function score(query, text) {
  if (!query) return 0
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  const direct = t.indexOf(q)
  if (direct !== -1) return direct
  let ti = 0
  for (const ch of q) {
    ti = t.indexOf(ch, ti)
    if (ti === -1) return Infinity
    ti += 1
  }
  return 100 + ti
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [toast, setToast] = useState('')
  const inputRef = useRef(null)
  const returnFocus = useRef(null)
  const resume = useResumeLink()

  const commands = useMemo(() => [
    ...[['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['experience', 'Experience'], ['activity', 'GitHub activity'], ['education', 'Education'], ['contact', 'Contact']]
      .map(([id, label]) => ({ group: 'Go to', label, hint: `#${id}`, run: () => go(id) })),
    { group: 'Actions', label: 'Copy email address', hint: profile.email, run: async () => {
      try { await navigator.clipboard.writeText(profile.email); setToast('Email copied') } catch { window.location.href = `mailto:${profile.email}` }
    } },
    { group: 'Actions', label: 'Send an email', hint: 'mailto', run: () => { window.location.href = `mailto:${profile.email}` } },
    { group: 'Actions', label: 'Ask the assistant', hint: 'chat', run: () => window.dispatchEvent(new Event('fh:open-chat')) },
    { group: 'Actions', label: 'Projects: engineer view', hint: 'YAML + source', run: () => { window.dispatchEvent(new CustomEvent('fh:projects-view', { detail: 'engineer' })); go('projects') } },
    { group: 'Actions', label: 'Projects: overview', hint: 'summary', run: () => { window.dispatchEvent(new CustomEvent('fh:projects-view', { detail: 'overview' })); go('projects') } },
    { group: 'Actions', label: 'Print résumé / save as PDF', hint: isMac ? '⌘P' : 'Ctrl+P', run: () => setTimeout(() => window.print(), 50) },
    { group: 'Actions', label: 'Download résumé', hint: 'PDF', run: () => (resume.target ? openUrl(resume.href) : (window.location.href = resume.href)) },
    { group: 'Links', label: 'Open GitHub', hint: 'github.com/Filimon-H', run: () => openUrl(profile.github) },
    { group: 'Links', label: 'Open LinkedIn', hint: 'linkedin.com', run: () => openUrl(profile.linkedin) },
  ], [resume])

  const results = useMemo(
    () => commands
      .map((c) => ({ c, s: score(query, `${c.group} ${c.label}`) }))
      .filter((r) => r.s !== Infinity)
      .sort((a, b) => a.s - b.s)
      .map((r) => r.c),
    [commands, query],
  )

  // Global shortcuts: ⌘K / Ctrl+K anywhere, "/" when not typing in a field.
  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('fh:palette', onOpen)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('fh:palette', onOpen) }
  }, [])

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement
      setQuery('')
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      returnFocus.current?.focus?.()
    }
  }, [open])

  useEffect(() => { setActive(0) }, [query])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 1800)
    return () => clearTimeout(t)
  }, [toast])

  const run = (cmd) => {
    setOpen(false)
    cmd.run()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    else if (e.key === 'Enter' && results[active]) { e.preventDefault(); run(results[active]) }
    else if (e.key === 'Escape') { e.preventDefault(); setOpen(false) }
    else if (e.key === 'Tab') e.preventDefault() // keep focus in the palette
  }

  useEffect(() => {
    document.getElementById(`cmd-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  return (
    <>
      {toast && (
        <div role="status" className="print:hidden fixed left-1/2 -translate-x-1/2 bottom-6 z-[90] panel bg-surface-container-lowest px-space-md py-space-sm font-label-mono text-label-mono uppercase text-primary animate-panel-in">
          ✓ {toast}
        </div>
      )}
      {open && (
        <div className="print:hidden fixed inset-0 z-[80] flex items-start justify-center px-gutter-sm pt-[12vh] bg-black/60 backdrop-blur-sm" onMouseDown={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-xl panel bg-surface-container-lowest animate-panel-in"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-space-sm px-space-md border-b border-hairline">
              <span className="font-code-body text-code-body text-outline" aria-hidden="true">&gt;</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a command or section…"
                className="flex-1 h-12 bg-transparent outline-none font-code-body text-code-body text-primary placeholder:text-outline"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmd-list"
                aria-activedescendant={results[active] ? `cmd-${active}` : undefined}
                aria-autocomplete="list"
              />
              <kbd className="font-label-mono text-label-mono text-outline border border-hairline px-1.5 py-0.5">esc</kbd>
            </div>
            <ul id="cmd-list" role="listbox" className="max-h-[50vh] overflow-y-auto py-space-xs">
              {results.length === 0 && <li className="px-space-md py-space-md font-code-body text-code-body text-outline">No matches.</li>}
              {results.map((cmd, i) => (
                <li
                  key={`${cmd.group}-${cmd.label}`}
                  id={`cmd-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => run(cmd)}
                  className={`flex items-center justify-between gap-space-md px-space-md py-2.5 cursor-pointer border-l ${i === active ? 'bg-surface-container border-primary' : 'border-transparent'}`}
                >
                  <span className="flex items-baseline gap-space-sm min-w-0">
                    <span className="w-16 shrink-0 font-label-mono text-label-mono uppercase text-outline">{cmd.group}</span>
                    <span className={`truncate font-body-md text-body-md ${i === active ? 'text-primary' : 'text-on-surface'}`}>{cmd.label}</span>
                  </span>
                  <span className="hidden sm:block shrink-0 font-label-mono text-label-mono text-outline truncate max-w-[40%]">{cmd.hint}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-space-md px-space-md py-space-xs border-t border-hairline font-label-mono text-label-mono text-outline">
              <span>↑↓ navigate</span><span>↵ run</span><span className="ml-auto">{isMac ? '⌘K' : 'Ctrl K'} toggle</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
