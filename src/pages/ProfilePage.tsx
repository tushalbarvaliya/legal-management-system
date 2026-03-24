import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
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

  const { data, isLoading, isError, error } = useQuery<UserProfileType>({
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

  const { mutate, isPending: ButtonIsPending } = useMutation({
    mutationFn: patchProfileUpdate,
    onSuccess: () => {
      toast.success("Profile Updated Successfully", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["profile"] })
      setIsEdit(false)
      setTimeout(() => {
        navigate("/")
      }, 2000)
    },
    onError: (error) => {
      toast.error(`Error ${error}`)
    },
  })

  const onSubmit = (formData: ProfileFormData) => {
    mutate(formData)
  }

  if (isLoading) {
    return <ProfileSkeleton />
  }
  if (isError) {
    return <ErrorMessage message={error.message} />
  }

  return (
    <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      {!isLoading && !isError && data && (
        <main className="flex items-center justify-center p-3 sm:p-6">
          <section className="w-full max-w-4xl rounded-2xl border border-black bg-white p-4 shadow-sm sm:p-8">
            {/* Header */}
            <header className="my-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Left */}
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-zinc-900 text-sm text-white sm:h-16 sm:w-16 sm:text-base">
                  <span className="uppercase">
                    {data.firstName?.[0] ?? "N"}
                    {data.lastName?.[0] ?? "N"}
                  </span>
                </div>

                <div>
                  <h1 className="text-lg font-semibold sm:text-xl">Profile</h1>

                  <div className="flex flex-wrap gap-2 text-xs text-zinc-500 sm:text-sm">
                    <p>{data.id ?? "-"}</p>
                    <p>{data.name ?? "-"}</p>
                  </div>

                  <p className="text-xs break-all text-zinc-500 sm:text-sm">
                    {data.email ?? "-"}
                  </p>
                </div>
              </div>

              {/* Right */}
              <Link to={"/reset-password"} className="w-full sm:w-auto">
                <Button className="w-full bg-black text-white sm:w-auto">
                  Reset Password
                </Button>
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
                      required: "Required",
                      pattern: {
                        value: nameRegex,
                        message: "Only letters allowed",
                      },
                    })}
                    className="field w-full"
                  />
                  <p className="text-xs text-red-500">
                    {errors.firstName?.message}
                  </p>
                </div>

                {/* Last Name */}
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    disabled={!isEdit}
                    {...register("lastName", { required: "Required" })}
                    className="field w-full"
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Address</label>
                  <input
                    disabled={!isEdit}
                    {...register("address", {
                      required: "Required",
                      pattern: {
                        value: addressRegex,
                        message: "Invalid address",
                      },
                    })}
                    className="field w-full"
                  />
                </div>

                {/* Phone */}
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Phone</label>
                  <input
                    disabled={!isEdit}
                    {...register("phoneNumber", {
                      required: "Required",
                      pattern: {
                        value: phoneNumberRegex,
                        message: "Invalid phone",
                      },
                    })}
                    className="field w-full"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <select
                    disabled
                    {...register("role")}
                    className="field w-full"
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="lawyer">Lawyer</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="text-sm font-medium">Gender</label>
                  <select
                    disabled={!isEdit}
                    {...register("gender", { required: "Required" })}
                    className="field w-full"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
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
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="button"
                    className="w-full sm:w-1/2"
                    onClick={() => setIsEdit(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={ButtonIsPending}
                    className="w-full bg-black text-white sm:w-1/2"
                  >
                    {ButtonIsPending ? "Saving..." : "Save"}
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
