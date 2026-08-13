import { motion } from "motion/react"
import type { WindowKind } from "../data"

interface DockItem {
  label: string
  image: string
  kind: WindowKind
}

const items: DockItem[] = [
  { label: "About", image: "/assets/dock-about.png", kind: "about" },
  { label: "Projects", image: "/assets/dock-projects.png", kind: "projects" },
  { label: "Gallery", image: "/assets/dock-gallery.png", kind: "gallery" },
  { label: "Reel", image: "/assets/dock-reel.png", kind: "reel" },
  { label: "Contact", image: "/assets/dock-contact.png", kind: "contact" },
]

interface DockProps {
  onOpen: (kind: WindowKind) => void
}

export default function Dock({ onOpen }: DockProps) {
  return (
    <motion.nav className="dock" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.65, type: "spring", stiffness: 300, damping: 38 }} aria-label="Portfolio dock">
      {items.map((item) => (
        <motion.button key={item.kind} className="dock-item" onClick={() => onOpen(item.kind)} whileHover={{ width: 56, height: 56 }} transition={{ type: "spring", stiffness: 400, damping: 34 }}>
          <span className="dock-tooltip">{item.label}</span>
          <img src={item.image} alt="" draggable={false} />
        </motion.button>
      ))}
    </motion.nav>
  )
}
