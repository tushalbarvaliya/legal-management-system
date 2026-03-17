import { useMemo, useState } from "react";
import DocsCard from "@/components/DocsModels/DocsCard";
import DocsHeader from "@/components/DocsModels/DocsHeader";
import type { DocumentData } from "@/types/docsType";
import DocsCardSkeleton from "@/components/DocsModels/DocsCardSkeleton";

const documents: DocumentData[] = [
  {
    id: "DOC-001",
    title: "Contract Draft V1",
    description: "Initial contract draft prepared for client review.",
    documentLink: "https://example.com/files/contract-v1.pdf",
    fileType: "pdf",
    caseId: "CASE-412",
    clientId: "CL-1001",
    notes: "Need signature by Friday.",
  },
  {
    id: "DOC-002",
    title: "Identity Proof Bundle",
    description: "Collected government IDs and address proof.",
    documentLink: "https://example.com/files/id-proof.zip",
    caseId: "CASE-412",
    clientId: "CL-1001",
    notes: "",
    fileType: "pdf",
  },
  {
    id: "DOC-003",
    title: "Financial Statement 2025",
    description: "Annual statement for due diligence checks.",
    documentLink: "https://example.com/files/fin-statement-2025.xlsx",
    caseId: "CASE-928",
    clientId: "CL-1002",
    notes: "Cross-check line item 14.",
    fileType: "pdf",
  },
  {
    id: "DOC-004",
    title: "Case Notes Summary",
    description: "Compiled notes from previous hearings.",
    documentLink: "https://example.com/files/case-notes-summary.docx",
    caseId: "CASE-110",
    clientId: "CL-1003",
    notes: "Review with legal team.",
    fileType: "excel",
  },
];

const DocsPage = () => {
  const [search, setSearch] = useState("");
  const [fileType, setFileType] = useState("all");
  const [caseId, setCaseId] = useState("all");
  const [clientId, setClientId] = useState("all");

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.description.toLowerCase().includes(search.toLowerCase()) ||
        doc.caseId.toLowerCase().includes(search.toLowerCase()) ||
        doc.clientId.toLowerCase().includes(search.toLowerCase());

      const matchesFileType = fileType === "all" || doc.fileType === fileType;

      const matchesCase = caseId === "all" || doc.caseId === caseId;

      const matchesClient = clientId === "all" || doc.clientId === clientId;

      return matchesSearch && matchesFileType && matchesCase && matchesClient;
    });
  }, [search, fileType, caseId, clientId]);

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
            {filteredDocs.length}
          </p>
        </div>

        <div className="mb-3 flex gap-4 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 ">
            <img
              src="/search.svg"
              alt="search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            />
            <input
              type="search"
              placeholder="Search documents here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
            />
          </div>

          {/* File Type */}
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          >
            <option value="all">All Type</option>
            {[...new Set(documents.map((item) => item.fileType))].map(
              (item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ),
            )}
          </select>

          {/* Case */}
          <select
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          >
            <option value="all">All Cases</option>
            {[...new Set(documents.map((item) => item.caseId))].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Client */}
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          >
            <option value="all">All Clients</option>
            {[...new Set(documents.map((item) => item.clientId))].map(
              (item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ),
            )}
          </select>
        </div>

        {/* List */}
        <div className="flex w-full gap-4 flex-col">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((items) => (
              <>
                <DocsCard {...items} key={items.id} />
                <DocsCardSkeleton />
              </>
            ))
          ) : (
            <p className="text-center text-sm text-zinc-500 py-6">
              No documents found
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default DocsPage;
