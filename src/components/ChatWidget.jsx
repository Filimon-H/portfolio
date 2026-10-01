import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/portfolio'
import Icon from './Icon'

// Leave empty for demo mode; set to your FastAPI endpoint when ready (e.g. 'https://api.yourdomain.com/chat')
const API_URL = ''
const DEMO_MODE = !API_URL
const HISTORY_KEY = 'fh_chat_history'
const MAX_HISTORY = 20 // last 10 turns

const GREETING = {
  role: 'bot',
  content: (
    <>
      Hi, I’m Filimon’s assistant. Try:
      <br />• What is your RAG stack?
      <br />• Show me the fraud detection project.
      <br />• Are you open to remote roles?
    </>
  ),
}

function demoResponder(q) {
  const lc = q.toLowerCase()
  if (lc.includes('rag') || lc.includes('assistant'))
    return 'Demo: My RAG stack uses LangChain + ChromaDB with Groq LLM, served via FastAPI with guardrails. Ask for ‘projects’ or ‘skills’.'
  if (lc.includes('project'))
    return 'Demo: Projects → Ethiopian Tax Law RAG, Fraud Detection with SHAP, Brent Oil Change-Point Dashboard, Telegram Analytics API.'
  if (lc.includes('skill') || lc.includes('stack'))
    return 'Demo: Python, FastAPI, Docker, LangChain, Chroma/FAISS, scikit-learn, PyTorch/TF, dbt, Dagster, PostgreSQL, PyMC.'
  if (lc.includes('available') || lc.includes('hire') || lc.includes('remote'))
    return `Demo: Yes — based in Ethiopia (UTC+3), open to remote roles. Contact via the form or email ${profile.email}.`
  return 'Demo: I can answer about Filimon’s skills, projects, and availability. Try: ‘What is your RAG stack?’ or ‘Show me the fraud project’.'
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
  } catch {
    return []
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch {
    // storage unavailable (private mode etc.) — history just won't persist
  }
}

const isSafeUrl = (s) => typeof s === 'string' && /^https?:\/\//i.test(s)

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [thinking, setThinking] = useState(false)
  const historyRef = useRef(loadHistory())
  const logRef = useRef(null)
  const inputRef = useRef(null)
  const launcherRef = useRef(null)
  const [nearTop, setNearTop] = useState(true)

  // The "ask" label only shows near the top so it doesn't sit on top of content further down.
  useEffect(() => {
    const onScroll = () => setNearTop(window.scrollY < 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [messages, thinking])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Escape closes the panel and hands focus back to the launcher.
  const closeChat = () => {
    setOpen(false)
    launcherRef.current?.focus()
  }
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && closeChat()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const openChat = () => {
    setOpen(true)
    setMessages((m) => (m.length ? m : [GREETING]))
  }

  const resizeInput = (el) => {
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 140) + 'px'
  }

  const send = async (e) => {
    e.preventDefault()
    const q = text.trim()
    if (!q || thinking) return

    setMessages((m) => [...m, { role: 'user', content: q }])
    setText('')
    if (inputRef.current) inputRef.current.style.height = '44px'
    setThinking(true)

    try {
      let data
      if (DEMO_MODE) {
        await new Promise((r) => setTimeout(r, 400)) // simulate latency
        data = { reply: demoResponder(q), sources: [] }
      } else {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: q, history: historyRef.current }),
        })
        if (!res.ok) throw new Error(`Chat API responded ${res.status}`)
        data = await res.json()
      }

      const reply = data?.reply || 'Sorry, I could not get a response right now.'
      const sources = Array.isArray(data?.sources) ? data.sources.filter(isSafeUrl) : []
      setMessages((m) => [...m, { role: 'bot', content: reply, sources }])

      const history = [...historyRef.current, { role: 'user', content: q }, { role: 'assistant', content: reply }].slice(-MAX_HISTORY)
      historyRef.current = history
      saveHistory(history)
    } catch (err) {
      console.error(err)
      setMessages((m) => [...m, { role: 'bot', content: 'Network error. Please try again.' }])
    } finally {
      setThinking(false)
    }
  }

  return (
    <>
      <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-[60] flex items-center gap-space-sm">
        {!open && nearTop && (
          <div className="hidden sm:block animate-panel-in panel bg-surface-container-lowest px-3 py-2 font-label-mono text-label-mono uppercase text-on-surface-variant">
            &gt; ask_about --filimon
          </div>
        )}
        <button
          ref={launcherRef}
          onClick={open ? closeChat : openChat}
          aria-label={open ? 'Close chatbot' : 'Open chatbot'}
          aria-expanded={open}
          aria-controls="chat-panel"
          className="w-12 h-12 flex items-center justify-center bg-primary text-on-primary border border-primary hover:bg-surface hover:text-primary active:translate-y-px transition duration-quick ease-instrument"
        >
          <Icon name={open ? 'close' : 'terminal'} className="text-[22px]" />
        </button>
      </div>

      {open && (
        <section
          id="chat-panel"
          role="dialog"
          aria-label="Chat with Filimon's assistant"
          className="fixed right-4 sm:right-6 bottom-20 sm:bottom-[88px] z-[70] w-[min(400px,calc(100vw-2rem))] max-h-[70vh] grid grid-rows-[auto_1fr_auto] panel bg-surface-container-lowest animate-panel-in"
        >
          <div className="flex items-center justify-between px-space-md py-space-sm border-b border-hairline">
            <span className="flex items-center gap-space-xs font-label-mono text-label-mono uppercase text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              FILIMON_ASSISTANT.SH {DEMO_MODE && <span className="text-outline">[DEMO]</span>}
            </span>
            <button onClick={closeChat} className="font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-primary transition-colors" aria-label="Close chat">
              [ close ]
            </button>
          </div>

          <div ref={logRef} className="overflow-y-auto p-space-md space-y-space-sm" aria-live="polite" aria-atomic="false">
            {messages.map((msg, i) => (
              <div key={i} className={`flex animate-panel-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 font-code-body text-code-body border ${
                    msg.role === 'user' ? 'bg-surface-container border-outline-variant text-primary' : 'bg-surface border-hairline text-on-surface-variant'
                  }`}
                >
                  {msg.role === 'bot' && <div className="eyebrow mb-1">&gt; assistant</div>}
                  {msg.content}
                  {msg.sources?.length > 0 && (
                    <div className="mt-1.5 font-label-mono text-label-mono">
                      {msg.sources.map((s, j) => (
                        <span key={s}>
                          {j > 0 && ' · '}
                          <a className="text-primary underline underline-offset-2" href={s} target="_blank" rel="noopener noreferrer">[source_{j + 1}]</a>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {thinking && <div className="font-label-mono text-label-mono uppercase text-outline animate-pulse">&gt; inferring…</div>}
          </div>

          <form className="flex items-end gap-space-sm p-space-sm border-t border-hairline" onSubmit={send}>
            <label htmlFor="chat-input" className="sr-only">Message</label>
            <textarea
              id="chat-input"
              ref={inputRef}
              value={text}
              rows={1}
              placeholder="$ ask about projects, skills, availability…"
              className="field flex-1 resize-none min-h-[44px] max-h-[140px]"
              onChange={(e) => { setText(e.target.value); resizeInput(e.target) }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); e.currentTarget.form.requestSubmit() }
              }}
            />
            <button type="submit" disabled={thinking} className="h-[44px] px-4 bg-primary text-on-primary border border-primary font-label-mono text-label-mono uppercase hover:bg-surface hover:text-primary transition-colors disabled:opacity-60">
              Send
            </button>
          </form>
        </section>
      )}
    </>
  )
}
