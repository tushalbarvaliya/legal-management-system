// import { getAllCases } from "@/api/caseAPI"
// import { getAllTask } from "@/api/taskAPI"
// import type { caseDataType } from "@/data/caseData"
// import type { taskDataType } from "@/data/taskData"
// import { useQuery } from "@tanstack/react-query"
// import { Spinner } from "../ui/spinner"

// const LawyerBoard = () => {
//   const {
//     data: tasks,
//     isLoading: taskLoading,
//     isError: taskError,
//   } = useQuery<taskDataType[]>({
//     queryKey: ["tasks"],
//     queryFn: getAllTask,
//   })

//   const {
//     data: cases,
//     isLoading: caseLoading,
//     isError: caseError,
//   } = useQuery<caseDataType[]>({
//     queryKey: ["cases"],
//     queryFn: getAllCases,
//   })
//   const totalCase = cases?.length
//   const total = tasks?.length
//   const completed = tasks?.filter((t) => t.status === "completed").length
//   const inProgress = tasks?.filter((t) => t.status === "inProgress").length
//   return (
//     <>
//       <div className="mt-2 w-full rounded-xl bg-white p-4">
//         {/* title */}
//         <h1 className="font-mono text-xl font-bold">
//           Here is Quick Summary for you
//         </h1>
//       </div>
//       <div className="grid grid-cols-2 border-2 border-amber-300 bg-white">
//         <div className="mt-5 flex flex-wrap justify-center gap-4 text-xs text-stone-500">
//           <p className="flex gap-2 rounded-full bg-blue-200 px-2 text-blue-800">
//             Total Task: {taskLoading ? <Spinner /> : total}
//           </p>
//           <p className="flex gap-2 rounded-full bg-emerald-200 px-2 text-emerald-800">
//             Completed: {taskLoading ? <Spinner /> : completed}
//           </p>
//           <p className="flex gap-2 rounded-full bg-amber-100 px-2 text-amber-800">
//             In Process: {taskLoading ? <Spinner /> : inProgress}
//           </p>
//         </div>
//         <div>
//           <p className="flex gap-2 rounded-full bg-blue-200 px-2 text-blue-800">
//             Total Task: {caseLoading ? <Spinner /> : totalCase}
//           </p>
//         </div>
//       </div>
//     </>
//   )
// }

// export default LawyerBoard
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
    <div className="space-y-6 mt-4">
      {/* Header */}
      <div className="rounded-2xl bg-white p-6 text-black shadow-lg border border-black">
        <h1 className="text-2xl font-bold">📊 Lawyer Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-900">
          Quick summary of your tasks and cases
        </p>
      </div>

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
          <div className="rounded-2xl border bg-white p-5 shadow-sm  border-black">
            <p className="text-sm text-zinc-500">Total Tasks</p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-900">
              {totalTasks}
            </h2>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm  border-black">
            <p className="text-sm text-zinc-500">Task Completed</p>
            <h2 className="mt-2 text-2xl font-bold text-emerald-600">
              {completed}
            </h2>
          </div>

          {/* In Progress */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm  border-black">
            <p className="text-sm text-zinc-500">Task In Progress</p>
            <h2 className="mt-2 text-2xl font-bold text-amber-500">
              {inProgress}
            </h2>
          </div>

          {/* Total Cases */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm  border-black">
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
