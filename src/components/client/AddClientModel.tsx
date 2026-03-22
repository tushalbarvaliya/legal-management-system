import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { postClient } from "@/api/clientAPI"
import { queryClient } from "@/main"
import { useAppSelector } from "@/hooks/hooks"
import {
  addressRegex,
  emailRegex,
  nameRegex,
  phoneNumberRegex,
} from "@/utils/regex"
import { X } from "lucide-react"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"

export type AddClientFormType = {
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  phoneNumber: string
  occupation: string
  gender: string
  address: string
}

const AddClientModel = () => {
  const id = useAppSelector((state) => state.auth.id)
  const navigate=useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: postClient,
    mutationKey: ["addClient"],
    onSuccess: () => {
      toast.success("Client Created")
      queryClient.invalidateQueries({ queryKey: ["client"] })
      navigate('/client')
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
    mutate({ ...data, userId: id! })
  }

  return (
    <>
      <div className="fixed inset-0 z-70">
        <div className="absolute inset-0 h-screen bg-zinc-900/45"></div>

        <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4 sm:p-6">
          <div className="shadow-soft w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white">
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 sm:px-6">
              <h3 className="font-mono text-lg font-semibold text-zinc-900">
                Create Client
              </h3>
              <Link to={"/client"}>
                <button className="rounded-lg border border-zinc-200 p-2 text-zinc-700 transition duration-200 hover:bg-zinc-100">
                  <X />
                </button>
              </Link>
            </div>
            <form
              className="space-y-4 px-5 py-4 sm:px-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-zinc-800"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="off"
                  className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Please Enter a value",
                    },
                    pattern: {
                      value: emailRegex,
                      message:
                        "Please enter a valid email address (e.g., user@example.com).",
                    },
                  })}
                />
                {errors.email && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    Mobile Number <span className="text-red-500">*</span>
                  </span>
                  <input
                    id="mobile"
                    type="text"
                    required
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 transition duration-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("mobileNumber", {
                      pattern: {
                        value: phoneNumberRegex,
                        message: "Phone number must contain exactly 10 digits.",
                      },
                      required: {
                        value: true,
                        message: "Please Enter a value",
                      },
                    })}
                  />
                  {errors.mobileNumber?.message && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.mobileNumber?.message}
                    </p>
                  )}
                </label>
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">Other Phone Number</span>
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
                <Link to={"/client"}>
                  <Button
                    type="button"
                    className="bg-black p-6 font-mono font-semibold text-white"
                  >
                    Cancel
                  </Button>
                </Link>
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
      </div>
    </>
  )
}

export default AddClientModel
