import { signUp, type SignUpFormdata } from "@/api/authAPI"
import {
  addressRegex,
  emailRegex,
  nameRegex,
  passwordRegex,
  phoneNumberRegex,
  userNameRegex,
} from "@/utils/regex"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner"

type formDataType = {
  confirmPassword: string
} & SignUpFormdata

const SignUpPage = () => {
  const [passwordShow, setPasswordShow] = useState(false)
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false)

  const navigate = useNavigate()

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
      mutate(data)
    } else {
      toast.error(`Password And Confirm Password Should Be Same`)
    }
  }
  return (
    <>
      <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
        <Toaster richColors />
        <section className="w-full max-w-4xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
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
          <form id="signupForm" noValidate onSubmit={handleSubmit(onSubmit)}>
            {/* User Name Input */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="userName"
                  className="text-sm font-medium text-zinc-800"
                >
                  User Name
                </label>
                <input
                  id="userName"
                  type="text"
                  autoComplete="off"
                  placeholder={"john"}
                  className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("name", {
                    minLength: {
                      value: 3,
                      message: "User name length should be greater than 3 ",
                    },
                    pattern: {
                      value: userNameRegex,
                      message:
                        "Username must include letters and numbers only, with no spaces or special characters.",
                    },
                    required: {
                      value: true,
                      message: "Please Enter a value",
                    },
                  })}
                />

                {errors.name && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.name?.message}
                  </p>
                )}
              </div>

              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-zinc-800"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  autoComplete="off"
                  placeholder={"john"}
                  className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("first_name", {
                    minLength: {
                      value: 3,
                      message: "First name length should be greater than 3 ",
                    },
                    pattern: {
                      value: nameRegex,
                      message:
                        "Only letters are allowed. No numbers, spaces, or special characters.",
                    },
                    required: {
                      value: true,
                      message: "Please Enter a value",
                    },
                  })}
                />

                {errors.first_name && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.first_name?.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-zinc-800"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  autoComplete="off"
                  placeholder={"Deo"}
                  className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("last_name", {
                    minLength: {
                      value: 3,
                      message: "Last name length should be greater than 3 ",
                    },
                    pattern: {
                      value: nameRegex,
                      message:
                        "Only letters are allowed. No numbers, spaces, or special characters.",
                    },
                    required: {
                      value: true,
                      message: "Please Enter a value",
                    },
                  })}
                />

                {errors.last_name && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.last_name?.message}
                  </p>
                )}
              </div>

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
                    <img
                      src={passwordShow ? "/closeEye.svg" : "/openEye.svg"}
                      alt="button"
                      className="scale-70 opacity-50"
                    />
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
                    <img
                      src={
                        confirmPasswordShow ? "/closeEye.svg" : "/openEye.svg"
                      }
                      alt="button"
                      className="scale-70 opacity-50"
                    />
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>

              {/* Address Input */}
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-zinc-800"
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  autoComplete="off"
                  placeholder={"32 street gujarat city"}
                  className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("address", {
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters required.",
                    },
                    maxLength: {
                      value: 50,
                      message: "Maximum 20 characters allowed.",
                    },
                    pattern: {
                      value: addressRegex,
                      message: "Only letters, numbers, and spaces are allowed.",
                    },
                    required: {
                      value: true,
                      message: "Please Enter a value",
                    },
                  })}
                />

                {errors.address && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.address?.message}
                  </p>
                )}
              </div>

              {/* Phone Number Input */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="text-sm font-medium text-zinc-800"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  autoComplete="off"
                  placeholder={"1234567890"}
                  className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("phoneNumber", {
                    pattern: {
                      value: phoneNumberRegex,
                      message: "Phone number must contain exactly 10 digits.",
                    },
                    required: {
                      value: true,
                      message: "Please Enter a value",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.phoneNumber?.message}
                  </p>
                )}
              </div>

              {/* role Input */}
              <div>
                <label
                  htmlFor="role"
                  className="text-sm font-medium text-zinc-800"
                >
                  Role
                </label>
                <select
                  id="role"
                  className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("role", {
                    required: {
                      value: true,
                      message: "Please Enter a value",
                    },
                  })}
                >
                  <option value="">Select Gender</option>
                  <option value="admin">Admin</option>
                  <option value="lawyer">Lawyer</option>
                  <option value="staff">Staff</option>
                </select>

                {errors.role && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.role?.message}
                  </p>
                )}
              </div>

              {/* gender Input */}
              <div>
                <label
                  htmlFor="gender"
                  className="text-sm font-medium text-zinc-800"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("gender", {
                    required: {
                      value: true,
                      message: "Please Enter a value",
                    },
                  })}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.gender?.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-50 transition duration-200 hover:scale-[1.01] hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:outline-none"
              disabled={isPending}
            >
              {isPending ? "Creating Your Account..." : "Create Account"}
            </button>

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
    </>
  )
}

export default SignUpPage
