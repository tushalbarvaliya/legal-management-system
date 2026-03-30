import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import InvoiceCard from "./InvoiceCard"
import InvoiceCardSkeleton from "./InvoiceCardSkeleton"
import ErrorMessage from "../ErrorMessage"
import { Button } from "../ui/button"
import { getAllInvoice } from "@/api/invoiceAPI"
import type { invoiceDataType } from "@/types/invoiceType"
import NoFound from "../NoFound"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const InvoiceList = () => {
  const {
    data: invoices,
    isLoading,
    isError,
  } = useQuery<invoiceDataType | undefined>({
    queryKey: ["invoices"],
    queryFn: getAllInvoice,
  })

  const [status, setStatus] = useState("")
  const [client, setClient] = useState("")

  const clearFilters = () => {
    setStatus("")
    setClient("")
  }

  const clientOptions = useMemo(() => {
    if (!invoices) return []
    return [...new Set(invoices.data.map((i) => i.clientId))]
  }, [invoices])

  const filteredInvoices = useMemo(() => {
    if (!invoices) return []

    return invoices.data.filter((invoice) => {
      const matchesStatus =
        !status || invoice.status?.toLowerCase() === status.toLowerCase()

      const matchesClient =
        !client || String(invoice.clientId) === String(client)

      return matchesStatus && matchesClient
    })
  }, [invoices, status, client])

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
          {/* Status */}
          <Select
            value={status || "all"}
            onValueChange={(value) => setStatus(value === "all" ? "" : value)}
            disabled={isLoading || isError}
          >
            <SelectTrigger className="w-50">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>

          {/* Client */}
          <Select
            value={client}
            onValueChange={(value) => setClient(value)}
            disabled={isLoading || isError}
          >
            <SelectTrigger className="w-50">
              <SelectValue placeholder="All Clients" />
            </SelectTrigger>

            <SelectContent>
              {clientOptions.map((c) => (
                <SelectItem key={c} value={String(c)}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Date */}

          <Button
            onClick={clearFilters}
            disabled={isLoading || isError}
            className="p-4"
          >
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
