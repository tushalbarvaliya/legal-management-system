import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Spinner } from "@/components/ui/spinner"
import { Search } from "lucide-react"

import { getAllDocs } from "@/api/docsAPI"
import type { docsDataType } from "@/data/docsData"
import ErrorMessage from "@/components/ErrorMessage"
import DocsCardSkeleton from "@/components/document/DocsCardSkeleton"
import NoFound from "@/components/NoFound"
import DocsHeader from "@/components/document/DocsHeader"
import DocsCard from "@/components/document/DocsCard"

const DocsPage = () => {
  const [search, setSearch] = useState("")
  const [fileType, setFileType] = useState("all")
  const [caseId, setCaseId] = useState("all")

  const { data, isLoading, isError } = useQuery<docsDataType[]>({
    queryKey: ["docs"],
    queryFn: getAllDocs,
  })

  const documents = useMemo(() => data ?? [], [data])

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const title = doc.title?.toLowerCase() || ""
      const description = doc.description?.toLowerCase() || ""
      const searchValue = search.toLowerCase()

      const matchesSearch =
        title.includes(searchValue) || description.includes(searchValue)

      const matchesFileType = fileType === "all" || doc.fileType === fileType

      const matchesCase = caseId === "all" || String(doc.caseId) === caseId

      return matchesSearch && matchesFileType && matchesCase
    })
  }, [search, fileType, caseId, documents])

  const fileTypes = useMemo(() => {
    return [...new Set(documents.map((item) => item.fileType).filter(Boolean))]
  }, [documents])

  const caseIds = useMemo(() => {
    return [...new Set(documents.map((item) => item.caseId).filter(Boolean))]
  }, [documents])

  return (
    <>
      <DocsHeader />

      <div className="shadow-soft mt-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
        {/* Header */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              Select Documents
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Choose a document card to load related documents.
            </p>
          </div>

          <p className="flex items-center rounded-full bg-black px-3 py-2 font-mono text-xs font-semibold text-white uppercase">
            {isLoading && <Spinner />}
            {isError && "Error"}
            {!isLoading && !isError && filteredDocs.length}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-3 flex flex-wrap gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              type="search"
              placeholder="Search documents By title and description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 py-2.5 pr-3 pl-9 text-sm"
              disabled={isLoading || isError}
            />
          </div>

          {/* File Type */}
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
            disabled={isLoading || isError}
          >
            <option value="all">All Types</option>
            {fileTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Case */}
          <select
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
            disabled={isLoading || isError}
          >
            <option value="all">All Cases</option>
            {caseIds.map((id) => (
              <option key={id} value={String(id)}>
                {id}
              </option>
            ))}
          </select>
        </div>

        {/* List */}
        <div className="flex w-full flex-col gap-4">
          {isLoading && (
            <>
              <DocsCardSkeleton />
              <DocsCardSkeleton />
              <DocsCardSkeleton />
            </>
          )}

          {isError && <ErrorMessage />}

          {!isLoading && !isError && (
            <>
              {filteredDocs.length > 0 ? (
                filteredDocs.map((item) => <DocsCard {...item} key={item.id} />)
              ) : (
                <NoFound title="Documents" />
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default DocsPage
