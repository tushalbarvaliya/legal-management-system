import type { DocumentData } from "@/types/docsType";
import { Button } from "../ui/button";

type DocsDetailsModalProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & DocumentData;

const DocsDetailsModal = (data: DocsDetailsModalProps) => {
  return (
    <div className="fixed inset-0 z-70">
      {/* Overlay */}
      <div className="absolute inset-0 bg-zinc-900/45 h-screen"></div>

      {/* Modal */}
      <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white shadow-soft">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 sm:px-6">
            <h3 className="text-lg font-semibold text-zinc-900">
              Document Details
            </h3>
            <button
              className="rounded-lg border border-zinc-200 p-2 hover:bg-zinc-100"
              onClick={() => data.closeModal(false)}
            >
              <img src="/x.svg" alt="close" className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[85vh] space-y-4 overflow-y-auto px-5 py-4 sm:px-6 text-sm text-zinc-700">
            {/* Title + Case ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-zinc-900">File Link</p>
                <a
                  href={data.documentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  Open Document
                </a>
              </div>

              <div>
                <p className="font-medium text-zinc-900">File Type</p>
                <p>{data.fileType}</p>
              </div>
            </div>

            {/* Notes */}
            <div>
              <p className="font-medium text-zinc-900">Notes</p>
              <p className="whitespace-pre-wrap">{data.note || "—"}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end border-t border-zinc-200 px-5 py-4 sm:px-6">
            <Button onClick={() => data.closeModal(false)}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsDetailsModal;
