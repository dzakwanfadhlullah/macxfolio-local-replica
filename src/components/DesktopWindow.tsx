import { useState } from "react"
import { AnimatePresence, motion, useDragControls } from "motion/react"
import { Check, Copy, ExternalLink, MapPin, Send, X } from "lucide-react"
import { favorites, gallery, projects, resources, services, type Project, type WindowKind } from "../data"
import IPodPlayer from "./IPodPlayer"

export interface WindowInstance { id: number; kind: WindowKind; project?: Project }
interface DesktopWindowProps { instance: WindowInstance; order: number; active: boolean; onClose: () => void; onFocus: () => void }

const windowTitles: Record<WindowKind, string> = {
  home: "Home", about: "About", projects: "Projects", gallery: "Life Dump — Gallery", reel: "Reel",
  contact: "Contact", resume: "Resume", resources: "Resources", movies: "My Favorites", music: "Music", game: "Herding Cats",
}

function TrafficLights({ onClose }: { onClose: () => void }) {
  return <div className="traffic-lights"><button className="traffic-close" onClick={onClose} aria-label="Close"><X size={8} /></button><button className="traffic-minimize" aria-label="Minimize" /><button className="traffic-expand" aria-label="Expand" /></div>
}

function Socials() {
  return <div className="window-socials"><a href="https://www.linkedin.com/feed/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v2a4 4 0 0 1 2-3Z"/><path d="M2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a><a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X">𝕏</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a></div>
}

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)
  return <button className="copy-row" onClick={async () => { await navigator.clipboard?.writeText(value); setCopied(true); window.setTimeout(() => setCopied(false), 1200) }}><span><small>{label}</small>{value}</span>{copied ? <Check /> : <Copy />}</button>
}

const Intro = () => <><h3>Mason James</h3><p>I’m a multidisciplinary designer turning ideas into bold digital experiences, thoughtful products, and visual systems people remember.</p><div className="availability"><i />Available for work <span>2026</span></div><CopyRow label="Email" value="masonjames@designer" /><CopyRow label="Phone" value="+84(123) 456-789" /></>

function HomeView({ onProject }: { onProject: (project: Project) => void }) {
  return <div className="home-view">
    <section><h2>About Me</h2><div className="home-about"><img src="/assets/portrait.png" alt="Mason James" /><div><Intro /></div></div></section>
    <section><h2>Services</h2><div className="service-grid">{services.map((item) => <article key={item.title}><img src={item.image} alt="" /><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div></section>
    <section><h2>Projects</h2><div className="home-project-grid">{projects.map((project) => <button key={project.slug} onClick={() => onProject(project)}><img src={project.thumb} alt="" /><span><b>{project.title}</b><small>{project.type} • {project.year}</small></span></button>)}</div></section>
    <section><h2>My Favorites</h2><MovieGrid /></section>
  </div>
}

function AboutView() {
  return <div className="about-page"><h2>About Me</h2><div className="about-panel"><img src="/assets/portrait.png" alt="Mason James" /><div><Intro /></div></div><section className="location"><span><MapPin />Location</span><iframe title="Brooklyn map" loading="lazy" src="https://www.google.com/maps?q=Brooklyn%2C%20New%20York&output=embed" /></section></div>
}

function ProjectView({ project, onProject, onClose }: { project: Project; onProject: (project: Project) => void; onClose: () => void }) {
  return <div className="project-view">
    <aside className="project-sidebar"><div className="project-lights"><TrafficLights onClose={onClose} /></div><h4>Projects</h4>{projects.map((item) => <button onClick={() => onProject(item)} className={item.slug === project.slug ? "active" : ""} key={item.slug}>{item.title}</button>)}</aside>
    <main className="project-main"><div className="project-breadcrumb"><span>Projects / {project.title}</span><Socials /></div><div className="project-heading"><div><h1>{project.title}</h1><p>{project.description}</p></div><a href="#project-work"><ExternalLink />Visit Site</a></div><div className="project-meta"><span>Category <b>{project.type}</b></span><span>Client <b>{project.client}</b></span></div><img className="project-hero" src={project.thumb} alt={`${project.title} project`} /><section><h2>Challenges</h2><p>{project.challenges}</p></section><div className="project-pair">{project.images.slice(0, 2).map((image) => <img key={image} src={image} alt="" />)}</div><section><h2>Final Thoughts</h2><p>{project.finalThoughts}</p></section><img id="project-work" className="project-final" src={project.images[2]} alt="" /></main>
  </div>
}

function GalleryView() { return <div className="gallery-view">{gallery.map((image, index) => <img key={image} src={image} alt={`Life dump ${index + 1}`} />)}</div> }

function ResumeView() {
  const skills = ["Figma", "Framer", "UX Strategy", "Prototyping", "Design Systems", "Interaction Design", "Product Thinking", "User Research"]
  return <div className="resume-view"><header><div><span className="eyebrow">PRODUCT DESIGNER (UI/UX)</span><h1>Mason James</h1></div><div className="resume-contact">masonjames@designer<br />+84(123) 456-789<br />Brooklyn, New York</div></header><p>Creative and detail-oriented Product Designer with 7+ years of experience designing SaaS platforms, mobile applications, dashboards, and high-converting websites.</p><div className="resume-numbers"><span><b>6+</b>Years Experience</span><span><b>50+</b>Projects Completed</span><span><b>25+</b>Collaborations</span></div><section><h3>Experience</h3><article><time>2024 — Present</time><div><b>UI/UX Designer — Prime Capital</b><p>Designed complex fintech experiences and built scalable multi-product design systems.</p></div></article><article><time>2022 — 2024</time><div><b>Product Designer — North Studio</b><p>Led research, prototyping, and interface design across mobile and web products.</p></div></article><article><time>2020 — 2022</time><div><b>UI Designer — Independent</b><p>Partnered with startups to turn early ideas into focused digital products.</p></div></article></section><section><h3>Core Skills</h3><div className="skill-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section><section><h3>Education</h3><article><time>2016 — 2020</time><div><b>Bachelor of Design</b><p>Interaction and visual communication.</p></div></article></section></div>
}

function ContactView() {
  const [sent, setSent] = useState(false)
  return <div className="contact-view"><aside><span className="eyebrow">PRODUCT DESIGNER</span><h1>Mason James</h1><p>Brooklyn</p><div className="contact-tagline">Turning ideas into bold digital experiences, thoughtful products, and visual systems people remember.</div><h2>Get In Touch</h2></aside><form onSubmit={(event) => { event.preventDefault(); setSent(true) }}><label>Name *<input required /></label><label>Email *<input type="email" required /></label><label>Message<textarea rows={6} /></label><button type="submit">{sent ? "Message sent" : "Submit"}<Send /></button></form></div>
}

function ResourcesView() { return <div className="resources-view"><h2>Resources</h2><div className="resource-grid">{resources.map((item) => <a href={item.href} target="_blank" rel="noreferrer" key={item.title}><img src={item.image} alt="" /><b>{item.title}</b><ExternalLink /></a>)}</div></div> }

function MovieGrid() { return <div className="movie-grid">{favorites.map((item) => <article key={item.title}><img src={item.image} alt="" /><div><span>{item.label}</span><h3>{item.title}</h3><small>{item.genre} • {item.year}</small><p>{item.tagline}</p></div></article>)}</div> }
function MoviesView() { return <div className="movies-view"><h2>My Favorites</h2><MovieGrid /></div> }
function ReelView() { return <div className="reel-view"><video src="/assets/reel.mp4" autoPlay loop muted controls playsInline /></div> }
function GameView() { return <iframe className="game-frame" src="https://herding-cats-ten.vercel.app" allow="fullscreen" title="Herding Cats Game" /> }

function WindowContent({ instance, onProject }: { instance: WindowInstance; onProject: (project: Project) => void }) {
  switch (instance.kind) {
    case "home": return <HomeView onProject={onProject} />
    case "about": return <AboutView />
    case "gallery": return <GalleryView />
    case "resume": return <ResumeView />
    case "contact": return <ContactView />
    case "resources": return <ResourcesView />
    case "movies": return <MoviesView />
    case "music": return <div className="ipod-wrap"><IPodPlayer /></div>
    case "reel": return <ReelView />
    case "game": return <GameView />
    case "projects": return null
  }
}

export default function DesktopWindow({ instance, order, active, onClose, onFocus }: DesktopWindowProps) {
  const [project, setProject] = useState<Project | null>(instance.project ?? (instance.kind === "projects" ? projects[0] : null))
  const dragControls = useDragControls()
  const isProject = instance.kind === "projects" && Boolean(project)
  const title = project?.title ?? windowTitles[instance.kind]
  return <AnimatePresence><motion.section className={`desktop-window window-${instance.kind} ${isProject ? "project-window" : ""} ${active ? "active" : ""}`} style={{ zIndex: 20 + order, left: `calc(16% + ${order * 24}px)`, top: `calc(9% + ${order * 17}px)` }} initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .8 }} transition={{ type: "spring", duration: .4, bounce: .2 }} drag dragControls={dragControls} dragMomentum={false} dragListener={false} onPointerDown={onFocus} role="dialog" aria-label={title}>
    {isProject ? <><motion.div className="project-dragbar" onPointerDown={(event) => dragControls.start(event)} /><div className="window-content"><ProjectView project={project!} onProject={setProject} onClose={onClose} /></div></> : <><motion.header className="window-titlebar" onPointerDown={(event) => dragControls.start(event)}><TrafficLights onClose={onClose} /><span /><Socials /></motion.header><div className="window-content"><WindowContent instance={instance} onProject={setProject} /></div></>}
  </motion.section></AnimatePresence>
}
