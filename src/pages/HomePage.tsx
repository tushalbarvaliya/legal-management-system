import Header from "@/components/Header";
import { Outlet } from "react-router";

const HomePage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default HomePage;
