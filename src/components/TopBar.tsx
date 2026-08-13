import { useEffect, useState } from "react"

interface TopBarProps {
  onAbout: () => void
  onProjects: () => void
}

export default function TopBar({ onAbout, onProjects }: TopBarProps) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(interval)
  }, [])
  const date = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(now)
  const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(now)

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="brand" onClick={onAbout}>Mason James</button>
        <nav className="top-links" aria-label="Primary">
          <button onClick={onAbout}>About</button>
          <button onClick={onProjects}>Projects</button>
          <button>Freebies</button>
          <button>AI Exploration</button>
        </nav>
      </div>
      <div className="topbar-right">
        <a href="https://www.linkedin.com/feed/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v2a4 4 0 0 1 2-3Z"/><path d="M2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X" className="x-glyph">𝕏</a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
        </a>
        <span className="clock">{date} {time}</span>
      </div>
    </header>
  )
}
