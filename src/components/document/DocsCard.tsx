import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreVertical } from "lucide-react"
import { useState } from "react"
// import UpdateDocsModel from "./UpdateDocsModel"
// import DeleteDocsModel from "./DeleteDocsModel"
import { Link } from "react-router"
// import DocsDetailsModal from "./DocsDetailsModal"
import { downloadBase64File } from "@/utils/downloadBase64File"
import type { docsDataType } from "@/data/docsData"

const DocsCard = (items: docsDataType) => {
  const [updateModel, setUpdateModel] = useState(false)
  const [deleteModel, setDeleteModel] = useState(false)
  const [detailsModel, setDetailsModel] = useState(false)
  return (
    <>
      {/* {updateModel && (
        <UpdateDocsModel {...items} closeModal={setUpdateModel} />
      )}
      {deleteModel && (
        <DeleteDocsModel {...items} closeModal={setDeleteModel} />
      )}
      {detailsModel && (
        <DocsDetailsModal {...items} closeModal={setDetailsModel} />
      )} */}
      <div className="flex w-full rounded-xl border p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-100/80">
        {/* Left Content */}
        <div className="flex-1">
          <div className="flex items-start gap-3">
            {/* Title + Tooltip */}
            <div className="group relative w-fit">
              <Link to={items.documentLink}>
                <h2 className="cursor-pointer truncate text-sm font-semibold text-zinc-900">
                  {items.title}
                </h2>
              </Link>

              {/* Tooltip */}
              <div className="absolute top-full left-0 z-10 mt-2 hidden w-64 translate-y-1 rounded-lg bg-zinc-900/95 p-3 text-xs text-zinc-100 opacity-0 shadow-lg transition-all duration-200 group-hover:block group-hover:translate-y-0 group-hover:opacity-100">
                {items.description}
              </div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="mt-2 mr-40 flex justify-between text-[10px] text-zinc-600">
            <p>
              File:{" "}
              <span className="ml-1 inline-flex rounded-full bg-blue-100 px-2 py-0.5 font-medium capitalize">
                {items.fileType}
              </span>
            </p>
            <p>
              Case ID:{" "}
              <span className="ml-1 inline-flex rounded-full bg-blue-100 px-2 py-0.5 font-medium capitalize">
                {items.caseId}
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
                  setDetailsModel(true)
                }}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setUpdateModel(true)
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  setDeleteModel(true)
                }}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  downloadBase64File(
                    items.documentLink,
                    "invoice",
                    items.fileType
                  )
                }
              >
                Download
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  )
}

export default DocsCard
