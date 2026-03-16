import { useState } from "react";
import type { Invoice } from "./InvoiceList";
import InvoiceDetailsModel from "./InvoiceDetailsModel";
import InvoiceEditModal from "./InvoiceEditModal";
import InvoiceDeleteModal from "./InvoiceDeleteModal";

const InvoiceCard = (invoice: Invoice) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [detailsModel, setDetailsModel] = useState<boolean>(false);
  const [EditModel, setEditModel] = useState<boolean>(false);
  const [deleteModel, setDeleteModel] = useState<boolean>(false);

  return (
    <>
      {detailsModel && (
        <InvoiceDetailsModel {...invoice} closeModal={setDetailsModel} />
      )}
      {EditModel && (
        <InvoiceEditModal {...invoice} closeModal={setEditModel} />
      )}
      {deleteModel && (
        <InvoiceDeleteModal {...invoice} closeModal={setDeleteModel} />
      )}
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              {invoice.id}
            </p>
            <p className="mt-1 text-lg font-semibold text-zinc-900">
              {invoice.client}
            </p>
            <p className="text-sm text-zinc-500">{invoice.caseId}</p>
          </div>

          <div className="relative">
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100"
              onClick={() => {
                setMenuOpen((prev) => !prev);
              }}
            >
              <span className="text-lg">⋮</span>
            </button>
            <div
              data-menu="${invoice.id}-card"
              className={`absolute right-0 top-10 z-30 ${menuOpen ? "" : "hidden"} min-w-35 rounded-lg border border-zinc-200 bg-white p-1 shadow-soft`}
              onMouseLeave={() => {
                setMenuOpen(false);
              }}
            >
              <button
                data-action="view"
                data-id="${invoice.id}"
                className="block w-full rounded-md px-3 py-2 text-left text-sm text-zinc-700 transition duration-150 hover:bg-zinc-100"
                onClick={() => {
                  setDetailsModel(true);
                }}
              >
                View
              </button>
              <button
                data-action="edit"
                data-id="${invoice.id}"
                className="block w-full rounded-md px-3 py-2 text-left text-sm text-zinc-700 transition duration-150 hover:bg-zinc-100"
                onClick={() => {
                  setEditModel(true);
                }}
              >
                Edit
              </button>
              <button
                data-action="delete"
                data-id="${invoice.id}"
                className="block w-full rounded-md px-3 py-2 text-left text-sm text-rose-600 transition duration-150 hover:bg-rose-50"
                onClick={() => {
                  setDeleteModel(true);
                }}
              >
                Delete
              </button>
              <button
                data-action="download"
                data-id="${invoice.id}"
                className="block w-full rounded-md px-3 py-2 text-left text-sm text-zinc-700 transition duration-150 hover:bg-zinc-100"
              >
                Download Invoice
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-zinc-600">
          <div>
            <p className="text-xs uppercase text-zinc-400">Invoice</p>
            <p className="font-medium text-zinc-800">${invoice.amount}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-zinc-400">Paid</p>
            <p className="font-medium text-zinc-800">${invoice.paid}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-zinc-400">Due</p>
            <p className="font-medium text-zinc-800">{invoice.dueDate}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-zinc-400">Status</p>
            <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700">
              {invoice.status}
            </span>
          </div>

          <div>
            <p className="text-xs uppercase text-zinc-400">Invoice Date</p>
            <p className="font-medium text-zinc-800">{invoice.invoiceDate}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-zinc-400">Due Date</p>
            <p className="font-medium text-zinc-800">{invoice.dueDate}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceCard;
