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
          {role !== "" && (
            <div className="mx-2 hidden rounded-xl border border-black bg-white p-4 lg:block">
              <Sidebar />
            </div>
          )}
          <main className="mr-2 no-scrollbar h-[91vh] flex-1 overflow-hidden overflow-y-scroll bg-transparent rounded-xl">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default HomeLayout
