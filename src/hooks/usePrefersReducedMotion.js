import { useEffect, useState } from 'react'

const query = '(prefers-reduced-motion: reduce)'
const getInitial = () => typeof window !== 'undefined' && window.matchMedia(query).matches

export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(getInitial)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setReduced(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}
