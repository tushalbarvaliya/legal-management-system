import { useQuery } from "@tanstack/react-query"

import { getAllTask } from "@/api/taskAPI"
import ErrorMessage from "../ErrorMessage"
import LawyerBoardSkeleton from "../lawyer/LawyerBoardSkeleton"
import type { TaskType } from "@/types/taskType"

const StaffDashboard = () => {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery<TaskType>({
    queryKey: ["tasks"],
    queryFn: getAllTask,
  })

  // stats
  const totalTasks = tasks?.data.tasks.length
  const completed = tasks?.data.summary.completed
  const pending = tasks?.data.summary.pending
  const overdue = tasks?.data.summary.overdue

  return (
    <div className="space-y-6 mt-4">
      {/* Header */}

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <LawyerBoardSkeleton />
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          <ErrorMessage />
        </div>
      )}

      {/* Stats */}
      {!isLoading && !isError && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total Tasks */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm border-black">
            <p className="text-sm text-zinc-500">Total Tasks</p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-900">
              {totalTasks}
            </h2>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm border-black">
            <p className="text-sm text-zinc-500">Completed</p>
            <h2 className="mt-2 text-2xl font-bold text-emerald-600">
              {completed}
            </h2>
          </div>

          {/* In Progress */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm border-black">
            <p className="text-sm text-zinc-500">Pending</p>
            <h2 className="mt-2 text-2xl font-bold text-amber-500">
              {pending}
            </h2>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm border-black">
            <p className="text-sm text-zinc-500">Over due</p>
            <h2 className="mt-2 text-2xl font-bold text-amber-500">
              {overdue}
            </h2>
          </div>
        </div>
      )}
    </div>
  )
}

export default StaffDashboard
