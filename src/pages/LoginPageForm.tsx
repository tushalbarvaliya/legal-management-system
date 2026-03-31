import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner"
import { motion } from "framer-motion"
import * as z from "zod"
import { Eye, EyeOff } from "lucide-react"

import type { loginResponseType } from "@/types/types"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { setAuth } from "@/store/slice/authSlice"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { emailRegex, passwordRegex } from "@/utils/regex"
import { login } from "@/api/authAPI"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { Helmet } from "react-helmet-async"

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
})

type FormType = z.infer<typeof formSchema>

const LoginPageForm = () => {
  const token = useAppSelector((state) => state.auth.token)
  const navigate = useNavigate()

  const [passwordShow, setPasswordShow] = useState<boolean>(false)
  const dispatch = useAppDispatch()
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
    mutationFn: login,
    onSuccess: (data: loginResponseType) => {
      const token = { token: data.access_token }
      toast.success("Success fully login", { duration: 1000 })
      dispatch(setAuth(token))
      navigate("/")
    },
    onError: (error) => {
      toast.error(
        `Something is not right Error : ${error.message || "Something is not Right"}`
      )
    },
  })
  if (token) {
    return <Navigate to="/" replace />
  }
  const onSubmit = (data: FormType) => {
    mutate(data)
  }
  return (
    <>
      <Helmet>
        <title>Arcade Demo | Login</title>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta
          name="description"
          content="if you forgot you password! don't worry here you can change your password"
        />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <main className="flex min-h-fit justify-center p-4 sm:p-6">
          <Toaster richColors />

          <section className="w-full max-w-md rounded-xl border border-zinc-900 bg-white p-6 shadow-md sm:p-8 dark:border-zinc-200">
            {/* this is header of logo anf title */}
            <header className="mb-6 flex flex-col gap-3 text-center">
              <div className="mx-auto grid h-12 w-12 items-center rounded-xl border border-zinc-300 bg-black text-lg font-semibold text-zinc-100">
                AD
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
                Sign in
              </h1>

              <p className="text-sm text-black">
                Enter your credentials to continue.
              </p>
            </header>

            {/* main form */}
            <form
              className="space-y-5"
              onSubmit={form.handleSubmit(onSubmit)}
              id="loginForm"
            >
              {/* Email */}
              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        {...field}
                        id="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Please Enter Your Email"
                        autoComplete="email"
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
                {/* password */}
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
                          autoComplete="current-password"
                          type={passwordShow ? "text" : "password"}
                        />
                        <Button
                          type="button"
                          variant={"ghost"}
                          className="text-zinc-500 hover:cursor-pointer hover:text-zinc-700"
                          onClick={() => setPasswordShow((prev) => !prev)}
                          aria-label="Password-show-button"
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
              </FieldGroup>

              {/* forgot password link */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-black hover:text-zinc-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit button */}
              <Field orientation="vertical">
                <Button
                  type="submit"
                  form="loginForm"
                  disabled={isPending}
                  className="hover:cursor-pointer"
                >
                  {isPending ? "Logging.." : "Login"}
                </Button>
              </Field>
            </form>
          </section>
        </main>
      </motion.div>
    </>
  )
}

export default LoginPageForm
