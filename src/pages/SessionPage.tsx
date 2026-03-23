import { getAllSession } from "@/api/sessionAPI"
import ErrorMessage from "@/components/ErrorMessage"
import NoFound from "@/components/NoFound"
import AddSessionModel from "@/components/session/AddSessionModel"
import SessionCard from "@/components/session/SessionCard"
import SessionCardSkeleton from "@/components/session/SessionCardSkeleton"
import { Spinner } from "@/components/ui/spinner"
import type { sessionDataType } from "@/data/sessionData"
import { useQuery } from "@tanstack/react-query"
import { Plus, Search } from "lucide-react"
import { useMemo, useState } from "react"
import { Link, useLocation } from "react-router-dom"

const SessionPage = () => {
  const pathname = useLocation().pathname
  const [search, setSearch] = useState("")

  const {
    data: sessions = [],
    isLoading,
    isError,
  } = useQuery<sessionDataType[]>({
    queryKey: ["sessions"],
    queryFn: getAllSession,
  })

  const handleClear = () => {
    setSearch("")
  }

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) =>
      session.courtName?.toLowerCase().includes(search.toLowerCase())
    )
  }, [sessions, search])

  return (
    <>
      {pathname === "/session/add" && <AddSessionModel />}

      <section className="shadow-soft rounded-2xl border bg-white p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Sessions Management
            </h1>
            <p className="text-sm text-zinc-600">
              Manage and review all scheduled sessions
            </p>
          </div>

          {/* Search */}
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute top-1/3 left-3 h-4 w-4 -translate-y-1/2" />
              <input
                type="search"
                placeholder="Search by court name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-xl border py-2 pr-3 pl-9 text-sm"
              />
            </div>

            <button
              onClick={handleClear}
              className="h-fit rounded-lg bg-black px-4 py-2 font-mono font-semibold text-white"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Count */}
        <p className="mt-4 text-sm text-zinc-500">
          Showing {isLoading ? <Spinner /> : filteredSessions.length} sessions
        </p>

        {/* List */}
        <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading && (
            <>
              <SessionCardSkeleton />
              <SessionCardSkeleton />
              <SessionCardSkeleton />
            </>
          )}

          {isError && <ErrorMessage />}

          {!isLoading &&
            !isError &&
            (filteredSessions.length > 0 ? (
              filteredSessions.map((item) => (
                <div key={item.id}>
                  <SessionCard {...item} />
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <NoFound title="Session" />
              </div>
            ))}
        </div>

        {/* Add Button */}
        <Link to="/session/add">
          <button className="fixed right-6 bottom-6 h-14 w-14 rounded-full bg-black text-white">
            <Plus />
          </button>
        </Link>
      </section>
    </>
  )
}

export default SessionPage
