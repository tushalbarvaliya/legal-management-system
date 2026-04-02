import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Virtuoso } from "react-virtuoso"

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
import { Button } from "@/components/ui/button"

const DocsPage = () => {
  const [search, setSearch] = useState("")
  const [caseId, setCaseId] = useState("all")

  const { data, isLoading, isError } = useQuery<DocumentDataResponse>({
    queryKey: ["docs"],
    queryFn: getAllDocs,
  })

  const documents = useMemo(() => data?.data ?? [], [data])
  const handelClear = () => {
    setSearch("")
    setCaseId("all")
  }
  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const title = doc.document.title?.toLowerCase() || ""
      const description = doc.document.description?.toLowerCase() || ""
      const searchValue = search.toLowerCase()

      const matchesSearch =
        title.includes(searchValue) || description.includes(searchValue)

      const matchesCase =
        caseId === "all" || String(doc.document.caseId) === caseId

      return matchesSearch && matchesCase
    })
  }, [search, caseId, documents])

  const caseIds = useMemo(() => {
    return [...new Set(documents.map((item) => item.case).filter(Boolean))]
  }, [documents])

  return (
    <>
      <Helmet>
        <title>Document Management</title>
      </Helmet>
      <div className="shadow-soft h-[90vh] rounded-2xl border border-zinc-200 bg-white">
        <DocsHeader />
        {/* Header */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="mx-2">
            <h2 className="text-lg font-semibold text-zinc-900">
              Select Documents
            </h2>
          </div>
        </div>

        {/* Filters */}
        <div className="mx-2 mb-3 flex flex-wrap gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search documents By title and description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full min-w-50 rounded-xl border border-zinc-200 py-2.5 pr-3 pl-9 text-sm"
              disabled={isLoading || isError}
            />
          </div>

          {/* Case */}
          <Select
            value={caseId || "all"}
            onValueChange={(value) =>
              setCaseId(value === "all" ? "all" : value)
            }
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
          <Button onClick={handelClear}>Clear</Button>
        </div>

        {/* List */}
        <div className="flex h-[60%] w-full flex-col gap-4 sm:h-[70%]">
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
                <Virtuoso
                  style={{ height: "100%" }}
                  className="no-scrollbar"
                  data={filteredDocs}
                  overscan={200}
                  itemContent={(_, item) => (
                    <DocsCard docs={item} key={item.document.id} />
                  )}
                />
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
