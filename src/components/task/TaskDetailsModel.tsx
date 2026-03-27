import type { TaskDataType } from "@/types/taskType"
import { formatDate } from "@/utils/formate"
import { X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const TaskDetailsModel = (data: TaskDataType) => {
  const navigate = useNavigate()
  return (
    <>
      <div className="fixed inset-0 z-70">
        <div className="absolute inset-0 h-screen bg-zinc-900/45"></div>
        <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-900">
                  {data.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-500">
                  Created {formatDate(data.createdAt)}
                </p>
              </div>
              <button
                className="rounded-lg border border-zinc-200 p-2 text-zinc-600 transition duration-200 hover:bg-zinc-100"
                onClick={() => {
                  navigate("/task")
                }}
              >
                <X />
              </button>
            </div>

            <div className="space-y-4 text-sm text-zinc-700">
              <div>
                <p className="text-xs font-semibold tracking-[0.08em] text-zinc-500 uppercase">
                  data Description
                </p>
                <p className="mt-1 rounded-xl bg-zinc-50 p-3 leading-relaxed">
                  {data.description}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                  <p className="text-xs text-zinc-500">Priority</p>
                  <p className="mt-1 font-semibold text-zinc-900">
                    {data.priority}
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                  <p className="text-xs text-zinc-500">Update Date</p>
                  <p className="mt-1 font-semibold text-zinc-900">
                    {formatDate(data.updatedAt)}
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                  <p className="text-xs text-zinc-500">Status</p>
                  <p className="mt-1 font-semibold text-zinc-900">
                    {data.status}
                  </p>
                </div>
                <Link to={`/cases/${data.caseId}`}>
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                    <p className="text-xs text-zinc-500">Case id</p>
                    <p className="mt-1 font-semibold text-zinc-900">
                      {data.caseId}
                    </p>
                  </div>
                </Link>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                  <p className="text-xs text-zinc-500">Assign to</p>
                  <p className="mt-1 font-semibold text-zinc-900">
                    {data.assignedTo}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800"
                onClick={() => {
                  navigate("/task")
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TaskDetailsModel
