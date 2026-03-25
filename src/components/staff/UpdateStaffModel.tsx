import type { StaffDetailsType, UpdateStaffFormData } from "@/types/staff"
import { queryClient } from "@/main"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { X } from "lucide-react"
import { phoneNumberRegex } from "@/utils/regex"
import { patchStaff } from "@/api/staffAPI"
import { useEffect } from "react"

const UpdateStaffModel = (data: StaffDetailsType) => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateStaffFormData>({
    delayError: 500,
    mode: "onChange",
  })

  useEffect(() => {
    if (data) {
      reset({
        name: data.user.name || "",
        firstName: data.user.firstName || "",
        lastName: data.user.lastName || "",
        phoneNumber: data.user.phoneNumber || "",
        gender: data.user.gender || "",
        address: data.user.address || "",

        userId: data.staff.user_id,
        lawyerId: data.staff.lawyerId,
        caseId: data.staff.caseId,
        taskId: data.staff.taskId,

        isBlocked: 0,
        id: data.staff.id,
      })
    }
  }, [data, reset])

  const { mutate, isPending } = useMutation({
    mutationFn: patchStaff,
    onSuccess: () => {
      toast.success("Staff updated", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["staff"] })
      setTimeout(() => navigate("/staff"), 1500)
    },
    onError: (error) => {
      const message = error?.message || "Something went wrong"
      toast.error(message)
    },
  })

  const onSubmit = (formData: UpdateStaffFormData) => {
    mutate(formData)
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 h-screen bg-zinc-900/50" />

      {/* Wrapper */}
      <div className="relative flex min-h-screen items-start justify-center p-3 sm:items-center sm:p-6">
        <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-lg">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between border-b bg-white px-4 py-3 sm:px-5 sm:py-4">
            <h3 className="text-base font-semibold sm:text-lg">Update Staff</h3>
            <button onClick={() => navigate("/staff")}>
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Name */}
              <label className="space-y-1.5 text-sm">
                <span className="font-medium">User Name *</span>
                <input
                  className="w-full rounded-lg border px-3 py-2.5"
                  {...register("name", { required: "Required" })}
                />
                <p className="text-xs text-red-500">{errors.name?.message}</p>
              </label>

              {/* First Name */}
              <label className="space-y-1.5 text-sm">
                <span className="font-medium">First Name *</span>
                <input
                  className="w-full rounded-lg border px-3 py-2.5"
                  {...register("firstName", { required: "Required" })}
                />
                <p className="text-xs text-red-500">
                  {errors.firstName?.message}
                </p>
              </label>

              {/* Last Name */}
              <label className="space-y-1.5 text-sm">
                <span className="font-medium">Last Name *</span>
                <input
                  className="w-full rounded-lg border px-3 py-2.5"
                  {...register("lastName", { required: "Required" })}
                />
                <p className="text-xs text-red-500">
                  {errors.lastName?.message}
                </p>
              </label>

              {/* Phone */}
              <label className="space-y-1.5 text-sm">
                <span className="font-medium">Phone *</span>
                <input
                  className="w-full rounded-lg border px-3 py-2.5"
                  {...register("phoneNumber", {
                    required: "Required",
                    pattern: {
                      value: phoneNumberRegex,
                      message: "Invalid phone",
                    },
                  })}
                />
                <p className="text-xs text-red-500">
                  {errors.phoneNumber?.message}
                </p>
              </label>

              {/* Gender */}
              <label className="space-y-1.5 text-sm col-span-full">
                <span className="font-medium">Gender *</span>
                <select
                  className="w-full rounded-lg border px-3 py-2.5 col-span-full"
                  {...register("gender", { required: "Required" })}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <p className="text-xs text-red-500">{errors.gender?.message}</p>
              </label>

              {/* Address */}
              <label className="space-y-1.5 text-sm sm:col-span-2">
                <span className="font-medium">Address *</span>
                <input
                  className="w-full rounded-lg border px-3 py-2.5"
                  {...register("address", { required: "Required" })}
                />
                <p className="text-xs text-red-500">
                  {errors.address?.message}
                </p>
              </label>



              {/* Case ID */}
              <label className="space-y-1.5 text-sm">
                <span className="font-medium">Case ID *</span>
                <input
                  type="number"
                  className="w-full rounded-lg border px-3 py-2.5"
                  {...register("caseId", {
                    required: "Required",
                    valueAsNumber: true,
                  })}
                />
                <p className="text-xs text-red-500">{errors.caseId?.message}</p>
              </label>



              {/* Block */}
              <label className="space-y-1.5 text-sm ">
                <span className="font-medium">Block *</span>
                <select
                  className="w-full rounded-lg border px-3 py-2.5"
                  {...register("isBlocked", { valueAsNumber: true })}
                >
                  <option value={0}>No Block</option>
                  <option value={1}>Block</option>
                </select>
              </label>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 flex flex-col gap-2 bg-white pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/staff")}
                className="w-full rounded-lg border px-4 py-2 sm:w-auto"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-black px-4 py-2 text-white sm:w-auto"
              >
                {isPending ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateStaffModel
