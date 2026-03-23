import { getAllCases } from "@/api/caseAPI"
import { getAllTask } from "@/api/taskAPI"
import type { caseDataType } from "@/data/caseData"
import type { taskDataType } from "@/data/taskData"
import { useQuery } from "@tanstack/react-query"
import { Spinner } from "../ui/spinner"
import ErrorMessage from "../ErrorMessage"

const LawyerBoard = () => {
  const {
    data: tasks = [],
    isLoading: taskLoading,
    isError: taskError,
  } = useQuery<taskDataType[]>({
    queryKey: ["tasks"],
    queryFn: getAllTask,
  })

  const {
    data: cases = [],
    isLoading: caseLoading,
    isError: caseError,
  } = useQuery<caseDataType[]>({
    queryKey: ["cases"],
    queryFn: getAllCases,
  })

  // stats
  const totalTasks = tasks.length
  const completed = tasks.filter((t) => t.status === "completed").length
  const inProgress = tasks.filter((t) => t.status === "inProgress").length
  const totalCases = cases.length

  const isLoading = taskLoading || caseLoading
  const isError = taskError || caseError

  return (
    <div className="mt-4 space-y-6">
      {/* Header */}

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <Spinner />
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Tasks */}
          <div className="rounded-2xl border border-black bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Total Tasks</p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-900">
              {totalTasks}
            </h2>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border border-black bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Task Completed</p>
            <h2 className="mt-2 text-2xl font-bold text-emerald-600">
              {completed}
            </h2>
          </div>

          {/* In Progress */}
          <div className="rounded-2xl border border-black bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Task In Progress</p>
            <h2 className="mt-2 text-2xl font-bold text-amber-500">
              {inProgress}
            </h2>
          </div>

          {/* Total Cases */}
          <div className="rounded-2xl border border-black bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Total Cases</p>
            <h2 className="mt-2 text-2xl font-bold text-blue-600">
              {totalCases}
            </h2>
          </div>
        </div>
      )}
    </div>
  )
}

export default LawyerBoard
