export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
export const pinCodeRegex = /^[1-9][0-9]{5}$/;
export const PhoneNumberRegex = /^\d{10}$/;
export const userNameRegex = /^(?=.*\d)[A-Za-z\d!@#$%^&*]{3,}$/;

export const menuList = [
  { title: "Dash Board", src: "/dashboard.svg", to: "/", alt: "home" },
  { title: "Tickets", src: "/task.svg", to: "/task", alt: "task" },
  { title: "Cases", src: "/cases.svg", to: "/cases", alt: "cases" },
  { title: "Docs", src: "/docs.svg", to: "/docs", alt: "docs" },
  { title: "Sessions", src: "/session.svg", to: "/session", alt: "session" },
  { title: "Tasks", src: "/tasks.svg", to: "/tasks", alt: "tasks" },
  { title: "Staff", src: "/staff.svg", to: "/staff", alt: "staff" },
  { title: "Invoice", src: "/invoice.svg", to: "/invoice", alt: "invoice" },
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
