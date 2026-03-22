import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { MoreVertical } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import { putBlockClient } from "@/api/clientAPI"
import { queryClient } from "@/main"
import type { ClineDataType } from "@/data/clientData"
import { useAppSelector } from "@/hooks/hooks"
import SoftDeleteModel from "./SoftDeleteModel"
import ClientDetailsModel from "./ClientDetailsModel"
import UpdateClientModel from "./UpdateClientModel"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

const ClientCard = (data: ClineDataType) => {
  const role = useAppSelector((state) => state.auth.role)
  const pathname = useLocation().pathname
  const navigate = useNavigate()

  const { mutate: blockMutation } = useMutation({
    mutationFn: putBlockClient,
    onSuccess: () => {
      toast.success("client Block Successfully")
      queryClient.invalidateQueries({ queryKey: ["client"] })
    },
    onError: (error) => {
      toast.error(`Client Block Error ${error}`)
    },
  })

  return (
    <>
      {pathname === `/client/${data.id}` && <ClientDetailsModel {...data} />}
      {pathname === `/client/edit/${data.id}` && (
        <UpdateClientModel {...data} />
      )}
      {pathname === `/client/delete/${data.id}` && (
        <SoftDeleteModel {...data} />
      )}

      <article
        className={`group hover:shadow-soft relative rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-100/80 sm:p-5`}
      >
        <div
          className={`flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between`}
        >
          <div className="flex min-w-0 gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-xs font-semibold text-zinc-700">
              {/* {data.firstName[0]} */}
              {/* {data.lastName[0]} */}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold text-zinc-900">
                  {/* {data.firstName} {data.lastName} */}
                </h3>
                {data.isBlocked == "\u0001" && (
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-black">
                    {data.isBlocked ? "Block" : ""}
                  </span>
                )}
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-zinc-700 sm:grid-cols-2">
                <p>
                  <span className="font-medium text-zinc-500">Mobile :</span>{" "}
                  {/* {data.mobileNumber} */}
                </p>
                <p>
                  <span className="font-medium text-zinc-500">
                    Occupation :
                  </span>{" "}
                  {data.occupation}
                </p>
              </div>
            </div>
          </div>
          {/* menu */}
          {role == "lawyer" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4 text-black" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/client/${data.id}`)
                  }}
                >
                  View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/client/edit/${data.id}`)
                  }}
                >
                  Edit
                </DropdownMenuItem>
                {!(data.isDeleted == "\u0001") && (
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/client/delete/${data.id}`)
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                )}
                {!(data.isBlocked == "\u0001") && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      blockMutation(data.id)
                    }}
                  >
                    Block
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </article>
    </>
  )
}

export default ClientCard
