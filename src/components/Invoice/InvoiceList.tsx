import { useMemo, useState } from "react";
import type { Invoice } from "@/types/invoiceType";
import InvoiceCard from "./InvoiceCard";
import InvoiceCardSkeleton from "./InvoiceCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getAllInvoice } from "@/api/invoiceAPI";
import ErrorMessage from "../ErrorMessage";
import { Button } from "../ui/button";

const InvoiceList = () => {
  const {
    data: invoices,
    isLoading,
    isError,
  } = useQuery<Invoice[]>({
    queryKey: ["invoices"],
    queryFn: getAllInvoice,
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [client, setClient] = useState("");
  const [date, setDate] = useState("");

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setClient("");
    setDate("");
  };

  const clientOptions = useMemo(() => {
    if (!invoices) return [];
    return [...new Set(invoices.map((i) => i.client))];
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    if (!invoices) return [];

    return invoices.filter((inv) => {
      const matchSearch =
        inv.client.toLowerCase().includes(search.toLowerCase()) ||
        inv.caseId.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status ? inv.status === status : true;

      const matchClient = client ? inv.client === client : true;

      const matchDate = date
        ? new Date(inv.invoiceDate).toISOString().split("T")[0] >= date
        : true;

      return matchSearch && matchStatus && matchClient && matchDate;
    });
  }, [invoices, search, status, client, date]);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white/80 p-4 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Invoice List</h2>
          <p className="text-sm text-zinc-500">
            Search, filter, and manage invoices.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <img
              src="/search.svg"
              className="absolute right-3 top-2.5 h-4 w-4"
            />
            <input
              type="text"
              placeholder="Search invoices"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-60 max-w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-zinc-400 outline-none"
              disabled={isLoading || isError}
            />
          </div>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-zinc-400 outline-none"
            disabled={isLoading || isError}
          >
            <option value="">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>

          {/* Client */}
          <select
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-zinc-400 outline-none"
            disabled={isLoading || isError}
          >
            <option value="">All Clients</option>
            {clientOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* Date */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-zinc-400 outline-none"
            disabled={isLoading || isError}
          />
          <Button onClick={clearFilters} disabled={isLoading || isError}>
            Clear
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <InvoiceCardSkeleton key={i} />
          ))}
        {isError && (
          <div className="col-span-full text-center text-zinc-500">
            <ErrorMessage />
          </div>
        )}
        {!isError &&
          !isLoading &&
          (filteredInvoices.length > 0 ? (
            filteredInvoices.map((item) => (
              <InvoiceCard {...item} key={item._id} />
            ))
          ) : (
            <p className="col-span-full text-center text-zinc-500">
              No invoices found
            </p>
          ))}
      </div>
    </div>
  );
};

export default InvoiceList;
