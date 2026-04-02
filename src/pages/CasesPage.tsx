import { useMemo, useState } from "react"
import { Plus, Search } from "lucide-react"
import { Virtuoso } from "react-virtuoso"

import { useAppSelector } from "@/hooks/hooks"
import ErrorMessage from "@/components/ErrorMessage"
import CasesCardSkeleton from "@/components/cases/CasesCardSkeleton"
import CasesCard from "@/components/cases/CasesCard"
import NoFound from "@/components/NoFound"
import type { Case } from "@/types/caseType"
import { Dialog } from "@/components/ui/dialog"
import AddCase from "@/components/cases/AddCase"
import { Helmet } from "react-helmet-async"
import { useGetCaseQuery } from "@/store/services/caseAPI"

const CasesPage = () => {
  const role = useAppSelector((state) => state.auth.role)
  const [openAdd, setOpenAdd] = useState<boolean>(false)
  const [search, setSearch] = useState("")

  const { data: cases, isLoading, isError } = useGetCaseQuery()

  const filteredCases: Case[] | undefined = useMemo(() => {
    return cases?.data.cases.filter((item: Case) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())

      return matchesSearch
    })
  }, [search, cases])

  return (
    <>
      <Helmet>
        <title>Case Management</title>
      </Helmet>
      {openAdd && (
        <Dialog open={openAdd} onOpenChange={() => setOpenAdd(false)}>
          <AddCase setOpenAdd={setOpenAdd} />
        </Dialog>
      )}
      {/* ADD TASK BUTTON */}
      {role == "lawyer" && (
        <button
          className="fixed right-6 bottom-6 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:outline-none lg:right-8 lg:bottom-8 dark:bg-white"
          onClick={() => {
            setOpenAdd(true)
          }}
        >
          <Plus className="dark:stroke-black" />
        </button>
      )}

      <section className="shadow-soft rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 h-[90vh]">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between ">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 sm:text-3xl">
              Cases Management
            </h1>
          </div>

          {/* Search + Filter */}
          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            {/* Search */}
            <label className="relative w-full sm:min-w-55 md:min-w-65">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <input
                type="search"
                placeholder="Search by title and description"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 py-2 pr-3 pl-9 text-sm outline-none focus:border-zinc-400"
                disabled={isLoading || isError}
              />
            </label>

          </div>
        </div>

        {/* List */}
        <div className="mt-5 space-y-3 h-full">
          {isLoading && (
            <>
              <CasesCardSkeleton />
              <CasesCardSkeleton />
              <CasesCardSkeleton />
            </>
          )}
          <div className="sm:h-[94%] h-[80%]">
            {isError && <ErrorMessage />}
            {!isLoading &&
            !isError &&
            filteredCases &&
            filteredCases.length > 0 ? (
              <Virtuoso
                style={{ height: "100%" }}
                className="no-scrollbar"
                totalCount={filteredCases.length}
                data={filteredCases}
                overscan={200}
                itemContent={(_index, item) => (
                  <CasesCard key={item.id} data={item} />
                )}
              />
            ) : (
              !isLoading && !isError && <NoFound title="Case" />
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default CasesPage
