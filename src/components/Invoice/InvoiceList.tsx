import type { Invoice } from "@/types/invoiceType";
import InvoiceCard from "./InvoiceCard";
import InvoiceCardSkeleton from "./InvoiceCardSkeleton";

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
const InvoiceList = () => {
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
                <img
                  src="/search.svg"
                  alt="search"
                  className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-zinc-400"
                />
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Search invoices"
                  className="w-60 max-w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm transition focus:border-zinc-400 focus:outline-none"
                />
              </div>
              <select className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm transition focus:border-zinc-400 focus:outline-none">
                <option value="">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
              <select className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm transition focus:border-zinc-400 focus:outline-none">
                <option value="">All Clients</option>
              </select>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm transition focus:border-zinc-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {invoices.map((item) => (
            <>
            <InvoiceCard {...item} />
            <InvoiceCardSkeleton/>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default InvoiceList;
