import { makeItLawyer } from "@/api/adminAPi";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { LawyerData } from "./LawyerCard";

type AddModalProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & LawyerData;

const UpdateLawyerModel = (data: AddModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ specialization: string }>({});

  const { mutate, isPending } = useMutation({
    mutationFn: makeItLawyer,
    onSuccess: () => {
      toast.success("Lawyer updated");
      queryClient.invalidateQueries({ queryKey: ["lawyer"] });
      data.closeModal(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: { specialization: string }) => {
    mutate({ specialization: formData.specialization, userId: data.id });
  };

  return (
    <div className="fixed inset-0 z-70">
      <div className="absolute inset-0 bg-zinc-900/45"></div>

      <div className="relative flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-soft">
          {/* Header */}
          <div className="flex justify-between border-b px-5 py-4">
            <h3 className="text-lg font-semibold">Update Lawyer</h3>
            <button onClick={() => data.closeModal(false)}>
              <img src="/x.svg" className="h-4 w-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Specialization */}
              <div>
                <label className="text-sm font-medium">Specialization *</label>
                <input
                  {...register("specialization", {
                    required: "Required",
                  })}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <p className="text-xs text-red-500">
                  {errors.specialization?.message}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <button
                type="button"
                onClick={() => data.closeModal(false)}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                {isPending ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateLawyerModel;
