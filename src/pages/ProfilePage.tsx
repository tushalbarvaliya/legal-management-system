import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import { motion } from "framer-motion"

import type { UserProfileType } from "@/types/userType"
import ErrorMessage from "@/components/ErrorMessage"
import ProfileSkeleton from "@/components/profile/ProfileSkeleton"
import { queryClient } from "@/main"
import { addressRegex, nameRegex, phoneNumberRegex } from "@/utils/regex"
import { Button } from "@/components/ui/button"
import { getProfile, patchProfileUpdate } from "@/api/userAPI"
import type { ProfileResponse } from "@/types/types"

export type ProfileFormData = {
  lastName: string
  gender: string
  firstName: string
  phoneNumber: string
  address: string
  role: string
}

const getSafeProfileData = (data: UserProfileType): ProfileFormData => ({
  firstName: data.firstName ?? "",
  lastName: data.lastName ?? "",
  address: data.address ?? "",
  phoneNumber: data.phoneNumber ?? "",
  gender: data.gender ?? "",
  role: data.role ?? "",
})

const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const navigate = useNavigate()

  const { data, isLoading, isError, error } = useQuery<ProfileResponse>({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    mode: "onChange",
    delayError: 300,
  })

  useEffect(() => {
    if (data) {
      reset(getSafeProfileData(data))
    }
  }, [data, reset])

  const { mutate, isPending } = useMutation({
    mutationFn: patchProfileUpdate,
    onSuccess: () => {
      toast.success("Profile Updated Successfully", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["profile"] })
      setIsEdit(false)
      setTimeout(() => navigate("/"), 1500)
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong")
    },
  })

  const onSubmit = (formData: ProfileFormData) => {
    mutate(formData)
  }

  if (isLoading) return <ProfileSkeleton />
  if (isError) return <ErrorMessage message={error.message} />

  return (
    <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      {data && (
        <main className="flex items-center justify-center p-3 sm:p-6">
          <section className="w-full max-w-4xl rounded-2xl border bg-white p-4 shadow-sm sm:p-8">
            {/* Header */}
            <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-zinc-900 text-white">
                  <span className="uppercase">
                    {data.firstName?.[0] ?? "N"}
                    {data.lastName?.[0] ?? "N"}
                  </span>
                </div>

                <div>
                  <h1 className="text-lg font-semibold">Profile</h1>
                  <p className="text-sm text-zinc-500">
                    {data.name} • ID: {data.id}
                  </p>
                  <p className="text-xs break-all text-zinc-500">
                    {data.email}
                  </p>
                </div>
              </div>

              <Link to={"/reset-password"}>
                <Button className="bg-black text-white">Reset Password</Button>
              </Link>
            </header>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* First Name */}
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    disabled={!isEdit}
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: { value: 2, message: "Min 2 characters" },
                      maxLength: { value: 50, message: "Max 50 characters" },
                      pattern: {
                        value: nameRegex,
                        message: "Only letters allowed",
                      },
                      validate: (v) => v.trim() !== "" || "Cannot be empty",
                    })}
                    className="field w-full"
                  />
                  <p className="error">{errors.firstName?.message}</p>
                </div>

                {/* Last Name */}
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    disabled={!isEdit}
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: { value: 2, message: "Min 2 characters" },
                      maxLength: { value: 50, message: "Max 50 characters" },
                      pattern: {
                        value: nameRegex,
                        message: "Only letters allowed",
                      },
                      validate: (v) => v.trim() !== "" || "Cannot be empty",
                    })}
                    className="field w-full"
                  />
                  <p className="error">{errors.lastName?.message}</p>
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Address</label>
                  <input
                    disabled={!isEdit}
                    {...register("address", {
                      required: "Address is required",
                      minLength: { value: 5, message: "Too short" },
                      maxLength: { value: 200, message: "Too long" },
                      pattern: {
                        value: addressRegex,
                        message: "Invalid address",
                      },
                    })}
                    className="field w-full"
                  />
                  <p className="error">{errors.address?.message}</p>
                </div>

                {/* Phone */}
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Phone</label>
                  <input
                    disabled={!isEdit}
                    {...register("phoneNumber", {
                      required: "Phone is required",
                      pattern: {
                        value: phoneNumberRegex,
                        message: "Invalid phone number",
                      },
                    })}
                    className="field w-full"
                  />
                  <p className="error">{errors.phoneNumber?.message}</p>
                </div>

                {/* Role */}
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <select
                    disabled
                    {...register("role")}
                    className="field w-full"
                  >
                    <option value="">Select</option>
                    <option value="admin">Admin</option>
                    <option value="lawyer">Lawyer</option>
                    <option value="staff">Staff</option>
                    <option value="client">Client</option>
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="text-sm font-medium">Gender</label>
                  <select
                    disabled={!isEdit}
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                    className="field w-full"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <p className="error">{errors.gender?.message}</p>
                </div>
              </div>

              {/* Buttons */}
              {!isEdit ? (
                <Button
                  type="button"
                  className="mt-4 w-full bg-black text-white"
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </Button>
              ) : (
                <div className="mt-4 flex gap-3">
                  <Button
                    type="button"
                    className="w-1/2"
                    onClick={() => setIsEdit(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-1/2 bg-black text-white"
                  >
                    {isPending ? "Saving..." : "Save"}
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
