import { useMemo, useState } from "react"
import InvoiceCard from "./InvoiceCard"
import InvoiceCardSkeleton from "./InvoiceCardSkeleton"
import { useQuery } from "@tanstack/react-query"
import ErrorMessage from "../ErrorMessage"
import { Button } from "../ui/button"
import { getAllInvoice } from "@/api/invoiceAPI"
import type { invoiceDataType } from "@/data/invoiceData"
import NoFound from "../NoFound"

const InvoiceList = () => {
  const {
    data: invoices,
    isLoading,
    isError,
  } = useQuery<invoiceDataType[] | undefined>({
    queryKey: ["invoices"],
    queryFn: getAllInvoice,
  })

  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [client, setClient] = useState("")

  const clearFilters = () => {
    setSearch("")
    setStatus("")
    setClient("")
  }

  const clientOptions = useMemo(() => {
    if (!invoices) return []
    return [...new Set(invoices.map((i) => i.clientId))]
  }, [invoices])

  const filteredInvoices = useMemo(() => {
    if (!invoices) return []

    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.id?.toString().includes(search) ||
        invoice.clientId?.toString().includes(search) ||
        invoice.status?.toLowerCase().includes(search.toLowerCase())

      const matchesStatus =
        !status || invoice.status?.toLowerCase() === status.toLowerCase()

      const matchesClient =
        !client || String(invoice.clientId) === String(client)

      return matchesSearch && matchesStatus && matchesClient
    })
  }, [invoices, search, status, client])

  return (
    <div className="space-y-4 rounded-xl border border-zinc-200 bg-white/80 p-4">
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
              className="absolute top-2.5 right-3 h-4 w-4"
            />
            <input
              type="text"
              placeholder="Search invoices"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-60 max-w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
              disabled={isLoading || isError}
            />
          </div>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
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
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
            disabled={isLoading || isError}
          >
            <option value="">All Clients</option>
            {clientOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Date */}

          <Button onClick={clearFilters} disabled={isLoading || isError}>
            Clear
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Loading */}
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <InvoiceCardSkeleton key={i} />
          ))}

        {/* Error */}
        {isError && (
          <div className="col-span-full text-center text-zinc-500">
            <ErrorMessage />
          </div>
        )}

        {/* Data */}
        {!isLoading &&
          !isError &&
          (filteredInvoices!.length > 0 ? (
            filteredInvoices?.map((item) => (
              <InvoiceCard {...item} key={item.id} />
            ))
          ) : (
            <div className="col-span-full">
              <NoFound title="Invoice" />
            </div>
          ))}
      </div>
    </div>
  )
}

export default InvoiceList
