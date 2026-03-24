import type { LawyerDataType } from "@/data/lawyerData"
import { queryClient } from "@/main"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { X } from "lucide-react"
import { phoneNumberRegex } from "@/utils/regex"
import type { UserProfileType } from "@/data/userData"
import { getAllUser } from "@/api/adminAPI"
import { patchLawyer } from "@/api/lawyerAPI"
import { useEffect } from "react"

type AddLawyerFormData = {
  name: string
  firstName: string
  lastName: string
  phoneNumber: string
  gender: string
  address: string
  userId: number
  specialization: string
  isBlocked: number
}

const UpdateLawyerModel = (data: LawyerDataType) => {
  const navigate = useNavigate()

  const { data: userData } = useQuery<UserProfileType[]>({
    queryFn: getAllUser,
    queryKey: ["users"],
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddLawyerFormData>({
    delayError: 500,
    mode: "onChange",
  })

  useEffect(() => {
    if (data) {
      reset({
        name: data.user.name,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        phoneNumber: data.user.phoneNumber,
        gender: data.user.gender || "",
        address: data.user.address,
        userId: data.lawyer.userId,
        specialization: data.lawyer.specialization,
        isBlocked: 0,
      })
    }
  }, [data, reset])

  const { mutate, isPending } = useMutation({
    mutationFn: patchLawyer,
    onSuccess: () => {
      toast.success("Lawyer updated")
      queryClient.invalidateQueries({ queryKey: ["lawyer"] })
      navigate("/lawyer")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (formData: AddLawyerFormData) => {
    mutate(formData)
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-zinc-900/50 h-screen" />

      {/* Modal Wrapper */}
      <div className="relative flex min-h-screen items-start justify-center p-3 sm:items-center sm:p-6">
        
        {/* Modal */}
        <div className="w-full max-w-3xl rounded-2xl bg-white shadow-lg max-h-[90vh] flex flex-col">
          
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3 sm:px-5 sm:py-4 rounded-2xl">
            <h3 className="text-base sm:text-lg font-semibold">
              Update Lawyer
            </h3>
            <button onClick={() => navigate("/lawyer")}>
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4"
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

              {/* User ID */}
              <label className="space-y-1.5 text-sm">
                <span className="font-medium">User *</span>
                <select
                  className="w-full rounded-lg border px-3 py-2.5"
                  {...register("userId", { required: "Required" })}
                >
                  <option value="">Select User</option>
                  {userData?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.email}
                    </option>
                  ))}
                </select>
              </label>

              {/* First Name */}
              <label className="space-y-1.5 text-sm">
                <span className="font-medium">First Name *</span>
                <input
                  className="w-full rounded-lg border px-3 py-2.5"
                  {...register("firstName", { required: "Required" })}
                />
              </label>

              {/* Last Name */}
              <label className="space-y-1.5 text-sm">
                <span className="font-medium">Last Name *</span>
                <input
                  className="w-full rounded-lg border px-3 py-2.5"
                  {...register("lastName", { required: "Required" })}
                />
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
              <label className="space-y-1.5 text-sm">
                <span className="font-medium">Gender *</span>
                <select
                  className="w-full rounded-lg border px-3 py-2.5"
                  {...register("gender", { required: "Required" })}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>

              {/* Address */}
              <label className="sm:col-span-2 space-y-1.5 text-sm">
                <span className="font-medium">Address *</span>
                <input
                  className="w-full rounded-lg border px-3 py-2.5"
                  {...register("address", { required: "Required" })}
                />
              </label>

              {/* Specialization */}
              <label className="sm:col-span-2 space-y-1.5 text-sm">
                <span className="font-medium">Specialization *</span>
                <input
                  className="w-full rounded-lg border px-3 py-2.5"
                  {...register("specialization", { required: "Required" })}
                />
              </label>

              {/* Block */}
              <label className="sm:col-span-2 space-y-1.5 text-sm">
                <span className="font-medium">Block *</span>
                <select
                  className="w-full rounded-lg border px-3 py-2.5"
                  {...register("isBlocked")}
                >
                  <option value={0}>No Block</option>
                  <option value={1}>Block</option>
                </select>
              </label>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white pt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/lawyer")}
                className="w-full sm:w-auto rounded-lg border px-4 py-2"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto rounded-lg bg-black px-4 py-2 text-white"
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

export default UpdateLawyerModel