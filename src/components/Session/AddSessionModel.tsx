import { addSession } from "@/api/sessionAPi";
import { queryClient } from "@/main";
import type { SessionData } from "@/types/sessionType";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type AddSessionProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddSessionModel = ({ closeModal }: AddSessionProps) => {
  const { mutate } = useMutation({
    mutationFn: addSession,
    onSuccess: () => {
      toast.success("Session Add");
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      closeModal(false);
    },
    onError:(error)=>{
      toast.error(`Error ${error}`)
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SessionData>({
    mode: "onChange",
    delayError: 500,
  });

  const onSubmit = (data: SessionData) => {
    // console.log(data);
    mutate(data)
  };

  return (
    <div className="fixed inset-0 z-70">
      <div className="absolute inset-0 bg-zinc-900/45"></div>

      <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 sm:px-6">
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
              Create Session
            </h3>

            <button
              className="rounded-lg border border-zinc-200 p-2 text-zinc-700 transition hover:bg-zinc-100"
              onClick={() => closeModal(false)}
            >
              <img src="/x.svg" alt="close" className="h-4 w-4" />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 px-5 py-4 sm:px-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Session Title */}
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Session Title <span className="text-red-500">*</span>
                </span>

                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("title", {
                    required: "Session title is required",
                    minLength: {
                      value: 5,
                      message: "Minimum 5 characters required",
                    },
                  })}
                />
                {errors.title?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.title?.message}
                  </p>
                )}
              </label>

              {/* Client ID */}
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Client Name <span className="text-red-500">*</span>
                </span>
                <select
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("clientId", {
                    required: "Client ID is required",
                  })}
                >
                  <option value="">Select Client</option>
                  <option value="8465">Tushal Barvaliya</option>
                  <option value="685461">Ketul Suthar</option>
                  <option value="6843231">Arjun Patel</option>
                </select>
                {errors.clientId?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.clientId?.message}
                  </p>
                )}
              </label>
            </div>

            {/* Case ID */}
            <label className="space-y-1.5 text-sm text-zinc-700">
              <span className="font-medium">
                Case <span className="text-red-500">*</span>
              </span>
              <select
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("caseId", {
                  required: "Case ID is required",
                })}
              >
                <option value="">Select Client</option>
                <option value="123">Tushal Barvaliya</option>
                <option value="123433">Ketul Suthar</option>
                <option value="1234">Arjun Patel</option>
              </select>
              {errors.caseId?.message && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.caseId?.message}
                </p>
              )}
            </label>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Date */}
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Date <span className="text-red-500">*</span>
                </span>

                <input
                  type="date"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("sessionDate", {
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
                {errors.sessionDate?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.sessionDate?.message}
                  </p>
                )}
              </label>

              {/* Time */}
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Time <span className="text-red-500">*</span>
                </span>

                <input
                  type="time"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("sessionTime", {
                    required: "Time is required",
                  })}
                />
                {errors.sessionTime?.message && (
                  <p className="min-h-5 text-xs text-red-600">
                    {errors.sessionTime?.message}
                  </p>
                )}
              </label>
            </div>

            {/* Location */}
            <label className="space-y-1.5 text-sm text-zinc-700">
              <span className="font-medium">
                Location <span className="text-red-500">*</span>
              </span>

              <input
                type="text"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("sessionLocation", {
                  required: "Location is required",
                  minLength: {
                    value: 20,
                    message: "Location should be minimum 20 letter long",
                  },
                })}
              />
              {errors.sessionLocation?.message && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.sessionLocation?.message}
                </p>
              )}
            </label>

            {/* court Name */}
            <label className="space-y-1.5 text-sm text-zinc-700">
              <span className="font-medium">
                Court Name <span className="text-red-500">*</span>
              </span>

              <input
                type="text"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("courtName", {
                  required: "Location is required",
                  minLength: {
                    value: 5,
                    message: "Location should be minimum 20 letter long",
                  },
                })}
              />
              {errors.courtName?.message && (
                <p className="min-h-5 text-xs text-red-600">
                  {errors.courtName?.message}
                </p>
              )}
            </label>

            {/* Notes */}
            <label className="space-y-1.5 text-sm text-zinc-700">
              <span className="font-medium">Notes</span>

              <textarea
                rows={4}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                {...register("note")}
              ></textarea>
            </label>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-2 border-t border-zinc-200 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                onClick={() => closeModal(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 hover:scale-[1.02]"
              >
                Create Session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSessionModel;
