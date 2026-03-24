import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { postStaff } from "@/api/staffAPI"
import { queryClient } from "@/main"
import {
  addressRegex,
  nameRegex,
  phoneNumberRegex,
  userNameRegex,
} from "@/utils/regex"
import { X } from "lucide-react"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "@/hooks/hooks"

export type AddStaffFormType = {
  name: string
  firstName: string
  lastName: string
  phoneNumber: string
  gender: string
  address: string
  user_id: number
  caseId: number
  lawyerId: number
  isBlocked: boolean
}

const AddStaffModel = () => {
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: postStaff,
    mutationKey: ["addStaff"],
    onSuccess: () => {
      toast.success("Staff Created")
      queryClient.invalidateQueries({ queryKey: ["staff"] })
      navigate("/staff")
    },
    onError: (error) => {
      toast.error(`Something is Not Right ${error}`)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddStaffFormType>({
    mode: "onChange",
    delayError: 500,
  })

  const id = useAppSelector((state) => state.auth.id)
  const onSubmit = (data: AddStaffFormType) => {
    mutate({
      ...data,
      isBlocked: data.isBlocked ? 1 : 0,
      lawyerId: id!,
    })
  }

  return (
    <>
      <div className="fixed inset-0 z-70">
        <div className="absolute inset-0 h-screen bg-zinc-900/45"></div>

        <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4 sm:p-6">
          <div className="shadow-soft w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 sm:px-6">
              <h3 className="font-mono text-lg font-semibold text-zinc-900">
                Create Staff
              </h3>
              <Link to={"/staff"}>
                <button
                  className="rounded-lg border border-zinc-200 p-2 text-zinc-700 transition duration-200 hover:bg-zinc-100"
                  onClick={() => {
                    navigate("/staff")
                  }}
                >
                  <X />
                </button>
              </Link>
            </div>

            {/* Form */}
            <form
              className="space-y-4 px-5 py-4 sm:px-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* User Id */}
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    User Id <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("user_id", {
                      required: {
                        value: true,
                        message: "Please Enter a value",
                      },
                    })}
                  />
                  {errors.user_id?.message && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.user_id?.message}
                    </p>
                  )}
                </label>

                {/* Case Id */}
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    Case Id <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("caseId", {
                      required: {
                        value: true,
                        message: "Please Enter a value",
                      },
                    })}
                  />
                  {errors.caseId?.message && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.caseId?.message}
                    </p>
                  )}
                </label>

                {/* Lawyer Id */}
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    Lawyer Id <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("lawyerId", {
                      required: {
                        value: true,
                        message: "Please Enter a value",
                      },
                    })}
                  />
                  {errors.lawyerId?.message && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.lawyerId?.message}
                    </p>
                  )}
                </label>

                {/* Is Blocked */}
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    is Blocked <span className="text-red-500">*</span>
                  </span>
                  <select
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("isBlocked", {
                      required: {
                        value: true,
                        message: "Please Enter a value",
                      },
                    })}
                  >
                    <option value="">Set Block</option>
                    <option value={"true"}>Block</option>
                    <option value={"false"}>No Block</option>
                  </select>
                  {errors.isBlocked?.message && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.isBlocked?.message}
                    </p>
                  )}
                </label>

                {/* Name */}
                <label className="col-span-full space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    Name <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("name", {
                      pattern: {
                        value: userNameRegex,
                        message: "Please Enter a Valid user name",
                      },
                      required: {
                        value: true,
                        message: "Please Enter a value",
                      },
                    })}
                  />
                  {errors.name?.message && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.name?.message}
                    </p>
                  )}
                </label>

                {/* First Name */}
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    First Name <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("firstName", {
                      pattern: {
                        value: nameRegex,
                        message: "Only letters allowed",
                      },
                      required: {
                        value: true,
                        message: "Please Enter a value",
                      },
                    })}
                  />
                  {errors.firstName?.message && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.firstName?.message}
                    </p>
                  )}
                </label>

                {/* Last Name */}
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    Last Name <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("lastName", {
                      pattern: {
                        value: nameRegex,
                        message: "Only letters allowed",
                      },
                      required: {
                        value: true,
                        message: "Please Enter a value",
                      },
                    })}
                  />
                  {errors.lastName?.message && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.lastName?.message}
                    </p>
                  )}
                </label>
              </div>

              {/* Phone */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="col-span-full space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">Phone Number</span>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("phoneNumber", {
                      pattern: {
                        value: phoneNumberRegex,
                        message: "Phone number must contain exactly 10 digits.",
                      },
                    })}
                  />
                  {errors.phoneNumber?.message && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.phoneNumber?.message}
                    </p>
                  )}
                </label>
              </div>

              {/* Gender */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    Gender <span className="text-red-500">*</span>
                  </span>
                  <select
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("gender", {
                      required: {
                        value: true,
                        message: "Please enter Valid Input",
                      },
                    })}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.gender?.message && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.gender?.message}
                    </p>
                  )}
                </label>
              </div>

              {/* Address */}
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Address <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("address", {
                    pattern: {
                      value: addressRegex,
                      message: "Only letters, numbers, and spaces are allowed.",
                    },
                    required: { value: true, message: "Please Enter a value" },
                  })}
                />
                {errors.address?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.address?.message}
                  </p>
                )}
              </label>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-2 border-t border-zinc-200 pt-4 sm:flex-row sm:justify-end">
                <Link to={"/staff"}>
                  <Button
                    className="bg-black p-6 font-mono font-semibold text-white"
                    onClick={() => {
                      navigate("/staff")
                    }}
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-black p-6 font-mono font-semibold text-white"
                >
                  {isPending ? "Creating..." : "Create Staff"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddStaffModel
