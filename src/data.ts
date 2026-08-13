export type WindowKind = "home" | "about" | "projects" | "gallery" | "reel" | "contact" | "resume" | "resources" | "movies" | "music" | "game"

export interface DesktopItem {
  id: string
  label: string
  image: string
  mobileImage?: string
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
  client: string
  description: string
  challenges: string
  finalThoughts: string
  icon: string
  thumb: string
  images: [string, string, string]
}

const projectDescription = "Laver is a bold creative agency website designed to showcase services, projects, and personality through expressive visuals and clear storytelling."
const projectChallenges = "The challenge was balancing bold visuals with clear navigation, ensuring the experience stayed expressive without feeling cluttered or difficult to explore."
const projectFinalThoughts = "The final result is a confident agency website that feels distinctive, polished, and easy to navigate while clearly presenting the studio’s work."

const projectRows: Array<[string, string, string, string, string, string]> = [
  ["laver", "Laver", "Agency Website", "2023", "/assets/project-laver.png", "/assets/thumb-laver.png"],
  ["atria", "Atria", "Architecture Studio", "2024", "/assets/project-atria.png", "/assets/thumb-atria.png"],
  ["plinq", "Plinq", "Finance App", "2025", "/assets/project-plinq.png", "/assets/thumb-plinq.png"],
  ["nexmind", "Nexmind", "AI SaaS Product", "2024", "/assets/project-nexmind.png", "/assets/thumb-nexmind.png"],
  ["sorae", "Sorae", "Wellness App", "2023", "/assets/project-sorae.png", "/assets/thumb-sorae.png"],
  ["veyra", "Veyra", "Fashion Brand", "2024", "/assets/project-veyra.png", "/assets/thumb-veyra.png"],
]

export const projects: Project[] = projectRows.map(([slug, title, type, year, icon, thumb]) => ({
  slug, title, type, year, client: "Sonoran National Park", description: projectDescription,
  challenges: projectChallenges, finalThoughts: projectFinalThoughts, icon, thumb,
  images: [1, 2, 3].map((index) => `/assets/detail-${slug}-${index}.png`) as [string, string, string],
}))

export const desktopItems: DesktopItem[] = [
  { id: "framer", label: "Framer", image: "/assets/icon-framer.png", href: "https://www.framer.com/@talha-uxd/", className: "pos-framer", mobile: true },
  { id: "sorae", label: "Sorae", image: projects[4].icon, window: "projects", className: "pos-sorae", mobile: true },
  { id: "music", label: "Music", image: "/assets/icon-music.png", window: "music", className: "pos-music", mobile: true },
  { id: "veyra", label: "Veyra", image: projects[5].icon, window: "projects", className: "pos-veyra", mobile: true },
  { id: "laver", label: "Laver", image: projects[0].icon, window: "projects", className: "pos-laver", mobile: true },
  { id: "resume", label: "Resume", image: "/assets/icon-resume.png", window: "resume", className: "pos-resume", mobile: false },
  { id: "plinq", label: "Plinq", image: projects[2].icon, window: "projects", className: "pos-plinq", mobile: true },
  { id: "nexmind", label: "Nexmind", image: projects[3].icon, window: "projects", className: "pos-nexmind", mobile: true },
  { id: "movies", label: "Interstellar", image: "/assets/icon-movies.png", mobileImage: "/assets/icon-movies-mobile.png", window: "movies", className: "pos-movies", mobile: true },
  { id: "atria", label: "Atria", image: projects[1].icon, window: "projects", className: "pos-atria", mobile: true },
  { id: "cats", label: "Herding cats", image: "/assets/icon-cats.png", window: "game", className: "pos-cats", mobile: false },
  { id: "figma", label: "Figma", image: "/assets/icon-figma.png", href: "https://www.figma.com", className: "pos-figma", mobile: true },
  { id: "tips", label: "Tips", image: "/assets/icon-tips.png", window: "home", className: "pos-tips", mobile: true },
  { id: "resources", label: "Resources", image: "/assets/icon-resources.png", window: "resources", className: "pos-resources", mobile: true },
]

export const mobileItemIds = ["framer", "tips", "sorae", "plinq", "laver", "nexmind", "veyra", "atria", "movies", "resources", "music", "figma"]

export const services = [
  { title: "Web Design", description: "Distinctive websites with clear visuals and thoughtful interactions.", image: "/assets/service-web.png" },
  { title: "Product Design", description: "Simple, user-focused interfaces with clear flows and intuitive experiences.", image: "/assets/service-product.png" },
  { title: "Creative Direction", description: "Visual concepts and art direction that create clear, memorable digital brands.", image: "/assets/service-creative.png" },
]

export const favorites = [
  { title: "Interstellar", genre: "Sci-Fi • Adventure", year: "2014", tagline: "A masterpiece that never gets old.", label: "Personal Favorite", image: "/assets/movie-interstellar.png" },
  { title: "Severance", genre: "Sci-Fi • Mystery", year: "2002", tagline: "Minimal design meets psychological suspense.", label: "Weekend Pick", image: "/assets/movie-severance.png" },
  { title: "Spider-Verse", genre: "Animation • Action", year: "2018", tagline: "Pure visual inspiration for designers.", label: "Peak Cinema", image: "/assets/movie-spiderverse.png" },
  { title: "The Dark Night", genre: "Action • Crime", year: "2009", tagline: "Still the gold standard for superhero films.", label: "Visual Masterpiece", image: "/assets/movie-dark-knight.png" },
  { title: "Breaking Bad", genre: "Crime • Drama", year: "2008", tagline: "The definition of perfect storytelling.", label: "Hidden Gem", image: "/assets/movie-breaking-bad.png" },
  { title: "The Bear", genre: "Drama", year: "2022", tagline: "A chaotic kitchen. A brilliant story.", label: "Personal Favorite", image: "/assets/movie-the-bear.png" },
]

export const resources = [
  { title: "F University", href: "https://framer.university/", image: "/assets/resource-framer-university.png" },
  { title: "Lucid Icons", href: "https://lucide.dev/", image: "/assets/resource-lucide.png" },
  { title: "Rive", href: "https://rive.app/", image: "/assets/resource-rive.png" },
  { title: "Haikei", href: "https://haikei.app/", image: "/assets/resource-haikei.png" },
  { title: "Shapes Gallery", href: "https://www.shapes.gallery/", image: "/assets/resource-shapes.png" },
  { title: "Fonts Ninja", href: "https://fonts.ninja/", image: "/assets/resource-fonts-ninja.png" },
  { title: "SVG Gobbler", href: "https://chromewebstore.google.com/detail/svg-gobbler/mpbmflcodadhgafbbakjeahpandgcbch", image: "/assets/resource-svg-gobbler.png" },
]

export const gallery = Array.from({ length: 12 }, (_, index) => `/assets/gallery-${String(index + 1).padStart(2, "0")}.png`)
