import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { downloadBase64File } from "@/utils/downloadBase64File"
import type { DocumentResponse } from "@/types/docsType"

interface Props {
  data: DocumentResponse
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DocsDetailsModal = ({ data, setOpen }: Props) => {
  return (
    <DialogContent className="max-w-3xl lg:min-w-200">
      <DialogHeader>
        <DialogTitle>Document Details</DialogTitle>
      </DialogHeader>

      <div className="space-y-4 text-sm text-zinc-700">
        {/* Title + Case ID */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="font-medium text-zinc-900">Title</p>
            <p>{data.document.title}</p>
          </div>

          <div>
            <p className="font-medium text-zinc-900">Case </p>
            <p>{data.case.title}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="font-medium text-zinc-900">Description</p>
          <p className="whitespace-pre-wrap">{data.document.description}</p>
        </div>

        {/* File Link + Type */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex gap-4 items-center">
            <p className="font-medium text-zinc-900">File Link</p>
            <Button
              variant="link"
              className="px-0 outline-0 border-0 cursor-pointer"
              onClick={() =>
                downloadBase64File(
                  data.document.documentLink,
                  data.document.title || "document",
                  data.document.fileType
                )
              }
            >
              Download
            </Button>
          </div>
        </div>

        {/* Notes + Client ID */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="font-medium text-zinc-900">Notes</p>
            <p className="whitespace-pre-wrap">{data.document.notes || "—"}</p>
          </div>
          <div>
            <p className="font-medium text-zinc-900">Client ID</p>
            <p>{data.document.clientId || "—"}</p>
          </div>
        </div>
      </div>

      <DialogFooter className="pt-4">
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default DocsDetailsModal
