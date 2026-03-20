import { getAllUser } from "@/api/adminAPi";
import { addCase } from "@/api/caseAPI";
import type { caseDataType } from "@/Data/caseData";
import { queryClient } from "@/main";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCaseModel = (data: Props) => {
  const { mutate, isPending } = useMutation({
    mutationFn: addCase,
    onSuccess: () => {
      toast.success("Case Add Successfully");
      queryClient.invalidateQueries({ queryKey: ["cases"] });
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
  } = useForm<caseDataType>({
    mode: "onChange",
    delayError: 500,
  });
  const { data: userData } = useQuery({
    queryFn: getAllUser,
    queryKey: ["users"],
  });

  const onSubmit = (formData: caseDataType) => {
    mutate(formData);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-9999 flex items-center justify-center"
        onClick={() => data.closeModal(false)}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        {/* Modal */}
        <div
          className="relative mx-auto w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-zinc-900">Add New Case</h3>
            <button
              onClick={() => data.closeModal(false)}
              className="rounded-lg border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-100"
            >
              <img src="/x.svg" alt="x" className="h-4 w-4" />
            </button>
          </div>

          {/* Form */}
          <form
            className="space-y-4 text-sm text-zinc-700"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Case Title */}
            <div>
              <label className="block mb-1 font-medium text-zinc-700">
                Case Title
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Please enter case title",
                  },
                  minLength: {
                    value: 3,
                    message: "Minimum 5 characters required",
                  },
                })}
              />
              {errors.title?.message && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium text-zinc-700">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Please enter description",
                  },
                  minLength: {
                    value: 3,
                    message: "Minimum 10 characters required",
                  },
                })}
              />
              {errors.description?.message && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Grid Fields */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Case Type */}
              <div>
                <label className="block mb-1 font-medium text-zinc-700">
                  Case Type
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  {...register("type", {
                    required: {
                      value: true,
                      message: "Please enter case type",
                    },
                  })}
                />
                {errors.type?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.type.message}
                  </p>
                )}
              </div>

              {/* Priority */}
              <div>
                <label className="block mb-1 font-medium text-zinc-700">
                  Priority
                </label>
                <select
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  {...register("caseStage", {
                    required: {
                      value: true,
                      message: "Please select priority",
                    },
                  })}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errors.caseStage?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.caseStage.message}
                  </p>
                )}
              </div>

              {/* Client ID */}
              <div>
                <label className="block mb-1 font-medium text-zinc-700">
                  Client ID
                </label>
                <select
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  {...register("clientId", {
                    required: {
                      value: true,
                      message: "Please enter client ID",
                    },
                  })}
                >
                  {userData?.map(
                    (item: {
                      id: string;
                      firstName: string;
                      lastName: string;
                    }) => (
                      <option value={item.id} key={item.id}>
                        {item.firstName} {item.lastName}
                      </option>
                    ),
                  )}
                </select>
                {errors.clientId?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.clientId.message}
                  </p>
                )}
              </div>

              {/* Client Name */}
              <div>
                <label className="block mb-1 font-medium text-zinc-700">
                  Client Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  {...register("caseCity", {
                    required: {
                      value: true,
                      message: "Please enter client name",
                    },
                  })}
                />
                {errors.clientId?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.clientId.message}
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => data.closeModal(false)}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:scale-[1.02] hover:bg-zinc-800"
              >
                {isPending ? "Adding..." : "Add Case"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCaseModel;
