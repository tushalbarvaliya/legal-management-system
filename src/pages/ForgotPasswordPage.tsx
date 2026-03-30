import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner"
import { motion } from "framer-motion"
import * as z from "zod"

import { forgetPasswordAPI } from "@/api/authAPI"
import { Button } from "@/components/ui/button"
import { emailRegex, passwordRegex } from "@/utils/regex"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { useAppSelector } from "@/hooks/hooks"

const formSchema = z.object({
  email: z
    .string()
    .regex(
      emailRegex,
      "Please enter a valid email address (e.g., user@example.com)."
    )
    .min(1, "Please Enter a Value"),
  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
    ),
  confirmPassword: z
    .string()
    .regex(
      passwordRegex,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
    ),
})

type FormType = z.infer<typeof formSchema>

const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const token = useAppSelector((state) => state.auth.token)
  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [navigate, token])
  const [passwordShow, setPasswordShow] = useState(false)
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false)

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    delayError: 500,
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: forgetPasswordAPI,
    onSuccess: async () => {
      toast.success("Password Change Successful", { duration: 1500 })
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    },
    onError: (error) => {
      toast.error(`Error : ${error.message || "Something is not right"}`)
    },
  })

  const onSubmit = (data: FormType) => {
    if (data.password != data.confirmPassword) {
      toast.error("New Password and Confirm Password Should be Same.")
    } else {
      const submitData = { email: data.email, new_password: data.password }
      mutate(submitData)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Toaster position="bottom-right" richColors />
      <main className="flex h-fit justify-center p-4 sm:p-6">
        <section className="w-full max-w-md rounded-xl border border-black bg-white p-6 shadow-sm sm:p-8">
          {/* Header */}
          <header className="mb-4 flex flex-col gap-3 text-center">
            <div className="mx-auto grid h-12 w-12 items-center rounded-xl border border-zinc-300 bg-zinc-900 text-lg font-semibold text-zinc-100">
              AD
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Forgot Password
            </h1>

            <p className="text-sm text-zinc-900">
              Enter your credentials to continue.
            </p>
          </header>

          {/* main form */}
          <form
            className="space-y-2"
            onSubmit={form.handleSubmit(onSubmit)}
            id="forgotForm"
          >
            <FieldGroup>
              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Please Enter Your Email"
                      autoComplete="off"
                    />
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
                    <FieldLabel htmlFor="confirmPassword">Password</FieldLabel>
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
            </FieldGroup>
            {/* back to login button */}
            <div className="my-4 flex justify-end">
              <Link
                to="/login"
                className="text-xs font-medium text-black hover:text-zinc-500 hover:underline"
              >
                Back to Login ?
              </Link>
            </div>

            {/* submit Button */}
            <Field orientation="vertical">
              <Button
                type="button"
                disabled={isPending}
                variant={"outline"}
                onClick={() => form.reset()}
                className="hover:cursor-pointer"
              >
                Reset
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                form="forgotForm"
                className="hover:cursor-pointer"
              >
                {isPending ? "New Password Set..." : "Set New Password"}
              </Button>
            </Field>
          </form>
        </section>
      </main>
    </motion.div>
  )
}

export default ForgotPasswordPage
