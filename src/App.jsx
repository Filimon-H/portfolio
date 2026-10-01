import useReveal from './hooks/useReveal'
import Header from './components/Header'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

export default function App() {
  useReveal()

  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-on-primary focus:px-3 focus:py-2 font-label-mono text-label-mono uppercase">
        Skip to content
      </a>
      <Header />
      <main className="w-full pt-16 bg-surface">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
