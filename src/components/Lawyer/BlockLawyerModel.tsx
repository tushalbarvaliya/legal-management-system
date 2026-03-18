import { blockLawyer } from "@/api/lawyerAPI";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { LawyerData } from "./LawyerCard";

type deleteTaskModalProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & LawyerData;

const BlockLawyerModel = (data: deleteTaskModalProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: blockLawyer,
    onSuccess: () => {
      toast.success("Delete Lawyer Successfully");
      queryClient.invalidateQueries({ queryKey: ["lawyer"] });
      data.closeModal(false);
    },
    onError: (error) => {
      {
        toast.error(`Error ${error.message}`);
      }
    },
  });
  return (
    <>
      <div className="fixed inset-0 z-70">
        <div className="absolute inset-0 bg-zinc-900/45 h-screen"></div>
        <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:p-6">
            <h3 className="text-lg font-bold text-zinc-900">Delete Task</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Are you sure you want to delete this task?
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-800">
              {data.firstName} {data.lastName}
            </p>

            <div className="mt-5 flex gap-2 sm:justify-end">
              <button
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition duration-200 hover:bg-zinc-100"
                onClick={() => {
                  data.closeModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="rounded-lg border border-black bg-black px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-stone-100"
                onClick={() => {
                  mutate(data);
                }}
                disabled={isPending}
              >
                {isPending ? "Block.." : "Block"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlockLawyerModel;
