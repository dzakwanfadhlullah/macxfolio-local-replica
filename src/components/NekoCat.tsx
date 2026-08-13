import { useEffect, useRef, useState } from "react"

const CAT_SIZE = 48
const FLEE_DISTANCE = 120

export default function NekoCat() {
  const [following, setFollowing] = useState(false)
  const [position, setPosition] = useState(() => ({ x: 16, y: Math.max(16, window.innerHeight - 128) }))
  const [sprite, setSprite] = useState({ x: -3, y: -3 })
  const pointer = useRef({ x: -1000, y: -1000 })
  const target = useRef(position)

  useEffect(() => {
    const move = (event: PointerEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY }
      if (following) target.current = { x: event.clientX - CAT_SIZE / 2, y: event.clientY - CAT_SIZE / 2 }
    }
    window.addEventListener("pointermove", move)
    return () => window.removeEventListener("pointermove", move)
  }, [following])

  useEffect(() => {
    let frame = 0
    let tickCount = 0
    const directions: Record<string, [[number, number], [number, number]]> = {
      N: [[-1, -2], [-1, -3]], NE: [[0, -2], [0, -3]], E: [[-3, 0], [-3, -1]], SE: [[-5, -1], [-5, -2]],
      S: [[-6, -3], [-7, -2]], SW: [[-5, -3], [-6, -1]], W: [[-4, -2], [-4, -3]], NW: [[-1, 0], [-1, -1]],
    }
    const tick = () => {
      setPosition((current) => {
        if (!following) {
          const cx = current.x + CAT_SIZE / 2
          const cy = current.y + CAT_SIZE / 2
          const dx = cx - pointer.current.x
          const dy = cy - pointer.current.y
          const distance = Math.hypot(dx, dy)
          if (distance < FLEE_DISTANCE) {
            const force = (FLEE_DISTANCE - distance) / Math.max(distance, 1)
            target.current = {
              x: Math.min(window.innerWidth - CAT_SIZE, Math.max(0, current.x + dx * force * 0.18)),
              y: Math.min(window.innerHeight - CAT_SIZE, Math.max(42, current.y + dy * force * 0.18)),
            }
          }
        }
        const dx = target.current.x - current.x
        const dy = target.current.y - current.y
        const distance = Math.hypot(dx, dy)
        if (distance < 2) setSprite({ x: -3, y: -3 })
        else {
          const angle = Math.atan2(dy, dx) * 180 / Math.PI
          const direction = angle >= -22.5 && angle < 22.5 ? "E" : angle < 67.5 && angle >= 22.5 ? "SE" : angle < 112.5 && angle >= 67.5 ? "S" : angle < 157.5 && angle >= 112.5 ? "SW" : angle >= 157.5 || angle < -157.5 ? "W" : angle < -112.5 ? "NW" : angle < -67.5 ? "N" : "NE"
          setSprite({ x: directions[direction][Math.floor(tickCount / 8) % 2][0], y: directions[direction][Math.floor(tickCount / 8) % 2][1] })
        }
        return { x: current.x + dx * 0.075, y: current.y + dy * 0.075 }
      })
      tickCount += 1
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [following])

  return (
    <>
      <div className="neko" aria-hidden="true" style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)`, backgroundPosition: `${sprite.x * CAT_SIZE}px ${sprite.y * CAT_SIZE}px` }} />
      <button className="neko-toggle" onClick={() => setFollowing((value) => !value)} aria-pressed={following}>
        <span>You like cats?</span><i className={following ? "on" : ""}><b /></i>
      </button>
    </>
  )
}
