import { MoreVertical } from "lucide-react"
import { formatDate } from "@/utils/formate"
import { Button } from "../ui/button"
import TaskDetailsModel from "./TaskDetails"
import type { TaskResponse } from "@/types/taskType"
import UpdateTask from "./UpdateTask"
import { Dialog } from "../ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useMutation } from "@tanstack/react-query"
import axiosInstance from "@/api/axiosInstance"
import { toast } from "sonner"
import { queryClient } from "@/main"
import { useState } from "react"
import DeleteModel from "../DeleteModel"
import { deleteTask } from "@/api/taskAPI"

const getPriorityColor = (priority: string) => {
  if (priority == "low") {
    return "bg-zinc-100 text-zinc-700"
  } else if (priority == "medium") {
    return "bg-amber-100 text-amber-700"
  } else if (priority == "high") {
    return "bg-rose-100 text-rose-700"
  }
}

const getStatusColor = (status: string) => {
  if (status === "pending") {
    return "bg-zinc-100 text-zinc-700"
  } else if (status === "completed") {
    return "bg-emerald-100 text-emerald-700"
  }
}
const TaskCard = (data: TaskResponse) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openView, setOpenView] = useState<boolean>(false)

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      const response = await axiosInstance.patch(`/tasks/task/${id}/markAsDone`)
      return response.data
    },
    onSuccess: () => {
      toast.success(`Task Mark as Done`)
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const { mutate: DeleteMutate, isPending: DeleteIsPending } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task Deleted")
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      setOpenDelete(false)
    },
    onError: (error) => {
      toast.error(`Error ${error}`)
    },
  })
  return (
    <Dialog
      open={openDelete || openEdit || openView}
      onOpenChange={(open) => {
        if (!open) {
          setOpenDelete(false)
          setOpenEdit(false)
          setOpenView(false)
        }
      }}
    >
      {openView && <TaskDetailsModel data={data} setOpenView={setOpenView} />}
      {openEdit && <UpdateTask task={data} setOpenEdit={setOpenEdit} />}

      {openDelete && (
        <DeleteModel
          title="Delete Task"
          subTitle="Are you sure you want to delete this task?"
          detailsTitle={`${data.title}`}
          id={data.id}
          isPending={DeleteIsPending}
          mutate={DeleteMutate}
          setOpenDelete={setOpenDelete}
        />
      )}
      <article className="group hover:shadow-soft relative cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 shadow-sm transition duration-200 hover:bg-zinc-100/80">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            {/* TITLE */}
            <div className="group/title relative inline-flex max-w-full items-center">
              <h2 className="truncate text-sm font-semibold text-zinc-900 transition duration-200 group-hover:text-zinc-950">
                {data.title}
              </h2>

              {/* TOOLTIP */}
              <div className="pointer-events-none absolute top-full left-0 z-10 mt-2 hidden w-70 max-w-[70vw] rounded-lg bg-zinc-900/95 p-3 text-xs leading-relaxed text-zinc-100 opacity-0 shadow-lg backdrop-blur-sm transition duration-200 group-hover/title:block group-hover/title:opacity-100">
                {data.description}
              </div>
            </div>

            {/* INFO GRID */}
            <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-zinc-600 sm:grid-cols-2 lg:grid-cols-5">
              <p>
                <span className="font-semibold text-zinc-700">Created:</span>{" "}
                {formatDate(data.createdAt)}
              </p>

              <p>
                <span className="font-semibold text-zinc-700">Priority:</span>
                <span
                  className={`ml-1 inline-flex rounded-full px-2 py-0.5 font-medium ${getPriorityColor(data.priority)}`}
                >
                  {data.priority}
                </span>
              </p>

              <p>
                <span className="font-semibold text-zinc-700">Due:</span>{" "}
                {data.dueDate ? formatDate(data.dueDate!) : "No Deadline"}
              </p>

              <p>
                <span className="font-semibold text-zinc-700">Status:</span>
                <span
                  className={`ml-1 inline-flex rounded-full px-2 py-0.5 font-medium ${getStatusColor(data.status)}`}
                >
                  {data.dueDate == null
                    ? data.status
                    : new Date(data.dueDate) < new Date()
                      ? "overDue"
                      : data.status}
                </span>
              </p>
            </div>
          </div>

          {/* ACTION MENU */}
          <div className="relative z-20">
            {/* MENU DROPDOWN */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenView(true)
                  }}
                >
                  View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenEdit(true)
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-green-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    mutate(data.id)
                  }}
                >
                  Mark As Done
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-rose-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenDelete(true)
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </article>
    </Dialog>
  )
}

export default TaskCard
