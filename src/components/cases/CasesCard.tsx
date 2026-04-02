import { MoreVertical } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/hooks/hooks"
import { formatDate } from "@/utils/formate"
import type { Case } from "@/types/caseType"
import CaseDetailModel from "./CaseDetailModel"
import { Dialog } from "../ui/dialog"
import DeleteModel from "../DeleteModel"
import UpdateCase from "./UpdateCase"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useDeleteCaseMutation } from "@/store/services/caseAPI"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const CasesCard = ({ data }: { data: Case }) => {
  const role = useAppSelector((state) => state.auth.role)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openView, setOpenView] = useState<boolean>(false)

  const [deleteCase, { isLoading: DeleteIsPending }] = useDeleteCaseMutation()

  const handelDelete = async (_: number) => {
    try {
      await deleteCase(data.id).unwrap()
      toast.success("Delete Successfully")
      setOpenDelete(false)
    } catch {
      toast.error(`Deletion Failed`)
    }
  }

  return (
    <>
      {openDelete && (
        <Dialog open={openDelete} onOpenChange={() => setOpenDelete(false)}>
          <DeleteModel
            title="Delete Case"
            subTitle="Are you sure you want to delete this case?"
            detailsTitle={`${data.title}`}
            id={data.id}
            isPending={DeleteIsPending}
            mutate={handelDelete}
            setOpenDelete={setOpenDelete}
          />
        </Dialog>
      )}
      {openView && (
        <Dialog open={openView} onOpenChange={() => setOpenView(false)}>
          <CaseDetailModel data={data} setOpenView={setOpenView} />
        </Dialog>
      )}
      {openEdit && (
        <Dialog open={openEdit} onOpenChange={() => setOpenEdit(false)}>
          <UpdateCase data={data} setOpenAdd={setOpenEdit} />
        </Dialog>
      )}

      {/* TASK CARD */}
      <article className="group hover:shadow-soft relative cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 shadow-sm transition duration-200 hover:bg-zinc-100/80">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-pointer truncate text-sm font-semibold text-zinc-900">
                  {data.title}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{data.description}</p>
              </TooltipContent>
            </Tooltip>

            {/* INFO GRID */}
            <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-zinc-600 sm:grid-cols-2 lg:grid-cols-4">
              <p>
                <span className="font-semibold text-zinc-700">Created:</span>{" "}
                {formatDate(data.createdAt)}
              </p>

              <p>
                <span className="font-semibold text-zinc-700">Priority:</span>
                <span
                  className={`ml-1 inline-flex rounded-full px-2 py-0.5 font-medium`}
                >
                  {data.caseStage}
                </span>
              </p>

              <p>
                <span className="font-semibold text-zinc-700">
                  Client Name :
                </span>{" "}
                {data.clientId}
              </p>
              <p>
                <span className="font-semibold text-zinc-700">
                  Case Type :{" "}
                </span>{" "}
                {data.type}
              </p>
            </div>
          </div>

          {/* MENU DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => {
                  setOpenView(true)
                }}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpenEdit(true)
                }}
              >
                Edit
              </DropdownMenuItem>
              {role == "lawyer" && (
                <>
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => {
                      setOpenDelete(true)
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </article>
    </>
  )
}

export default CasesCard
