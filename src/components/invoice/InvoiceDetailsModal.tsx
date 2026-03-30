import type { invoiceDataType } from "@/types/invoiceType"
import { formatDate } from "@/utils/formate"
import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"

const getClasses = (status: string) => {
  if (status === "Paid") {
    return "bg-emerald-100 text-emerald-700"
  } else if (status === "Pending") {
    return "bg-yellow-100 text-yellow-700"
  } else {
    return "bg-rose-100 text-rose-700"
  }
}

const InvoiceDetailsModal = (data: invoiceDataType) => {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Modal */}
      <div
        className="relative mx-auto w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-zinc-900">Invoice Details</h3>
            <p className="text-xs text-zinc-500">ID: {data.id}</p>
          </div>

          <button
            onClick={() => navigate("/invoice")}
            className="rounded-lg border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-100"
          >
            <X />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-sm text-zinc-700">
          {/* Client + Case */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-zinc-400 uppercase">Client ID</p>
              <p className="font-medium text-zinc-900">{data.clientId}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-400 uppercase">Case ID</p>
              <p className="font-medium text-zinc-900">{data.caseId}</p>
            </div>
          </div>

          {/* Amount */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-zinc-400 uppercase">Total Amount</p>
              <p className="font-semibold text-zinc-900">₹{data.totalAmount}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-400 uppercase">Total Hours</p>
              <p className="font-semibold text-zinc-900">{data.totalHours}</p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-zinc-400 uppercase">Invoice Date</p>
              <p className="font-medium text-zinc-900">
                {formatDate(data.createdAt)}
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-400 uppercase">Status</p>
              <span
                className={`mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getClasses(
                  data.status
                )}`}
              >
                {data.status}
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-zinc-400 uppercase">Payment Method</p>
              <p className="font-medium text-zinc-900">
                {data.paymentMethod ? data.paymentMethod : "null"}
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-400 uppercase">Payment Status</p>
              <span
                className={
                  "mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                }
              >
                {data.paymentStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => navigate("/invoice")}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetailsModal
