import DocsHeader from "@/components/DocsModels/DocsHeader";

const documents = [
  {
    id: "DOC-001",
    title: "Contract Draft V1",
    description: "Initial contract draft prepared for client review.",
    fileLink: "https://example.com/files/contract-v1.pdf",
    caseId: "CASE-412",
    clientId: "CL-1001",
    notes: "Need signature by Friday.",
  },
  {
    id: "DOC-002",
    title: "Identity Proof Bundle",
    description: "Collected government IDs and address proof.",
    fileLink: "https://example.com/files/id-proof.zip",
    caseId: "CASE-412",
    clientId: "CL-1001",
    notes: "",
  },
  {
    id: "DOC-003",
    title: "Financial Statement 2025",
    description: "Annual statement for due diligence checks.",
    fileLink: "https://example.com/files/fin-statement-2025.xlsx",
    caseId: "CASE-928",
    clientId: "CL-1002",
    notes: "Cross-check line item 14.",
  },
  {
    id: "DOC-004",
    title: "Case Notes Summary",
    description: "Compiled notes from previous hearings.",
    fileLink: "https://example.com/files/case-notes-summary.docx",
    caseId: "CASE-110",
    clientId: "CL-1003",
    notes: "Review with legal team.",
  },
];

const DocsPage = () => {
  return (
    <>
      <DocsHeader />
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-soft sm:p-6 mt-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
              Select Documents
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Choose a Document card to load related documents.
            </p>
          </div>
          <p className="text-xs uppercase bg-black text-white font-semibold p-2  flex justify-center items-center rounded-full font-mono">
            {documents.length}
          </p>
        </div>
        <div className="mb-3">
          <div className="relative">
            <img
              src="/search.svg"
              alt="search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="search"
              placeholder="Search documents here..."
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3 text-sm text-zinc-900 outline-none transition duration-200 placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4">
          {documents.map((items) => (
            <button
              type="button"
              className={`w-full rounded-xl border p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-100/80 `}
            >
              <p className="text-base font-semibold text-zinc-900">
                {items.id}
              </p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default DocsPage;
