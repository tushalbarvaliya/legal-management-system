import { Controller, useForm } from "react-hook-form"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import {
  AddCaseFormSchema,
  type AddCaseFormSchemaType,
} from "@/schemas/AddCaseSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Button } from "../ui/button"
import type { ClientUserMapping } from "@/types/clientType"
import { getAllClient } from "@/api/clientAPI"
import { useMutation, useQuery } from "@tanstack/react-query"
import { postCase } from "@/api/caseAPI"
import { toast } from "sonner"
import { queryClient } from "@/main"
import axios from "axios"

const AddCase = ({
  setOpenAdd,
}: {
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { data: clients } = useQuery<ClientUserMapping[]>({
    queryKey: ["client"],
    queryFn: getAllClient,
  })
  const { mutate, isPending } = useMutation({
    mutationFn: postCase,
    onSuccess: () => {
      toast.success("Case Add Successfully", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["cases"] })
      setOpenAdd(false)
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.detail?.error || "Something went wrong"
        )
      } else {
        toast.error("Something went wrong")
      }
    },
  })

  const form = useForm<AddCaseFormSchemaType>({
    resolver: zodResolver(AddCaseFormSchema),
    mode: "onChange",
    delayError: 500,
  })

  const onSubmit = (data: AddCaseFormSchemaType) => {
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
              name="caseNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="caseNumber">Case Number</FieldLabel>
                  <Input
                    {...field}
                    id="caseNumber"
                    type="number"
                    placeholder="Enter an Case Number"
                    className="w-full"
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "")
                      field.onChange(Number(value))
                    }}
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
              name="title"
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
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Input
                    {...field}
                    id="description"
                    placeholder="Enter Description"
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
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="type">Type</FieldLabel>
                  <Input
                    {...field}
                    id="type"
                    placeholder="Enter Type"
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
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel>Status</FieldLabel>

                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="caseClosedDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel>Expected Closed Date</FieldLabel>

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
              name="caseStage"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="caseStage">Case Stage</FieldLabel>
                  <Input
                    {...field}
                    id="caseStage"
                    placeholder="Enter Case Stage"
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
              name="caseCity"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="caseCity">Case City</FieldLabel>
                  <Input
                    {...field}
                    id="caseCity"
                    placeholder="Enter Case City"
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
                      {clients?.map((item) => (
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
          </FieldGroup>
        </form>
        <DialogFooter>
          <Field>
            <Button type="submit" form="addCase" disabled={isPending}>
              {isPending ? "Adding..." : "Add Case"}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

export default AddCase
