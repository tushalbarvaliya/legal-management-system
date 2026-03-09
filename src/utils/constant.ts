export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
export const pinCodeRegex = /^[1-9][0-9]{5}$/;
export const PhoneNumberRegex = /^\+91\d{10}$/;

export const termsAndConditionsList = [
  {
    title: "1. Acceptance of Terms",
    paragraph:
      "By accessing or using AcmeDesk, you agree to these Terms and Conditions. If you do not agree, you must stop using the platform immediately.",
  },
  {
    title: "2. User Accounts",
    paragraph:
      "You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. You must notify us promptly if you suspect unauthorized access.",
  },
  {
    title: "3. Acceptable Use",
    paragraph:
      "You agree not to misuse the service, reverse engineer core systems, interfere with operations, or upload unlawful, harmful, or abusive content.",
  },
  {
    title: "4. Service Availability",
    paragraph:
      "We aim to provide reliable uptime, but we do not guarantee uninterrupted service. Planned maintenance or technical issues may temporarily affect access.",
  },
  {
    title: "5. Intellectual Property",
    paragraph:
      "All software, designs, trademarks, and documentation related to AcmeDesk remain the property of AcmeDesk or its licensors. You receive a limited, non-transferable right to use the service.",
  },
  {
    title: "6. Limitation of Liability",
    paragraph:
      "To the maximum extent permitted by law, AcmeDesk is not liable for indirect, incidental, or consequential damages resulting from use or inability to use the platform.",
  },
  {
    title: "7. Termination",
    paragraph:
      "We may suspend or terminate access if these terms are violated or if continued use presents a security, legal, or operational risk.",
  },
  {
    title: "8. Changes to Terms",
    paragraph:
      "We may update these terms from time to time. Updates become effective when posted on this page, and continued use indicates acceptance of revised terms.",
  },

];

export const homeMenuItems = [
  {
    name: "Ticket",
    icon: "",
    path: "/ticket",
    roles: ["Client", "Staff", "Lawyer"],
    cardTitle: "Ticket App",
    cardParagraph:
      "Have Any issue then ask ous directly.Raise the ticker and ask your Problems.",
  },
  {
    name: "Task",
    icon: "Task",
    path: "/task",
    roles: ["Staff", "Lawyer"],
    cardTitle: "Task App",
    cardParagraph: "See your daily task and improve your productivity.",
  },
  {
    name: "Docs",
    icon: "Docs",
    path: "/docs",
    roles: ["Staff", "Lawyer"],
    cardTitle: "Docs App",
    cardParagraph:
      "Have Any issue then ask ous directly.Raise the ticker and ask your Problems.",
  },
  {
    name: "Cases",
    icon: "Cases",
    path: "/cases",
    roles: ["Staff", "Lawyer"],
    cardTitle: "Cases App",
    cardParagraph:
      "Can't Manage your cases? Come here where managing your cases is very easy.",
  },
  {
    name: "Client",
    icon: "Client",
    path: "/client",
    roles: ["Staff", "Lawyer"],
    cardTitle: "Client App",
    cardParagraph: "Managing Client is Now easy with Client App.",
  },
  {
    name: "Invoice",
    icon: "Invoice",
    path: "/invoice",
    roles: ["Lawyer"],
    cardTitle: "Invoice App",
    cardParagraph: "Make Invoice In One Click with Invoice App.",
  },
  {
    name: "Sessions",
    icon: "Sessions",
    path: "/sessions",
    roles: ["Lawyer"],
    cardTitle: "Sessions App",
    cardParagraph:
      "Now don't have to remember court date.Manager right here with Session app.",
  },
];
