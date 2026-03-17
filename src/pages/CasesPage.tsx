import { useMemo, useState } from "react";
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
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("all");

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      const matchesSearch =
        item.caseTitle.toLowerCase().includes(search.toLowerCase()) ||
        item.CaseDescription.toLowerCase().includes(search.toLowerCase()) ||
        item.clientName.toLowerCase().includes(search.toLowerCase());

      const matchesPriority =
        priority === "all" || item.priority === priority;

      return matchesSearch && matchesPriority;
    });
  }, [search, priority]);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-soft sm:p-6">
      
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
            Cases Management
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Track deadlines, update priorities, and manage work in one place.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
          
          {/* Search */}
          <label className="relative w-full sm:min-w-55 md:min-w-65">
            <img
              src="/search.svg"
              alt="search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            />
            <input
              type="search"
              placeholder="Search by title, description, client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-zinc-400"
            />
          </label>

          {/* Priority Filter */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="mt-5 space-y-3">
        {filteredCases.length > 0 ? (
          filteredCases.map((item) => (
            <CasesCard {...item} key={item._id} />
          ))
        ) : (
          <p className="text-center text-sm text-zinc-500 py-6">
            No cases found
          </p>
        )}
      </div>
    </section>
  );
};

export default CasesPage;