import { updateClient } from "@/api/clientAPI";
import { queryClient } from "@/main";
import type { ClientAddData } from "@/types/clientType";
import {
  addressRegex,
  emailRegex,
  nameRegex,
  phoneNumberRegex,
} from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type UpdateClientModelProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & ClientAddData;

const UpdateClientModel = ({ closeModal, ...data }: UpdateClientModelProps) => {
  const { mutate } = useMutation({
    mutationFn: updateClient,
    mutationKey: ["addClient"],
    onSuccess: () => {
      toast.success("Client Updated");
      queryClient.invalidateQueries({ queryKey: ["client"] });
      closeModal(false);
    },
    onError: (error) => {
      toast.error(`Something is Not Right ${error}`);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ClientAddData>({
    mode: "onChange",
    delayError: 500,
    defaultValues: data,
  });
  setValue("isBlocked", false);
  setValue("isDeleted", false);
  const onSubmit = (data: ClientAddData) => {
    // console.log(data);
    mutate(data);
  };

  return (
    <>
      <div className="fixed inset-0 z-70 ">
        <div className="absolute inset-0 bg-zinc-900/45 h-screen"></div>

        <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-2xl rounded-2xl overflow-y-scroll border border-zinc-200 bg-white shadow-soft">
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 sm:px-6">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
                Update Client
              </h3>
              <button
                className="rounded-lg border border-zinc-200 p-2 text-zinc-700 transition duration-200 hover:bg-zinc-100"
                onClick={() => {
                  closeModal(false);
                }}
              >
                <img src="/x.svg" alt="close" className="h-4 w-4" />
              </button>
            </div>
            <form
              className="space-y-4  px-5 py-4 sm:px-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    First Name <span className="text-red-500">*</span>
                  </span>
                  <input
                    id="firstName"
                    type="text"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
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
                  {errors.firstName?.message && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.firstName?.message}
                    </p>
                  )}
                </label>
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    Last Name <span className="text-red-500">*</span>
                  </span>
                  <input
                    id="lastName"
                    type="text"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
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
                  {errors.lastName?.message && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.lastName?.message}
                    </p>
                  )}
                </label>
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    Mobile Number <span className="text-red-500">*</span>
                  </span>
                  <input
                    id="mobile"
                    type="tel"
                    required
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("mobileNumber", {
                      pattern: {
                        value: phoneNumberRegex,
                        message: "Phone number must contain exactly 10 digits.",
                      },
                      required: true,
                    })}
                  />
                  {errors.mobileNumber?.message && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.mobileNumber?.message}
                    </p>
                  )}
                </label>
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">Other Phone Number</span>
                  <input
                    id="otherPhone"
                    type="tel"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("otherNumber", {
                      pattern: {
                        value: phoneNumberRegex,
                        message: "Phone number must contain exactly 10 digits.",
                      },
                    })}
                  />
                  {errors.otherNumber?.message && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.otherNumber?.message}
                    </p>
                  )}
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    Occupation <span className="text-red-500">*</span>
                  </span>
                  <input
                    id="occupation"
                    type="text"
                    required
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("occupation", {
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
                  {errors.occupation?.message && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.occupation?.message}
                    </p>
                  )}
                </label>
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    Gender <span className="text-red-500">*</span>
                  </span>
                  <select
                    id="gender"
                    required
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("gender", {
                      required: {
                        value: true,
                        message: "Please enter Valid Input",
                      },
                    })}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender?.message && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.gender?.message}
                    </p>
                  )}
                </label>
              </div>

              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Address <span className="text-red-500">*</span>
                </span>
                <input
                  id="address"
                  type="text"
                  required
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
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
                    required: true,
                  })}
                />
                {errors.address?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.address?.message}
                  </p>
                )}
              </label>

              <div className="flex flex-col-reverse gap-2 border-t border-zinc-200 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition duration-200 hover:bg-zinc-100"
                  onClick={() => {
                    closeModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800"
                >
                  Update Client
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateClientModel;
