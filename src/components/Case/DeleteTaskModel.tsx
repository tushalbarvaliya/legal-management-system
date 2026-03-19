import { softDeleteCase } from "@/api/caseAPI";
import { queryClient } from "@/main";
import type { CaseData } from "@/types/caseType";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type deleteTaskModalProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & CaseData;

const DeleteCaseModel = (data: deleteTaskModalProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: softDeleteCase,
    onSuccess: () => {
      toast.success("Delete Successfully");
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      data.closeModal(false);
    },
    onError: (error) => {
      toast.error(`Error ${error}`);
    },
  });
  return (
    <>
      <div className="fixed inset-0 z-70">
        <div className="absolute inset-0 bg-zinc-900/45 h-screen"></div>
        <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:p-6">
            <h3 className="text-lg font-bold text-zinc-900">Delete Case</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Are you sure you want to delete this Case?
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-800">
              {data.caseTitle}
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
                className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition duration-200 hover:scale-[1.02] hover:bg-rose-100"
                onClick={() => {
                  mutate(data);
                }}
                disabled={isPending}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCaseModel;
