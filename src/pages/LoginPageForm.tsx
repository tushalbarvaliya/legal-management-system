import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

import { emailRegex, passwordRegex } from "@/utils/constant";
import type { LoginFormState } from "@/types/formType";
import { setToken } from "@/store/slices/authSlice";
import { login } from "@/api/authAPI";
import { toast, Toaster } from "sonner";

const LoginPageForm = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormState>({
    mode: "onChange",
    delayError: 500,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const token = { token: data.access_token };
      toast.success("Success fully login");
      dispatch(setToken(token));

      navigate("/");
    },
    onError: (error) => {
      toast.error(`Something is not right Error : ${error}`);
      setFormError(`Something is not right Error : ${error}`);
    },
  });
  const onSubmit = (data: LoginFormState) => {
    console.log(data);
    mutate(data);
  };
  return (
    <main className="flex min-h-fit  justify-center p-4 sm:p-6">
      <Toaster richColors />

      <section className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-md sm:p-8">
        {/* this is header of logo anf title */}
        <header className="mb-6 flex flex-col gap-3 text-center">
          <div className="mx-auto grid h-12 w-12 items-center rounded-xl border border-zinc-300 bg-zinc-900 text-lg font-semibold text-zinc-100">
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
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
            {errors.email && (
              <p className="min-h-5 text-xs text-red-600">
                {errors.email?.message}
              </p>
            )}
          </div>

          {/* Password Input*/}
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
            {errors.password && (
              <p className="min-h-5 text-xs text-red-600">
                {errors.password?.message}
              </p>
            )}
          </div>

          {/* forgot password link */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-black hover:text-zinc-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Form Error massage */}
          <p className="min-h-5 text-xs text-red-600">{formError}</p>

          {/* Submit button */}
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-50 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            disabled={isPending}
          >
            {isPending ? "Logging.." : "Login"}
          </button>

          {/* Sign up link */}
          <p className="text-center text-sm text-black">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className=" font-medium text-black hover:text-zinc-500 hover:underline"
            >
              Sign up
            </Link>
            
          </p>
        </form>
      </section>
    </main>
  );
};

export default LoginPageForm;
