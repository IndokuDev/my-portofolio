// Single source of truth for the landing page. Edit here, everything updates.

export const SITE_URL = "https://indokudev.my.id"

export const site = {
  name: "Ahmad Raghib Zahron",
  handle: "indokudev",
  role: "Web Developer & AI Engineer",
  email: "hello@indokudev.my.id",
  location: "Indonesia",
  title: "Ahmad Raghib Zahron (@indokudev) | Web Developer & AI Engineer",
  description:
    "I'm Ahmad Raghib Zahron (@indokudev), a web developer and AI engineer. I build websites, web apps and AI-powered tools for freelance clients. Email hello@indokudev.my.id to work together.",
  avatar: "/indokudev.webp",
  avatarAlt: "@indokudev avatar",
  photo: "/ahmad.webp",
  photoAlt: "Portrait of Ahmad Raghib Zahron, web developer and AI engineer",
  ogImage: `${SITE_URL}/og-avatar.jpg`,
  socials: {
    github: "https://github.com/indokudev",
    linkedin: "https://linkedin.com/in/ahmad-raghib-zahron-7401b6237",
    x: "https://x.com/indokudev",
  },
}

export const mailto = (subject = "Project inquiry") =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    "Hi Ahmad,\n\nI'd like to work with you on a project.\n\nWhat I need:\nTimeline:\nBudget (optional):\nLinks (optional):\n\nThanks!",
  )}`

export const services = [
  {
    title: "Landing pages & business sites",
    description: "Fast, mobile-first pages designed to turn visitors into customers.",
    icon: "rocket",
  },
  {
    title: "Web apps & dashboards",
    description: "Interactive apps and internal tools with clean, maintainable code.",
    icon: "dashboard",
  },
  {
    title: "AI agents & automation",
    description: "Custom AI assistants and workflows that save hours of manual work.",
    icon: "bot",
  },
  {
    title: "AI-powered features",
    description: "Chatbots, LLM integrations and smart search added to your product.",
    icon: "sparkles",
  },
] as const

export const process = [
  { title: "Tell me about it", description: "Send a short email with your goals, timeline and any references." },
  { title: "I design & build", description: "You get a clear plan, then regular previews while I build." },
  { title: "Launch & handoff", description: "Deployed, tested and documented so you stay in control." },
] as const

export const stack = [
  "Web development",
  "AI agents",
  "LLM apps",
  "Automation",
  "TypeScript",
  "Node.js",
  "Git & GitHub",
]

// ---------- Contact form ----------

export const projectTypes = [
  { value: "landing", label: "Landing page / business site" },
  { value: "webapp", label: "Web app / dashboard" },
  { value: "agent", label: "AI agent / automation" },
  { value: "ai-feature", label: "AI-powered feature" },
  { value: "other", label: "Something else" },
]

export const budgets = [
  { value: "under-500", label: "Under $500" },
  { value: "500-2000", label: "$500 – $2,000" },
  { value: "2000-5000", label: "$2,000 – $5,000" },
  { value: "5000-plus", label: "$5,000+" },
  { value: "unsure", label: "Not sure yet" },
]

export type InquiryValues = {
  name: string
  email: string
  type: string
  budget: string
  deadline: string[]
  message: string
}

export const emptyInquiry: InquiryValues = {
  name: "",
  email: "",
  type: "",
  budget: "",
  deadline: [],
  message: "",
}

const labelOf = (list: { value: string; label: string }[], value: string) =>
  list.find((i) => i.value === value)?.label

const formatDate = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`)
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}

// Turns the form into a ready-to-send email. `title` / `subtitle` also drive the
// confirmation state of the contact section, so what the visitor reads on the page
// matches the draft that opens in their mail app.
export function composeInquiry(v: InquiryValues) {
  const type = labelOf(projectTypes, v.type) ?? "Project"
  const budget = labelOf(budgets, v.budget)
  const deadline = v.deadline[0] ? formatDate(v.deadline[0]) : undefined
  const firstName = v.name.trim().split(/\s+/)[0] || "there"

  const subject = `${type} inquiry from ${v.name.trim()}${deadline ? ` (due ${deadline})` : ""}`
  const title = `Thanks, ${firstName}! Your brief is ready.`
  const subtitle = `Your ${type} inquiry is drafted to ${site.email}${
    deadline ? `, aiming for ${deadline}` : ""
  }. Hit send in your mail app and I'll reply with next steps.`

  const body = [
    "Hi Ahmad,",
    "",
    `I'm ${v.name.trim()} and I'd like to work with you on a project.`,
    "",
    `Project type: ${type}`,
    `Budget: ${budget ?? "Not specified"}`,
    `Deadline: ${deadline ?? "Flexible"}`,
    `Reply to: ${v.email.trim()}`,
    "",
    "Details:",
    v.message.trim(),
    "",
    "Thanks,",
    v.name.trim(),
  ].join("\n")

  return {
    subject,
    title,
    subtitle,
    body,
    href: `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  }
}
