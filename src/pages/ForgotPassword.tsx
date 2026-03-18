import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast, Toaster } from "sonner";

import { forgetPasswordAPI } from "@/api/authAPI";
import type { ForgotPasswordState } from "@/types/formType";
import { emailRegex, passwordRegex } from "@/utils/constant";

const ForgotPassword = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordState>({
    mode: "onChange",
    delayError: 500,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: forgetPasswordAPI,
    onSuccess: async () => {
      toast.success("Password Change Successful");
      setFormError("");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message);
      setFormError(`Something is not right Error : ${error}`);
    },
  });

  const onSubmit = (data: ForgotPasswordState) => {
    if (data.password != data.confirmPassword) {
      toast.error("New Password and Confirm Password Should be Same.");
    } else {
      mutate(data);
    }
  };
  return (
    <>
      <Toaster position="bottom-right" richColors />

      <main className="flex h-fit  justify-center p-4 sm:p-6">

        <section className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">

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
                className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("email", {
                  required: true,
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
                  className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("password", {
                    required: true,
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
                  className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("confirmPassword", {
                    required: true,
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
                  onClick={() => setConfirmPasswordShow((prev) => !prev)}
                >
                  <img
                    src={confirmPasswordShow ? "/closeEye.svg" : "/openEye.svg"}
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

            {/* back to login button */}
            <div className="flex justify-end">
              <Link
                to="/login"
                className="text-xs font-medium text-black hover:text-zinc-500 hover:underline"
              >
                Back to Login ?
              </Link>
            </div>

            {/* from Error */}
            <p className="min-h-5 text-xs text-red-600">{formError}</p>

            {/* submit Button */}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-50 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
              disabled={isPending}
            >
              {isPending ? "New Password Set..." : "set New Password"}
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default ForgotPassword;
