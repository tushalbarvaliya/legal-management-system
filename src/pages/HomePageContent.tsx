import AdminDashBoard from "@/components/AdminDashBoard";
import type { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const HomePageContent = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/cases");
    }
  }, [role, navigate]);
  return (
    <>
      <div className="grid grid-cols-3 gap-x-2 gap-y-2">
        <div className="rounded-2xl bg-white p-5 shadow-soft sm:p-6 col-span-3">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Welcome back,
          </h1>
          <p className="mt-2 text-sm text-zinc-600 sm:text-base">
            Here is a quick summary of your current workload and session
            activity.
          </p>
        </div>
        {role === "admin" && <AdminDashBoard />}
      </div>
    </>
  );
};

export default HomePageContent;
