import { getAllCases } from "@/api/caseAPI"
import { updateTask } from "@/api/taskAPI"
import type { caseDataType } from "@/data/caseData"
import type { taskDataType } from "@/data/taskData"
import { queryClient } from "@/main"
import { useMutation, useQuery } from "@tanstack/react-query"
import { X } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export type UpdateFormDataTask = {
  title: string
  description: string
  assignedTo: number
  status: string
  caseId: number
  priority: string
}

const UpdateTaskModel = (data: taskDataType) => {
  const navigate = useNavigate()
  const { mutate ,isPending} = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      toast.success("Task Edited")
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      navigate("/task")
    },
    onError: (error) => {
      toast.error(`Error ${error}`)
    },
  })

  const { data: caseData } = useQuery<caseDataType[]>({
    queryKey: ["cases"],
    queryFn: getAllCases,
  })

  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateFormDataTask>({
    mode: "onChange",
    delayError: 500,
    defaultValues: data,
  })

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        caseId: data.caseId,
        assignedTo: data.assignedTo,
        status:data.status
      })
    }
  }, [data, reset])

  const onSubmit = (data: UpdateFormDataTask) => {
    mutate(data)
  }

  return (
    <>
      <div
        className="fixed inset-0 z-9999 flex items-center justify-center"
        onClick={() => {
          navigate("/task")
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 h-screen bg-black/40 backdrop-blur-sm"></div>

        {/* Modal */}
        <div
          className="relative mx-auto w-full max-w-xl max-h-[90vh] overflow-y-scroll rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-zinc-900">Update Task</h3>
            <button
              onClick={() => {
                navigate("/task")
              }}
              className="rounded-lg border border-zinc-200 p-2 text-zinc-600 transition duration-200 hover:bg-zinc-100"
            >
              <X />
            </button>
          </div>

          <form
            className="space-y-4 text-sm text-zinc-700"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="mb-1 block font-medium text-zinc-700">
                Title
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Please Enter This value",
                  },
                  minLength: {
                    value: 3,
                    message: "Description should contain Minimum 10 letter",
                  },
                })}
              />
              {errors.title?.message && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block font-medium text-zinc-700">
                Description
              </label>
              <textarea
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                rows={4}
                {...register("description", {
                  required: {
                    value: true,
                    message: "Please Enter This value",
                  },
                  minLength: {
                    value: 3,
                    message: "Description should contain Minimum 10 letter",
                  },
                })}
              />
              {errors.description?.message && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-medium text-zinc-700">
                  Priority
                </label>
                <select
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  {...register("priority", {
                    required: {
                      value: true,
                      message: "Please Enter A Value",
                    },
                  })}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errors.priority?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.priority.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block font-medium text-zinc-700">
                  Case Id
                </label>
                <select
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  {...register("caseId", {
                    required: {
                      value: true,
                      message: "Please Enter This value",
                    },
                  })}
                >
                  <option value="">Select Case ID</option>
                  {caseData?.map((item) => {
                    return <option value={item.id}>{item.title}</option>
                  })}
                </select>

                {errors.caseId?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.caseId.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block font-medium text-zinc-700">
                  Status
                </label>
                <select
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  {...register("status", {
                    required: {
                      value: true,
                      message: "Please Enter This value",
                    },
                  })}
                >
                  <option value="">Select Status</option>
                  <option value="today">today</option>
                  <option value="overdue">overdue</option>
                  <option value="completed">completed</option>
                </select>

                {errors.caseId?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.caseId.message}
                  </p>
                )}
              </div>
              
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  navigate("/task")
                }}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800"
                disabled={isPending}
              >
                {isPending?"Updating Task...":"Update Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateTaskModel
