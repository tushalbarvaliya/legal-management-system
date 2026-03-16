import type { SessionData } from "@/types/sessionType";

const sessions: SessionData[] = [
  {
    _id: "sess_001",
    title: "Initial Client Consultation",
    date: "2026-03-20",
    clientName: "Rohit Sharma",
    clientId: "client_101",
    caseTitle: "Property Dispute",
    caseId: "case_501",
    location: "Ahmedabad District Court",
    time: "10:30 AM",
    createdAt: "2026-03-10T09:30:00Z",
    updatedAt: "2026-03-10T09:30:00Z",
    note: "Discuss property documents and ownership details.",
  },
  {
    _id: "sess_002",
    title: "Evidence Review Meeting",
    date: "2026-03-22",
    clientName: "Priya Patel",
    clientId: "client_102",
    caseTitle: "Contract Breach",
    caseId: "case_502",
    location: "Law Office Meeting Room",
    time: "02:00 PM",
    createdAt: "2026-03-11T11:15:00Z",
    updatedAt: "2026-03-11T11:15:00Z",
    note: "Review contract clauses and supporting evidence.",
  },
  {
    _id: "sess_003",
    title: "Court Hearing Preparation",
    date: "2026-03-25",
    clientName: "Amit Verma",
    clientId: "client_103",
    caseTitle: "Criminal Defense",
    caseId: "case_503",
    location: "Office Conference Room",
    time: "04:30 PM",
    createdAt: "2026-03-12T14:45:00Z",
    updatedAt: "2026-03-12T14:45:00Z",
    note: "Prepare arguments and review witness statements.",
  },
  {
    _id: "sess_004",
    title: "Settlement Discussion",
    date: "2026-03-27",
    clientName: "Neha Shah",
    clientId: "client_104",
    caseTitle: "Business Partnership Dispute",
    caseId: "case_504",
    location: "Client Office",
    time: "11:00 AM",
    createdAt: "2026-03-13T10:00:00Z",
    updatedAt: "2026-03-13T10:00:00Z",
    note: "Discuss settlement options with opposing party.",
  },
  {
    _id: "sess_005",
    title: "Final Case Strategy",
    date: "2026-03-30",
    clientName: "Karan Mehta",
    clientId: "client_105",
    caseTitle: "Tax Fraud Investigation",
    caseId: "case_505",
    location: "Law Office",
    time: "03:15 PM",
    createdAt: "2026-03-14T12:20:00Z",
    updatedAt: "2026-03-14T12:20:00Z",
    note: "Finalize defense strategy before court hearing.",
  },
];
const SessionPage = () => {
  return (
    <>
      <section className="rounded-2xl  border border-zinc-200 bg-white p-4 shadow-soft sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Sessions Management
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Manage and review all scheduled sessions
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <label className="relative w-full min-w-0 sm:min-w-55 md:min-w-65">
              <span className="sr-only">Search tasks</span>
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
            <input
              type="date"
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3 text-sm text-zinc-800 outline-none transition duration-200 placeholder:text-zinc-400 focus:border-zinc-400"
            />
            <button className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 hover:scale-[1.02]">
              Clear
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-3 overflow-y-scroll no-scrollbar">
          <p className="hidden rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center text-sm text-zinc-600">
            No tasks match your current search or filters.
          </p>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-3">
            {sessions.map((item) => (
              <>{item._id}</>
            ))}
          </div>
        </div>
        <button className="fixed bottom-6 right-6 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 lg:bottom-8 lg:right-8">
          <img src="/plus.svg" alt="+" className="h-6 w-6" />
        </button>
      </section>
    </>
  );
};

export default SessionPage;
