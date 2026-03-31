import { Outlet } from "react-router"
import { Toaster } from "sonner"

import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

const HomeLayout = () => {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <div className="h-screen w-full overflow-hidden">
        <Header />
        <div className="mt-4 flex h-[80vh] w-full items-center gap-2">
          <div className="mx-2 hidden rounded-xl border border-black bg-white p-4 lg:block">
            <Sidebar />
          </div>
          <main className="max-h-[85vh] flex-1 overflow-hidden rounded-xl bg-transparent sm:mr-2">
            <div className="mt-4 h-[84vh]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default HomeLayout
