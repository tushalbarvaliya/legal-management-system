import type { Invoice } from "@/types/invoiceType";
import { formatData } from "@/utils/formatDate";
import { useState } from "react";
import EditInvoiceModel from "./EditInvoiceModel";
import DeleteInvoiceModel from "./DeleteTaskModel";

const InvoiceCard = (invoice: Invoice) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <>
      {editOpen && <EditInvoiceModel closeModal={setEditOpen} {...invoice} />}
      {deleteOpen && (
        <DeleteInvoiceModel closeModal={setDeleteOpen} {...invoice} />
      )}
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              {invoice._id}
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
              >
                View
              </button>
              <button
                className="block w-full rounded-md px-3 py-2 text-left text-sm text-zinc-700 transition duration-150 hover:bg-zinc-100"
                onClick={() => {
                  setEditOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className="block w-full rounded-md px-3 py-2 text-left text-sm text-rose-600 transition duration-150 hover:bg-rose-50"
                onClick={() => {
                  setDeleteOpen(true);
                }}
              >
                Delete
              </button>
              <button className="block w-full rounded-md px-3 py-2 text-left text-sm text-zinc-700 transition duration-150 hover:bg-zinc-100">
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
            <p className="font-medium text-zinc-800">
              {formatData(invoice.dueDate)}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-zinc-400">Status</p>
            <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700">
              {invoice.status}
            </span>
          </div>

          <div>
            <p className="text-xs uppercase text-zinc-400">Invoice Date</p>
            <p className="font-medium text-zinc-800">
              {formatData(invoice.invoiceDate)}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-zinc-400">Due Date</p>
            <p className="font-medium text-zinc-800">
              {formatData(invoice.dueDate)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceCard;
