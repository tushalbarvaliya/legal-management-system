import {
  BriefcaseBusiness,
  Building2,
  CalendarRange,
  FileCheck,
  IdCardLanyard,
  LayoutDashboard,
  ReceiptIndianRupee,
  SquareCheck,
  UserRound,
  Users,
  type LucideProps,
} from "lucide-react"


type menuListType = {
  title: string
  to: string
  role: string[]
  icons: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
}

export const menuList: menuListType[] = [
  {
    title: "Dash Board",
    to: "/",
    role: ["admin", "lawyer", "staff", "client"],
    icons: LayoutDashboard,
  },
  {
    title: "client",
    to: "/client",
    icons: Users,
    role: ["lawyer", "lawyer", "staff"],
  },
  {
    title: "Cases",
    to: "/cases",
    icons: BriefcaseBusiness,
    role: ["lawyer", "staff"],
  },
  {
    title: "Docs",
    to: "/docs",
    role: ["lawyer", "staff"],
    icons:FileCheck
  },
  {
    title: "Sessions",
    to: "/session",
    role: ["lawyer"],
    icons:CalendarRange 
  },
  {
    title: "Tasks",
    to: "/task",
    role: ["lawyer", "staff"],
    icons:SquareCheck
  },
  {
    title: "Staff",
    to: "/staff",
    role: ["lawyer",'admin'],
    icons:IdCardLanyard
  },
  {
    title: "Invoice",
    to: "/invoice",
    role: ["lawyer",'client'],
    icons: ReceiptIndianRupee,
  },
  {
    title: "lawyer",
    to: "/lawyer",
    role: ["admin"],
    icons:UserRound
  },
  {
    title: "company",
    to: "/company",
    role: ["admin"],
    icons:Building2
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
