export type WindowKind =
  | "home"
  | "about"
  | "projects"
  | "gallery"
  | "reel"
  | "contact"
  | "resume"
  | "resources"
  | "movies"
  | "music"
  | "tips"
  | "game"

export interface DesktopItem {
  id: string
  label: string
  image: string
  window?: WindowKind
  href?: string
  className: string
  mobile: boolean
}

export interface Project {
  slug: string
  title: string
  type: string
  year: string
  description: string
  icon: string
  thumb: string
}

export const projects: Project[] = [
  {
    slug: "laver",
    title: "Laver",
    type: "Agency Website",
    year: "2023",
    description: "A bold creative agency website shaped by expressive visuals and clear storytelling.",
    icon: "/assets/project-laver.png",
    thumb: "/assets/thumb-laver.png",
  },
  {
    slug: "atria",
    title: "Atria",
    type: "Architecture Studio",
    year: "2024",
    description: "A quiet architecture portfolio with strong grids, restraint, and editorial pacing.",
    icon: "/assets/project-atria.png",
    thumb: "/assets/thumb-atria.png",
  },
  {
    slug: "plinq",
    title: "Plinq",
    type: "Finance App",
    year: "2025",
    description: "A friendly financial experience that makes complex activity feel immediate and calm.",
    icon: "/assets/project-plinq.png",
    thumb: "/assets/thumb-plinq.png",
  },
  {
    slug: "nexmind",
    title: "Nexmind",
    type: "AI SaaS Product",
    year: "2024",
    description: "An AI workspace designed around focused workflows, legibility, and fast iteration.",
    icon: "/assets/project-nexmind.png",
    thumb: "/assets/thumb-nexmind.png",
  },
  {
    slug: "sorae",
    title: "Sorae",
    type: "Wellness App",
    year: "2023",
    description: "A soft wellness product combining tactile interactions with a reassuring visual system.",
    icon: "/assets/project-sorae.png",
    thumb: "/assets/thumb-sorae.png",
  },
  {
    slug: "veyra",
    title: "Veyra",
    type: "Fashion Brand",
    year: "2024",
    description: "A fashion identity and storefront with editorial imagery and confident composition.",
    icon: "/assets/project-veyra.png",
    thumb: "/assets/thumb-veyra.png",
  },
]

export const desktopItems: DesktopItem[] = [
  { id: "framer", label: "Framer", image: "/assets/icon-framer.png", href: "https://www.framer.com/@talha-uxd/", className: "pos-framer", mobile: true },
  { id: "sorae", label: "Sorae", image: projects[4].icon, window: "projects", className: "pos-sorae", mobile: true },
  { id: "music", label: "Music", image: "/assets/icon-music.png", window: "music", className: "pos-music", mobile: true },
  { id: "veyra", label: "Veyra", image: projects[5].icon, window: "projects", className: "pos-veyra", mobile: true },
  { id: "laver", label: "Laver", image: projects[0].icon, window: "projects", className: "pos-laver", mobile: true },
  { id: "resume", label: "Resume", image: "/assets/icon-resume.png", window: "resume", className: "pos-resume", mobile: true },
  { id: "plinq", label: "Plinq", image: projects[2].icon, window: "projects", className: "pos-plinq", mobile: true },
  { id: "nexmind", label: "Nexmind", image: projects[3].icon, window: "projects", className: "pos-nexmind", mobile: true },
  { id: "movies", label: "Interstellar", image: "/assets/icon-movies.png", window: "movies", className: "pos-movies", mobile: true },
  { id: "atria", label: "Atria", image: projects[1].icon, window: "projects", className: "pos-atria", mobile: true },
  { id: "cats", label: "Herding cats", image: "/assets/icon-cats.png", window: "game", className: "pos-cats", mobile: false },
  { id: "figma", label: "Figma", image: "/assets/icon-figma.png", href: "https://www.figma.com", className: "pos-figma", mobile: false },
  { id: "tips", label: "Tips", image: "/assets/icon-tips.png", window: "tips", className: "pos-tips", mobile: true },
  { id: "resources", label: "Resources", image: "/assets/icon-resources.png", window: "resources", className: "pos-resources", mobile: true },
]

export const gallery = Array.from({ length: 12 }, (_, index) => `/assets/gallery-${String(index + 1).padStart(2, "0")}.png`)
