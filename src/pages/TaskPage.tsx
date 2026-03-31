import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { Plus } from "lucide-react"

import { getAllTask } from "@/api/taskAPI"
import type { TaskResponse, TaskType } from "@/types/taskType"
import NoFound from "@/components/NoFound"
import TaskCardSkeleton from "@/components/task/TaskCardSkeleton"
import ErrorMessage from "@/components/ErrorMessage"
import { Spinner } from "@/components/ui/spinner"
import TaskCard from "@/components/task/TaskCard"
import AddTask from "@/components/task/AddTask"
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Helmet } from "react-helmet-async"

const TaskPage = () => {
  const [openAdd, setOpenAdd] = useState<boolean>(false)

  const [search, setSearch] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const clearSearch = () => {
    setSearch("")
    setPriorityFilter("all")
    setStatusFilter("all")
  }
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
      open={openAdd}
      onOpenChange={(open) => {
        if (!open) setOpenAdd(false)
      }}
    >
      <Helmet>
        <title>Task Management</title>
      </Helmet>
      {openAdd && <AddTask setOpenAdd={setOpenAdd} />}
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
            <Input
              type="search"
              placeholder="Search by title or description"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={isLoading || isError}
              className="w-full"
            />

            {/* Priority */}
            <Select
              value={priorityFilter}
              onValueChange={(value) => setPriorityFilter(value)}
              disabled={isLoading || isError}
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            {/* Status */}
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
              disabled={isLoading || isError}
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="inProgress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => clearSearch()}>Clear</Button>
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
          onClick={() => setOpenAdd(true)}
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
