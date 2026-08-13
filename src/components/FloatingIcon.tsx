import { motion, useReducedMotion } from "motion/react"
import type { DesktopItem } from "../data"

interface FloatingIconProps {
  item: DesktopItem
  mobile?: boolean
  onActivate: () => void
}

export default function FloatingIcon({ item, mobile = false, onActivate }: FloatingIconProps) {
  const reduceMotion = useReducedMotion()
  const handleActivate = () => {
    if (item.href) window.open(item.href, "_blank", "noopener,noreferrer")
    else onActivate()
  }

  return (
    <motion.button
      className={`desktop-item ${mobile ? "desktop-item-mobile" : item.className}`}
      onClick={mobile ? handleActivate : undefined}
      onDoubleClick={handleActivate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") handleActivate()
      }}
      drag={!mobile}
      dragMomentum={false}
      whileDrag={{ scale: 1.04, cursor: "grabbing", zIndex: 8 }}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={reduceMotion ? { duration: 0 } : { delay: 3.6, type: "spring", stiffness: 300, damping: 100, mass: 0.1 }}
      aria-label={`${item.label}. Double click to open.`}
    >
      <motion.span className="desktop-icon-frame" whileHover={mobile ? undefined : { y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 100, mass: 7.6 }}>
        <img src={item.image} alt="" draggable={false} />
      </motion.span>
      <span className="desktop-icon-label">{item.label}</span>
    </motion.button>
  )
}
