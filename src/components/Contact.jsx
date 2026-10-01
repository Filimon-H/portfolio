import { reveal } from '../hooks/useReveal'
import { useEffect, useRef, useState } from 'react'
import { profile, socialLinks } from '../data/portfolio'
import Container from './Container'

const STATUS = {
  idle: '',
  sending: 'Sending…',
  sent: 'Message sent. I’ll reply by email.',
  error: 'Couldn’t send. Please email me directly instead.',
}

const fields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Jane Doe', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com', autoComplete: 'email' },
]

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef()
  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopied(false), 3000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const res = await fetch(profile.formspree, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`)
      form.reset()
      setStatus('sent')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section className="w-full bg-surface-container-lowest py-margin-lg" id="contact">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-gutter-lg items-start">
        <div className="lg:col-span-6 space-y-space-lg" {...reveal()}>
          <div className="space-y-space-sm">
            <div className="eyebrow">05 / Contact</div>
            <h2 className="font-display-hero text-display-hero-mobile lg:text-display-hero text-primary tracking-tight">Let’s talk.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">{profile.contactBlurb}</p>
          </div>

          <div className="space-y-space-sm">
            <a href={`mailto:${profile.email}`} className="inline-block py-1.5 font-headline-md text-headline-md text-primary underline decoration-hairline underline-offset-8 hover:decoration-primary transition-colors duration-quick break-all">
              {profile.email}
            </a>
            <button type="button" onClick={copyEmail} className="inline-flex items-center min-h-[40px] font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors duration-quick" aria-live="polite">
              {copied ? 'Copied ✓' : 'Copy email'}
            </button>
          </div>

          <div className="font-body-md text-body-md text-outline space-y-1">
            <p><a href={`tel:${profile.phoneHref}`} className="hover:text-primary transition-colors duration-quick">{profile.phone}</a></p>
            <p>{profile.location}</p>
            <p className="flex gap-space-lg">
              {socialLinks.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[40px] text-on-surface-variant hover:text-primary transition-colors duration-quick">{l.label} ↗</a>
              ))}
            </p>
          </div>
        </div>

        <form className="lg:col-span-6 space-y-space-md" onSubmit={submit} {...reveal(1, 100)}>
          {fields.map((f) => (
            <div key={f.name} className="space-y-1.5">
              <label htmlFor={`contact-${f.name}`} className="eyebrow">{f.label}</label>
              <input id={`contact-${f.name}`} name={f.name} type={f.type} placeholder={f.placeholder} autoComplete={f.autoComplete} required className="field" />
            </div>
          ))}
          <div className="space-y-1.5">
            <label htmlFor="contact-message" className="eyebrow">Message</label>
            <textarea id="contact-message" name="message" rows={5} required className="field resize-none" placeholder="What are you working on?" />
          </div>
          <input type="hidden" name="_subject" value="New message from your portfolio" />
          {/* Honeypot: Formspree drops submissions where this is filled (bots fill every field). */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
            <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60 disabled:cursor-wait">
              Send Message
            </button>
            <span className={`font-body-sm text-body-sm ${status === 'error' ? 'text-error' : 'text-on-surface-variant'}`} role="status">
              {STATUS[status]}
            </span>
          </div>
        </form>
      </Container>
    </section>
  )
}
