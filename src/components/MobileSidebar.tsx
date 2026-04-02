import { X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { useAppSelector } from "@/hooks/hooks"
import { menuList, navItems } from "@/utils/navigationList"

type SidebarProps = {
  setMenubarOpen: React.Dispatch<React.SetStateAction<boolean>>
  menubarOpen: boolean
}

const MobileSidebar = ({ menubarOpen, setMenubarOpen }: SidebarProps) => {
  const role = useAppSelector((state) => state.auth.role)
  const filterMenuList = menuList.filter(
    (item) => role && item.role.includes(role)
  )
  const pathname = useLocation().pathname

  return (
    <>
      <div
        id="drawerOverlay"
        className={`fixed inset-0 z-40 bg-black/30 ${menubarOpen ? "" : "pointer-events-none opacity-0"} h-screen w-screen shadow-[inset_0_0_80px_rgba(0,0,0,0.25)] transition-opacity duration-300 lg:hidden`}
        onClick={() => {
          setMenubarOpen((prev) => !prev)
        }}
      ></div>

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 ${menubarOpen ? "" : "translate-x-full"} no-scrollbar overflow-scroll border-l border-zinc-200 bg-white p-5 shadow-2xl transition-transform duration-300 lg:hidden`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-base font-semibold text-zinc-900">Workspace</h2>
          <button
            className="rounded-lg border border-zinc-200 p-2 text-zinc-700 transition duration-200 hover:bg-zinc-100"
            onClick={() => {
              setMenubarOpen((prev) => !prev)
            }}
          >
            <X />
          </button>
        </div>

        <nav className="space-y-2">
          {filterMenuList.map((item) => (
            <Link
              to={item.to}
              key={item.to}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-700 transition duration-200 hover:bg-zinc-100 hover:text-zinc-900 ${item.to === pathname ? "bg-zinc-200" : ""}`}
            >
              {item.icons && <item.icons />}
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
            className="block rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800"
          >
            Logout
          </Link>
        </nav>
      </aside>
    </>
  )
}

export default MobileSidebar
