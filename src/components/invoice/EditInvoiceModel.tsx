import { updateInvoice } from "@/api/invoiceAPI"
import type { invoiceDataType } from "@/data/invoiceData"
import { queryClient } from "@/main"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type { AddInvoiceFormDataType } from "./AddInvoiceModel"
import type { CaseDataType } from "@/types/caseType"
import { getAllCases } from "@/api/caseAPI"
import type { ClientResponse } from "@/types/clientType"
import { getAllClient } from "@/api/clientAPI"
import { X } from "lucide-react"
import { useEffect } from "react"

const EditInvoiceModel = (data: invoiceDataType) => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: updateInvoice,
    onSuccess: () => {
      toast.success("Invoice Updated Successfully")
      queryClient.invalidateQueries({ queryKey: ["invoices"] })
      navigate("/invoice")
    },
    onError: (error) => {
      toast.error(`Error ${error}`)
    },
  })
  const { data: caseData } = useQuery<CaseDataType[]>({
    queryKey: ["cases"],
    queryFn: getAllCases,
  })
  const { data: clientData } = useQuery<ClientResponse[]>({
    queryFn: getAllClient,
    queryKey: ["client"],
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddInvoiceFormDataType>({
    mode: "onChange",
    delayError: 500,
    defaultValues: data,
  })
  useEffect(() => {
    if (data) {
      reset({
        ...data,
        caseId: data.caseId,
        clientId: data.clientId,
      })
    }
  }, [data, reset])

  const onSubmit = (formData: AddInvoiceFormDataType) => {
    mutate(formData)
  }

  const inputClass =
    "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition duration-200 focus:border-zinc-400"

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Modal */}
      <div
        className="relative mx-auto w-full max-w-xl max-h-[90vh] overflow-y-scroll rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-zinc-900">Edit Invoice</h3>
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
                return <option value={item.client.id}>{item.user.firstName}{" "}{item.user.lastName}</option>
              })}
            </select>
            <p className="min-h-5 text-xs text-red-600">
              {errors.clientId?.message}
            </p>
          </div>

          {/* Case ID */}
          <div>
            <label className="mb-1 block font-medium text-zinc-700">
              Case ID
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
              {errors.caseId?.message}
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
              <option value="overdue">Overdue</option>
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
              {isPending ? "Editing..." : "Edit Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditInvoiceModel
