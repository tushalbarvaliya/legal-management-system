import { profileUpdate } from "@/api/authAPI";
import { getProfile } from "@/api/userAPI";
import ErrorMessage from "@/components/ErrorMessage";
import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import { queryClient } from "@/main";
import type { SignUpFormState } from "@/types/formType";
import {
  addressRegex,
  emailRegex,
  nameRegex,
  phoneNumberRegex,
  pinCodeRegex,
} from "@/utils/constant";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";

const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { mutate, isPending: ButtonisPendding } = useMutation({
    mutationFn: profileUpdate,
    onSuccess: () => {
      toast.success("Profile Update Successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setIsEdit(false);
    },
    onError: (error) => {
      toast.error(`Error ${error}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormState>({
    mode: "onChange",
    delayError: 500,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const onSubmit = (data: SignUpFormState) => {
    mutate(data);
  };

  return (
    <>
      {isError && <ErrorMessage message={error.message}></ErrorMessage>}
      {isLoading && <ProfileSkeleton />}
      {!isLoading && !isError && (
        <main className="flex  items-center justify-center p-4 sm:p-6">
          <section className="w-full max-w-4xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <header className="flex justify-between items-center my-4">
              <div className="flex">
                <div className="group grid h-14 w-14 place-items-center rounded-xl border border-zinc-300 bg-zinc-900 text-xl font-semibold text-zinc-100 transition duration-200 hover:scale-105 hover:bg-zinc-800">
                  <span className="transition-transform duration-200 group-hover:scale-110 uppercase">
                    {data?.firstName[0]}
                    {data?.lastName[0]}
                  </span>
                </div>
                <div className=" mx-2">
                  <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
                    My Profile
                  </h1>
                  <p className="text-sm text-zinc-500">{data?.username}</p>
                </div>
              </div>
              <Link to={"/reset-password"}>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-50 transition duration-200 hover:scale-[1.01] hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
                >
                  Reset Password
                </button>
              </Link>
            </header>

            <form id="signupForm" noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    defaultValue={data?.firstName}
                    disabled={!isEdit}
                    className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("firstName", {
                      minLength: {
                        value: 3,
                        message: "First name length should be greater than 3 ",
                      },
                      pattern: {
                        value: nameRegex,
                        message:
                          "Only letters are allowed. No numbers, spaces, or special characters.",
                      },
                      required: true,
                    })}
                  />
                  <p className="min-h-5 text-xs text-red-600">
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
                    defaultValue={data?.lastName}
                    disabled={!isEdit}
                    className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("lastName", {
                      minLength: {
                        value: 3,
                        message: "Last name length should be greater than 3 ",
                      },
                      pattern: {
                        value: nameRegex,
                        message:
                          "Only letters are allowed. No numbers, spaces, or special characters.",
                      },
                      required: true,
                    })}
                  />
                  <p className="min-h-5 text-xs text-red-600">
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
                    defaultValue={data?.email}
                    disabled={true}
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
                    defaultValue={data?.address.split("$")[0]}
                    disabled={!isEdit}
                    className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("address", {
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters required.",
                      },
                      maxLength: {
                        value: 20,
                        message: "Maximum 20 characters allowed.",
                      },
                      pattern: {
                        value: addressRegex,
                        message:
                          "Only letters, numbers, and spaces are allowed.",
                      },
                      required: true,
                    })}
                  />
                  <p className="min-h-5 text-xs text-red-600">
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
                    defaultValue={data.pinCode}
                    disabled={!isEdit}
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
                      maxLength: {
                        value: 6,
                        message: "pin must be length of 6 digit",
                      },
                      required: true,
                    })}
                  />
                  <p className="min-h-5 text-xs text-red-600">
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
                    defaultValue={data?.phoneNumber}
                    disabled={!isEdit}
                    className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("phoneNumber", {
                      pattern: {
                        value: phoneNumberRegex,
                        message: "Phone number must contain exactly 10 digits.",
                      },
                      required: true,
                    })}
                  />
                  <p className="min-h-5 text-xs text-red-600">
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
                    defaultValue={data?.state}
                    disabled={!isEdit}
                    className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("state", {
                      minLength: {
                        value: 3,
                        message: "State name length should be greater than 3 ",
                      },
                      pattern: {
                        value: addressRegex,
                        message:
                          "Only letters, numbers, and spaces are allowed.",
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
                    defaultValue={data?.city}
                    disabled={!isEdit}
                    className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("city", {
                      minLength: {
                        value: 3,
                        message: "City name length should be greater than 3 ",
                      },
                      pattern: {
                        value: addressRegex,
                        message:
                          "Only letters, numbers, and spaces are allowed.",
                      },
                      required: true,
                    })}
                  />
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.city?.message}
                  </p>
                </div>
              </div>
              {/* formError */}
              <p className="min-h-5 text-xs text-red-600">{}</p>
              {!isEdit && (
                <>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-50 transition duration-200 hover:scale-[1.01] hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
                    onClick={() => {
                      setIsEdit((prev) => !prev);
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
              {isEdit && (
                <div className="flex gap-4">
                  <Link to={"/"} className="w-full">
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md bg-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-900 transition duration-200 hover:scale-[1.01] hover:bg-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
                      onClick={() => {
                        setIsEdit((prev) => !prev);
                      }}
                    >
                      close
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-50 transition duration-200 hover:scale-[1.01] hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
                    disabled={ButtonisPendding}
                  >
                    {ButtonisPendding ? "Editing..." : "Edit"}
                  </button>
                </div>
              )}
            </form>
          </section>
        </main>
      )}
    </>
  );
};

export default ProfilePage;
