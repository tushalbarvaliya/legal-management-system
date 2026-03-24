import { useMutation } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { deleteClient } from "@/api/clientAPI"
import type { ClientDataType } from "@/data/clientData"
import { queryClient } from "@/main"

const SoftDeleteModel = (data: ClientDataType) => {
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      toast.success(`Client is Delete`)
      queryClient.invalidateQueries({ queryKey: ["client"] })
      navigate("/client")
    },
    onError: (error) => {
      toast.success(`Error ${error}`)
    },
  })
  return (
    <>
      <div className="fixed inset-0 z-70">
        <div className="absolute inset-0 h-screen bg-zinc-900/45"></div>
        <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4">
          <div className="shadow-soft w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
              Delete Client
            </h3>
            <p className="mt-2 text-sm text-zinc-600">
              Are you sure you want to delete this client?
              <span>
                {data.client.id}
              </span>
            </p>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Link to={"/client"}>
                <button
                  type="button"
                  className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition duration-200 hover:bg-zinc-100"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="button"
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-red-400"
                onClick={() => {
                  mutate(data)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SoftDeleteModel
