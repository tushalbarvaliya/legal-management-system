import { useMemo, useState } from "react"
import { VirtuosoGrid } from "react-virtuoso"

import InvoiceCard from "./InvoiceCard"
import InvoiceCardSkeleton from "./InvoiceCardSkeleton"
import ErrorMessage from "../ErrorMessage"
import { Button } from "../ui/button"
import NoFound from "../NoFound"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useGetInvoiceQuery } from "@/store/services/invoiceAPI"

const InvoiceList = () => {
  const {data:invoices,isLoading,isError}=useGetInvoiceQuery()

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
        <div className="flex w-fit flex-wrap items-center gap-2">
          {/* Status */}
          <Select
            value={status || "all"}
            onValueChange={(value) => setStatus(value === "all" ? "" : value)}
            disabled={isLoading || isError}
          >
            <SelectTrigger className="w-full md:w-45">
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
            <SelectTrigger className="w-full md:w-50">
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
            className="w-full p-4 sm:w-fit"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* List */}
      {/* Loading */}
      <div className="mt-4">
        {/* Loading */}
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <InvoiceCardSkeleton key={i} />
          ))}

        {/* Error */}
        {isError && (
          <div className="text-center text-zinc-500">
            <ErrorMessage />
          </div>
        )}

        {/* Data */}
        {!isLoading && !isError && (
          <>
            {filteredInvoices.length > 0 ? (
              <VirtuosoGrid
                style={{ height: 400 }}
                data={filteredInvoices}
                overscan={200}
                components={{
                  List: (props) => (
                    <div
                      {...props}
                      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
                    />
                  ),
                  Item: ({ children, ...props }) => (
                    <div {...props}>{children}</div>
                  ),
                }}
                itemContent={(_, item) => <InvoiceCard {...item} />}
              />
            ) : (
              <NoFound title="Invoice" />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default InvoiceList
