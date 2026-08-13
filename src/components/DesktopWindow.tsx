import { useState } from "react"
import { AnimatePresence, motion, useDragControls } from "motion/react"
import { ArrowLeft, ExternalLink, Mail, MapPin, Pause, Play, Send, X } from "lucide-react"
import { gallery, projects, type Project, type WindowKind } from "../data"
import IPodPlayer from "./IPodPlayer"

export interface WindowInstance {
  id: number
  kind: WindowKind
  project?: Project
}

interface DesktopWindowProps {
  instance: WindowInstance
  order: number
  active: boolean
  onClose: () => void
  onFocus: () => void
}

const windowTitles: Record<WindowKind, string> = {
  home: "Home",
  about: "About",
  projects: "Projects",
  gallery: "Life Dump — Gallery",
  reel: "Reel",
  contact: "Contact",
  resume: "Resume",
  resources: "Resources",
  movies: "My Favorites",
  music: "Music",
  tips: "Tips",
  game: "Herding Cats",
}

function TrafficLights({ onClose }: { onClose: () => void }) {
  return (
    <div className="traffic-lights">
      <button className="traffic-close" onClick={onClose} aria-label="Close"><X size={9} strokeWidth={2.2} /></button>
      <button className="traffic-minimize" aria-label="Minimize" />
      <button className="traffic-expand" aria-label="Expand" />
    </div>
  )
}

function ProjectView({ project }: { project: Project }) {
  return (
    <div className="project-view">
      <div className="project-sidebar">
        <span className="eyebrow">PROJECTS</span>
        {projects.map((item) => <button className={item.slug === project.slug ? "active" : ""} key={item.slug}>{item.title}</button>)}
      </div>
      <main className="project-main">
        <img className="project-hero" src={project.thumb} alt={`${project.title} project`} />
        <div className="project-heading">
          <div><span>{project.type}</span><h2>{project.title}</h2></div>
          <strong>{project.year}</strong>
        </div>
        <p>{project.description}</p>
        <div className="project-meta"><span>Category <b>{project.type}</b></span><span>Client <b>Sonoran National Park</b></span></div>
      </main>
    </div>
  )
}

function AboutView() {
  return (
    <div className="about-view">
      <div className="about-copy">
        <span className="eyebrow">ABOUT ME</span>
        <h1>Mason James</h1>
        <p>I’m a multidisciplinary designer turning ideas into bold digital experiences, thoughtful products, and visual systems people remember.</p>
        <div className="availability"><i />Available for work <span>2026</span></div>
        <div className="about-stats"><span><b>Product</b>Design systems, SaaS, apps</span><span><b>Location</b>Brooklyn, New York</span></div>
      </div>
      <img src="/assets/portrait.png" alt="Mason James" />
    </div>
  )
}

function ProjectsView({ onProject }: { onProject: (project: Project) => void }) {
  return (
    <div className="projects-view">
      <div className="section-heading"><span className="eyebrow">SELECTED WORK</span><h2>Projects</h2></div>
      <div className="project-grid">
        {projects.map((project) => (
          <button key={project.slug} onClick={() => onProject(project)}>
            <img src={project.thumb} alt="" />
            <span><b>{project.title}</b><small>{project.type} · {project.year}</small></span>
          </button>
        ))}
      </div>
    </div>
  )
}

function GalleryView() {
  return <div className="gallery-view">{gallery.map((image, index) => <img key={image} src={image} alt={`Life dump ${index + 1}`} />)}</div>
}

function ResumeView() {
  const skills = ["Figma", "UX Strategy", "Prototyping", "Design Systems", "Framer", "Interaction Design", "SaaS Product Design", "User Research"]
  return (
    <div className="resume-view">
      <header><div><span className="eyebrow">PRODUCT DESIGNER (UI/UX)</span><h1>Mason James</h1></div><div className="resume-contact">talha.uxd@gmail.com<br />+923 3156206413</div></header>
      <p>Creative and detail-oriented Product Designer with 7+ years of experience designing SaaS platforms, mobile applications, dashboards, and high-converting websites.</p>
      <div className="resume-numbers"><span><b>6+</b>Years Experience</span><span><b>50+</b>Projects Completed</span><span><b>25+</b>Collaborations</span></div>
      <section><h3>Experience</h3><article><time>2024 — Present</time><div><b>UI/UX Designer — Prime Capital</b><p>Redesigned onboarding to boost activation and retention. Built scalable multi-product design systems.</p></div></article><article><time>2022 — 2024</time><div><b>Product Designer — North Studio</b><p>Conducted UX research and testing to optimize interfaces and drive conversion.</p></div></article></section>
      <section><h3>Core Skills</h3><div className="skill-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section>
    </div>
  )
}

function ContactView() {
  const [sent, setSent] = useState(false)
  return (
    <div className="contact-view">
      <aside><span className="eyebrow">GET IN TOUCH</span><h1>Mason James</h1><p>Turning ideas into bold digital experiences, products, and visual systems that people remember.</p><div><MapPin size={15} /> Brooklyn</div><div><Mail size={15} /> talha.uxd@gmail.com</div></aside>
      <form onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
        <label>Name *<input required /></label><label>Email *<input type="email" required /></label><label>Message<textarea rows={5} /></label>
        <button type="submit">{sent ? "Message sent" : "Send message"}<Send size={15} /></button>
      </form>
    </div>
  )
}

function ResourcesView() {
  const resources = [
    ["Framer", "Design and ship responsive sites", "/assets/icon-framer.png"],
    ["Figma", "Collaborative product design", "/assets/icon-figma.png"],
    ["Mobbin", "Curated interface patterns", "/assets/dock-gallery.png"],
    ["Refero", "Real product UI references", "/assets/dock-projects.png"],
    ["Typewolf", "Typography inspiration", "/assets/icon-resume.png"],
    ["Are.na", "Research and visual collections", "/assets/icon-resources.png"],
  ]
  return <div className="resources-view"><div className="section-heading"><span className="eyebrow">BOOKMARKS</span><h2>Resources</h2></div><div className="resource-grid">{resources.map(([title, text, image]) => <a href="#" key={title}><img src={image} alt="" /><span><b>{title}</b><small>{text}</small></span><ExternalLink size={15} /></a>)}</div></div>
}

function MoviesView() {
  const titles = ["Interstellar", "Dune: Part Two", "Severance", "The Bear", "Blade Runner 2049", "Past Lives"]
  return <div className="movies-view"><div className="section-heading"><span className="eyebrow">MY FAVORITES</span><h2>Movies / Series</h2></div><div className="movie-grid">{titles.map((title, index) => <article key={title}><img src={gallery[index]} alt="" /><span><b>{title}</b><small>IMDb {(8.1 + index / 10).toFixed(1)}</small></span></article>)}</div></div>
}

function ReelView() {
  const [playing, setPlaying] = useState(false)
  return <button className={`reel-view ${playing ? "playing" : ""}`} onClick={() => setPlaying((value) => !value)}><img src="/assets/gallery-04.png" alt="Showreel cover" /><span>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}<b>{playing ? "Playing showreel" : "Play showreel"}</b></span></button>
}

function TipsView() {
  return <div className="tips-view"><div className="tips-orb">✦</div><h2>Welcome to Mason’s desktop.</h2><p>Double-click an icon to open it. Drag desktop icons and windows anywhere you like. The dock gives you quick access to the main sections.</p><div><kbd>Double click</kbd><span>Open an app</span><kbd>Drag</kbd><span>Move an item</span><kbd>Esc</kbd><span>Close front window</span></div></div>
}

function GameView() {
  return <iframe className="game-frame" src="https://herding-cats-ten.vercel.app" allow="fullscreen" title="Herding Cats Game" />
}

function WindowContent({ instance, onProject }: { instance: WindowInstance; onProject: (project: Project) => void }) {
  if (instance.project) return <ProjectView project={instance.project} />
  switch (instance.kind) {
    case "home": return <AboutView />
    case "about": return <AboutView />
    case "projects": return <ProjectsView onProject={onProject} />
    case "gallery": return <GalleryView />
    case "resume": return <ResumeView />
    case "contact": return <ContactView />
    case "resources": return <ResourcesView />
    case "movies": return <MoviesView />
    case "music": return <div className="ipod-wrap"><IPodPlayer /></div>
    case "reel": return <ReelView />
    case "tips": return <TipsView />
    case "game": return <GameView />
  }
}

export default function DesktopWindow({ instance, order, active, onClose, onFocus }: DesktopWindowProps) {
  const [drilledProject, setDrilledProject] = useState<Project | null>(instance.project ?? null)
  const dragControls = useDragControls()
  const title = drilledProject?.title ?? windowTitles[instance.kind]
  return (
    <AnimatePresence>
      <motion.section
        className={`desktop-window window-${instance.kind} ${active ? "active" : ""}`}
        style={{ zIndex: 20 + order, left: `calc(16% + ${order * 24}px)`, top: `calc(9% + ${order * 17}px)` }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.88 }}
        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 1 }}
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragListener={false}
        onPointerDown={onFocus}
        role="dialog"
        aria-label={title}
      >
        <motion.header className="window-titlebar" onPointerDown={(event) => dragControls.start(event)}>
          <TrafficLights onClose={onClose} />
          <div className="window-title">{drilledProject && <button onClick={() => setDrilledProject(null)} aria-label="Back"><ArrowLeft size={14} /></button>}{title}</div>
          <span />
        </motion.header>
        <div className="window-content">
          <WindowContent instance={drilledProject ? { ...instance, project: drilledProject } : instance} onProject={setDrilledProject} />
        </div>
      </motion.section>
    </AnimatePresence>
  )
}
