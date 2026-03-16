import type { Invoice } from "./InvoiceList";

type ModelProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & Invoice;

const InvoiceDeleteModal = (data: ModelProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Confirm Delete
            </p>

            <h3 className="mt-2 text-xl font-semibold text-zinc-900">
              Delete Invoice
            </h3>
          </div>

          <button
            className="rounded-lg border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-100"
            onClick={() => {
              data.closeModal(false);
            }}
          >
            <img src="/x.svg" alt="x" className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 text-sm text-zinc-600">
          Are you sure you want to delete this invoice?
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-100"
            onClick={() => {
              data.closeModal(false);
            }}
          >
            Cancel
          </button>

          <button className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDeleteModal;
