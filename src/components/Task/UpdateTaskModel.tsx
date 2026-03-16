import type { TaskData } from "@/types/taskType";
import { useForm } from "react-hook-form";

type UpdateTaskProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & TaskData;

const UpdateTaskModel = (data: UpdateTaskProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskData>({
    mode: "onChange",
    delayError: 500,
    defaultValues: {
      ...data,
      dueDate: new Date(data.dueDate).toISOString().split("T")[0],
    },
  });

  const onSubmit = (data: TaskData) => {
    console.log(data);
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
            <h3 className="text-xl font-bold text-zinc-900">Update Task</h3>
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
            className="space-y-4 text-sm text-zinc-700"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="block mb-1 font-medium text-zinc-700">
                Title
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Please Enter This value",
                  },
                })}
              />
              {errors.title?.message && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium text-zinc-700">
                Description
              </label>
              <textarea
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                rows={4}
                {...register("description", {
                  required: {
                    value: true,
                    message: "Please Enter This value",
                  },
                })}
              />
              {errors.description?.message && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block mb-1 font-medium text-zinc-700">
                  Priority
                </label>
                <select
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  {...register("priority", {
                    required: {
                      value: true,
                      message: "Please Enter A Value",
                    },
                  })}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errors.priority?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.priority.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium text-zinc-700">
                  Assign To
                </label>
                <select
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  {...register("assignTo", {
                    required: {
                      value: true,
                      message: "Please Enter This value",
                    },
                  })}
                >
                  <option value="">Select Staff</option>
                  <option value="tushal">Tushal Barvaliya</option>
                  <option value="ketul">Ketul Suthar</option>
                  <option value="arjun">Arjun Patel</option>
                </select>
                {errors.assignTo?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.assignTo.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-1 font-medium text-zinc-700">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  {...register("dueDate", {
                    required: "Please enter a date",
                    validate: (value) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);

                      const selectedDate = new Date(value);
                      selectedDate.setHours(0, 0, 0, 0);

                      return (
                        selectedDate >= today ||
                        "Please enter a valid future or today's date"
                      );
                    },
                  })}
                />
                {errors.dueDate?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.dueDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  data.closeModal(false);
                }}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800"
              >
                Update Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateTaskModel;
