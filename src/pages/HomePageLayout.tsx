import { Outlet } from "react-router"
import { Toaster } from "sonner"

import { useAppSelector } from "@/hooks/hooks"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

const HomeLayout = () => {
  const role = useAppSelector((state) => state.auth.role)
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <div className="h-screen w-full">
        <Header />
        <div className="mt-4 flex items-center gap-2">
          {role != "guest" && (
            <div className="mx-2 hidden rounded-xl bg-white p-4 shadow-[0px_10px_1px_rgba(221,221,221,1),0_10px_20px_rgba(204,204,204,1)] lg:block">
              <Sidebar />
            </div>
          )}
          <main className="mr-2 no-scrollbar h-[85vh] flex-1 overflow-y-scroll bg-transparent">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default HomeLayout
