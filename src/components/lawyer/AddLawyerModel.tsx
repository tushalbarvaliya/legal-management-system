import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { X } from "lucide-react"

import { phoneNumberRegex } from "@/utils/regex"
import { queryClient } from "@/main"
import { getAllUser } from "@/api/adminAPI"
import type { UserProfileType } from "@/data/userData"
import { postLawyer } from "@/api/lawyerAPI"

export type AddLawyerFormData = {
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

const AddLawyerModel = () => {
  const navigate = useNavigate()

  const { data: userData } = useQuery<UserProfileType[]>({
    queryFn: getAllUser,
    queryKey: ["users"],
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddLawyerFormData>({
    mode: "onChange",
    delayError: 500,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: postLawyer,
    onSuccess: () => {
      toast.success("User Become Lawyer", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["lawyer"] })
      setTimeout(() => {
        navigate("/lawyer")
      }, 2000)
    },
    onError: (error) => {
      toast.error(`Error ${error.message}`)
    },
  })
  setValue("isBlocked", 0)

  const onSubmit = (data: AddLawyerFormData) => {
    mutate(data)
  }

  return (
    <>
      <div className="fixed inset-0 z-70">
        <div className="absolute inset-0 bg-zinc-900/45"></div>
        <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4 sm:p-6">
          <div className="shadow-soft w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white">
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 sm:px-6">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
                Make Lawyer
              </h3>
              <button
                className="rounded-lg border border-zinc-200 p-2 text-zinc-700 transition duration-200 hover:bg-zinc-100"
                type="button"
                onClick={() => {
                  navigate("/lawyer")
                }}
              >
                <X />
              </button>
            </div>
            <form
              className="max-h-[85vh] space-y-4 overflow-y-auto px-5 py-4 sm:px-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                      <option value={item.id} key={item.id}>
                        {item.firstName} {item.lastName}
                      </option>
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
                  <p className="text-xs text-red-500">
                    {errors.gender?.message}
                  </p>
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
              </div>

              <div className="flex flex-col-reverse gap-2 border-t border-zinc-200 pt-4 sm:flex-row sm:justify-end">
                {!isPending && (
                  <>
                    <button
                      type="button"
                      className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition duration-200 hover:bg-zinc-100"
                      onClick={() => {
                        navigate("/lawyer")
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800"
                    >
                      Add Lawyer
                    </button>
                  </>
                )}
                {isPending && (
                  <>
                    <button
                      type="submit"
                      className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800"
                      disabled={isPending}
                    >
                      Adding Lawyer...
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddLawyerModel
