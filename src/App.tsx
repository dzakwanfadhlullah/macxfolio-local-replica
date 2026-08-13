import { useCallback, useEffect, useMemo, useState } from "react"
import { AnimatePresence } from "motion/react"
import DesktopWindow, { type WindowInstance } from "./components/DesktopWindow"
import Dock from "./components/Dock"
import FloatingIcon from "./components/FloatingIcon"
import NekoCat from "./components/NekoCat"
import Preloader from "./components/Preloader"
import TopBar from "./components/TopBar"
import { desktopItems, mobileItemIds, projects, type Project, type WindowKind } from "./data"

export default function App() {
  const [loading, setLoading] = useState(true)
  const [windows, setWindows] = useState<WindowInstance[]>([])
  const [activeId, setActiveId] = useState<number | null>(null)
  const [nextId, setNextId] = useState(1)

  const finishLoading = useCallback(() => setLoading(false), [])
  const mobileItems = useMemo(() => mobileItemIds.map((id) => desktopItems.find((item) => item.id === id)!), [])

  const openWindow = useCallback((kind: WindowKind, project?: Project) => {
    setWindows((current) => {
      const match = current.find((window) => window.kind === kind && window.project?.slug === project?.slug && (!project || Boolean(window.project)))
      if (match) {
        setActiveId(match.id)
        return current
      }
      const instance = { id: nextId, kind, project }
      setActiveId(nextId)
      setNextId((value) => value + 1)
      return [...current, instance]
    })
  }, [nextId])

  const openFromItem = useCallback((itemId: string, kind?: WindowKind) => {
    if (!kind) return
    const project = projects.find((entry) => entry.slug === itemId)
    openWindow(kind, project)
  }, [openWindow])

  const closeWindow = useCallback((id: number) => {
    setWindows((current) => {
      const remaining = current.filter((window) => window.id !== id)
      setActiveId(remaining.at(-1)?.id ?? null)
      return remaining
    })
  }, [])

  const focusWindow = useCallback((id: number) => {
    setWindows((current) => {
      const target = current.find((window) => window.id === id)
      if (!target || current.at(-1)?.id === id) return current
      return [...current.filter((window) => window.id !== id), target]
    })
    setActiveId(id)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeId !== null) closeWindow(activeId)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [activeId, closeWindow])

  return (
    <main className="desktop-shell">
      <TopBar onAbout={() => openWindow("about")} onProjects={() => openWindow("projects", projects[0])} />

      <section className="desktop-stage" aria-label="Interactive portfolio desktop">
        <div className="desktop-layout">
          {desktopItems.map((item) => (
            <FloatingIcon key={item.id} item={item} onActivate={() => openFromItem(item.id, item.window)} />
          ))}
        </div>

        <div className="mobile-layout">
          <div className="mobile-grid">
            {mobileItems.map((item) => (
              <FloatingIcon key={item.id} item={item} mobile onActivate={() => openFromItem(item.id, item.window)} />
            ))}
          </div>
        </div>
      </section>

      <div className="dock-wrap"><Dock onOpen={(kind) => openWindow(kind, kind === "projects" ? projects[0] : undefined)} /></div>

      <AnimatePresence>
        {windows.map((instance, index) => (
          <DesktopWindow
            key={instance.id}
            instance={instance}
            order={index}
            active={activeId === instance.id}
            onFocus={() => focusWindow(instance.id)}
            onClose={() => closeWindow(instance.id)}
          />
        ))}
      </AnimatePresence>

      {!loading && <NekoCat />}
      {loading && <Preloader onDone={finishLoading} />}
    </main>
  )
}
