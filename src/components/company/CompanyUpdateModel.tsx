import type { CompanyData } from "@/pages/CompanyPage"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { emailRegex, phoneNumberRegex } from "@/utils/regex"
import { useMutation } from "@tanstack/react-query"
import axiosInstance from "@/api/axiosInstance"
import { toast } from "sonner"
import { queryClient } from "@/main"
import { X } from "lucide-react"

type UpdateTaskProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>
} & CompanyData

const CompanyUpdateModel = (data: UpdateTaskProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: CompanyData) => {
      const res = await axiosInstance.patch("/companies/company/1", formData)
      return res.data
    },
    onSuccess: () => {
      toast.success("Updated Successfully")
      queryClient.invalidateQueries({ queryKey: ["company"] })
      data.closeModal(false)
    },
    onError: () => {
      toast.error("Something went wrong")
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyData>({
    mode: "onChange",
    delayError: 500,
    defaultValues: {
      ...data,
      createdAt: data?.createdAt
        ? new Date(data.createdAt).toISOString().split("T")[0]
        : "",
    },
  })

  const onSubmit = (formData: CompanyData) => {
    mutate(formData)
  }

  const inputClass =
    "w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center"
      onClick={() => data.closeModal(false)}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-zinc-900">
            Update Company Profile
          </h3>
          <button
            onClick={() => data.closeModal(false)}
            className="rounded-lg border p-2 hover:bg-zinc-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              className={inputClass}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              })}
            />
            <p className="text-xs text-red-500">{errors.name?.message}</p>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Phone Number
            </label>
            <input
              className={inputClass}
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: phoneNumberRegex,
                  message: "Must be 10 digits",
                },
              })}
            />
            <p className="text-xs text-red-500">
              {errors.phoneNumber?.message}
            </p>
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              className={inputClass}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: emailRegex,
                  message: "Invalid email",
                },
              })}
            />
            <p className="text-xs text-red-500">
              {errors.email?.message}
            </p>
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Address</label>
            <input
              className={inputClass}
              {...register("Address", {
                required: "Address is required",
              })}
            />
            <p className="text-xs text-red-500">
              {errors.Address?.message}
            </p>
          </div>

          {/* Buttons */}
          <div className="col-span-full mt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => data.closeModal(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CompanyUpdateModel