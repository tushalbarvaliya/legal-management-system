import { useState, useMemo } from "react"
import { Plus, Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import type { LawyerDataType } from "@/types/lawyerType"
import { getLawyer } from "@/api/lawyerAPI"
import ErrorMessage from "@/components/ErrorMessage"
import LawyerCardSkeleton from "@/components/lawyer/LawyerCardSkeleton"
import LawyerCard from "@/components/lawyer/LawyerCard"
import NoFound from "@/components/NoFound"
import { Dialog } from "@/components/ui/dialog"
import AddLawyer from "@/components/lawyer/AddLawyer"

const LawyerPage = () => {
  const [openAdd, setOpenAdd] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState("")

  const {
    data: lawyerData,
    isLoading,
    isError,
  } = useQuery<LawyerDataType[]>({
    queryKey: ["lawyer"],
    queryFn: getLawyer,
  })

  const filteredLawyers = useMemo(() => {
    if (!lawyerData) return []

    const term = searchTerm.toLowerCase()

    return lawyerData.filter((item) => {
      const { user, lawyer } = item

      return (
        user.name?.toLowerCase().includes(term) ||
        user.firstName?.toLowerCase().includes(term) ||
        user.lastName?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.phoneNumber?.toLowerCase().includes(term) ||
        lawyer.specialization?.toLowerCase().includes(term)
      )
    })
  }, [lawyerData, searchTerm])

  return (
    <Dialog
      open={openAdd}
      onOpenChange={(open) => {
        if (!open) setOpenAdd(false)
      }}
    >
      {openAdd && <AddLawyer setOpenAdd={setOpenAdd}/>}

      {/* Add Button */}
      <button
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl hover:scale-105"
        onClick={() => {
          setOpenAdd(true)
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
                Lawyer Management
              </h1>
              <p className="mt-2 text-sm">Manage your lawyers efficiently.</p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="search"
              placeholder="Search by name, email, phone, specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 py-2.5 pr-3 pl-9 text-sm focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
              disabled={isError || isLoading}
            />
          </div>
        </div>

        <div className="space-y-3">
          {/* Error */}
          {!isLoading && isError && <ErrorMessage />}

          {/* Loading */}
          {isLoading && (
            <>
              <LawyerCardSkeleton />
              <LawyerCardSkeleton />
              <LawyerCardSkeleton />
            </>
          )}

          {/* No Results */}
          {!isLoading && !isError && filteredLawyers.length === 0 && (
            <NoFound title="Lawyer" />
          )}

          {/* Data */}
          {!isLoading &&
            !isError &&
            filteredLawyers.map((item) => (
              <LawyerCard key={item.lawyer.id} {...item} />
            ))}
        </div>
      </div>
    </Dialog>
  )
}

export default LawyerPage
