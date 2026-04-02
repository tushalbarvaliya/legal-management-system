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
import { toast } from "sonner"
import { useState } from "react"
import DeleteModel from "../DeleteModel"
import {
  useDeleteTaskMutation,
  useMarksAsDoneMutation,
} from "@/store/services/taskAPI"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

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

  const [MarkAsDone] = useMarksAsDoneMutation()
  const handelMakeAsDone = async () => {
    try {
      await MarkAsDone({ id: data.id }).unwrap()
      toast.success(`Task Mark as Done`)
    } catch {
      toast.error("Something is not Right")
    }
  }

  const [deleteTask, { isLoading: DeleteIsPending }] = useDeleteTaskMutation()
  const handelDelete = async () => {
    try {
      await deleteTask(data.id).unwrap()
      toast.success("Task Deleted")
      setOpenDelete(false)
    } catch {
      toast.error(`Failed to delete`)
    }
  }
  return (
    <>
      {openView && (
        <Dialog open={openView} onOpenChange={() => setOpenView(false)}>
          <TaskDetailsModel data={data} setOpenView={setOpenView} />
        </Dialog>
      )}
      {openEdit && (
        <Dialog open={openEdit} onOpenChange={() => setOpenEdit(false)}>
          <UpdateTask task={data} setOpenEdit={setOpenEdit} />
        </Dialog>
      )}

      {openDelete && (
        <Dialog open={openDelete} onOpenChange={() => setOpenDelete(false)}>
          <DeleteModel
            title="Delete Task"
            subTitle="Are you sure you want to delete this task?"
            detailsTitle={`${data.title}`}
            id={data.id}
            isPending={DeleteIsPending}
            mutate={handelDelete}
            setOpenDelete={setOpenDelete}
          />
        </Dialog>
      )}
      <article className="group hover:shadow-soft relative cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 shadow-sm transition duration-200 hover:bg-zinc-100/80">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            {/* TITLE */}
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-pointer truncate text-sm font-semibold text-zinc-900">
                  {data.title}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{data.description}</p>
              </TooltipContent>
            </Tooltip>

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
                    handelMakeAsDone()
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
    </>
  )
}

export default TaskCard
