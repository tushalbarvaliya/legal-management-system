import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

import type { ResetPasswordState } from "@/types/formType";

import { passwordRegex } from "@/utils/constant";
import { resetPasswordAPI } from "@/api/authAPI";


const ResetPassword = () => {
  const [oldPasswordShow, setOldPasswordShow] = useState(false);
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordState>({
    mode: "onChange",
    delayError: 500,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordAPI,
    onSuccess: () => {
      toast.success("Password Change Successful");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
      setFormError(`Something is not right Error : ${error.message}`);
    },
  });

  const onSubmit = (data: ResetPasswordState) => {
    if (data.newPassword != data.confirmNewPassword) {
      toast.error("New Password and Confirm Password Should be Same.");
    } else if (data.oldPassword == data.newPassword) {
      toast.error("old Password and new Password Should not be Same.");
    } else {
      mutate(data);
    }
  };
  return (
    <main className="flex h-fit  justify-center">
      <section className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <header className="flex justify-between items-center my-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Reset Password
          </h1>
        </header>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="oldPassword"
              className="text-sm font-medium text-zinc-800"
            >
              Old Password
            </label>

            <div className="relative">
              <input
                id="oldPassword"
                type={oldPasswordShow ? "text" : "password"}
                autoComplete="off"
                placeholder="Enter your oldPassword"
                className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("oldPassword", {
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
                onClick={() => setOldPasswordShow((prev) => !prev)}
              >
                <img
                  src={oldPasswordShow ? "/closeEye.svg" : "/openEye.svg"}
                  alt="button"
                  className="scale-70 opacity-50"
                />
              </button>
            </div>

            <p className="min-h-5 text-xs text-red-600">
              {errors.oldPassword?.message}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-zinc-800"
            >
              New Password
            </label>

            <div className="relative">
              <input
                id="newPassword"
                type={newPasswordShow ? "text" : "password"}
                autoComplete="off"
                placeholder="Enter your password"
                className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("newPassword", {
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
                onClick={() => setNewPasswordShow((prev) => !prev)}
              >
                <img
                  src={newPasswordShow ? "/closeEye.svg" : "/openEye.svg"}
                  alt="button"
                  className="scale-70 opacity-50"
                />
              </button>
            </div>

            <p className="min-h-5 text-xs text-red-600">
              {errors.newPassword?.message}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmNewPassword"
              className="text-sm font-medium text-zinc-800"
            >
              Confirm Password
            </label>

            <div className="relative">
              <input
                id="confirmNewPassword"
                type={confirmPasswordShow ? "text" : "password"}
                autoComplete="off"
                placeholder="Enter your password"
                className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("confirmNewPassword", {
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
              {errors.confirmNewPassword?.message}
            </p>
          </div>
          <p className="min-h-5 text-xs text-red-600">{formError}</p>
          {/* Submit */}
          <div className="grid grid-cols-2 gap-4">
            <Link to={"/"}>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-900 transition duration-200 hover:scale-[1.01] hover:bg-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
              >
                Home
              </button>
            </Link>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-50 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
              disabled={isPending}
            >
              {isPending ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ResetPassword;
