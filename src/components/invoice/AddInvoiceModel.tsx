import { getAllCases } from "@/api/caseAPI"
import { getAllClient } from "@/api/clientAPI"
import { addInvoice } from "@/api/invoiceAPI"
import type { caseDataType } from "@/data/caseData"
import type { ClientDataType } from "@/data/clientData"
import { queryClient } from "@/main"

import { useMutation, useQuery } from "@tanstack/react-query"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export type AddInvoiceFormDataType = {
  totalHours: number
  totalAmount: number
  clientId: number
  caseId: number
  companyId: number
  status: string
}

const AddInvoiceModel = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: addInvoice,
    onSuccess: () => {
      toast.success("Invoice Added Successfully")
      queryClient.invalidateQueries({ queryKey: ["invoices"] })
      navigate("/invoice")
    },
    onError: (error) => {
      toast.error(`Error ${error}`)
    },
  })

  const { data: caseData } = useQuery<caseDataType[]>({
    queryKey: ["cases"],
    queryFn: getAllCases,
  })
  const { data: clientData } = useQuery<ClientDataType[]>({
    queryFn: getAllClient,
    queryKey: ["client"],
  })
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddInvoiceFormDataType>({
    mode: "onChange",
    delayError: 500,
  })

  setValue("companyId", 1)
  const onSubmit = (formData: AddInvoiceFormDataType) => {
    mutate(formData)
  }

  const inputClass =
    "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition duration-200 focus:border-zinc-400"

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center"
      onClick={() => navigate("/invoice")}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Modal */}
      <div
        className="relative mx-auto w-full max-h-[90vh] overflow-y-scroll max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-zinc-900">Add New Invoice</h3>
          <button
            onClick={() => navigate("/invoice")}
            className="rounded-lg border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-100"
          >
            <X />
          </button>
        </div>

        {/* Form */}
        <form
          className="space-y-4 text-sm text-zinc-700"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Client */}
          <div>
            <label className="mb-1 block font-medium text-zinc-700">
              Client Id
            </label>
            <select
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
              {...register("clientId", {
                minLength: {
                  value: 1,
                  message: "caseID length should be greater than 3",
                },
                required: {
                  value: true,
                  message: "Please enter a value",
                },
              })}
            >
              <option value="">Select ...</option>
              {clientData?.map((item) => {
                return (
                  <option value={item.client.id}>
                    {item.user.firstName} {item.user.lastName}
                  </option>
                )
              })}
            </select>
            <p className="min-h-5 text-xs text-red-600">
              {errors.clientId?.message}
            </p>
          </div>

          {/* Case ID */}
          <div>
            <label className="mb-1 block font-medium text-zinc-700">
              Client ID
            </label>

            <select
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
              {...register("caseId", {
                minLength: {
                  value: 1,
                  message: "caseID length should be greater than 3",
                },
                required: {
                  value: true,
                  message: "Please enter a value",
                },
              })}
            >
              <option value="">Select ...</option>
              {caseData?.map((item) => {
                return <option value={item.id}>{item.title}</option>
              })}
            </select>
            <p className="min-h-5 text-xs text-red-600">
              {errors.clientId?.message}
            </p>
          </div>

          {/* Amount + Paid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-medium text-zinc-700">
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
              <label className="mb-1 block font-medium text-zinc-700">
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
            <label className="mb-1 block font-medium text-zinc-700">
              Status
            </label>
            <select
              className={inputClass}
              {...register("status", {
                required: "Select status",
              })}
            >
              <option value="">Select Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
            <p className="min-h-5 text-xs text-red-600">
              {errors.status?.message}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate("/invoice")}
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
  )
}

export default AddInvoiceModel
