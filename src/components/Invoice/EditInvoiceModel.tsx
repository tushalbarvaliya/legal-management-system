import { updateInvoice } from "@/api/invoiceAPI";
import { queryClient } from "@/main";
import type { Invoice } from "@/types/invoiceType";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & Invoice;

const EditInvoiceModel = (data: Props) => {
  const { mutate, isPending } = useMutation({
    mutationFn: updateInvoice,
    onSuccess: () => {
      toast.success("Invoice Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      data.closeModal(false);
    },
    onError: (error) => {
      toast.error(`Error ${error}`);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Invoice>({
    mode: "onChange",
    delayError: 500,
    defaultValues: {
      ...data,
      invoiceDate: data.invoiceDate?.split("T")[0],
      dueDate: data.dueDate?.split("T")[0],
    },
  });

  const amount = watch("amount");

  const onSubmit = (formData: Invoice) => {
    mutate({ ...formData, _id: data._id });
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition duration-200 focus:border-zinc-400";

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
          <h3 className="text-xl font-bold text-zinc-900">Edit Invoice</h3>
          <button
            onClick={() => data.closeModal(false)}
            className="rounded-lg border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-100"
          >
            <img src="/x.svg" className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form
          className="space-y-4 text-sm text-zinc-700"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Client */}
          <div>
            <label className="block mb-1 font-medium text-zinc-700">
              Client
            </label>
            <input
              className={inputClass}
              {...register("client", {
                required: "Please enter client name",
              })}
            />
            <p className="min-h-5 text-xs text-red-600">
              {errors.client?.message}
            </p>
          </div>

          {/* Case ID */}
          <div>
            <label className="block mb-1 font-medium text-zinc-700">
              Case ID
            </label>
            <input
              className={inputClass}
              {...register("caseId", {
                required: "Please enter case ID",
              })}
            />
            <p className="min-h-5 text-xs text-red-600">
              {errors.caseId?.message}
            </p>
          </div>

          {/* Amount + Paid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block mb-1 font-medium text-zinc-700">
                Amount
              </label>
              <input
                type="number"
                className={inputClass}
                {...register("amount", {
                  required: "Enter amount",
                  min: { value: 0, message: "Invalid amount" },
                })}
              />
              <p className="min-h-5 text-xs text-red-600">
                {errors.amount?.message}
              </p>
            </div>

            <div>
              <label className="block mb-1 font-medium text-zinc-700">
                Paid
              </label>
              <input
                type="number"
                className={inputClass}
                {...register("paid", {
                  required: "Enter paid amount",
                  min: { value: 0, message: "Invalid value" },
                  validate: (value) =>
                    value <= amount || "Paid cannot exceed amount",
                })}
              />
              <p className="min-h-5 text-xs text-red-600">
                {errors.paid?.message}
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block mb-1 font-medium text-zinc-700">
                Invoice Date
              </label>
              <input
                type="date"
                className={inputClass}
                {...register("invoiceDate", {
                  required: "Select invoice date",
                })}
              />
              <p className="min-h-5 text-xs text-red-600">
                {errors.invoiceDate?.message}
              </p>
            </div>

            <div>
              <label className="block mb-1 font-medium text-zinc-700">
                Due Date
              </label>
              <input
                type="date"
                className={inputClass}
                {...register("dueDate", {
                  required: "Select due date",
                  validate: (value) => {
                    const inv = new Date(watch("invoiceDate"));
                    const due = new Date(value);
                    return due >= inv || "Due must be after invoice date";
                  },
                })}
              />
              <p className="min-h-5 text-xs text-red-600">
                {errors.dueDate?.message}
              </p>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 font-medium text-zinc-700">
              Status
            </label>
            <select
              className={inputClass}
              {...register("status", {
                required: "Select status",
              })}
            >
              <option value="">Select Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
            <p className="min-h-5 text-xs text-red-600">
              {errors.status?.message}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => data.closeModal(false)}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800"
            >
              {isPending ? "Updating..." : "Update Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInvoiceModel;
