import { getAllUser, makeItLawyer } from "@/api/adminAPi";
import type { userData } from "@/api/lawyerAPI";
import { queryClient } from "@/main";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type AddModalProps = {
  onClose: (b: boolean) => void;
};

export type AddLawyerFormData = {
  specialization: string;
  userId: string;
};

const AddLawyerModel = ({ onClose }: AddModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddLawyerFormData>({
    mode: "onChange",
    delayError: 500,
  });

  const { data: userData } = useQuery<userData[]>({
    queryFn: getAllUser,
    queryKey: ["user"],
  });
  const { mutate, isPending } = useMutation({
    mutationFn: makeItLawyer,
    onSuccess: () => {
      toast.success("User Become Lawyer");
      queryClient.invalidateQueries({ queryKey: ["lawyer"] });
      onClose(false);
    },
    onError: (error) => {
      toast.error(`Error ${error.message}`);
    },
  });

  const onSubmit = (data: AddLawyerFormData) => {
    // console.log(data);
    mutate(data);
  };

  return (
    <>
      <div className="fixed inset-0 z-70 ">
        <div className="absolute inset-0 bg-zinc-900/45"></div>
        <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white shadow-soft">
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 sm:px-6">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
                Create Document
              </h3>
              <button
                className="rounded-lg border border-zinc-200 p-2 text-zinc-700 transition duration-200 hover:bg-zinc-100"
                type="button"
                onClick={() => {
                  onClose(false);
                }}
              >
                <img src="/x.svg" alt="x" className="h-4 w-4" />
              </button>
            </div>
            <form
              className="max-h-[85vh] space-y-4 overflow-y-auto px-5 py-4 sm:px-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    specialization <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("specialization", {
                      minLength: {
                        value: 3,
                        message: "Title length should be greater than 10 ",
                      },
                      required: true,
                    })}
                  />
                  <p className="text-xs text-red-500">
                    {errors.specialization?.message}
                  </p>
                </label>
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    Client Name <span className="text-red-500">*</span>
                  </span>
                  <select
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("userId", {
                      required: "Client name is required",
                    })}
                  >
                    <option value="">Select User</option>
                    {userData?.map((item) =>
                      item.role != "lawyer" ? (
                        <option value={item.id} key={item.id}>
                          {item.firstName}
                          {item.lastName}
                        </option>
                      ) : (
                        ""
                      ),
                    )}
                  </select>
                  {errors.userId?.message && (
                    <p className="min-h-5 text-xs text-red-600">
                      {errors.userId?.message}
                    </p>
                  )}
                </label>
              </div>

              <div className="flex flex-col-reverse gap-2 border-t border-zinc-200 pt-4 sm:flex-row sm:justify-end">
                {!isPending && (
                  <>
                    <button
                      type="button"
                      className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition duration-200 hover:bg-zinc-100"
                      onClick={() => {
                        onClose(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800"
                    >
                      Create Document
                    </button>
                  </>
                )}
                {isPending && (
                  <>
                    <button
                      type="submit"
                      className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800"
                      disabled={isPending}
                    >
                      Create...
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLawyerModel;
