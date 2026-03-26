import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { postClient } from "@/api/clientAPI"
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
import { DialogClose } from "../ui/dialog"

export type AddClientFormType = {
  firstName: string
  lastName: string
  phoneNumber: string
  occupation: string
  gender: string
  address: string
  crNumber: number
  vatNumber: number
  vatPercentage: number
  isDeleted: boolean
  isBlocked: boolean
  name: string
  userId: 0
}

const AddClientModel = () => {
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: postClient,
    mutationKey: ["addClient"],
    onSuccess: () => {
      toast.success("Client Created")
      queryClient.invalidateQueries({ queryKey: ["client"] })
      navigate("/client")
    },
    onError: (error) => {
      toast.error(`Something is Not Right ${error}`)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddClientFormType>({
    mode: "onChange",
    delayError: 500,
  })
  const onSubmit = (data: AddClientFormType) => {
    mutate(data)
  }

  return (
    <>
      <div className="relative mx-auto flex h-[95vh] w-full items-start justify-center overflow-y-scroll rounded-3xl p-4 sm:p-6">
        <div className="shadow-soft w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white">
          <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 sm:px-6">
            <h3 className="font-mono text-lg font-semibold text-zinc-900">
              Create Client
            </h3>
            <DialogClose asChild>
              <Button variant="outline">
                <X />
              </Button>
            </DialogClose>
          </div>
          <form
            className="space-y-4 px-5 py-4 sm:px-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Cr Number <span className="text-red-500">*</span>
                </span>
                <input
                  type="number"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("crNumber", {
                    required: {
                      value: true,
                      message: "Please Enter a value",
                    },
                  })}
                />
                {errors.crNumber?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.crNumber?.message}
                  </p>
                )}
              </label>
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  vat Number <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("vatNumber", {
                    required: {
                      value: true,
                      message: "Please Enter a value",
                    },
                  })}
                />
                {errors.vatNumber?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.vatNumber?.message}
                  </p>
                )}
              </label>
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  User Id <span className="text-red-500">*</span>
                </span>
                <input
                  type="number"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("userId", {
                    required: {
                      value: true,
                      message: "Please Enter a value",
                    },
                  })}
                />
                {errors.userId?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.userId?.message}
                  </p>
                )}
              </label>
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  vat Percentage <span className="text-red-500">*</span>
                </span>
                <input
                  type="number"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("vatPercentage", {
                    required: {
                      value: true,
                      message: "Please Enter a value",
                    },
                  })}
                />
                {errors.vatPercentage?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.vatPercentage?.message}
                  </p>
                )}
              </label>
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
                  <option value="">Set Client Block</option>
                  <option value={"true"}>Block</option>
                  <option value={"false"}>No Block</option>
                </select>
                {errors.isBlocked?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.isBlocked?.message}
                  </p>
                )}
              </label>
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  is Delete <span className="text-red-500">*</span>
                </span>
                <select
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("isDeleted", {
                    required: {
                      value: true,
                      message: "Please Enter a value",
                    },
                  })}
                >
                  <option value="">Set Client Delete</option>
                  <option value={"true"}>Delete</option>
                  <option value={"false"}>No Delete</option>
                </select>
                {errors.isDeleted?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.isDeleted?.message}
                  </p>
                )}
              </label>

              <label className="col-span-full space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Name <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("name", {
                    minLength: {
                      value: 3,
                      message: "First name length should be greater than 3 ",
                    },
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
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  First Name <span className="text-red-500">*</span>
                </span>
                <input
                  id="firstName"
                  type="text"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("firstName", {
                    minLength: {
                      value: 3,
                      message: "First name length should be greater than 3 ",
                    },
                    pattern: {
                      value: nameRegex,
                      message:
                        "Only letters are allowed. No numbers, spaces, or special characters.",
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
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Last Name <span className="text-red-500">*</span>
                </span>
                <input
                  id="lastName"
                  type="text"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("lastName", {
                    minLength: {
                      value: 3,
                      message: "Last name length should be greater than 3 ",
                    },
                    pattern: {
                      value: nameRegex,
                      message:
                        "Only letters are allowed. No numbers, spaces, or special characters.",
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="col-span-full space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium"> Phone Number</span>
                <input
                  id="otherPhone"
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Occupation <span className="text-red-500">*</span>
                </span>
                <input
                  id="occupation"
                  type="text"
                  required
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("occupation", {
                    minLength: {
                      value: 3,
                      message: "Last name length should be greater than 3 ",
                    },
                    pattern: {
                      value: nameRegex,
                      message:
                        "Only letters are allowed. No numbers, spaces, or special characters.",
                    },
                    required: {
                      value: true,
                      message: "Please Enter a value",
                    },
                  })}
                />
                {errors.occupation?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.occupation?.message}
                  </p>
                )}
              </label>
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Gender <span className="text-red-500">*</span>
                </span>
                <select
                  id="gender"
                  required
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
                  <option value="other">Other</option>
                </select>
                {errors.gender?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.gender?.message}
                  </p>
                )}
              </label>
            </div>

            <label className="space-y-1.5 text-sm text-zinc-700">
              <span className="font-medium">
                Address <span className="text-red-500">*</span>
              </span>
              <input
                id="address"
                type="text"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("address", {
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required.",
                  },
                  maxLength: {
                    value: 50,
                    message: "Maximum 20 characters allowed.",
                  },
                  pattern: {
                    value: addressRegex,
                    message: "Only letters, numbers, and spaces are allowed.",
                  },
                  required: {
                    value: true,
                    message: "Please Enter a value",
                  },
                })}
              />
              {errors.address?.message && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.address?.message}
                </p>
              )}
            </label>

            <div className="flex flex-col-reverse gap-2 border-t border-zinc-200 pt-4 sm:flex-row sm:justify-end">
              <Button
                type="button"
                className="bg-black p-6 font-mono font-semibold text-white"
                onClick={() => {
                  navigate("/client")
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-black p-6 font-mono font-semibold text-white"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Client"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddClientModel
