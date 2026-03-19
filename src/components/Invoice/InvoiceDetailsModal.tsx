import type { Invoice } from "@/types/invoiceType";

type Props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & Invoice;

const InvoiceDetailsModal = (data: Props) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const statusColor = {
    Paid: "bg-emerald-100 text-emerald-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Overdue: "bg-rose-100 text-rose-700",
  };

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center"
      onClick={() => data.closeModal(false)}
    >
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
            <h3 className="text-xl font-bold text-zinc-900">
              Invoice Details
            </h3>
            <p className="text-xs text-zinc-500">{data._id}</p>
          </div>

          <button
            onClick={() => data.closeModal(false)}
            className="rounded-lg border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-100"
          >
            <img src="/x.svg" className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-sm text-zinc-700">
          {/* Client + Case */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-zinc-400 uppercase">Client</p>
              <p className="font-medium text-zinc-900">{data.client}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-400 uppercase">Case ID</p>
              <p className="font-medium text-zinc-900">{data.caseId}</p>
            </div>
          </div>

          {/* Amount */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-zinc-400 uppercase">Amount</p>
              <p className="font-semibold text-zinc-900">
                ₹{data.amount}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-400 uppercase">Paid</p>
              <p className="font-semibold text-zinc-900">
                ₹{data.paid}
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-zinc-400 uppercase">
                Invoice Date
              </p>
              <p className="font-medium text-zinc-900">
                {formatDate(data.invoiceDate)}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-400 uppercase">
                Due Date
              </p>
              <p className="font-medium text-zinc-900">
                {formatDate(data.dueDate)}
              </p>
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs text-zinc-400 uppercase">Status</p>
            <span
              className={`inline-flex mt-1 items-center rounded-full px-3 py-1 text-xs font-semibold ${
                statusColor[data.status]
              }`}
            >
              {data.status}
            </span>
          </div>

          {/* Balance */}
          <div className="border-t pt-3">
            <p className="text-xs text-zinc-400 uppercase">Remaining</p>
            <p className="text-lg font-bold text-zinc-900">
              ₹{data.amount - data.paid}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => data.closeModal(false)}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsModal;