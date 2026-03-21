export const menuList = [
  {
    title: "Dash Board",
    src: "/dashboard.svg",
    to: "/",
    alt: "home",
    role: ["admin", "lawyer", "staff", "client"],
  },
  {
    title: "client",
    src: "/client.svg",
    to: "/client",
    alt: "home",
    role: ["lawyer", "lawyer", "staff"],
  },
  {
    title: "Cases",
    src: "/cases.svg",
    to: "/cases",
    alt: "cases",
    role: ["lawyer", "staff"],
  },
  {
    title: "Docs",
    src: "/docs.svg",
    to: "/docs",
    alt: "docs",
    role: ["lawyer", "staff"],
  },
  {
    title: "Sessions",
    src: "/session.svg",
    to: "/session",
    alt: "session",
    role: ["lawyer"],
  },
  {
    title: "Tasks",
    src: "/tasks.svg",
    to: "/tasks",
    alt: "tasks",
    role: ["lawyer", "staff"],
  },
  {
    title: "Staff",
    src: "/staff.svg",
    to: "/staff",
    alt: "staff",
    role: ["lawyer"],
  },
  {
    title: "Invoice",
    src: "/invoice.svg",
    to: "/invoice",
    alt: "invoice",
    role: ["lawyer"],
  },
  {
    title: "lawyer",
    src: "/lawyer.svg",
    to: "/lawyer",
    alt: "lawyer",
    role: ["admin"],
  },
  {
    title: "company",
    src: "/componey.svg",
    to: "/company",
    alt: "company",
    role: ["admin"],
  },
]

export const navItems = [
  {
    label: "Privacy Policy",
    to: "/privacy-policy",
    variant: "outline" as const,
  },
  {
    label: "Terms & Conditions",
    to: "/terms-and-conditions",
    variant: "default" as const,
  },
  {
    label: "Profile",
    to: "/profile",
    variant: "default" as const,
  },
]
