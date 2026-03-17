import CasesCard from "@/components/Case/CasesCard";
import type { CaseData } from "@/types/caseType";

const cases: CaseData[] = [
  {
    _id: "CASE-001",
    caseTitle: "Property Dispute",
    CaseDescription: "Dispute regarding land ownership between two parties.",
    caseType: "Civil",
    clientId: "CL-101",
    clientName: "Rahul Sharma",
    priority: "high",
    createdAt: "2026-03-10",
  },
  {
    _id: "CASE-002",
    caseTitle: "Contract Breach",
    CaseDescription: "Client claims breach of contract by supplier.",
    caseType: "Corporate",
    clientId: "CL-102",
    clientName: "Priya Patel",
    priority: "medium",
    createdAt: "2026-03-11",
  },
  {
    _id: "CASE-003",
    caseTitle: "Family Settlement",
    CaseDescription: "Family property settlement and inheritance issue.",
    caseType: "Family",
    clientId: "CL-103",
    clientName: "Amit Verma",
    priority: "low",
    createdAt: "2026-03-12",
  },
  {
    _id: "CASE-004",
    caseTitle: "Tax Evasion Investigation",
    CaseDescription: "Investigation related to alleged tax evasion.",
    caseType: "Criminal",
    clientId: "CL-104",
    clientName: "Neha Gupta",
    priority: "high",
    createdAt: "2026-03-13",
  },
];

const CasesPage = () => {
  return (
    <>
      <section className="rounded-2xl  border border-zinc-200 bg-white p-4 shadow-soft sm:p-6">
        {/* header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Cases Management
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Track deadlines, update priorities, and manage work in one place.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <label className="relative w-full min-w-0 sm:min-w-55 md:min-w-65">
              <span className="sr-only">Search Cases</span>

              <img
                src="/search.svg"
                alt="search"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
              />
              <input
                id="searchInput"
                type="search"
                placeholder="Search by title or description"
                className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3 text-sm text-zinc-800 outline-none transition duration-200 placeholder:text-zinc-400 focus:border-zinc-400"
              />
            </label>
            <select className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 outline-none transition duration-200 focus:border-zinc-400">
              <option value="all">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="mt-5 space-y-3 overflow-y-hidden">
          {cases.map((item) => (
            <CasesCard {...item} key={item._id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default CasesPage;
