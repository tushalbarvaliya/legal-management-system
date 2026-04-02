import { Outlet } from "react-router"
import { Toaster } from "sonner"

import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

const HomeLayout = () => {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <div className="h-screen w-full overflow-hidden">
        <div className="h-16.7 overflow-hidden">
          <Header />
        </div>
        <div className="flex h-[90dvh] w-full items-start gap-2">
          <div className="mx-2 my-auto hidden rounded-xl border border-black bg-white p-4 lg:block">
            <Sidebar />
          </div>
          <main className="lg:mx-2 mt-2 max-h-[90vh] flex-1 overflow-hidden rounded-xl  bg-transparent">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default HomeLayout
