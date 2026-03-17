import { deletePermanentClient } from "@/api/clientAPI";
import { queryClient } from "@/main";
import type { ClientProps } from "@/types/clientType";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type deleteClientModel = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & ClientProps;
const DeleteClientModel = (data: deleteClientModel) => {
  const { mutate } = useMutation({
    mutationFn: deletePermanentClient,
    onSuccess: () => {
      toast.success(`Client is Delete`);
      queryClient.invalidateQueries({ queryKey: ["client"] });
      data.closeModal(false);
    },
    onError: (error) => {
      toast.success(`Error ${error}`);
    },
  });
  return (
    <>
      <div className="fixed inset-0 z-70">
        <div className="absolute inset-0 bg-zinc-900/45 h-screen"></div>
        <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft sm:p-6">
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
              Delete Client
            </h3>
            <p className="mt-2 text-sm text-zinc-600">
              Are you sure you want to delete this client?
              <p>
                {data.firstName} {data.lastName}
              </p>
            </p>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition duration-200 hover:bg-zinc-100"
                onClick={() => {
                  data.closeModal(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-red-400"
                onClick={() => {
                  mutate(data);
                }}
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

export default DeleteClientModel;
