import { useEffect, useState } from 'react'
import { loadHighlighter } from '../lib/highlight'

// Read-only code panel with line numbers. Renders plain text first, then swaps in
// highlight.js markup (which escapes the source) once the highlighter has loaded.
export default function CodeBlock({ code, lang, path, url }) {
  const [html, setHtml] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let cancelled = false
    loadHighlighter().then((hljs) => {
      if (!cancelled) setHtml(hljs.highlight(code, { language: lang }).value)
    })
    return () => { cancelled = true }
  }, [code, lang])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch { /* clipboard unavailable — nothing to do */ }
  }

  const lineCount = code.split('\n').length

  return (
    <figure className="border border-hairline bg-surface-container-lowest">
      <figcaption className="flex items-center justify-between gap-space-sm px-space-md py-space-xs border-b border-hairline font-label-mono text-label-mono">
        {url
          ? <a href={url} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary truncate transition-colors duration-quick">{path} ↗</a>
          : <span className="text-on-surface-variant truncate">{path}</span>}
        <button type="button" onClick={copy} className="shrink-0 min-h-[32px] uppercase text-outline hover:text-primary transition-colors duration-quick">
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </figcaption>
      <div className="flex overflow-x-auto font-code-body text-code-body">
        <div className="select-none text-right py-space-md pl-space-md pr-space-sm text-outline-variant" aria-hidden="true">
          {Array.from({ length: lineCount }, (_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        <pre className="py-space-md pr-space-md text-on-surface-variant">
          {html
            ? <code className="hljs" dangerouslySetInnerHTML={{ __html: html }} />
            : <code>{code}</code>}
        </pre>
      </div>
    </figure>
  )
}
