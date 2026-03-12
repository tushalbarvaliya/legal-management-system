import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
const HomeLayout = () => {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <div className="h-screen w-full">
        <Header />
        <div className="flex mt-4 gap-2 items-center">
          <div className="rounded-xl hidden lg:block  bg-white mx-2 p-4 shadow-[0px_10px_1px_rgba(221,221,221,1),0_10px_20px_rgba(204,204,204,1)]">
            <Sidebar />
          </div>
          <main className="flex-1 bg-transparent  mr-2 overflow-y-scroll h-[85vh]  no-scrollbar ">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
