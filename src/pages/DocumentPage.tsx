import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Search } from "lucide-react"

import { getAllDocs } from "@/api/docsAPI"
import ErrorMessage from "@/components/ErrorMessage"
import DocsCardSkeleton from "@/components/document/DocsCardSkeleton"
import NoFound from "@/components/NoFound"
import DocsHeader from "@/components/document/DocsHeader"
import DocsCard from "@/components/document/DocsCard"
import type { DocumentDataResponse } from "@/types/docsType"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Helmet } from "react-helmet-async"

const DocsPage = () => {
  const [search, setSearch] = useState("")
  const [fileType, setFileType] = useState("all")
  const [caseId, setCaseId] = useState("all")

  const { data, isLoading, isError } = useQuery<DocumentDataResponse>({
    queryKey: ["docs"],
    queryFn: getAllDocs,
  })

  const documents = useMemo(() => data?.data ?? [], [data])

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const title = doc.document.title?.toLowerCase() || ""
      const description = doc.document.description?.toLowerCase() || ""
      const searchValue = search.toLowerCase()

      const matchesSearch =
        title.includes(searchValue) || description.includes(searchValue)

      const matchesFileType =
        fileType === "all" || doc.document.fileType === fileType

      const matchesCase =
        caseId === "all" || String(doc.document.caseId) === caseId

      return matchesSearch && matchesFileType && matchesCase
    })
  }, [search, fileType, caseId, documents])

  const fileTypes = useMemo(() => {
    return [...new Set(documents.map((item) => item.document).filter(Boolean))]
  }, [documents])

  const caseIds = useMemo(() => {
    return [...new Set(documents.map((item) => item.case).filter(Boolean))]
  }, [documents])

  return (
    <>
      <Helmet>
        <title>Document Management</title>
      </Helmet>
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
        </div>

        {/* Filters */}
        <div className="mb-3 flex flex-wrap gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              type="search"
              placeholder="Search documents By title and description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 py-2.5 pr-3 pl-9 text-sm"
              disabled={isLoading || isError}
            />
          </div>

          {/* File Type */}
          <Select
            value={fileType || "all"}
            onValueChange={(value) => setFileType(value === "all" ? "" : value)}
            disabled={isLoading || isError}
          >
            <SelectTrigger className="w-50">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {fileTypes.map((type) => (
                <SelectItem key={type.id} value={type.fileType}>
                  {type.fileType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Case */}
          <Select
            value={caseId || "all"}
            onValueChange={(value) => setCaseId(value === "all" ? "" : value)}
            disabled={isLoading || isError}
          >
            <SelectTrigger className="w-55">
              <SelectValue placeholder="All Cases" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Cases</SelectItem>

              {caseIds.map((item) => (
                <SelectItem key={item.id} value={String(item.id)}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                filteredDocs.map((item) => (
                  <DocsCard docs={item} key={item.document.id} />
                ))
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
