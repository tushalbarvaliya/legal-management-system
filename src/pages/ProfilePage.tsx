/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import { toast } from "sonner"
import { motion } from "framer-motion"

import ErrorMessage from "@/components/ErrorMessage"
import ProfileSkeleton from "@/components/profile/ProfileSkeleton"
import { queryClient } from "@/main"
import { addressRegex, nameRegex, phoneNumberRegex } from "@/utils/regex"
import { Button } from "@/components/ui/button"
import type { UserProfileType } from "@/data/userData"
import { getProfile, patchProfileUpdate } from "@/api/userAPI"

export type ProfileFormData = {
  lastName: string
  gender: string
  firstName: string
  phoneNumber: string
  address: string
  role: string
}

const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false)

  const { data, isLoading, isError, error } = useQuery<UserProfileType>({
    queryKey: ["profile"],
    queryFn: getProfile,
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProfileType>({
    mode: "onChange",
    delayError: 500,
    defaultValues: { ...data },
  })

  useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])

  const { mutate, isPending: ButtonIsPending } = useMutation({
    mutationFn: patchProfileUpdate,
    onSuccess: () => {
      toast.success("Profile Update Successfully")
      queryClient.invalidateQueries({ queryKey: ["profile"] })
      setIsEdit(false)
    },
    onError: (error) => {
      toast.error(`Error ${error}`)
    },
  })

  const onSubmit = (Formdata: UserProfileType) => {
    const {
      companyId,
      createdAt,
      isBlocked,
      isDeleted,
      password,
      updatedAt,
      id,
      name,
      ...data
    } = Formdata
    mutate(data)
  }

  return (
    <motion.div initial={{y:10,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-10,opacity:0}}>
      {isError && <ErrorMessage message={error.message}></ErrorMessage>}
      {isLoading && <ProfileSkeleton />}
      {!isLoading && !isError && (
        <main className="flex items-center justify-center p-4 sm:p-6">
          <section className="w-full max-w-4xl rounded-2xl border border-black bg-white p-6 shadow-sm sm:p-8">
            <header className="my-4 flex items-center justify-between">
              <div className="flex">
                <div className="group grid h-18 w-18 place-items-center rounded-xl border border-zinc-300 bg-zinc-900 text-xl font-semibold text-zinc-100 transition duration-200 hover:scale-105 hover:bg-zinc-800">
                  <span className="uppercase transition-transform duration-200 group-hover:scale-110">
                    {data?.firstName[0]}
                    {data?.lastName[0]}
                  </span>
                </div>
                <div className="mx-2">
                  <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
                    Profile
                  </h1>
                  <p className="text-sm text-zinc-500">{data?.name}</p>
                  <p className="text-sm text-zinc-500">{data?.email}</p>
                </div>
              </div>
              <Link to={"/reset-password"}>
                <Button type="button" className="bg-black p-4 text-white">
                  Reset Password
                </Button>
              </Link>
            </header>

            <form id="signupForm" noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-zinc-800"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    autoComplete="off"
                    placeholder={"john"}
                    defaultValue={data?.firstName}
                    disabled={!isEdit}
                    className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
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
                        value:true,
                        message:"Please Enter a Value"
                      },
                    })}
                  />
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.firstName?.message}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-zinc-800"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    autoComplete="off"
                    placeholder={"Deo"}
                    defaultValue={data?.lastName}
                    disabled={!isEdit}
                    className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
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
                        value:true,
                        message:"Please Enter a Value"
                      },
                    })}
                  />
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.lastName?.message}
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="text-sm font-medium text-zinc-800"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    autoComplete="off"
                    placeholder={"32 street gujarat city"}
                    defaultValue={data?.address.split("$")[0]}
                    disabled={!isEdit}
                    className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("address", {
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters required.",
                      },
                      maxLength: {
                        value: 20,
                        message: "Maximum 20 characters allowed.",
                      },
                      pattern: {
                        value: addressRegex,
                        message:
                          "Only letters, numbers, and spaces are allowed.",
                      },
                      required: {
                        value:true,
                        message:"Please Enter a Value"
                      },
                    })}
                  />
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.address?.message}
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label
                    htmlFor="phoneNumber"
                    className="text-sm font-medium text-zinc-800"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="text"
                    autoComplete="off"
                    placeholder={"1234567890"}
                    defaultValue={data?.phoneNumber}
                    disabled={!isEdit}
                    className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("phoneNumber", {
                      pattern: {
                        value: phoneNumberRegex,
                        message: "Phone number must contain exactly 10 digits.",
                      },
                      required: {
                        value:true,
                        message:"Please Enter a Value"
                      },
                    })}
                  />
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.phoneNumber?.message}
                  </p>
                </div>

                {/* role Input */}
                <div>
                  <label
                    htmlFor="role"
                    className="text-sm font-medium text-zinc-800"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    disabled={!isEdit}
                    className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("role", {
                      required: {
                        value: true,
                        message: "Please Enter a value",
                      },
                    })}
                  >
                    <option value="">Select Gender</option>
                    <option value="admin">Admin</option>
                    <option value="lawyer">Lawyer</option>
                    <option value="staff">Staff</option>
                  </select>

                  {errors.role && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.role?.message}
                    </p>
                  )}
                </div>

                {/* gender Input */}
                <div>
                  <label
                    htmlFor="gender"
                    className="text-sm font-medium text-zinc-800"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    disabled={!isEdit}
                    className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("gender", {
                      required: {
                        value: true,
                        message: "Please Enter a value",
                      },
                    })}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.gender?.message}
                    </p>
                  )}
                </div>
              </div>
              {!isEdit && (
                <>
                  <Button
                    type="submit"
                    className="mt-4 w-full bg-black p-4 text-white"
                    onClick={() => {
                      setIsEdit((prev) => !prev)
                    }}
                  >
                    Edit
                  </Button>
                </>
              )}
              {isEdit && (
                <div className="flex gap-4">
                  <Link to={"/"} className="w-full">
                    <Button
                      className="mt-4 bg-black p-4 text-white"
                      type="button"
                      onClick={() => {
                        setIsEdit((prev) => !prev)
                      }}
                    >
                      close
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="mt-4 bg-black p-4 text-white"
                    disabled={ButtonIsPending}
                  >
                    {ButtonIsPending ? "Editing..." : "Edit"}
                  </Button>
                </div>
              )}
            </form>
          </section>
        </main>
      )}
    </motion.div>
  )
}

export default ProfilePage
