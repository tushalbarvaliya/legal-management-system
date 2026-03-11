import { Link, useNavigate } from "react-router";

import type { SignUpFormState } from "@/types/formType";
import { useForm } from "react-hook-form";
import {
  emailRegex,
  passwordRegex,
  PhoneNumberRegex,
  pinCodeRegex,
  userNameRegex,
} from "@/utils/constant";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/authAPI";

const SignUpPage = () => {
  const [formError, setFormError] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormState>({
    mode: "onChange",
    delayError: 500,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      setFormError(`Something is not right Error : ${error}`);
    },
  });
  const onSubmit = (data: SignUpFormState) => {
    mutate(data);
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <section className="w-full max-w-4xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
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
          <p className="text-sm text-zinc-500">
            Fill in your details to get started.
          </p>
        </header>

        <form id="signupForm" noValidate onSubmit={handleSubmit(onSubmit)}>
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
                className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("userName", {
                  minLength: {
                    value: 3,
                    message: "User name length should be greater than 3 ",
                  },
                  pattern: {
                    value: userNameRegex,
                    message: "User Name Must Have digit and Char",
                  },
                  required: true,
                })}
              />
              <p id="firstNameError" className="min-h-5 text-xs text-red-600">
                {errors.userName?.message}
              </p>
            </div>
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
                className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("firstName", {
                  minLength: {
                    value: 3,
                    message: "First name length should be greater than 3 ",
                  },
                  required: true,
                })}
              />
              <p id="firstNameError" className="min-h-5 text-xs text-red-600">
                {errors.firstName?.message}
              </p>
            </div>
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
                className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("lastName", {
                  minLength: {
                    value: 3,
                    message: "Last name length should be greater than 3 ",
                  },
                  required: true,
                })}
              />
              <p id="firstNameError" className="min-h-5 text-xs text-red-600">
                {errors.lastName?.message}
              </p>
            </div>

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
                    message: "Please Enter Email with one Domain.",
                  },
                })}
              />

              <p className="min-h-5 text-xs text-red-600">
                {errors.email?.message}
              </p>
            </div>
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
                  className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("_confirmPassword", {
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
              <p className="min-h-5 text-xs text-red-600">
                {errors._confirmPassword?.message}
              </p>
            </div>

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
                className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("address", {
                  minLength: {
                    value: 3,
                    message: "Address must be length should be greater than 3 ",
                  },
                  maxLength: {
                    value: 20,
                    message: "Address must be less than 20 char",
                  },
                  required: true,
                })}
              />
              <p id="firstNameError" className="min-h-5 text-xs text-red-600">
                {errors.address?.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="pinCode"
                className="text-sm font-medium text-zinc-800"
              >
                Pin Code
              </label>
              <input
                id="pinCode"
                type="text"
                autoComplete="off"
                placeholder={"121212"}
                className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("pinCode", {
                  pattern: {
                    value: pinCodeRegex,
                    message: "Pin code Must be a digit.",
                  },
                  minLength: {
                    value: 6,
                    message: "pin must be length of 6 digit",
                  },
                  required: true,
                })}
              />
              <p id="firstNameError" className="min-h-5 text-xs text-red-600">
                {errors.pinCode?.message}
              </p>
            </div>
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
                className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("phoneNumber", {
                  pattern: {
                    value: PhoneNumberRegex,
                    message: "Phone Number Must be in this format xxxxxxxxx.",
                  },
                  required: true,
                })}
              />
              <p id="firstNameError" className="min-h-5 text-xs text-red-600">
                {errors.phoneNumber?.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="state"
                className="text-sm font-medium text-zinc-800"
              >
                State
              </label>
              <input
                id="state"
                type="text"
                autoComplete="off"
                placeholder={"karnataka"}
                className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("state", {
                  minLength: {
                    value: 3,
                    message: "State name length should be greater than 3 ",
                  },
                  required: true,
                })}
              />
              <p className="min-h-5 text-xs text-red-600">
                {errors.state?.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="city"
                className="text-sm font-medium text-zinc-800"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                autoComplete="off"
                placeholder={"Deo"}
                className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("city", {
                  minLength: {
                    value: 3,
                    message: "City name length should be greater than 3 ",
                  },
                  required: true,
                })}
              />
              <p id="firstNameError" className="min-h-5 text-xs text-red-600">
                {errors.city?.message}
              </p>
            </div>
          </div>
          <p className="min-h-5 text-xs text-red-600">{formError}</p>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-50 transition duration-200 hover:scale-[1.01] hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            disabled={isPending}
          >
              {isPending ? "Creating Your Account..." : "Create Account"}
            
          </button>

          <p className="text-center  mt-4 text-sm text-zinc-600">
            Already have an account?
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
  );
};

export default SignUpPage;
