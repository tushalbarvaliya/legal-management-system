import type { ClientProps } from "@/types/clientType";

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

export const menuList = [
  {
    title: "Dash Board",
    src: "/dashboard.svg",
    to: "/",
    alt: "home",
    role: ["admin"],
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

export const clients: ClientProps[] = [
  {
    _id: "CL-1001",
    firstName: "Aarav",
    lastName: "Sharma",
    mobileNumber: "+91 98901 22334",
    otherNumber: "",
    occupation: "Architect",
    address: "Nehru Place, New Delhi",
    gender: "Male",
    notes: "Prefers follow-ups over calls after 6 PM.",
    isBlock: false,
    email: "aarva@gmail.com",
    isDelete: false,
  },
  {
    _id: "CL-1002",
    firstName: "Mira",
    lastName: "Kapoor",
    mobileNumber: "+91 98111 55772",
    otherNumber: "+91 98700 44321",
    occupation: "Entrepreneur",
    address: "Bandra West, Mumbai",
    gender: "Female",
    notes: "Looking for monthly consulting package.",
    isBlock: false,
    email: "aarva@gmail.com",
    isDelete: false,
  },
  {
    _id: "CL-1003",
    firstName: "Dev",
    lastName: "Menon",
    mobileNumber: "+91 97555 33661",
    otherNumber: "",
    occupation: "Software Engineer",
    address: "Whitefield, Bengaluru",
    gender: "Other",
    notes: "",
    isBlock: false,
    email: "aarva@gmail.com",
    isDelete: false,
  },
];

export const staffMembers = [
  "Tushal Mehra",
  "Aarav Singh",
  "Neha Sharma",
  "Ritika Verma",
  "Kunal Patil",
];

export const tasks = [
  {
    id: "1",
    title: "Prepare onboarding checklist",
    description:
      "Finalize IT setup list, access requests, and first-week milestones for the new support hires.",
    createdDate: "2026-03-01",
    priority: "High",
    dueDate: "2026-03-10",
    status: "In Progress",
    assignTo: "Neha Sharma",
  },
  {
    id: "2",
    title: "Review weekly support SLA",
    description:
      "Analyze ticket response and resolution times, then share blockers with the operations lead.",
    createdDate: "2026-03-03",
    priority: "Medium",
    dueDate: "2026-03-11",
    status: "Pending",
    assignTo: "Tushal Mehra",
  },
  {
    id: "3",
    title: "Update knowledge base article",
    description:
      "Refresh troubleshooting steps for billing sync errors and include the latest escalation matrix.",
    createdDate: "2026-03-04",
    priority: "Low",
    dueDate: "2026-03-13",
    status: "Pending",
    assignTo: "Aarav Singh",
  },
  {
    id: "4",
    title: "Coordinate customer follow-ups",
    description:
      "Send update emails to enterprise accounts impacted by last week's delayed callback queue.",
    createdDate: "2026-03-05",
    priority: "High",
    dueDate: "2026-03-09",
    status: "In Progress",
    assignTo: "Ritika Verma",
  },
  {
    id: "5",
    title: "Run QA on canned responses",
    description:
      "Validate 15 frequently used response templates for grammar, accuracy, and policy compliance.",
    createdDate: "2026-03-06",
    priority: "Medium",
    dueDate: "2026-03-14",
    status: "Completed",
    assignTo: "Kunal Patil",
  },
];
