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
    <div className="fixed inset-0 z-70">
      <div className="absolute inset-0 h-screen bg-zinc-900/45"></div>

      <div className="relative flex min-h-full items-center justify-center p-4">
        <div className="shadow-soft w-full max-w-3xl rounded-2xl bg-white">
          {/* Header */}
          <div className="flex justify-between border-b px-5 py-4">
            <h3 className="text-lg font-semibold">Update Lawyer</h3>
            <button onClick={() => navigate("/lawyer")}>
              <X />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* label form */}
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  User Name <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("name", {
                    minLength: {
                      value: 3,
                      message: "Title length should be greater than 10 ",
                    },
                    required: {
                      value: true,
                      message: "Please Enter a Value",
                    },
                  })}
                />
                <p className="text-xs text-red-500">{errors.name?.message}</p>
              </label>
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  User ID <span className="text-red-500">*</span>
                </span>

                <select
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("userId", {
                    required: {
                      value: true,
                      message: "Please Enter a Value",
                    },
                  })}
                >
                  <option value="">Select User</option>
                  {userData?.map((item) => (
                    <option value={item.id}>{item.email}</option>
                  ))}
                </select>
                <p className="text-xs text-red-500">{errors.name?.message}</p>
              </label>
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  First name <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("firstName", {
                    minLength: {
                      value: 3,
                      message: "Title length should be greater than 10 ",
                    },
                    required: {
                      value: true,
                      message: "Please Enter a Value",
                    },
                  })}
                />
                <p className="text-xs text-red-500">
                  {errors.firstName?.message}
                </p>
              </label>
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  last Name <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("lastName", {
                    minLength: {
                      value: 3,
                      message: "Title length should be greater than 10 ",
                    },
                    required: {
                      value: true,
                      message: "Please Enter a Value",
                    },
                  })}
                />
                <p className="text-xs text-red-500">
                  {errors.lastName?.message}
                </p>
              </label>
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("phoneNumber", {
                    minLength: {
                      value: 3,
                      message: "Title length should be greater than 10 ",
                    },
                    pattern: {
                      value: phoneNumberRegex,
                      message: "Please enter 10 digits only",
                    },
                    required: {
                      value: true,
                      message: "Please Enter a Value",
                    },
                  })}
                />
                <p className="text-xs text-red-500">
                  {errors.phoneNumber?.message}
                </p>
              </label>
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Gender <span className="text-red-500">*</span>
                </span>

                <select
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("gender", {
                    required: {
                      value: true,
                      message: "Please Enter a Value",
                    },
                  })}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <p className="text-xs text-red-500">{errors.gender?.message}</p>
              </label>
              <label className="col-span-full space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Address <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("address", {
                    minLength: {
                      value: 3,
                      message: "Title length should be greater than 10 ",
                    },
                    required: {
                      value: true,
                      message: "Please Enter a Value",
                    },
                  })}
                />
                <p className="text-xs text-red-500">
                  {errors.address?.message}
                </p>
              </label>
              <label className="col-span-full space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  specialization <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("specialization", {
                    minLength: {
                      value: 3,
                      message: "Title length should be greater than 10 ",
                    },
                    required: {
                      value: true,
                      message: "Please Enter a Value",
                    },
                  })}
                />
                <p className="text-xs text-red-500">
                  {errors.specialization?.message}
                </p>
              </label>
              <label className="col-span-full space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Block <span className="text-red-500">*</span>
                </span>
                <select
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("isBlocked", {
                    required: {
                      value: true,
                      message: "Please Enter a Value",
                    },
                  })}
                >
                  <option value={1}>Block</option>
                  <option value={0}>No Block</option>
                </select>
                <p className="text-xs text-red-500">
                  {errors.isBlocked?.message}
                </p>
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 border-t pt-4">
              <button
                type="button"
                onClick={() => navigate("/lawyer")}
                className="rounded-lg border px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="rounded-lg bg-black px-4 py-2 text-white"
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
