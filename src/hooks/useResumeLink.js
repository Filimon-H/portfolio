import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'

const requestHref = `mailto:${profile.email}?subject=${encodeURIComponent(`Request ${profile.name} Resume`)}`

// One shared check per page load.
let pdfCheck
const checkPdf = () =>
  (pdfCheck ??= fetch(profile.resume, { method: 'HEAD' })
    .then((res) => res.ok && (res.headers.get('content-type') || '').includes('pdf'))
    .catch(() => false))

// Links to public/resume.pdf when it exists, otherwise to an email asking for it.
// (The dev server answers missing files with index.html, so check the content type.)
export default function useResumeLink() {
  const [hasPdf, setHasPdf] = useState(false)

  useEffect(() => {
    let cancelled = false
    checkPdf().then((ok) => { if (!cancelled) setHasPdf(ok) })
    return () => { cancelled = true }
  }, [])

  return hasPdf
    ? { href: profile.resume, target: '_blank', rel: 'noopener noreferrer' }
    : { href: requestHref }
}
