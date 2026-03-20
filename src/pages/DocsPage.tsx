import { useMemo, useState } from "react";
import DocsCard from "@/components/DocsModels/DocsCard";
import DocsHeader from "@/components/DocsModels/DocsHeader";
import type { DocumentData } from "@/types/docsType";
import DocsCardSkeleton from "@/components/DocsModels/DocsCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getAllDocs } from "@/api/docsAPI";
import ErrorMessage from "@/components/ErrorMessage";
import { Spinner } from "@/components/ui/spinner";

const DocsPage = () => {
  const [search, setSearch] = useState("");
  const [fileType, setFileType] = useState("all");
  const [caseId, setCaseId] = useState("all");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["docs"],
    queryFn: getAllDocs,
  });

  const documents: DocumentData[] = useMemo(() => {
    return Array.isArray(data) ? data : data?.data || [];
  }, [data]);

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.title?.toLowerCase().includes(search.toLowerCase()) ||
        doc.description?.toLowerCase().includes(search.toLowerCase()) ||
        doc.caseId?.toLowerCase().includes(search.toLowerCase());

      const matchesFileType = fileType === "all" || doc.fileType === fileType;

      const matchesCase = caseId === "all" || doc.caseId === caseId;

      return matchesSearch && matchesFileType && matchesCase;
    });
  }, [search, fileType, caseId, documents]);

  return (
    <>
      <DocsHeader />

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-soft sm:p-6 mt-4">
        {/* Header */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              Select Documents
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Choose a Document card to load related documents.
            </p>
          </div>

          <p className="text-xs uppercase bg-black text-white flex items-center font-semibold p-2 rounded-full font-mono">
            {isLoading && <Spinner />}
            {isError && 0}
            {!isLoading && !isError && filteredDocs.length}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-3 flex gap-4 flex-wrap">
          {/* Search */}
          <div className="relative flex-1">
            <img
              src="/search.svg"
              alt="search"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            />
            <input
              type="search"
              placeholder="Search documents here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 py-2.5 pl-9 pr-3 text-sm"
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
            <option value="all">All Type</option>
            {[...new Set(documents.map((item) => item.fileType))].map(
              (type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ),
            )}
          </select>

          {/* Case */}
          <select
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
            disabled={isLoading || isError}
          >
            <option value="all">All Cases</option>
            {[...new Set(documents.map((item) => item.caseId))].map(
              (caseItem) => (
                <option key={caseItem} value={caseItem}>
                  {caseItem}
                </option>
              ),
            )}
          </select>

          {/* Client */}
        </div>

        {/* List */}
        <div className="flex w-full gap-4 flex-col">
          {isLoading && (
            <>
              <DocsCardSkeleton />
              <DocsCardSkeleton />
              <DocsCardSkeleton />
            </>
          )}
          {isError && <ErrorMessage />}
          {!isError &&
            !isLoading &&
            (filteredDocs.length > 0 ? (
              filteredDocs.map((item) => <DocsCard {...item} key={item._id} />)
            ) : (
              <p className="text-center text-sm text-zinc-500 py-6">
                No documents found
              </p>
            ))}
        </div>
      </div>
    </>
  );
};

export default DocsPage;
