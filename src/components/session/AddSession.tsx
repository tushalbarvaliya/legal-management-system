import { useMutation, useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"

import { getAllCases } from "@/api/caseAPI"
import { getAllClient } from "@/api/clientAPI"
import type { CasesResponse } from "@/types/caseType"
import type { ClientResponse } from "@/types/clientType"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { addSession } from "@/api/sessionAPI"
import { queryClient } from "@/main"
import {
  AddSessionFormSchema,
  type AddSessionFormSchemaType,
} from "@/schemas/AddSessionSchema"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const AddSession = ({
  setOpenAdd,
}: {
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { data: clients } = useQuery<ClientResponse>({
    queryKey: ["client"],
    queryFn: getAllClient,
  })
  const { data: cases } = useQuery<CasesResponse>({
    queryKey: ["cases"],
    queryFn: getAllCases,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: addSession,
    onSuccess: () => {
      toast.success("Session Add", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["sessions"] })
      setOpenAdd(false)
    },
    onError: (error) => {
      toast.error(`Error ${error}`)
    },
  })

  const form = useForm<AddSessionFormSchemaType>({
    resolver: zodResolver(AddSessionFormSchema),
    mode: "onChange",
    delayError: 500,
  })

  const onSubmit = (data: AddSessionFormSchemaType) => {
    mutate(data)
  }

  return (
    <>
      <DialogContent className="no-scrollbar max-h-[99vh] overflow-y-scroll lg:min-w-[50vw]">
        <DialogHeader className="my-4 text-sm">
          <DialogTitle>Add Case</DialogTitle>
        </DialogHeader>
        <form id="addCase" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid sm:grid-cols-2">
            <Controller
              name="courtName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    placeholder="Enter Title"
                    className="w-full"
                  />

                  {fieldState.error && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="caseId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel>Case Id</FieldLabel>

                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Client" />
                    </SelectTrigger>

                    <SelectContent>
                      {cases?.data.cases.map((item) => (
                        <SelectItem
                          value={String(item.id)}
                          key={item.id}
                        >
                          {`${item.title} `}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="clientId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel>Client</FieldLabel>

                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Client" />
                    </SelectTrigger>

                    <SelectContent>
                      {clients?.data.map((item) => (
                        <SelectItem
                          value={String(item.client.id)}
                          key={item.client.id}
                        >
                          {`${item.user.firstName} ${item.user.lastName}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="sessionDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel>Session Date</FieldLabel>

                  <Input
                    type="date"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="sessionTime"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel>Session Time</FieldLabel>

                  <Input
                    type="time"
                    value={field.value ? field.value.slice(0, 5) : ""}
                    onChange={(e) => {
                      const time = e.target.value // HH:mm

                      // Convert to ISO time format like "13:59:00.000Z"
                      if (time) {
                        const isoTime = `${time}:00.000Z`
                        field.onChange(isoTime)
                      } else {
                        field.onChange(null)
                      }
                    }}
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Field>
            <Button type="submit" form="addCase" disabled={isPending}>
              {isPending ? "Adding..." : "Add Session"}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

export default AddSession
