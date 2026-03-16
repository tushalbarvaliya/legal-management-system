import type { Invoice } from "./InvoiceList";

type InvoiceDetailsModelProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & Invoice;

const InvoiceDetailsModel = (data: InvoiceDetailsModelProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Invoice Details
            </p>
            <h3 className="mt-2 text-xl font-semibold text-zinc-900">
              {data.id}
            </h3>
          </div>

          <button
            className="rounded-lg border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-100"
            onClick={() => {
              data.closeModal(false);
            }}
          >
            
            <img src="/x.svg" alt="x" className="h-5 w-5"/>
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-4 text-sm text-zinc-600">
          {/* Info */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                Client
              </p>
              <p className="text-sm font-semibold text-zinc-900">
                {data.client}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                Case ID
              </p>
              <p className="text-sm font-semibold text-zinc-900">
                {data.caseId}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                Invoice Date
              </p>
              <p className="text-sm font-semibold text-zinc-900">
                {data.invoiceDate}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                Due Date
              </p>
              <p className="text-sm font-semibold text-zinc-900">
                {data.dueDate}
              </p>
            </div>
          </div>

          {/* Items */}

          {/* Amount */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-zinc-200 p-3">
              <p className="text-xs uppercase text-zinc-400">Total Amount</p>
              <p className="text-lg font-semibold text-zinc-900">
                ${data.amount}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 p-3">
              <p className="text-xs uppercase text-zinc-400">Paid Amount</p>
              <p className="text-lg font-semibold text-zinc-900">
                ${data.paid}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 p-3">
              <p className="text-xs uppercase text-zinc-400">Due Amount</p>
              <p className="text-lg font-semibold text-zinc-900">
                ${data.amount - data.paid}
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 p-3">
              <p className="text-xs uppercase text-zinc-400">Status</p>
              <p className="text-lg font-semibold text-zinc-900">
                {data.status}
              </p>
            </div>
          </div>

          {/* Notes */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Notes
            </p>
            <p className="mt-1 text-sm text-zinc-700">{"notes"}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            onClick={() => {
              data.closeModal(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsModel;
