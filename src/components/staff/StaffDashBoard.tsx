import { useQuery } from "@tanstack/react-query"

import { getAllTask } from "@/api/taskAPI"
import type { taskDataType } from "@/data/taskData"
import ErrorMessage from "../ErrorMessage"
import LawyerBoardSkeleton from "../lawyer/LawyerBoardSkeleton"

const StaffDashboard = () => {
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery<taskDataType[]>({
    queryKey: ["tasks"],
    queryFn: getAllTask,
  })

  // stats
  const totalTasks = tasks.length
  const completed = tasks.filter((t) => t.status === "completed").length
  const inProgress = tasks.filter((t) => t.status === "inProgress").length

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
            <p className="text-sm text-zinc-500">In Progress</p>
            <h2 className="mt-2 text-2xl font-bold text-amber-500">
              {inProgress}
            </h2>
          </div>
        </div>
      )}
    </div>
  )
}

export default StaffDashboard
