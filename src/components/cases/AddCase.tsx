import { toast } from "sonner"
import { Controller, useForm } from "react-hook-form"

import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import {
  AddCaseFormSchema,
  type AddCaseFormSchemaType,
} from "@/schemas/AddCaseSchema"
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { format, isValid, parse } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { useAddCaseMutation } from "@/store/services/caseAPI"
import { useGetClientQuery } from "@/store/services/clientAPI"

const AddCase = ({
  setOpenAdd,
}: {
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { data: clients } = useGetClientQuery()
  const [addCase, { isLoading: isPending }] = useAddCaseMutation()

  const form = useForm<AddCaseFormSchemaType>({
    resolver: zodResolver(AddCaseFormSchema),
    mode: "onChange",
    delayError: 500,
  })

  const onSubmit = async (data: AddCaseFormSchemaType) => {
    try {
      await addCase({ data }).unwrap()
      toast.success("Case Add Successfully", { duration: 1500 })
      setOpenAdd(false)
    } catch {
      toast.error("Something went wrong")
    }
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

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Case Type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="civil">Civil</SelectItem>
                      <SelectItem value="criminal">Criminal</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="labor">Labor</SelectItem>
                      <SelectItem value="property">Property</SelectItem>
                      <SelectItem value="tax">Tax</SelectItem>
                      <SelectItem value="consumer">Consumer</SelectItem>
                      <SelectItem value="immigration">Immigration</SelectItem>
                      <SelectItem value="intellectual_property">
                        Intellectual Property
                      </SelectItem>
                      <SelectItem value="bankruptcy">Bankruptcy</SelectItem>
                      <SelectItem value="environmental">
                        Environmental
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>

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
              render={({ field, fieldState }) => {
                const selectedDate = (() => {
                  if (!field.value) return undefined
                  let parsed = parse(field.value, "yyyy-MM-dd", new Date())
                  if (isValid(parsed)) return parsed

                  parsed = new Date(field.value)
                  return isValid(parsed) ? parsed : undefined
                })()

                return (
                  <Field className="space-y-2">
                    <FieldLabel>Expected Closed Date</FieldLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {selectedDate
                            ? format(selectedDate, "dd-MM-yyyy")
                            : "Select date"}

                          <CalendarIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(format(date, "yyyy-MM-dd"))
                            } else {
                              field.onChange(null)
                            }
                          }}
                        />
                      </PopoverContent>
                    </Popover>

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
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
