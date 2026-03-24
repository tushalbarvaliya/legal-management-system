import { useState, useMemo } from "react"
import { getLawyer } from "@/api/lawyerAPI"
import { useQuery } from "@tanstack/react-query"
import ErrorMessage from "@/components/ErrorMessage"
import LawyerCardSkeleton from "@/components/lawyer/LawyerCardSkeleton"
import LawyerCard from "@/components/lawyer/LawyerCard"
import { Plus, Search } from "lucide-react"
import type { LawyerDataType } from "@/data/lawyerData"

const LawyerPage = () => {
  // const [addModelOpen, setAddModelOpen] = useState(false)
  const {
    data: lawyerData,
    isLoading,
    isError,
  } = useQuery<LawyerDataType[]>({
    queryKey: ["lawyer"],
    queryFn: getLawyer,
  })

  return (
    <>
      {/* Add Button */}
      {/* {addModelOpen && <AddLawyerModel onClose={setAddModelOpen} />} */}

      <button className="fixed right-6 bottom-6 z-99 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl hover:scale-105">
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

        {/*  Search  */}
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              type="search"
              placeholder="Search lawyer..."
              className="w-full rounded-xl border border-zinc-200 py-2.5 pr-3 pl-9 text-sm focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
              disabled={isError || isLoading}
            />
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {!isLoading && isError && <ErrorMessage />}
          {isLoading && (
            <>
              <LawyerCardSkeleton />
              <LawyerCardSkeleton />
              <LawyerCardSkeleton />
            </>
          )}
          {!isLoading && !isError && lawyerData?.length === 0 && (
            <p className="text-sm text-zinc-500">No results found</p>
          )}
          {lawyerData?.map((lawyer) => {
            return lawyer ? (
              <LawyerCard key={lawyer.lawyer.id} {...lawyer} />
            ) : null
          })}
        </div>
      </div>
    </>
  )
}

export default LawyerPage
