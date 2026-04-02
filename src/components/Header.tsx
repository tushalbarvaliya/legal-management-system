import { Link, useLocation } from "react-router"
import { motion } from "framer-motion"
import { TextAlignJustify } from "lucide-react"
import { useState } from "react"

import { navItems } from "@/utils/navigationList"
import MobileSidebar from "./MobileSidebar"

const Header = () => {
  const pathname = useLocation().pathname
  const [menubarOpen, setMenubarOpen] = useState<boolean>(false)

  return (
    <>
      <motion.header className="sticky top-0 z-30 border-b border-zinc-200 bg-black text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] backdrop-blur">
        <div className="mx-auto flex items-center justify-between px-3 py-3 sm:px-4 lg:px-5">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="group inline-flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="shadow-soft flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-black">
                AD
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">
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
                  className={`rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-50 hover:text-zinc-900 ${pathname === item.to ? "bg-zinc-200" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/logout"
                className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-amber-500"
              >
                Logout
              </Link>
            </nav>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 p-2 text-white transition duration-200 hover:bg-zinc-200 lg:hidden"
            onClick={() => {
              setMenubarOpen((prev) => !prev)
            }}
          >
            <TextAlignJustify className="text-black" />
          </button>
        </div>
      </motion.header>
      <MobileSidebar
        menubarOpen={menubarOpen}
        setMenubarOpen={setMenubarOpen}
      />
    </>
  )
}

export default Header
