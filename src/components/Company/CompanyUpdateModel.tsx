import type { CompanyData } from "@/pages/CompanyPage";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { emailRegex, phoneNumberRegex } from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { toast } from "sonner";
import { queryClient } from "@/main";

type UpdateTaskProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & CompanyData;

const CompanyUpdateModel = (data: UpdateTaskProps) => {
  const { mutate } = useMutation({
    mutationFn: async (data: CompanyData) => {
      const response = await axiosInstance.patch("/companies/company/1", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Updated Successful");
      queryClient.invalidateQueries({ queryKey: ["company"] });
      data.closeModal(false);
    },
    onError: (error) => {
      toast.error(`Error ${error}`);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyData>({
    mode: "onChange",
    delayError: 500,
    defaultValues: {
      ...data,
      createdAt: data?.createdAt
        ? new Date(data.createdAt).toISOString().split("T")[0]
        : "",
    },
  });

  const onSubmit = (data: CompanyData) => {
    // console.log(data);
    mutate(data);
  };
  return (
    <>
      <div
        className="fixed inset-0 z-9999 flex items-center justify-center"
        onClick={() => {
          data.closeModal(false);
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm h-screen"></div>

        {/* Modal */}
        <div
          className="relative mx-auto w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:p-6 "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-zinc-900">
              Update Company Profile
            </h3>
            <button
              onClick={() => {
                data.closeModal(false);
              }}
              className="rounded-lg border border-zinc-200 p-2 text-zinc-600 transition duration-200 hover:bg-zinc-100"
            >
              <img src="/x.svg" alt="x" className="h-4 w-4" />
            </button>
          </div>

          <form
            className="space-y-4 text-sm text-zinc-700 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-2">
              <label className="block  font-medium text-zinc-700">Name :</label>
              <input
                type="text"
                className="flex-1 rounded-xl border-2 border-zinc-900 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-600"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Please Enter This value",
                  },
                  minLength: {
                    value: 3,
                    message: "Name should contain Minimum 3 letter",
                  },
                })}
              />
              {errors.name?.message && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <label className="block  font-medium text-zinc-700">
                Address :
              </label>
              <input
                type="text"
                className="flex-1 rounded-xl border-2 border-zinc-900 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-600"
                {...register("Address", {
                  required: {
                    value: true,
                    message: "Please Enter This value",
                  },
                })}
              />
              {errors.Address?.message && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.Address.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 sm:col-span-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-800"
              >
                Email :
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="off"
                className="flex-1 rounded-xl border-2 border-zinc-900 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-600"
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
            <div className="flex items-center">
              <label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-zinc-800"
              >
                Phone Number :
              </label>
              <input
                id="phoneNumber"
                type="text"
                autoComplete="off"
                placeholder={"1234567890"}
                className="flex-1 rounded-xl border-2 border-zinc-900 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-600 ml-2"
                {...register("phoneNumber", {
                  pattern: {
                    value: phoneNumberRegex,
                    message: "Phone number must contain exactly 10 digits.",
                  },
                  required: true,
                })}
              />
              {errors.phoneNumber && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.phoneNumber?.message}
                </p>
              )}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                type="button"
                onClick={() => {
                  data.closeModal(false);
                }}
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button type="submit">Update Profile</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompanyUpdateModel;
