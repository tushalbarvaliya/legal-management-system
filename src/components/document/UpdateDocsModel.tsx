import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useMutation, useQuery } from "@tanstack/react-query"

import { getAllCases } from "@/api/caseAPI"
import { getAllClient } from "@/api/clientAPI"
import { updateDocs } from "@/api/docsAPI"

import type { caseDataType } from "@/data/caseData"
import type { ClineDataType } from "@/data/clientData"
import type { docsDataType } from "@/data/docsData"

import { convertToBase64 } from "@/utils/convertToBase64"
import { queryClient } from "@/main"

type Props = {
  data: docsDataType
}

const UpdateDocsModel = ({ data }: Props) => {
  const navigate = useNavigate()
  const [replaceFile, setReplaceFile] = useState(false)

  const { data: caseData } = useQuery<caseDataType[]>({
    queryKey: ["cases"],
    queryFn: getAllCases,
  })

  const { data: clientData } = useQuery<ClineDataType[]>({
    queryKey: ["client"],
    queryFn: getAllClient,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: updateDocs,
    onSuccess: () => {
      toast.success("Docs updated successfully")
      queryClient.invalidateQueries({ queryKey: ["docs"] })
      navigate("/docs")
    },
    onError: (error) => {
      toast.error(`Error: ${error?.message || "Something went wrong"}`)
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<docsDataType>()

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        caseId: data.caseId,
        clientId: data.clientId,
      })
    }
  }, [data, reset])

  // Submit
  const onSubmit = (formData: docsDataType) => {
    mutate({
      ...formData,
      caseId: Number(formData.caseId),
      clientId: Number(formData.clientId),
    })
  }

  return (
    <div className="fixed inset-0 z-70">
      <div className="absolute inset-0 bg-zinc-900/45"></div>

      <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4 sm:p-6">
        <div className="shadow-soft w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h3 className="text-lg font-semibold">Edit Document</h3>
            <button
              className="rounded-lg border p-2 hover:bg-zinc-100"
              onClick={() => navigate("/docs")}
            >
              <X />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-h-[85vh] space-y-4 overflow-y-auto px-5 py-4"
          >
            {/* Title + Case */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Title */}
              <label className="space-y-1 text-sm">
                <span className="font-medium">
                  Title <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  className="w-full rounded-lg border px-3 py-2"
                  {...register("title", { required: "Title is required" })}
                />
                <p className="text-xs text-red-500">{errors.title?.message}</p>
              </label>

              {/* Case */}
              <label className="space-y-1 text-sm">
                <span className="font-medium">
                  Case <span className="text-red-500">*</span>
                </span>
                <select
                  {...register("caseId", {
                    required: "Please select case",
                  })}
                  className="w-full rounded-lg border px-3 py-2"
                >
                  <option value="">Select...</option>
                  {caseData?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-red-500">{errors.caseId?.message}</p>
              </label>
            </div>

            {/* Description */}
            <label className="space-y-1 text-sm">
              <span className="font-medium">
                Description <span className="text-red-500">*</span>
              </span>
              <textarea
                rows={3}
                className="w-full rounded-lg border px-3 py-2"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              <p className="text-xs text-red-500">
                {errors.description?.message}
              </p>
            </label>

            {/* File Upload */}
            {!replaceFile ? (
              <div
                className="cursor-pointer rounded-lg border px-3 py-2 text-sm"
                onClick={() => setReplaceFile(true)}
              >
                File already uploaded — click to replace
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="file"
                  className="w-full rounded-lg border px-3 py-2"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return

                    const base64 = await convertToBase64(file)

                    setValue("documentLink", base64, {
                      shouldValidate: true,
                    })
                    setValue("fileType", file.type, {
                      shouldValidate: true,
                    })
                  }}
                />

                <input
                  type="text"
                  disabled
                  className="w-full rounded-lg border px-3 py-2"
                  {...register("fileType")}
                />
              </div>
            )}

            {/* Client */}
            <label className="space-y-1 text-sm">
              <span className="font-medium">
                Client <span className="text-red-500">*</span>
              </span>
              <select
                {...register("clientId", {
                  required: "Please select client",
                })}
                className="w-full rounded-lg border px-3 py-2"
              >
                <option value="">Select...</option>
                {clientData?.map((item) => (
                  <option key={item.id} value={String(item.id)}>
                    {item.id}
                  </option>
                ))}
              </select>
              <p className="text-xs text-red-500">{errors.clientId?.message}</p>
            </label>

            {/* Notes */}
            <textarea
              rows={3}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Notes..."
              {...register("notes")}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2 border-t pt-4">
              <button
                type="button"
                onClick={() => navigate("/docs")}
                className="rounded-lg border px-4 py-2"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="rounded-lg bg-black px-4 py-2 text-white"
              >
                {isPending ? "Updating..." : "Update Document"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateDocsModel
