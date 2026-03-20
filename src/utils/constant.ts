export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
export const pinCodeRegex = /^[1-9][0-9]{5}$/;
export const phoneNumberRegex = /^\d{10}$/;
export const userNameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+$/;
export const nameRegex = /^[A-Z]?[a-z]+$/;
export const addressRegex = /^[A-Za-z0-9 ]+$/;
export const urlRegex =
  /\b((?:https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}))/gi;



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
];

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
];


