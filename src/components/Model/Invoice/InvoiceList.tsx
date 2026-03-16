import InvoiceCard from "./InvoiceCard";

export type Invoice = {
  id: string;
  client: string;
  caseId: string;
  amount: number;
  paid: number;
  status: "Paid" | "Pending" | "Overdue";
  invoiceDate: string;
  dueDate: string;
};

const invoices: Invoice[] = [
  {
    id: "INV-1001",
    client: "Sable & Co",
    caseId: "CS-1102",
    amount: 6400,
    paid: 6400,
    status: "Paid",
    invoiceDate: "2026-02-10",
    dueDate: "2026-02-28",
  },
  {
    id: "INV-1002",
    client: "Lumen Legal",
    caseId: "CS-1110",
    amount: 8200,
    paid: 4200,
    status: "Pending",
    invoiceDate: "2026-03-01",
    dueDate: "2026-03-20",
  },
  {
    id: "INV-1003",
    client: "Ridgeway Holdings",
    caseId: "CS-1156",
    amount: 5600,
    paid: 0,
    status: "Overdue",
    invoiceDate: "2026-01-15",
    dueDate: "2026-02-01",
  },
];

export default function InvoiceList() {
  return (
    <>
      <div className="rounded-xl border border-zinc-200 bg-white/80 p-4 space-y-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">
                Invoice List
              </h2>
              <p className="text-sm text-zinc-500">
                Search, filter, and manage invoices.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Search invoices"
                  className="w-60 max-w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm transition focus:border-zinc-400 focus:outline-none"
                />
                <svg
                  className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-zinc-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-4.3-4.3"
                  />
                </svg>
              </div>
              <select
                id="statusFilter"
                className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm transition focus:border-zinc-400 focus:outline-none"
              >
                <option value="">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
              <select
                id="clientFilter"
                className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm transition focus:border-zinc-400 focus:outline-none"
              >
                <option value="">All Clients</option>
              </select>
              <div className="flex items-center gap-2">
                <input
                  id="dateFrom"
                  type="date"
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm transition focus:border-zinc-400 focus:outline-none"
                />
                <span className="text-xs text-zinc-400">to</span>
                <input
                  id="dateTo"
                  type="date"
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm transition focus:border-zinc-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          id="invoiceCardList"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {invoices.map((item) => (
            <InvoiceCard {...item} />
          ))}
        </div>
      </div>
    </>
  );
}
