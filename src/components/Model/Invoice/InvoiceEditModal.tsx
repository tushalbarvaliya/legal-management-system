import { useForm } from "react-hook-form";
import type { Invoice } from "./InvoiceList";

type EditInvoiceModalProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & Invoice;

const EditInvoiceModal = (data: EditInvoiceModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Invoice>({
    defaultValues: {
      client: data.client,
      caseId: data.caseId,
      invoiceDate: data.invoiceDate,
      dueDate: data.dueDate,
      amount: data.amount,
      paid: data.paid,
      status: data.status,
    },
    mode: "onChange",
    delayError: 500,
  });

  const onSubmit = (formData: Invoice) => {
    console.log("Updated Invoice:", formData);
    data.closeModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Edit Invoice
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
            <img src="/x.svg" alt="x" className="h-5 w-5" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          {/* Client */}
          <div>
            <label className="text-xs uppercase text-zinc-400">Client</label>
            <input
              className="mt-1 w-full rounded-lg border border-zinc-200 p-2"
              {...register("client", { required: "Client is required" })}
            />
            {errors.client && (
              <p className="text-xs text-red-500">{errors.client.message}</p>
            )}
          </div>

          {/* Case ID */}
          <div>
            <label className="text-xs uppercase text-zinc-400">Case ID</label>
            <input
              className="mt-1 w-full rounded-lg border border-zinc-200 p-2"
              {...register("caseId", { required: "Case ID is required" })}
            />
            {errors.caseId && (
              <p className="text-xs text-red-500">{errors.caseId.message}</p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase text-zinc-400">
                Invoice Date
              </label>
              <input
                type="date"
                className="mt-1 w-full rounded-lg border border-zinc-200 p-2"
                {...register("invoiceDate", {
                  required: "Invoice date required",
                })}
              />
              {errors.invoiceDate && (
                <p className="text-xs text-red-500">
                  {errors.invoiceDate.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs uppercase text-zinc-400">
                Due Date
              </label>
              <input
                type="date"
                className="mt-1 w-full rounded-lg border border-zinc-200 p-2"
                {...register("dueDate", {
                  required: "Due date required",
                })}
              />
              {errors.dueDate && (
                <p className="text-xs text-red-500">{errors.dueDate.message}</p>
              )}
            </div>
          </div>

          {/* Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase text-zinc-400">
                Total Amount
              </label>
              <input
                type="number"
                className="mt-1 w-full rounded-lg border border-zinc-200 p-2"
                {...register("amount", {
                  required: "Amount required",
                  min: { value: 1, message: "Amount must be greater than 0" },
                })}
              />
              {errors.amount && (
                <p className="text-xs text-red-500">{errors.amount.message}</p>
              )}
            </div>

            <div>
              <label className="text-xs uppercase text-zinc-400">
                Paid Amount
              </label>
              <input
                type="number"
                className="mt-1 w-full rounded-lg border border-zinc-200 p-2"
                {...register("paid", {
                  required: "Paid amount required",
                  min: { value: 0, message: "Cannot be negative" },
                })}
              />
              {errors.paid && (
                <p className="text-xs text-red-500">{errors.paid.message}</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-xs uppercase text-zinc-400">Status</label>
            <select
              className="mt-1 w-full rounded-lg border border-zinc-200 p-2"
              {...register("status", { required: "Status required" })}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
            {errors.status && (
              <p className="text-xs text-red-500">{errors.status.message}</p>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-100"
              onClick={() => data.closeModal(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInvoiceModal;
