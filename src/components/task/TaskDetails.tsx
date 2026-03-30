import { Link, useNavigate } from "react-router-dom"

import { formatDate } from "@/utils/formate"
import type {  TaskResponse } from "@/types/taskType"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


type Props = {
  data: TaskResponse
}

const TaskDetails = ({ data }: Props) => {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate("/task")
  }

  return (
    <DialogContent className="max-w-xl p-0">
      {/* Header */}
      <DialogHeader className="border-b px-5 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <DialogTitle className="text-xl font-bold text-zinc-900">
              {data.title}
            </DialogTitle>
            <p className="mt-1 text-xs text-zinc-500">
              Created {formatDate(data.createdAt)}
            </p>
          </div>
        </div>
      </DialogHeader>

      {/* Body */}
      <div className="space-y-4 px-5 py-4 text-sm text-zinc-700 sm:px-6 sm:py-5">
        {/* Description */}
        <div>
          <p className="text-xs font-semibold tracking-[0.08em] text-zinc-500 uppercase">
            Description
          </p>
          <p className="mt-1 rounded-xl bg-zinc-50 p-3 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
            <p className="text-xs text-zinc-500">Priority</p>
            <p className="mt-1 font-semibold text-zinc-900">{data.priority}</p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
            <p className="text-xs text-zinc-500">Updated Date</p>
            <p className="mt-1 font-semibold text-zinc-900">
              {formatDate(data.updatedAt)}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
            <p className="text-xs text-zinc-500">Status</p>
            <p className="mt-1 font-semibold text-zinc-900">{data.status}</p>
          </div>

          <Link to={`/cases/${data.caseId}`}>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 transition hover:bg-zinc-100">
              <p className="text-xs text-zinc-500">Case </p>
              <p className="mt-1 font-semibold text-zinc-900">{data.caseId}</p>
            </div>
          </Link>
        </div>
        {/* Footer */}
        <div className="flex justify-end border-t border-zinc-200 pt-4">
          <button
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </DialogContent>
  )
}

export default TaskDetails
