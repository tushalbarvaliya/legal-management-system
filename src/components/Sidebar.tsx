import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Link, useLocation } from "react-router"
import { useSelector } from "react-redux"

import { menuList } from "@/utils/navigationList"
import type { RootState } from "@/store/store"

const Sidebar = () => {
  const pathname = useLocation().pathname
  const [isHover, setIsHover] = useState(false)
  const role = useSelector((state: RootState) => state.auth.role)

  const filterMenuList = menuList.filter(
    (item) => role && item.role.includes(role)
  )
  return (
    <div
      className="space-y-2"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {filterMenuList.map((item) => (
        <motion.div layout key={item.to}>
          <Link
            to={item.to}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-700 transition duration-200 hover:bg-zinc-200 hover:text-zinc-900  ${
              item.to === pathname ? "bg-zinc-200" : ""
            }`}
          >
            {item.icons && <item.icons />}

            <AnimatePresence>
              {isHover && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.title}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

export default Sidebar
