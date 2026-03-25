import { Plus, Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"

import type { StaffUserMapping } from "@/data/satffData"
import ErrorMessage from "@/components/ErrorMessage"
import StaffCard from "@/components/staff/StaffCard"
import StaffCardSkeleton from "@/components/staff/StaffCardSkeleton"
import { getAllStaff } from "@/api/staffAPI"
import AddStaffModel from "@/components/staff/AddStaffModel"

const StaffPage = () => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  const {
    data: StaffData,
    isLoading,
    isError,
  } = useQuery<StaffUserMapping[]>({
    queryKey: ["staff"],
    queryFn: getAllStaff,
  })

  if (isError) {
    return <ErrorMessage />
  }
  if (isLoading) {
    return (
      <>
        <StaffCardSkeleton />
        <StaffCardSkeleton />
        <StaffCardSkeleton />
      </>
    )
  }
  return (
    <>
      {pathname === "/staff/add" && <AddStaffModel />}
      {/* Add Button */}
      <button
        className="fixed right-6 bottom-6 z-99 h-14 w-14 rounded-full bg-zinc-900 text-white shadow-xl hover:scale-105 justify-center items-center flex"
        onClick={() => {
          navigate("/staff/add")
        }}
      >
        <Plus />
      </button>
      <div className="shadow-soft mt-4 space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
        {/* Header */}
        <section className="shadow-soft rounded-2xl border border-stone-200 bg-stone-800 p-5 text-white sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Staff Management
              </h1>
              <p className="mt-2 text-sm">Manage your Staff efficiently.</p>
            </div>
          </div>
        </section>

        {/*  Search  */}
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              type="search"
              placeholder="Search Staff..."
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 py-2.5 pr-3 pl-9 text-sm focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
              disabled={isError || isLoading}
            />
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {!isLoading && !isError && StaffData?.length === 0 && (
            <p className="text-sm text-zinc-500">No results found</p>
          )}
          {!isLoading &&
            !isError &&
            StaffData?.map((staff) => {
              if (!staff?.staff) return null
              return staff ? (
                <StaffCard {...staff} key={staff.staff.id} />
              ) : null
            })}
        </div>
      </div>
    </>
  )
}

export default StaffPage
