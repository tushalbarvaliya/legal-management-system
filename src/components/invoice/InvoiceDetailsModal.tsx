import type { Payment } from "@/types/invoiceType"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

const getClasses = (status: string) => {
  if (status === "Paid") return "bg-emerald-100 text-emerald-700"
  if (status === "Pending") return "bg-yellow-100 text-yellow-700"
  return "bg-rose-100 text-rose-700"
}

const InvoiceDetailsModal = ({
  data,
  setOpenView,
}: {
  data: Payment
  setOpenView: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <DialogContent className="max-w-lg lg:min-w-200">
      <DialogHeader>
        <DialogTitle className="flex flex-col gap-1">
          <span className="text-xl font-bold text-zinc-900">
            Invoice Details
          </span>
          <span className="text-xs text-zinc-500">ID: {data.id}</span>
        </DialogTitle>
      </DialogHeader>

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

        {/* Payment Info */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs text-zinc-400 uppercase">Payment Method</p>
            <p className="font-medium text-zinc-900">
              {data.paymentMethod || "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-400 uppercase">Payment Status</p>
            <span
              className={`mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getClasses(data.paymentStatus)}`}
            >
              {data.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      <DialogFooter className="mt-5 flex justify-end">
        <Button variant="outline" onClick={() => setOpenView(false)}>
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default InvoiceDetailsModal
