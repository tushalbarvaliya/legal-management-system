import AdminDashBoard from "@/components/admin/AdminDashBoard"
import LawyerBoard from "@/components/lawyer/LawyerBoard"
import StaffDashBoard from "@/components/staff/StaffDashBoard"
import TypingQuote from "@/components/TypingQuote"
import type { RootState } from "@/store/store"
import { useSelector } from "react-redux"

const HomePageContent = () => {
  const role = useSelector((state: RootState) => state.auth.role)
  return (
    <>
      <div className="grid grid-cols-3 gap-x-2 gap-y-2">
        <div className="shadow-soft col-span-3 rounded-2xl bg-white p-5 sm:p-6 border border-black">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Welcome back,
          </h1>
          <p className="mt-2 text-sm text-zinc-600 sm:text-base">
            Here is a quick summary of your current workload and session
            activity.
          </p>
        </div>
        <div className="bg-white col-span-full rounded-2xl h-40 border border-black">
          <TypingQuote />
        </div>
        {/* {role === "lawyer" && <AdminDashBoard />} */}
      </div>
        {role === "admin" && <AdminDashBoard />}
      {role === "lawyer" && <LawyerBoard />}
      {role === "staff" && <StaffDashBoard />}
    </>
  )
}

export default HomePageContent
