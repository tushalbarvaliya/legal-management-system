import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "sonner"
import { motion } from "framer-motion"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getProfile, patchProfileUpdate } from "@/api/userAPI"
import type { ProfileData } from "@/types/types"
import { queryClient } from "@/main"
import ProfileSkeleton from "@/components/profile/ProfileSkeleton"
import ErrorMessage from "@/components/ErrorMessage"
import { nameRegex, phoneNumberRegex, addressRegex } from "@/utils/regex"

const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, "Min 2 characters")
    .max(50, "Max 50 characters")
    .regex(nameRegex, "Only letters allowed")
    .nonempty("Cannot be empty"),
  lastName: z
    .string()
    .min(2, "Min 2 characters")
    .max(50, "Max 50 characters")
    .regex(nameRegex, "Only letters allowed")
    .nonempty("Cannot be empty"),
  address: z
    .string()
    .min(5, "Too short")
    .max(200, "Too long")
    .regex(addressRegex, "Invalid address"),
  phoneNumber: z.string().regex(phoneNumberRegex, "Invalid phone number"),
  gender: z.string(),
  role: z.string().optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema>

const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const navigate = useNavigate()

  const { data, isLoading, isError, error } = useQuery<{
    data: ProfileData
    message: string
  }>({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: patchProfileUpdate,
    onSuccess: () => {
      toast.success("Profile Updated Successfully", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["profile"] })
      setIsEdit(false)
      setTimeout(() => navigate("/"), 1500)
    },
    onError: (error) => toast.error(error?.message || "Something went wrong"),
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      role: "",
    },
  })

  useEffect(() => {
    if (data) {
      reset({
        firstName: data.data.firstName ?? "",
        lastName: data.data.lastName ?? "",
        address: data.data.address ?? "",
        phoneNumber: data.data.phoneNumber ?? "",
        gender: data.data.gender ?? "",
        role: data.data.role ?? "",
      })
    }
  }, [data, reset, isEdit])
  const onSubmit = (formData: ProfileFormData) => {
    if (isDirty) {
      mutate(formData)
    } else {
      toast.success("No Changes found")
      setIsEdit(false)
    }
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
                    {data.data.firstName?.[0] ?? "N"}
                    {data.data.lastName?.[0] ?? "N"}
                  </span>
                </div>

                <div>
                  <h1 className="text-lg font-semibold">Profile</h1>
                  <p className="text-sm text-zinc-500">
                    {data.data.name} • ID: {data.data.id}
                  </p>
                  <p className="text-xs break-all text-zinc-500">
                    {data.data.email}
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
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      <label className="text-sm font-medium">First Name</label>
                      <Input disabled={!isEdit} {...field} />
                      {fieldState.error && (
                        <p className="text-xs text-red-600">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* Last Name */}
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      <label className="text-sm font-medium">Last Name</label>
                      <Input disabled={!isEdit} {...field} />
                      {fieldState.error && (
                        <p className="text-xs text-red-600">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* Address */}
                <Controller
                  name="address"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium">Address</label>
                      <Input disabled={!isEdit} {...field} />
                      {fieldState.error && (
                        <p className="text-xs text-red-600">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* Phone */}
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input disabled={!isEdit} {...field} />
                      {fieldState.error && (
                        <p className="text-xs text-red-600">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* Role */}
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="text-sm font-medium">Role</label>
                      <Select disabled {...field}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="lawyer">Lawyer</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                          <SelectItem value="client">Client</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />

                <Controller
                  name="gender"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      <label className="text-sm font-medium">Gender</label>

                      <Select
                        disabled={!isEdit}
                        value={field.value}
                        onValueChange={field.onChange}
                        key={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>

                      {fieldState.error && (
                        <p className="text-xs text-red-600">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
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
