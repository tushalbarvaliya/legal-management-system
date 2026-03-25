import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { X } from "lucide-react"

import { postCase } from "@/api/caseAPI"
import { queryClient } from "@/main"
import { getAllClient } from "@/api/clientAPI"
import type { ClientDataType } from "@/data/clientData"

export type caseAddFormDataType = {
  caseNumber: number
  title: string
  type: string
  description: string
  status: string
  caseClosedDate: string
  caseStage: string
  caseCity: string
  clientId: number
}

const AddCaseModel = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: postCase,
    onSuccess: () => {
      toast.success("Case Add Successfully", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["cases"] })
      setTimeout(() => {
        navigate("/cases")
      }, 2000)
    },
    onError: (error) => {
      toast.error(`Error ${error}`)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<caseAddFormDataType>({
    mode: "onChange",
    delayError: 500,
  })
  const { data: userData } = useQuery<ClientDataType[]>({
    queryFn: getAllClient,
    queryKey: ["client"],
  })

  const onSubmit = (formData: caseAddFormDataType) => {
    mutate(formData)
  }

  return (
    <>
      <div className="fixed inset-0 z-9999 flex items-center justify-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        {/* Modal */}
        <div
          className="relative mx-auto max-h-[90vh] w-full max-w-xl overflow-y-scroll rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-zinc-900">Add New Case</h3>
            <button
              onClick={() => navigate("/cases")}
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
            {/* Case Number */}
            <div>
              <label className="mb-1 block font-medium text-zinc-700">
                Case Number
              </label>
              <input
                type="number"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                {...register("caseNumber", {
                  required: {
                    value: true,
                    message: "Please enter case Number",
                  },
                })}
              />
              {errors.caseNumber?.message && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.caseNumber.message}
                </p>
              )}
            </div>
            {/* case Title */}
            <div>
              <label className="mb-1 block font-medium text-zinc-700">
                Case Title
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Please enter case title",
                  },
                  minLength: {
                    value: 3,
                    message: "Minimum 5 characters required",
                  },
                })}
              />
              {errors.title?.message && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="mb-1 block font-medium text-zinc-700">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Please enter description",
                  },
                  minLength: {
                    value: 3,
                    message: "Minimum 10 characters required",
                  },
                })}
              />
              {errors.description?.message && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Grid Fields */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Case Type */}
              <div>
                <label className="mb-1 block font-medium text-zinc-700">
                  Case Type
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  {...register("type", {
                    required: {
                      value: true,
                      message: "Please enter case type",
                    },
                  })}
                />
                {errors.type?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.type.message}
                  </p>
                )}
              </div>

              {/* Priority */}
              <div>
                <label className="mb-1 block font-medium text-zinc-700">
                  Case Stage
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  {...register("caseStage", {
                    required: {
                      value: true,
                      message: "Please select Case Stage",
                    },
                  })}
                ></input>
                {errors.caseStage?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.caseStage.message}
                  </p>
                )}
              </div>

              {/* Client ID */}
              <div>
                <label className="mb-1 block font-medium text-zinc-700">
                  Client ID
                </label>
                <select
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  {...register("clientId", {
                    required: {
                      value: true,
                      message: "Please enter client ID",
                    },
                  })}
                >
                  <option value="">Select Client</option>
                  {userData?.map((item) => (
                    <option value={item.client.id} key={item.client.id}>
                      {item.user.firstName} {item.user.lastName}
                    </option>
                  ))}
                </select>
                {errors.clientId?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.clientId.message}
                  </p>
                )}
              </div>

              {/* Case city */}
              <div>
                <label className="mb-1 block font-medium text-zinc-700">
                  Case City
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  {...register("caseCity", {
                    required: {
                      value: true,
                      message: "Please enter Case City",
                    },
                  })}
                />
                {errors.caseCity?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.caseCity.message}
                  </p>
                )}
              </div>
              {/*  status */}
              <div>
                <label className="mb-1 block font-medium text-zinc-700">
                  Status
                </label>
                <select
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  {...register("status", {
                    required: {
                      value: true,
                      message: "Please enter case Status",
                    },
                  })}
                >
                  <option value="">Select Status</option>
                  <option value="closed">Closed</option>
                  <option value="open">Open</option>
                </select>
                {errors.status?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.status.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block font-medium text-zinc-700">
                  Expected Closing Data
                </label>
                <input
                  type="datetime-local"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  {...register("caseClosedDate", {
                    required: {
                      value: true,
                      message: "Please enter Expected Closing Data",
                    },
                  })}
                />
                {errors.caseClosedDate?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.caseClosedDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => navigate("/cases")}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:scale-[1.02] hover:bg-zinc-800"
              >
                {isPending ? "Adding..." : "Add Case"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddCaseModel
