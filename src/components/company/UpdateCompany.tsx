import { Controller, useForm } from "react-hook-form"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {
  UpdateCompanyFormSchema,
  type UpdateCompanyFormSchemaType,
} from "@/schemas/UpdateCompanySchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axiosInstance from "@/api/axiosInstance"
import { toast } from "sonner"
import { queryClient } from "@/main"
import type { CompanyData } from "@/types/companyType"

type UpdateTaskProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>
  data: CompanyData
}

const UpdateCompany = ({ closeModal, data }: UpdateTaskProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: UpdateCompanyFormSchemaType) => {
      const res = await axiosInstance.patch("/companies/company/1", formData)
      return res.data
    },
    onSuccess: () => {
      toast.success("Updated Successfully", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["company"] })
      closeModal(false)
    },
    onError: () => {
      toast.error("Something went wrong")
    },
  })

  const form = useForm<UpdateCompanyFormSchemaType>({
    resolver: zodResolver(UpdateCompanyFormSchema),
    mode: "onChange",
    delayError: 500,
    defaultValues: {
      address: data.Address,
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
    },
  })

  const onSubmit = (formData: UpdateCompanyFormSchemaType) => {
    if (form.formState.isDirty) {
      mutate(formData)
    } else {
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
          </FieldGroup>
        </form>
      </DialogDescription>
      <DialogFooter>
        <Field>
          <Button type="submit" form="updateCompanyForm" disabled={isPending}>
            {isPending ? "Updating..." : "Update"}
          </Button>
        </Field>
      </DialogFooter>
    </DialogContent>
  )
}

export default UpdateCompany
