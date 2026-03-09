export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
export const pinCodeRegex = /^[1-9][0-9]{5}$/;
export const PhoneNumberRegex = /^\+91\d{10}$/;

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

export const privacyPolicyPage = [
  {
    title: "1. Information We Collect",
    paragraph:
      "We collect account information such as your name, email address, role, and activity logs to provide workspace functionality and support services.",
  },
  {
    title: "2. How We Use Information",
    paragraph:
      "Data is used to operate the platform, improve performance, personalize your experience, maintain security, and communicate important account or service updates.",
  },
  {
    title: "3. Cookies and Similar Technologies",
    paragraph:
      "We use cookies and similar tools to keep sessions active, remember preferences, and analyze usage patterns. You can manage cookie settings in your browser.",
  },
  {
    title: "4. Data Sharing",
    paragraph:
      "We do not sell personal data. We may share limited data with trusted service providers who help us host, secure, and support AcmeDesk, subject to contractual safeguards.",
  },
  {
    title: "5. Data Retention",
    paragraph:
      "We retain personal data only for as long as needed to deliver services, meet legal obligations, resolve disputes, and enforce agreements.",
  },
  {
    title: "6. Security Measures",
    paragraph:
      "We use technical and organizational controls to protect data from unauthorized access, misuse, and loss. No method of transmission or storage is completely risk free.",
  },
  {
    title: "7. Your Rights",
    paragraph:
      "Depending on your region, you may have rights to access, correct, delete, or restrict processing of personal data. Requests can be submitted through our support channels.",
  },
  {
    title: "8. Policy Updates",
    paragraph:
      "We may update this policy to reflect legal, technical, or product changes. Updates become effective when published on this page.",
  },
];
