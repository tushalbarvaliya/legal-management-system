import { forgetPasswordAPI } from "@/api/authAPI"
import { Button } from "@/components/ui/button"
import { emailRegex, passwordRegex } from "@/utils/regex"
import { useMutation } from "@tanstack/react-query"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner"
import { motion } from "framer-motion"

type ForgotPasswordFormData = {
  email: string
  confirmPassword: string
  password: string
}

const ForgotPasswordPage = () => {
  const [passwordShow, setPasswordShow] = useState(false)
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    mode: "onChange",
    delayError: 500,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: forgetPasswordAPI,
    onSuccess: async () => {
      toast.success("Password Change Successful", { duration: 1500 })
      setTimeout(() => {
        navigate("/")
      }, 2000)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data: ForgotPasswordFormData) => {
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
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            {/* Email input */}
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

              <p className="min-h-5 text-xs text-red-600">
                {errors.email?.message}
              </p>
            </div>

            {/* Password input */}
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
                  className="absolute inset-y-0 right-0 border-0 hover:bg-transparent mx-2 place-items-center text-zinc-500 hover:text-zinc-700"
                  onClick={() => setPasswordShow((prev) => !prev)}
                >
                  {passwordShow ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <p className="min-h-5 text-xs text-red-600">
                {errors.password?.message}
              </p>
            </div>

            {/* confirm password input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-zinc-800"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
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

                <button
                  type="button"
                  className="absolute inset-y-0 right-0 mx-2 place-items-center text-zinc-500 hover:text-zinc-700"
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
            <Button
              type="submit"
              disabled={isPending}
              className="text-md w-full bg-black p-6 text-white"
            >
              {isPending ? "New Password Set..." : "Set New Password"}
            </Button>
          </form>
        </section>
      </main>
    </motion.div>
  )
}

export default ForgotPasswordPage
