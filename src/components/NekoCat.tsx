import { useEffect, useRef, useState } from "react"

export default function NekoCat() {
  const [enabled, setEnabled] = useState(true)
  const [position, setPosition] = useState({ x: 18, y: 18 })
  const [sprite, setSprite] = useState({ x: -3, y: -3 })
  const target = useRef({ x: 18, y: 18 })

  useEffect(() => {
    if (!enabled) return
    const move = (event: PointerEvent) => {
      target.current = { x: event.clientX - 16, y: event.clientY - 16 }
    }
    let frame = 0
    let tickCount = 0
    const directions: Record<string, [[number, number], [number, number]]> = {
      N: [[-1, -2], [-1, -3]], NE: [[0, -2], [0, -3]], E: [[-3, 0], [-3, -1]], SE: [[-5, -1], [-5, -2]],
      S: [[-6, -3], [-7, -2]], SW: [[-5, -3], [-6, -1]], W: [[-4, -2], [-4, -3]], NW: [[-1, 0], [-1, -1]],
    }
    const tick = () => {
      setPosition((current) => ({
        x: current.x + (target.current.x - current.x) * 0.075,
        y: current.y + (target.current.y - current.y) * 0.075,
      }))
      setPosition((current) => {
        const dx = target.current.x - current.x
        const dy = target.current.y - current.y
        const distance = Math.hypot(dx, dy)
        if (distance < 12) setSprite({ x: -3, y: -3 })
        else {
          const angle = Math.atan2(dy, dx) * 180 / Math.PI
          const direction = angle >= -22.5 && angle < 22.5 ? "E" : angle < 67.5 && angle >= 22.5 ? "SE" : angle < 112.5 && angle >= 67.5 ? "S" : angle < 157.5 && angle >= 112.5 ? "SW" : angle >= 157.5 || angle < -157.5 ? "W" : angle < -112.5 ? "NW" : angle < -67.5 ? "N" : "NE"
          const [x, y] = directions[direction][Math.floor(tickCount / 8) % 2]
          setSprite({ x, y })
        }
        return current
      })
      tickCount += 1
      frame = requestAnimationFrame(tick)
    }
    window.addEventListener("pointermove", move)
    frame = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("pointermove", move)
      cancelAnimationFrame(frame)
    }
  }, [enabled])

  return (
    <>
      {enabled && <div className="neko" aria-hidden="true" style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)`, backgroundPosition: `${sprite.x * 48}px ${sprite.y * 48}px` }} />}
      <button className="neko-toggle" onClick={() => setEnabled((value) => !value)}>
        <span>You like cats?</span><i className={enabled ? "on" : ""}><b /></i>
      </button>
    </>
  )
}
