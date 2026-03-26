import { Controller, useForm } from "react-hook-form"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import {
  UpdateLawyerFormSchema,
  type UpdateLawyerFormSchemaType,
} from "@/schemas/UpdateLawyerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { queryClient } from "@/main"
import { patchLawyer } from "@/api/lawyerAPI"
import type { LawyerDataType } from "@/data/lawyerData"

const UpdateLawyer = ({ lawyer }: { lawyer: LawyerDataType }) => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: patchLawyer,
    onSuccess: () => {
      toast.success("User Become Lawyer", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["lawyer"] })
      setTimeout(() => {
        navigate("/lawyer")
      }, 1510)
    },
    onError: (error) => {
      toast.error(`Error ${error.message}`)
    },
  })

  const form = useForm<UpdateLawyerFormSchemaType>({
    resolver: zodResolver(UpdateLawyerFormSchema),
    mode: "onChange",
    delayError: 500,
    defaultValues: {
      address: lawyer.user.address,
      firstName: lawyer.user.firstName,
      lastName: lawyer.user.lastName,
      phoneNumber: lawyer.user.phoneNumber,
      gender: lawyer.user.gender || "",
      specialization: lawyer.lawyer.specialization,
    },
  })

  const onSubmit = (data: UpdateLawyerFormSchemaType) => {
    // console.log(data)
    mutate({ data: data, id: lawyer.lawyer.id })
  }
  return (
    <>
      <DialogContent className="no-scrollbar max-h-[99vh] min-w-[50vw] overflow-y-scroll">
        <DialogHeader className="my-4 text-sm">
          <DialogTitle>Add Lawyer</DialogTitle>
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
                      const value = e.target.value.replace(/\D/g, "")
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
              name="specialization"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="specialization">
                    specialization
                  </FieldLabel>
                  <Input
                    {...field}
                    id="specialization"
                    placeholder="Specialization"
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

export default UpdateLawyer
