import { Plus, Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"

import type { StaffUserMapping } from "@/types/staffType"
import ErrorMessage from "@/components/ErrorMessage"
import StaffCard from "@/components/staff/StaffCard"
import StaffCardSkeleton from "@/components/staff/StaffCardSkeleton"
import { getAllStaff } from "@/api/staffAPI"
import NoFound from "@/components/NoFound"
import AddStaff from "@/components/staff/AddStaff"
import { Dialog } from "@/components/ui/dialog"

const StaffPage = () => {
  const [openAdd, setOpenAdd] = useState<boolean>(false)
  const [search, setSearch] = useState("")

  const {
    data: StaffData,
    isLoading,
    isError,
  } = useQuery<StaffUserMapping[]>({
    queryKey: ["staff"],
    queryFn: getAllStaff,
  })

  const filteredStaff = useMemo(() => {
    if (!StaffData) return []

    return StaffData.filter((item) => {
      const fullName =
        `${item.user?.firstName || ""} ${item.user?.lastName || ""}`.toLowerCase()

      const email = item.user?.email?.toLowerCase() || ""
      const phone = item.user?.phoneNumber || ""

      return (
        fullName.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase()) ||
        phone.includes(search)
      )
    })
  }, [StaffData, search])

  return (
    <Dialog
      open={openAdd}
      onOpenChange={(open) => {
        if (!open) setOpenAdd(false)
      }}
    >
      {openAdd && <AddStaff setOpenAdd={setOpenAdd} />}

      {/* Add Button */}
      <button
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl hover:scale-105"
        onClick={() => setOpenAdd(true)}
      >
        <Plus />
      </button>

      <div className="shadow-soft mt-4 space-y-4 rounded-2xl border bg-white p-4 sm:p-6">
        {/* Header */}
        <section className="rounded-2xl border bg-stone-800 p-5 text-white">
          <h1 className="text-2xl font-bold">Staff Management</h1>
          <p className="mt-2 text-sm">Manage your Staff efficiently.</p>
        </section>

        {/* Search */}
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              type="search"
              placeholder="Search Staff by name , phone number and email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border py-2.5 pr-3 pl-9 text-sm focus:ring-2 focus:ring-zinc-100"
            />
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {!isError && !isLoading && filteredStaff.length === 0 && (
            <NoFound title="Staff" />
          )}
          {isError && <ErrorMessage />}
          {isLoading && (
            <>
              <StaffCardSkeleton />
              <StaffCardSkeleton />
              <StaffCardSkeleton />
            </>
          )}
          {filteredStaff.map((staff) => {
            if (!staff?.staff) return null
            return <StaffCard {...staff} key={staff.staff.id} />
          })}
        </div>
      </div>
    </Dialog>
  )
}

export default StaffPage
