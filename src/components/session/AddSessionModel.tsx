import { useMutation, useQuery } from "@tanstack/react-query"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { queryClient } from "@/main"
import { addSession } from "@/api/sessionAPI"
import { getAllCases } from "@/api/caseAPI"
import { getAllClient } from "@/api/clientAPI"
import type { caseDataType } from "@/data/caseData"
import type { ClientDataType } from "@/data/clientData"

export type SessionAddFormType = {
  sessionDate: string
  sessionTime: string
  courtName: string
  caseId: number
  clientId: number
}

const AddSessionModel = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: addSession,
    onSuccess: () => {
      toast.success("Session Add")
      queryClient.invalidateQueries({ queryKey: ["sessions"] })
      navigate("/session")
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
    formState: { errors },
  } = useForm<SessionAddFormType>({
    mode: "onChange",
    delayError: 500,
  })

  const onSubmit = (data: SessionAddFormType) => {
    // console.log(data);
    mutate(data)
  }

  return (
    <div className="fixed inset-0 z-70">
      <div className="absolute inset-0 bg-zinc-900/45"></div>

      <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4 sm:p-6">
        <div className="shadow-soft w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white">
          <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 sm:px-6">
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
              Create Session
            </h3>

            <button
              className="rounded-lg border border-zinc-200 p-2 text-zinc-700 transition hover:bg-zinc-100"
              onClick={() => navigate("session")}
            >
              <X />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 px-5 py-4 sm:px-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Session Title */}
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Court Name <span className="text-red-500">*</span>
                </span>

                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("courtName", {
                    required: {
                      value: true,
                      message: "Please Enter a value",
                    },
                    minLength: {
                      value: 3,
                      message: "Minimum 5 characters required",
                    },
                  })}
                />
                {errors.courtName?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.courtName?.message}
                  </p>
                )}
              </label>

              {/* Client ID */}
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Case ID <span className="text-red-500">*</span>
                </span>

                <select
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("caseId", {
                    minLength: {
                      value: 1,
                      message: "caseID length should be greater than 3",
                    },
                    required: {
                      value: true,
                      message: "Please Enter a Value",
                    },
                  })}
                >
                  <option value="">Select ...</option>
                  {caseData?.map((item) => {
                    return <option value={item.id} key={item.id}>{item.title}</option>
                  })}
                </select>
                <p className="text-xs text-red-500">{errors.caseId?.message}</p>
              </label>
            </div>

            {/* Case ID */}
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
                {clientData?.map((item) => (
                  <option value={item.client.id} key={item.client.id}>
                    {item.user.firstName}{""}{item.user.lastName}
                  </option>
                ))}
              </select>
              {errors.clientId?.message && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.clientId.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Date */}
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Session Date <span className="text-red-500">*</span>
                </span>

                <input
                  type="date"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("sessionDate", {
                    required: {
                      value: true,
                      message: "Enter a Value",
                    },
                    validate: (value) => {
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)

                      const selectedDate = new Date(value)
                      selectedDate.setHours(0, 0, 0, 0)

                      return (
                        selectedDate >= today ||
                        "Please enter a valid future or today's date"
                      )
                    },
                  })}
                />
                {errors.sessionDate?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.sessionDate?.message}
                  </p>
                )}
              </label>

              {/* Time */}
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  SessionTime <span className="text-red-500">*</span>
                </span>

                <input
                  type="time"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("sessionTime", {
                    required: {
                      value: true,
                      message: "Enter a value",
                    },
                  })}
                />
                {errors.sessionTime?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.sessionTime?.message}
                  </p>
                )}
              </label>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-2 border-t border-zinc-200 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                onClick={() => navigate("session")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:scale-[1.02] hover:bg-zinc-800"
                disabled={isPending}
              >
                {isPending ? "Creating session..." : "Create Session"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddSessionModel
