import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router";

const HomePage = () => {
  return (
    <div className="h-screen w-full">
      <Header />
      <div className="flex mt-4 gap-2">
        <div className="rounded-xl hidden lg:block h-[85vh] bg-white mx-2 p-4 shadow-[0px_10px_1px_rgba(221,221,221,1),0_10px_20px_rgba(204,204,204,1)]">
          <Sidebar />
        </div>
        <main className="flex-1 bg-stone-100 border-2 mr-2 overflow-y-scroll h-[85vh] [&::-webkit-scrollbar]:w-2 rounded-xl shadow-[0px_10px_1px_rgba(221,221,221,1),0_10px_20px_rgba(204,204,204,1)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
