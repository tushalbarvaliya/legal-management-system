import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useMutation, useQuery } from "@tanstack/react-query"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getAllCases } from "@/api/caseAPI"
import { getAllClient } from "@/api/clientAPI"
import { updateDocs } from "@/api/docsAPI"
import { queryClient } from "@/main"
import type { ClientResponse } from "@/types/clientType"
import type { CaseDocumentItem } from "@/types/docsType"
import type { CasesResponse } from "@/types/caseType"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

const updateDocsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  file: z.instanceof(File, { message: "File is required" }).optional(),
  fileType: z.string().min(1, "File type is required").optional(),
  description: z.string().min(3, "Description must be at least 3 characters"),
  notes: z.string().optional(),
  caseId: z.number().min(1, "Case is required"),
  clientId: z.number().min(1, "Client is required"),
})

export type FormData = z.infer<typeof updateDocsSchema>

type Props = {
  data: CaseDocumentItem
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateDocsModal = ({ data, setOpen }: Props) => {
  const [replaceFile, setReplaceFile] = useState(false)

  const { data: caseData } = useQuery<CasesResponse>({
    queryKey: ["cases"],
    queryFn: getAllCases,
  })

  const { data: clientData } = useQuery<ClientResponse>({
    queryKey: ["client"],
    queryFn: getAllClient,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: updateDocs,
    onSuccess: () => {
      toast.success("Document updated successfully")
      queryClient.invalidateQueries({ queryKey: ["docs"] })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(`Error: ${error?.message || "Something went wrong"}`)
    },
  })

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(updateDocsSchema),
    defaultValues: {
      title: "",
      file: undefined,
      fileType: "",
      description: "",
      notes: "",
      caseId: 0,
      clientId: 0,
    },
  })

  useEffect(() => {
    if (data) {
      reset({
        title: data.document.title,
        description: data.document.description,
        notes: data.document.notes || "",
        caseId: data.document.caseId,
        clientId: data.document.clientId,
        file: undefined,
        fileType: data.document.fileType,
      })
    }
  }, [data, reset])

  const onSubmit = (formData: FormData) => {
    const payload = {
      ...formData,
      caseId: Number(formData.caseId),
      clientId: Number(formData.clientId),
    }
    if (isDirty) {
      mutate({ data: payload, id: data.document.id })
    } else {
      toast.success("No Changes found")
      setOpen(false)
    }
  }

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <div className="flex items-center justify-between">
          <DialogTitle>Edit Document</DialogTitle>
        </div>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <Input placeholder="Title" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Case Select */}
        <Controller
          name="caseId"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={field.value ? String(field.value) : ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Case" />
                </SelectTrigger>
                <SelectContent>
                  {caseData?.data.cases.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.error && (
                <p className="text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Description */}
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <Input placeholder="Description" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        {/* File Upload */}
        <Controller
          name="file"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              {!replaceFile && data.document.documentLink ? (
                <div
                  className="w-full cursor-pointer rounded-lg border px-3 py-2 text-sm"
                  onClick={() => setReplaceFile(true)}
                >
                  File already uploaded — click to replace
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="file"
                    className="w-full rounded-lg border px-3 py-2"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      setValue("file", file, { shouldValidate: true })
                      setValue("fileType", file.type, { shouldValidate: true })
                    }}
                  />
                  <Input
                    placeholder="File Type"
                    className="hidden"
                    disabled
                    value={field.value ? (field.value as File).type : ""}
                  />
                </div>
              )}
              {fieldState.error && (
                <p className="text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Client Select */}
        <Controller
          name="clientId"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={field.value ? String(field.value) : ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Client" />
                </SelectTrigger>
                <SelectContent>
                  {clientData?.data?.map((item) => (
                    <SelectItem
                      key={item.client.id}
                      value={String(item.client.id)}
                    >
                      {item.user.firstName} {item.user.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.error && (
                <p className="text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Notes */}
        <Controller
          name="notes"
          control={control}
          render={({ field }) => <Input placeholder="Notes" {...field} />}
        />

        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating..." : "Update Document"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

export default UpdateDocsModal
