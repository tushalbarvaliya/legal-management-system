import { useNavigate } from "react-router-dom"

import { Button } from "../ui/button"
import type { docsDataType } from "@/data/docsData"
import { X } from "lucide-react"
import { downloadBase64File } from "@/utils/downloadBase64File"

const DocsDetailsModal = (data: docsDataType) => {
  const navigate = useNavigate()
  return (
    <div className="fixed inset-0 z-70">
      {/* Overlay */}
      <div className="absolute inset-0 h-screen bg-zinc-900/45"></div>

      {/* Modal */}
      <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4 sm:p-6">
        <div className="shadow-soft w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 sm:px-6">
            <h3 className="text-lg font-semibold text-zinc-900">
              Document Details
            </h3>
            <button
              className="rounded-lg border border-zinc-200 p-2 hover:bg-zinc-100"
              onClick={() => navigate("/docs")}
            >
              <X />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[85vh] space-y-4 overflow-y-auto px-5 py-4 text-sm text-zinc-700 sm:px-6">
            {/* Title + Case ID */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="font-medium text-zinc-900">Title</p>
                <p>{data.title}</p>
              </div>

              <div>
                <p className="font-medium text-zinc-900">Case ID</p>
                <p>{data.caseId}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="font-medium text-zinc-900">Description</p>
              <p className="whitespace-pre-wrap">{data.description}</p>
            </div>

            {/* File Link + Type */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="font-medium text-zinc-900">File Link</p>
                <button
                  className="text-blue-700 hover:underline"
                  onClick={() =>
                    downloadBase64File(
                      data.documentLink,
                      "invoice",
                      data.fileType
                    )
                  }
                >
                  Download
                </button>
              </div>

              <div>
                <p className="font-medium text-zinc-900">File Type</p>
                <p>{data.fileType}</p>
              </div>
            </div>

            {/* Notes */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="font-medium text-zinc-900">Notes</p>
                <p className="whitespace-pre-wrap">{data.notes || "—"}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-900">Client Id</p>
                <p className="whitespace-pre-wrap">{data.clientId || "—"}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end border-t border-zinc-200 px-5 py-4 sm:px-6">
            <Button onClick={() => navigate("/docs")}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocsDetailsModal
