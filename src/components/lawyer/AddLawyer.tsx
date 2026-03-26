import { zodResolver } from "@hookform/resolvers/zod"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import {
  addressRegex,
  emailRegex,
  nameRegex,
  passwordRegex,
  phoneNumberRegex,
  userNameRegex,
} from "@/utils/regex"

import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useMutation } from "@tanstack/react-query"
import { postLawyer } from "@/api/lawyerAPI"
import { toast } from "sonner"
import { queryClient } from "@/main"
import { useNavigate } from "react-router-dom"

export const formSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .regex(emailRegex, "Enter a valid email (e.g., user@example.com)"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Must include uppercase, lowercase, number, and special character"
      ),

    confirmPassword: z.string().min(1, "Confirm password is required"),

    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .regex(userNameRegex, "Username must contain letters and numbers only"),

    firstName: z
      .string()
      .trim()
      .min(3, "First name must be at least 3 characters")
      .regex(nameRegex, "First name should contain only letters"),

    lastName: z
      .string()
      .trim()
      .min(3, "Last name must be at least 3 characters")
      .regex(nameRegex, "Last name should contain only letters"),

    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(phoneNumberRegex, "Phone number must be exactly 10 digits"),

    gender: z.string().min(1, "Gender is required"),

    address: z
      .string()
      .trim()
      .min(5, "Address must be at least 5 characters")
      .regex(
        addressRegex,
        "Address can contain letters, numbers, and spaces only"
      ),

    specialization: z
      .string()
      .trim()
      .min(3, "Specialization must be at least 3 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type FormType = z.infer<typeof formSchema>

const AddLawyer = () => {
  const [passwordShow, setPasswordShow] = useState<boolean>(false)
  const [confirmPasswordShow, setConfirmPasswordShow] = useState<boolean>(false)
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: postLawyer,
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

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    delayError: 500,
  })

  const onSubmit = (data: FormType) => {
    const { confirmPassword: _, ...dataMutate } = data
    mutate(dataMutate)
  }
  return (
    <>
      <DialogContent className="no-scrollbar max-h-[99vh] overflow-y-scroll">
        <DialogHeader className="my-4">
          <DialogTitle>Add Lawyer</DialogTitle>
        </DialogHeader>
        <form id="addLawyer" onSubmit={form.handleSubmit(onSubmit)}>
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
              {isPending ? "Adding..." : "Add as Lawyer"}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

export default AddLawyer
