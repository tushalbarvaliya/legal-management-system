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
  const navigate=useNavigate()

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
    delayError: 500,
  })

  useEffect(() => {
    if (data) {
      reset(getSafeProfileData(data))
    }
  }, [data, reset])

  const { mutate, isPending: ButtonIsPending } = useMutation({
    mutationFn: patchProfileUpdate,
    onSuccess: () => {
      toast.success("Profile Updated Successfully")
      queryClient.invalidateQueries({ queryKey: ["profile"] })
      setIsEdit(false)
      navigate('/')
    },
    onError: (error) => {
      toast.error(`Error ${error}`)
    },
  })

  const onSubmit = (formData: ProfileFormData) => {
    mutate(formData)
  }

  return (
    <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      {isError && <ErrorMessage message={error.message} />}
      {isLoading && <ProfileSkeleton />}

      {!isLoading && !isError && data && (
        <main className="flex items-center justify-center p-4 sm:p-6">
          <section className="w-full max-w-4xl rounded-2xl border border-black bg-white p-6 shadow-sm sm:p-8">
            {/* Header */}
            <header className="my-4 flex items-center justify-between">
              <div className="flex">
                <div className="group grid h-18 w-18 place-items-center rounded-xl border bg-zinc-900 text-white">
                  <span className="uppercase">
                    {data.firstName?.[0] ?? "N"}
                    {data.lastName?.[0] ?? "N"}
                  </span>
                </div>

                <div className="mx-2">
                  <h1 className="text-xl font-semibold">Profile</h1>
                  <p className="text-sm text-zinc-500">{data.name ?? "-"}</p>
                  <p className="text-sm text-zinc-500">{data.email ?? "-"}</p>
                </div>
              </div>

              <Link to={"/reset-password"}>
                <Button className="bg-black text-white">Reset Password</Button>
              </Link>
            </header>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 sm:grid-cols-2">
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
                <div className="col-span-2">
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
                <div className="col-span-2">
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
                <div className="flex gap-4">
                  <Button
                    type="button"
                    className="mt-4 w-1/2"
                    onClick={() => setIsEdit(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={ButtonIsPending}
                    className="mt-4 w-1/2 bg-black text-white"
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
