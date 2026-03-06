import Cases from "@/components/svg/Cases";
import Client from "@/components/svg/Client";
import Docs from "@/components/svg/Docs";
import Invoice from "@/components/svg/Invoice";
import Sessions from "@/components/svg/Sessions";
import Task from "@/components/svg/Task";
import { Ticket } from "lucide-react";

export const emailRegex = /^[^\s@]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
export const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

export const homeMenuItems = [
  {
    name: "Ticket",
    icon: Ticket,
    path: "/ticket",
    roles: ["Client", "Staff", "Lawyer"],
    cardTitle: "Ticket App",
    cardParagraph:
      "Have Any issue then ask ous directly.Raise the ticker and ask your Problems.",
  },
  {
    name: "Task",
    icon: Task,
    path: "/task",
    roles: ["Staff", "Lawyer"],
    cardTitle: "Task App",
    cardParagraph: "See your daily task and improve your productivity.",
  },
  {
    name: "Docs",
    icon: Docs,
    path: "/docs",
    roles: ["Staff", "Lawyer"],
    cardTitle: "Docs App",
    cardParagraph:
      "Have Any issue then ask ous directly.Raise the ticker and ask your Problems.",
  },
  {
    name: "Cases",
    icon: Cases,
    path: "/cases",
    roles: ["Staff", "Lawyer"],
    cardTitle: "Cases App",
    cardParagraph:
      "Can't Manage your cases? Come here where managing your cases is very easy.",
  },
  {
    name: "Client",
    icon: Client,
    path: "/client",
    roles: ["Staff", "Lawyer"],
    cardTitle: "Client App",
    cardParagraph: "Managing Client is Now easy with Client App.",
  },
  {
    name: "Invoice",
    icon: Invoice,
    path: "/invoice",
    roles: ["Lawyer"],
    cardTitle: "Invoice App",
    cardParagraph: "Make Invoice In One Click with Invoice App.",
  },
  {
    name: "Sessions",
    icon: Sessions,
    path: "/sessions",
    roles: ["Lawyer"],
    cardTitle: "Sessions App",
    cardParagraph:
      "Now don't have to remember court date.Manager right here with Session app.",
  },
];
