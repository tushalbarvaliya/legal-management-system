export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
export const pinCodeRegex = /^[1-9][0-9]{5}$/;
export const phoneNumberRegex = /^\d{10}$/;
export const userNameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+$/;
export const nameRegex = /^[A-Z]?[a-z]+$/;
export const addressRegex = /^[A-Za-z0-9 ]+$/;
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
