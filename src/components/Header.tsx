import { Link } from "react-router";

const navItems = [
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

const Header = () => {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-375 items-center justify-between px-3 py-3 sm:px-4 lg:px-5">
          <div className="flex items-center gap-2">
            <button
              id="sidebarDrawerButton"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200 p-2 text-zinc-700 transition duration-200 hover:bg-zinc-100 lg:hidden"
              aria-label="Open workspace menu"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5h18M3 12h18M3 19h12"
                />
              </svg>
            </button>
            <Link
              to="/"
              className="group inline-flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-sm font-bold text-white shadow-soft">
                AD
              </div>
              <span className="text-lg font-semibold tracking-tight text-zinc-900">
                Arcade Demo
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => (
                <Link
                  to={item.to}
                  className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-50 hover:text-zinc-900"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/logout"
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800"
              >
                Logout
              </Link>
            </nav>
          </div>

          <button
            id="menuButton"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 p-2 text-zinc-700 transition duration-200 hover:bg-zinc-100 lg:hidden"
          >
            <img src="/menuIcon.svg" alt="menu" className="h-5 w-5" />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
