import { useMemo, useState } from "react"
import { Pause, Play, SkipBack, SkipForward } from "lucide-react"

const tracks = [
  { title: "Never Gonna Give You Up", artist: "Rick Astley", duration: "3:33" },
  { title: "Gangnam Style", artist: "PSY", duration: "4:12" },
  { title: "Despacito", artist: "Luis Fonsi", duration: "4:41" },
]

export default function IPodPlayer() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [menu, setMenu] = useState<"main" | "songs" | "now">("main")
  const track = tracks[index]
  const progress = useMemo(() => (playing ? 44 : 18), [playing, index])

  const next = () => setIndex((value) => (value + 1) % tracks.length)
  const previous = () => setIndex((value) => (value - 1 + tracks.length) % tracks.length)

  return (
    <div className="ipod" aria-label="Interactive iPod player">
      <div className="ipod-screen">
        <div className="ipod-status"><b>iPod</b><span>▮▮▮</span></div>
        {menu === "main" && (
          <div className="ipod-menu">
            <h3>iPod</h3>
            <button onClick={() => setMenu("songs")}>Music <span>›</span></button>
            <button onClick={() => setMenu("now")}>Now Playing <span>›</span></button>
            <button>Settings <span>›</span></button>
            <button>Shuffle Songs <span>›</span></button>
          </div>
        )}
        {menu === "songs" && (
          <div className="ipod-menu">
            <h3>All Songs</h3>
            {tracks.map((item, itemIndex) => (
              <button key={item.title} onClick={() => { setIndex(itemIndex); setMenu("now"); setPlaying(true) }} className={itemIndex === index ? "selected" : ""}>
                {item.title}<span>›</span>
              </button>
            ))}
          </div>
        )}
        {menu === "now" && (
          <div className="now-playing">
            <div className="album-art">MJ</div>
            <strong>{track.title}</strong>
            <span>{track.artist}</span>
            <div className="song-progress"><i style={{ width: `${progress}%` }} /></div>
            <small>1:04 <span>{track.duration}</span></small>
          </div>
        )}
      </div>
      <div className="click-wheel">
        <button className="wheel-menu" onClick={() => setMenu("main")}>MENU</button>
        <button className="wheel-prev" onClick={previous} aria-label="Previous"><SkipBack size={18} fill="currentColor" /></button>
        <button className="wheel-next" onClick={next} aria-label="Next"><SkipForward size={18} fill="currentColor" /></button>
        <button className="wheel-play" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause" : "Play"}>{playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}</button>
        <button className="wheel-center" onClick={() => setMenu(menu === "main" ? "songs" : "now")} aria-label="Select" />
      </div>
    </div>
  )
}
