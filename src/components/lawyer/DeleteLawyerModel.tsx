import { deleteLawyer } from "@/api/lawyerAPI"
import type { LawyerDataType } from "@/data/lawyerData"
import { queryClient } from "@/main"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const DeleteLawyerModel = (data: LawyerDataType) => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: deleteLawyer,
    onSuccess: () => {
      toast.success("Delete Lawyer Successfully")
      queryClient.invalidateQueries({ queryKey: ["lawyer"] })
      navigate("/lawyer")
    },
    onError: (error) => {
      toast.error(`Error ${error.message}`)
    },
  })
  return (
    <>
      <div className="fixed inset-0 z-70">
        <div className="absolute inset-0 h-screen bg-zinc-900/45"></div>
        <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:p-6">
            <h3 className="text-lg font-bold text-zinc-900">Delete User</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Are you sure you want to delete this User?
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-800">
              {data.user.firstName} {data.user.lastName}
            </p>

            <div className="mt-5 flex gap-2 sm:justify-end">
              <button
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition duration-200 hover:bg-zinc-100"
                onClick={() => {
                  navigate("/lawyer")
                }}
              >
                Cancel
              </button>
              <button
                className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition duration-200 hover:scale-[1.02] hover:bg-rose-100"
                onClick={() => {
                  mutate(data)
                }}
                disabled={isPending}
              >
                {isPending ? "Deleting.." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteLawyerModel
