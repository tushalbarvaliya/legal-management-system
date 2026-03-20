import { getAddCase } from "@/api/caseAPI";
import { getAllClient } from "@/api/clientAPI";
import { addInvoice } from "@/api/invoiceAPI";
import type { caseDataType } from "@/Data/caseData";
import type { InvoiceDataType } from "@/Data/invoiceData";
import { queryClient } from "@/main";
import type { ClientData } from "@/types/clientType";
import type { Invoice } from "@/types/invoiceType";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddInvoiceModel = (data: Props) => {
  const { mutate, isPending } = useMutation({
    mutationFn: addInvoice,
    onSuccess: () => {
      toast.success("Invoice Added Successfully");
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      data.closeModal(false);
    },
    onError: (error) => {
      toast.error(`Error ${error}`);
    },
  });

  const { data: caseData } = useQuery<caseDataType[]>({
    queryKey: ["cases"],
    queryFn: getAddCase,
  });
  const { data: clientData } = useQuery<ClientData[]>({
    queryKey: ["client"],
    queryFn: getAllClient,
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InvoiceDataType>({
    mode: "onChange",
    delayError: 500,
  });

  const onSubmit = (formData: InvoiceDataType) => {
    mutate({...formData,companyId:1});
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
          <h3 className="text-xl font-bold text-zinc-900">Add New Invoice</h3>
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
              Client Id
            </label>
            <select
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
              {...register("caseId", {
                minLength: {
                  value: 1,
                  message: "caseID length should be greater than 3",
                },
                required: true,
              })}
            >
              <option value="">Select ...</option>
              {clientData?.map((item) => {
                return <option value={item.id}>{item.occupation}</option>;
              })}
            </select>
            <p className="min-h-5 text-xs text-red-600">
              {errors.clientId?.message}
            </p>
          </div>

          {/* Case ID */}
          <div>
            <label className="block mb-1 font-medium text-zinc-700">
              Case ID
            </label>

            <select
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
              {...register("caseId", {
                minLength: {
                  value: 1,
                  message: "caseID length should be greater than 3",
                },
                required: true,
              })}
            >
              <option value="">Select ...</option>
              {caseData?.map((item) => {
                return <option value={item.id}>{item.title}</option>;
              })}
            </select>
            <p className="min-h-5 text-xs text-red-600">
              {errors.caseId?.message}
            </p>
          </div>

          {/* Amount + Paid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block mb-1 font-medium text-zinc-700">
                Total Amount
              </label>
              <input
                type="number"
                className={inputClass}
                {...register("totalAmount", {
                  required: "Enter amount",
                  min: { value: 0, message: "Invalid amount" },
                })}
              />
              <p className="min-h-5 text-xs text-red-600">
                {errors.totalAmount?.message}
              </p>
            </div>

            <div>
              <label className="block mb-1 font-medium text-zinc-700">
                Total Hours
              </label>
              <input
                type="number"
                className={inputClass}
                {...register("totalHours", {
                  required: "Enter paid amount",
                  min: { value: 0, message: "Invalid value" },
                })}
              />
              <p className="min-h-5 text-xs text-red-600">
                {errors.totalHours?.message}
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
              {isPending ? "Adding..." : "Add Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInvoiceModel;
