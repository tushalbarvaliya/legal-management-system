import Header from "@/components/Header";
import { Outlet } from "react-router";

const HomePage = () => {
  return (
    <div className="min-h-screen ">
      <Header />
      <Outlet />
    </div>
  );
};

export default HomePage;
