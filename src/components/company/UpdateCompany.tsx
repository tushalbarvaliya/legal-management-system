import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"

import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import type { CompanyData } from "@/types/companyType"
import {
  UpdateCompanyFormSchema,
  type UpdateCompanyFormSchemaType,
} from "@/schemas/UpdateCompanySchema"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { useUpdateCompanyMutation } from "@/store/services/companyAPI"

type UpdateTaskProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>
  data: CompanyData
}

const UpdateCompany = ({ closeModal, data }: UpdateTaskProps) => {
  const [updateCompany, { isLoading }] = useUpdateCompanyMutation()

  const {
    formState: { isDirty },
    ...form
  } = useForm<UpdateCompanyFormSchemaType>({
    resolver: zodResolver(UpdateCompanyFormSchema),
    mode: "onChange",
    delayError: 500,
    defaultValues: {
      Address: data.Address,
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
    },
  })

  const onSubmit = async (formData: UpdateCompanyFormSchemaType) => {
    if (isDirty) {
      try {
        await updateCompany({
          id: data.id,
          data: formData,
        }).unwrap()

        toast.success("Updated Successfully", { duration: 1500 })
        closeModal(false)
      } catch {
        toast.error("Something went wrong")
      }
    } else {
      toast.success("No Changes found")
      closeModal(false)
    }
  }

  return (
    <DialogContent className="no-scrollbar overflow-y-auto lg:min-w-200">
      <DialogHeader>
        <DialogTitle>Update Company</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <form id="updateCompanyForm" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="text-black">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">User Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    placeholder="Enter username"
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
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    placeholder="Enter an Email"
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
              name="Address"
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
          </FieldGroup>
        </form>
      </DialogDescription>
      <DialogFooter>
        <Field>
          <Button type="submit" form="updateCompanyForm" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </Field>
      </DialogFooter>
    </DialogContent>
  )
}

export default UpdateCompany
