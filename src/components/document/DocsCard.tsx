import { MoreVertical } from "lucide-react"
import { Link } from "react-router"
import { toast } from "sonner"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import type { CaseDocumentItem } from "@/types/docsType"
import { Button } from "../ui/button"
import { downloadBase64File } from "@/utils/downloadBase64File"
import DocsDetailsModal from "./DocsDetailsModal"
import UpdateDocsModel from "./UpdateDocsModel"
import { Dialog } from "../ui/dialog"
import DeleteModel from "../DeleteModel"
import { deleteDocs } from "@/api/docsAPI"
import { queryClient } from "@/main"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DocsCard = ({ docs: items }: { docs: CaseDocumentItem }) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [openView, setOpenView] = useState<boolean>(false)

  const { mutate: DeleteMutate, isPending: DeleteIsPending } = useMutation({
    mutationFn: deleteDocs,
    onSuccess: () => {
      toast.success("Docs Delete successfully")
      queryClient.invalidateQueries({ queryKey: ["docs"] })
      setOpenDelete(false)
    },
    onError: (error) => {
      toast.error(`Error ${error.message}`)
    },
  })
  return (
    <Dialog
      open={openEdit || openDelete || openView}
      onOpenChange={(open) => {
        if (!open) {
          setOpenEdit(false)
          setOpenDelete(false)
          setOpenView(false)
        }
      }}
    >
      {openEdit && <UpdateDocsModel data={items} setOpen={setOpenEdit} />}
      {openView && <DocsDetailsModal data={items} setOpen={setOpenView}/>}
      {openDelete && (
        <DeleteModel
          title="Delete Document"
          subTitle="Are you sure you want to delete this docs?"
          detailsTitle={`${items.document.title}`}
          id={items.document.id}
          isPending={DeleteIsPending}
          mutate={DeleteMutate}
          setOpenDelete={setOpenDelete}
        />
      )}
      <div className="flex w-full rounded-xl border p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-100/80">
        {/* Left Content */}
        <div className="flex-1">
          <div className="flex items-start gap-3">
            {/* Title + Tooltip */}
            <div className="group relative w-fit">
              <Link to={items.document.documentLink}>
                <h2 className="cursor-pointer truncate text-sm font-semibold text-zinc-900">
                  {items.document.title}
                </h2>
              </Link>

              {/* Tooltip */}
              <div className="absolute top-full left-0 z-10 mt-2 hidden w-64 translate-y-1 rounded-lg bg-zinc-900/95 p-3 text-xs text-zinc-100 opacity-0 shadow-lg transition-all duration-200 group-hover:block group-hover:translate-y-0 group-hover:opacity-100">
                {items.document.description}
              </div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="mt-2 mr-40 flex justify-between text-[10px] text-zinc-600">
            <p>
              File:{" "}
              <span className="ml-1 inline-flex rounded-full bg-blue-100 px-2 py-0.5 font-medium capitalize">
                {items.document.fileType}
              </span>
            </p>
            <p>
              Case Number:{" "}
              <span className="ml-1 inline-flex rounded-full bg-blue-100 px-2 py-0.5 font-medium capitalize">
                {items.case.caseNumber}
              </span>
            </p>
            <p>
              Case Stage:{" "}
              <span className="ml-1 inline-flex rounded-full bg-blue-100 px-2 py-0.5 font-medium capitalize">
                {items.case.caseStage}
              </span>
            </p>
            <p>
              Case :{" "}
              <span className="ml-1 inline-flex rounded-full bg-blue-100 px-2 py-0.5 font-medium capitalize">
                {items.case.title}
              </span>
            </p>
          </div>
        </div>

        {/*right Menu */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40 font-medium">
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
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  setOpenDelete(true)
                }}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  downloadBase64File(
                    items.document.documentLink,
                    "invoice",
                    items.document.fileType
                  )
                }
              >
                Download
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Dialog>
  )
}

export default DocsCard
