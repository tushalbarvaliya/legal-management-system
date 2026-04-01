import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Input } from "../ui/input"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Button } from "../ui/button"
import {
  AddClientFormSchema,
  type AddClientFormSchemaType,
} from "@/schemas/AddClientSchema"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { useAddClientMutation } from "@/store/services/clientAPI"

const AddClient = ({
  setOpenAdd,
}: {
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [passwordShow, setPasswordShow] = useState<boolean>(false)
  const [confirmPasswordShow, setConfirmPasswordShow] = useState<boolean>(false)
  const [addClient, { isLoading: isPending }] = useAddClientMutation()

  const form = useForm<AddClientFormSchemaType>({
    resolver: zodResolver(AddClientFormSchema),
    mode: "onChange",
    delayError: 500,
  })

  const onSubmit = async(data: AddClientFormSchemaType) => {
    try {
      await addClient({ data }).unwrap()
      toast.success("User Become Lawyer", { duration: 1500 })
      setOpenAdd(false)
    } catch {
      toast.error(`Something is not right`)
    }
  }
  return (
    <>
      <DialogContent className="no-scrollbar max-h-[99vh] overflow-y-scroll lg:min-w-[50vw]">
        <DialogHeader className="my-4 text-sm">
          <DialogTitle>Add Client</DialogTitle>
        </DialogHeader>
        <form id="addStaff" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid sm:grid-cols-2">
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
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <div className="flex">
                    <Input
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Please Enter your Password"
                      autoComplete="off"
                      type={passwordShow ? "text" : "password"}
                    />
                    <Button
                      type="button"
                      variant={"ghost"}
                      className="text-zinc-500 hover:cursor-pointer hover:text-zinc-700"
                      onClick={() => setPasswordShow((prev) => !prev)}
                    >
                      {passwordShow ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">
                    confirm Password
                  </FieldLabel>
                  <div className="flex">
                    <Input
                      {...field}
                      id="confirmPassword"
                      aria-invalid={fieldState.invalid}
                      placeholder="Please Enter your Password"
                      autoComplete="off"
                      type={confirmPasswordShow ? "text" : "password"}
                    />
                    <Button
                      type="button"
                      variant={"ghost"}
                      className="text-zinc-500 hover:cursor-pointer hover:text-zinc-700"
                      onClick={() => setConfirmPasswordShow((prev) => !prev)}
                    >
                      {confirmPasswordShow ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                  {fieldState.invalid && (
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
            <Controller
              name="occupation"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="occupation">Occupation</FieldLabel>
                  <Input
                    {...field}
                    id="occupation"
                    placeholder="Enter an occupation"
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
              name="crNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="crNumber">Cr Number</FieldLabel>
                  <Input
                    {...field}
                    id="crNumber"
                    type="number"
                    placeholder="Enter an Cr Number"
                    autoComplete="off"
                    className="w-full"
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
              name="vatNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="vatNumber">Vat Number</FieldLabel>
                  <Input
                    {...field}
                    id="vatNumber"
                    type="number"
                    placeholder="Enter an Vat Number"
                    autoComplete="off"
                    className="w-full"
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
              name="vatPercentage"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="vatPercentage">
                    Vat Percentage
                  </FieldLabel>
                  <Input
                    {...field}
                    id="vatPercentage"
                    type="number"
                    placeholder="Enter an Vat Percentage"
                    autoComplete="off"
                    className="w-full"
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
          </FieldGroup>
        </form>
        <DialogFooter>
          <Field>
            <Button type="submit" form="addStaff" disabled={isPending}>
              {isPending ? "Adding..." : "Add as Client"}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

export default AddClient
