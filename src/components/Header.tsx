import { menuList, navItems } from "@/utils/constant";
import { useState } from "react";
import { Link, useLocation } from "react-router";

const Header = () => {
  const [menubarOpen, setMenubarOpen] = useState(false);
  const pathname = useLocation().pathname;

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-transparent backdrop-blur  shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="mx-auto flex  items-center justify-between px-3 py-3 sm:px-4 lg:px-5">
          <div className="flex items-center gap-2">
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

          {/* this section is for links */}
          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => (
                <Link
                  to={item.to}
                  key={item.to}
                  className={`rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-50 hover:text-zinc-900 ${pathname === item.to ? "bg-zinc-200" : ""}`}
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
            onClick={() => {
              setMenubarOpen((prev) => !prev);
            }}
          >
            <img src="/menuIcon.svg" alt="menu" className="h-5 w-5" />
          </button>
        </div>
      </header>
      <div
        id="drawerOverlay"
        className={` fixed inset-0 z-40 bg-black/30 ${menubarOpen ? "" : "opacity-0 pointer-events-none"} shadow-[inset_0_0_80px_rgba(0,0,0,0.25)] transition-opacity duration-300 lg:hidden h-screen w-screen`}
        onClick={() => {
          setMenubarOpen((prev) => !prev);
        }}
      ></div>

      <aside
        className={`fixed right-0 top-0 z-50 h-fit w-72 ${menubarOpen ? "" : "translate-x-full"} border-l border-zinc-200 bg-white p-5 shadow-2xl transition-transform duration-300 lg:hidden overflow-scroll`}
      >
        <div className="mb-6 flex items-center justify-between ">
          <h2 className="text-base font-semibold text-zinc-900">Workspace</h2>
          <button
            className="rounded-lg border border-zinc-200 p-2 text-zinc-700 transition duration-200 hover:bg-zinc-100"
            onClick={() => {
              setMenubarOpen((prev) => !prev);
            }}
          >
            <img src="/x.svg" alt="x logo" className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-2">
          {menuList.map((item) => (
            <Link
              to={item.to}
              key={item.to}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-700 transition duration-200 hover:bg-zinc-100 hover:text-zinc-900 ${item.to === pathname ? "bg-zinc-200" : ""}`}
            >
              <img src={item.src} alt={item.alt} className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        <hr className="my-4 border-zinc-200" />
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              to={item.to}
              key={item.to}
              className={`block rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-900 transition duration-200 hover:bg-zinc-200 ${pathname === item.to ? "bg-zinc-200" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/logout"
            className="block rounded-lg bg-zinc-900 px-4 py-2 text-sm  font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800"
          >
            Logout
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Header;
