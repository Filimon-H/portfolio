import { profile, socialLinks } from '../data/portfolio'
import Container from './Container'

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-hairline">
      <Container className="py-space-xl flex flex-col sm:flex-row items-center justify-between gap-space-md font-label-mono text-label-mono uppercase text-outline">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <ul className="flex items-center gap-space-lg">
          {socialLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[40px] hover:text-primary transition-colors duration-quick">{l.label}</a>
            </li>
          ))}
          <li>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center min-h-[40px] hover:text-primary transition-colors duration-quick">Email</a>
          </li>
        </ul>
      </Container>
    </footer>
  )
}
