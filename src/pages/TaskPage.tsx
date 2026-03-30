import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import { getAllTask } from "@/api/taskAPI"
import type {  TaskResponse, TaskType } from "@/types/taskType"
import NoFound from "@/components/NoFound"
import TaskCardSkeleton from "@/components/task/TaskCardSkeleton"
import ErrorMessage from "@/components/ErrorMessage"
import { Spinner } from "@/components/ui/spinner"
import TaskCard from "@/components/task/TaskCard"
import AddTask from "@/components/task/AddTask"
import { Dialog } from "@/components/ui/dialog"

const TaskPage = () => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname

  const [search, setSearch] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery<TaskType>({
    queryKey: ["tasks"],
    queryFn: getAllTask,
  })

  const filteredTasks = useMemo(() => {
    return tasks?.data.tasks.filter((task: TaskResponse) => {
      const title = task.title?.toLowerCase() || ""
      const description = task.description?.toLowerCase() || ""
      const matchesSearch =
        title.includes(search.toLowerCase()) ||
        description.includes(search.toLowerCase())
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter
      return matchesSearch && matchesPriority && matchesStatus
    })
  }, [search, priorityFilter, statusFilter, tasks])

  const total = tasks?.data.tasks.length
  const pending = tasks?.data.summary.pending
  const completed = tasks?.data.summary.completed
  const overdue = tasks?.data.summary.overdue

  return (
    <Dialog
      open={pathname === "/task/add"}
      onOpenChange={(open) => {
        if (!open) navigate("/task")
      }}
    >
      {pathname === "/task/add" && <AddTask />}
      <section className="shadow-soft rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
        {/* header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
              Task Management
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Track deadlines, update priorities, and manage work in one place.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            {/* Search */}
            <input
              type="search"
              placeholder="Search by title or description"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
              disabled={isLoading || isError}
            />

            {/* Priority */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
              disabled={isLoading || isError}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
              disabled={isLoading || isError}
            >
              <option value="all">All Statuses</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 flex flex-wrap justify-center gap-4 text-xs text-stone-500">
          <p className="flex gap-2 rounded-full bg-blue-200 px-2 text-blue-800">
            Total Task: {isLoading ? <Spinner /> : total}
          </p>
          <p className="flex gap-2 rounded-full bg-emerald-200 px-2 text-emerald-800">
            Completed: {isLoading ? <Spinner /> : completed}
          </p>
          <p className="flex gap-2 rounded-full bg-amber-100 px-2 text-amber-800">
            Pending: {isLoading ? <Spinner /> : pending}
          </p>
          <p className="flex gap-2 rounded-full bg-red-100 px-2 text-red-800">
            Over Due: {isLoading ? <Spinner /> : overdue}
          </p>
        </div>

        {/* Add Button */}
        <button
          onClick={() => navigate("/task/add")}
          className="fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white"
        >
          <Plus />
        </button>

        {/* Task List */}
        <div className="mt-5 space-y-3">
          {isLoading && (
            <>
              <TaskCardSkeleton />
              <TaskCardSkeleton />
              <TaskCardSkeleton />
            </>
          )}

          {isError && <ErrorMessage />}

          {!isLoading &&
            !isError &&
            filteredTasks &&
            (filteredTasks.length > 0 ? (
              filteredTasks?.map((item) => (
                <div key={item.id}>
                  <TaskCard {...item} />
                </div>
              ))
            ) : (
              <NoFound title="Task" />
            ))}
        </div>
      </section>
    </Dialog>
  )
}

export default TaskPage
