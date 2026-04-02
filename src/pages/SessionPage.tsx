import { Plus } from "lucide-react"
import { useMemo, useState } from "react"
import { VirtuosoGrid } from "react-virtuoso"

import ErrorMessage from "@/components/ErrorMessage"
import NoFound from "@/components/NoFound"
import SessionCard from "@/components/session/SessionCard"
import SessionCardSkeleton from "@/components/session/SessionCardSkeleton"
import { Spinner } from "@/components/ui/spinner"
import { Dialog } from "@/components/ui/dialog"
import AddSession from "@/components/session/AddSession"
import { Helmet } from "react-helmet-async"
import { useGetSessionQuery } from "@/store/services/sessionAPI"

const SessionPage = () => {
  const [search, setSearch] = useState("")
  const [openAdd, setOpenAdd] = useState<boolean>(false)

  const { data: sessions, isLoading, isError } = useGetSessionQuery()

  const handleClear = () => {
    setSearch("")
  }

  const filteredSessions = useMemo(() => {
    return (
      sessions?.data.filter((session) =>
        session.session.courtName?.toLowerCase().includes(search.toLowerCase())
      ) || []
    )
  }, [sessions, search])

  return (
    <Dialog
      open={openAdd}
      onOpenChange={(open) => {
        if (!open) setOpenAdd(false)
      }}
    >
      <Helmet>
        <title>Session Management</title>
      </Helmet>
      {openAdd && <AddSession setOpenAdd={setOpenAdd} />}

      <section className="shadow-soft h-[90vh] rounded-2xl border bg-white p-4 sm:p-6">
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
          <div>
            <div className="flex w-full gap-3">
              <input
                type="search"
                placeholder="Search by court name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full flex-1 rounded-xl border px-4 py-2 text-sm"
                disabled={isError || isLoading}
              />

              <button
                onClick={handleClear}
                className="h-fit rounded-lg bg-black px-4 py-2 font-mono font-semibold text-white"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Count */}
        <p className="my-4 text-sm text-zinc-500">
          Showing {isLoading ? <Spinner /> : filteredSessions?.length} sessions
        </p>

        {/* List */}
        <div className="h-[70%] sm:h-[80%]">
          {isError && (
            <div className="col-span-full">
              <ErrorMessage />
            </div>
          )}
          {isLoading && (
            <>
              <SessionCardSkeleton />
              <SessionCardSkeleton />
              <SessionCardSkeleton />
            </>
          )}
          {!isLoading &&
            !isError &&
            (filteredSessions && filteredSessions?.length > 0 ? (
              <VirtuosoGrid
                style={{ height: "100%" }}
                data={filteredSessions}
                overscan={200}
                components={{
                  List: (props) => (
                    <div
                      {...props}
                      className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                    />
                  ),
                  Item: ({ children, ...props }) => (
                    <div {...props}>{children}</div>
                  ),
                }}
                itemContent={(_, item) => (
                  <SessionCard data={item} key={item.session.id} />
                )}
              />
            ) : (
              <div className="col-span-full">
                <NoFound title="Session" />
              </div>
            ))}
        </div>
        {/* Add Button */}
        <button
          className="fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white"
          onClick={() => {
            setOpenAdd(true)
          }}
        >
          <Plus />
        </button>
      </section>
    </Dialog>
  )
}

export default SessionPage
