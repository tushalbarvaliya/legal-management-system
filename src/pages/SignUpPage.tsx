import { motion } from "framer-motion"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner"
import { Eye, EyeOff } from "lucide-react"

import { signUp } from "@/api/authAPI"
import { Button } from "@/components/ui/button"
import { emailRegex, passwordRegex } from "@/utils/regex"
import { useAppSelector } from "@/hooks/hooks"

type formDataType = {
  confirmPassword: string
  password: string
  email: string
}

const SignUpPage = () => {
  const navigate = useNavigate()
  const token = useAppSelector((state) => state.auth.token)
  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [navigate, token])
  const [passwordShow, setPasswordShow] = useState(false)
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataType>({
    mode: "onChange",
    delayError: 500,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Sign Up successfully", { duration: 1500 })
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    },
    onError: (error) => {
      toast.error(`Something is not right Error : ${error}`)
    },
  })

  const onSubmit = (data: formDataType) => {
    if (data.confirmPassword === data.password) {
      const mutateData = {
        email: data.email,
        password: data.password,
        companyId: 1,
      }
      mutate(mutateData)
    } else {
      toast.error(`Password And Confirm Password Should Be Same`)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <main className="flex min-h-screen items-start justify-center p-4 sm:p-6">
        <Toaster richColors />
        <section className="w-full max-w-xl rounded-2xl border border-black bg-white p-6 shadow-sm sm:p-8">
          {/* Header */}
          <header className="mb-6 space-y-3 text-center">
            <div className="mx-auto inline-flex">
              <div className="group grid h-14 w-14 place-items-center rounded-xl border border-zinc-300 bg-zinc-900 text-xl font-semibold text-zinc-100 transition duration-200 hover:scale-105 hover:bg-zinc-800">
                <span className="transition-transform duration-200 group-hover:scale-110">
                  AD
                </span>
              </div>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Create your account
            </h1>
            <p className="text-sm font-medium text-zinc-900">
              Fill in your details to get started.
            </p>
          </header>

          {/* Main Form */}
          <form
            id="signupForm"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* User Name Input */}

            {/* Email */}
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-800"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="off"
                className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please Enter a value",
                  },
                  pattern: {
                    value: emailRegex,
                    message:
                      "Please enter a valid email address (e.g., user@example.com).",
                  },
                })}
              />

              {errors.email && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.email?.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-800"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={passwordShow ? "text" : "password"}
                  autoComplete="off"
                  placeholder="Enter your password"
                  className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 pr-10 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Please Enter a value",
                    },
                    pattern: {
                      value: passwordRegex,
                      message:
                        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
                    },
                  })}
                />

                <button
                  type="button"
                  className="absolute inset-y-0 right-0 grid w-10 place-items-center text-zinc-500 hover:text-zinc-700"
                  onClick={() => setPasswordShow((prev) => !prev)}
                >
                  {passwordShow ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {errors.password && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.password?.message}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="_confirmPassword"
                className="text-sm font-medium text-zinc-800"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="_confirmPassword"
                  type={confirmPasswordShow ? "text" : "password"}
                  autoComplete="off"
                  placeholder="Enter your password"
                  className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 pr-10 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Please Enter a value",
                    },
                    pattern: {
                      value: passwordRegex,
                      message:
                        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
                    },
                  })}
                />

                {/* Eye Button */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 grid w-10 place-items-center text-zinc-500 hover:text-zinc-700"
                  onClick={() => setConfirmPasswordShow((prev) => !prev)}
                >
                  {confirmPasswordShow ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>

            {/* Address Input */}

            {/* Submit Button */}
            <Button
              type="submit"
              className="mt-4 w-full bg-black p-6 text-white"
              disabled={isPending}
            >
              {isPending ? "Creating Your Account..." : "Create Account"}
            </Button>

            {/* Login Link */}
            <p className="mt-4 text-center text-sm text-zinc-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-zinc-900 underline-offset-4 transition hover:text-zinc-700 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </section>
      </main>
    </motion.div>
  )
}

export default SignUpPage
