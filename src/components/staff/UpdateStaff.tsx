import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { queryClient } from "@/main"
import type { StaffUserMapping } from "@/types/staffType"
import { patchStaff } from "@/api/staffAPI"
import {
  updateStaffFormSchema,
  type UpdateStaffFormSchemaType,
} from "@/schemas/updateStaffSchema"
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

const UpdateStaff = ({ staff }: { staff: StaffUserMapping }) => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: patchStaff,
    onSuccess: () => {
      toast.success("Update Staff ", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["staff"] })
      setTimeout(() => {
        navigate("/staff")
      }, 1510)
    },
    onError: (error) => {
      toast.error(`Error ${error.message}`)
    },
  })

  const {
    formState: { isDirty },
    ...form
  } = useForm<UpdateStaffFormSchemaType>({
    resolver: zodResolver(updateStaffFormSchema),
    mode: "onChange",
    delayError: 500,
    defaultValues: {
      address: staff.user.address,
      firstName: staff.user.firstName,
      lastName: staff.user.lastName,
      phoneNumber: staff.user.phoneNumber,
      gender: staff.user.gender || "",
    },
  })

  const onSubmit = (data: UpdateStaffFormSchemaType) => {
    if (isDirty) {
      mutate({ data: data, id: staff.staff.id })
    } else {
      toast.success("No Changes Found", { duration: 700 })
      setTimeout(() => {
        navigate("/staff")
      }, 700)
    }
  }
  return (
    <>
      <DialogContent className="no-scrollbar max-h-[99vh] min-w-[50vw] overflow-y-scroll">
        <DialogHeader className="my-4 text-sm">
          <DialogTitle>Update Staff</DialogTitle>
        </DialogHeader>
        <form id="addLawyer" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid sm:grid-cols-2">
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                  <Input
                    {...field}
                    id="firstName"
                    placeholder="Enter Your First Name"
                    autoComplete="off"
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
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                  <Input
                    {...field}
                    id="lastName"
                    placeholder="Enter Your Last Name"
                    autoComplete="off"
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
              name="phoneNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                  <Input
                    {...field}
                    id="phoneNumber"
                    placeholder="1234567890"
                    autoComplete="off"
                    className="w-full"
                    type="tel"
                    inputMode="numeric"
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10)
                      field.onChange(value)
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
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="address">Address</FieldLabel>
                  <Input
                    {...field}
                    id="address"
                    placeholder="Enter an address"
                    autoComplete="off"
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
              name="gender"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel>Gender</FieldLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
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
            <Button type="submit" form="addLawyer" disabled={isPending}>
              {isPending ? "Updating..." : "Update Lawyer"}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

export default UpdateStaff
