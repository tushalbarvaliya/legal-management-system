import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"

import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
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
import { format, isValid, parse } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { useAddSessionMutation } from "@/store/services/sessionAPI"
import { useGetCaseQuery } from "@/store/services/caseAPI"
import { useGetClientQuery } from "@/store/services/clientAPI"

const AddSession = ({
  setOpenAdd,
}: {
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { data: cases } = useGetCaseQuery()

  const { data: clients } = useGetClientQuery()

  const [addSession, { isLoading: isPending }] = useAddSessionMutation()

  const form = useForm<AddSessionFormSchemaType>({
    resolver: zodResolver(AddSessionFormSchema),
    mode: "onChange",
    delayError: 500,
  })

  const onSubmit = async (data: AddSessionFormSchemaType) => {
    try {
      await addSession({ data }).unwrap()
      toast.success("Session Add", { duration: 1500 })
      setOpenAdd(false)
    } catch {
      toast.error(`Something iw not right`)
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
                        <SelectItem value={String(item.id)} key={item.id}>
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
