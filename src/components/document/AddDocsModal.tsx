import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useMutation, useQuery } from "@tanstack/react-query"

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { getAllCases } from "@/api/caseAPI"
import { createDocs } from "@/api/docsAPI"
import { getAllClient } from "@/api/clientAPI"
import { queryClient } from "@/main"
import type { CaseWithClientUser } from "@/types/caseType"
import type { ClientUserMapping } from "@/types/clientType"


const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  file: z.instanceof(File, { message: "File is required" }),
  fileType: z.string().min(1, "File type is required"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  notes: z.string().optional(),
  caseId: z.number().min(1, "Case is required"), 
  clientId: z.number().min(1, "Client is required"),
})

export type FormData = z.infer<typeof formSchema>

const AddDocsModal = ({
  setOpenAdd,
}: {
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: createDocs,
    onSuccess: () => {
      toast.success("Docs added successfully")
      queryClient.invalidateQueries({ queryKey: ["docs"] })
      setOpenAdd(false)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { data: caseData } = useQuery<CaseWithClientUser[]>({
    queryKey: ["cases"],
    queryFn: getAllCases,
  })

  const { data: clientData } = useQuery<ClientUserMapping[]>({
    queryKey: ["client"],
    queryFn: getAllClient,
  })

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      notes: "",
      fileType: "",
      caseId: 0,
      clientId: 0,
      file: undefined as unknown as File,
    },
  })

  const onSubmit = (data: FormData) => {
    mutate(data)
  }

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Create Document</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <>
              <Input placeholder="Title" {...field} className="w-full"/>
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </>
          )}
        />

        {/* Case Select */}
        <Controller
          control={control}
          name="caseId"
          render={({ field }) => (
            <>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={field.value ? String(field.value) : ""}
                
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Case" />
                </SelectTrigger>
                <SelectContent>
                  {caseData?.map((item) => (
                    <SelectItem key={item.case.id} value={String(item.case.id)}>
                      {item.case.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.caseId && (
                <p className="text-sm text-red-500">{errors.caseId.message}</p>
              )}
            </>
          )}
        />

        {/* Description */}
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <>
              <Input placeholder="Description" {...field} />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </>
          )}
        />

        {/* File Upload */}
        <Controller
          control={control}
          name="file"
          render={({ field }) => (
            <>
              <Input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (!file) return

                  if (file.size > 2 * 1024 * 1024) {
                    toast.error("Max file size is 2MB")
                    return
                  }

                  field.onChange(file)
                  setValue("fileType", file.type)
                }}
              />
              {errors.file && (
                <p className="text-sm text-red-500">{errors.file.message}</p>
              )}
            </>
          )}
        />

        {/* Client Select */}
        <Controller
          control={control}
          name="clientId"
          render={({ field }) => (
            <>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={field.value ? String(field.value) : ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Client" />
                </SelectTrigger>
                <SelectContent>
                  {clientData?.map((item) => (
                    <SelectItem key={item.client.id} value={String(item.client.id)}>
                      {item.user.firstName} {item.user.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.clientId && (
                <p className="text-sm text-red-500">{errors.clientId.message}</p>
              )}
            </>
          )}
        />

        {/* Notes */}
        <Controller
          control={control}
          name="notes"
          render={({ field }) => <Input placeholder="Notes" {...field} />}
        />

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpenAdd(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}

export default AddDocsModal