import { useState } from "react";
import UpdateTaskModel from "./UpdateTaskModel";
import DeleteTaskModel from "./DeleteTaskModel";
import TaskDetailsModel from "./TaskDetailsModel";
import AddTaskModel from "./AddTaskModel";
import { useParams, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { updateTask } from "@/api/taskAPI";
import { toast } from "sonner";
import { queryClient } from "@/main";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

export type task = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  priority: string;
  dueDate: string;
  status: string;
  assignTo: string;
};

const TaskCard = (data: task) => {
  const [openUpdateModel, setOpenUpdateModel] = useState(false);
  const [taskDeleteModel, setTaskDeleteModel] = useState(false);
  const [taskAddModel, setTaskAddModel] = useState(false);

  const param = useParams();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      toast.success("Task Updated");
      queryClient.invalidateQueries({ queryKey: ["task"] });
      queryClient.invalidateQueries({ queryKey: ["taskAnalysis"] });
    },
    onError: (error) => {
      toast.error(`Error ${error}`);
    },
  });

  const isModelOpen = param.id === String(data._id);
  return (
    <>
      {/* ADD TASK MODAL */}
      {taskAddModel && <AddTaskModel closeModal={setTaskAddModel} />}

      {/* TASK DETAILS MODAL (URL controlled) */}
      {isModelOpen && (
        <TaskDetailsModel {...data} closeModal={() => navigate("/tasks")} />
      )}

      {/* UPDATE MODAL */}
      {openUpdateModel && (
        <UpdateTaskModel {...data} closeModal={setOpenUpdateModel} />
      )}

      {/* DELETE MODAL */}
      {taskDeleteModel && (
        <DeleteTaskModel {...data} closeModal={setTaskDeleteModel} />
      )}

      {/* ADD TASK BUTTON */}
      <button
        className="fixed bottom-6 right-6 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 lg:bottom-8 lg:right-8"
        onClick={() => setTaskAddModel(true)}
      >
        <img src="/plus.svg" alt="+" className="h-6 w-6" />
      </button>

      {/* TASK CARD */}
      <article
        className="group relative cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 shadow-sm transition duration-200 hover:bg-zinc-100/80 hover:shadow-soft"
        onClick={() => navigate(`/tasks/${data._id}`)}
      >
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            {/* TITLE */}
            <div className="group/title relative inline-flex max-w-full items-center">
              <h2 className="truncate text-sm font-semibold text-zinc-900 transition duration-200 group-hover:text-zinc-950">
                {data.title}
              </h2>

              {/* TOOLTIP */}
              <div className="pointer-events-none absolute left-0 top-full z-10 mt-2 hidden w-70 max-w-[70vw] rounded-lg bg-zinc-900/95 p-3 text-xs leading-relaxed text-zinc-100 opacity-0 shadow-lg backdrop-blur-sm transition duration-200 group-hover/title:block group-hover/title:opacity-100">
                {data.description}
              </div>
            </div>

            {/* INFO GRID */}
            <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-zinc-600 sm:grid-cols-2 lg:grid-cols-5">
              <p>
                <span className="font-semibold text-zinc-700">Created:</span>{" "}
                {new Date(data.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              <p>
                <span className="font-semibold text-zinc-700">Priority:</span>
                <span
                  className={`ml-1 inline-flex rounded-full px-2 py-0.5 font-medium ${
                    data.priority === "low"
                      ? "bg-zinc-100 text-zinc-700"
                      : data.priority === "medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {data.priority}
                </span>
              </p>

              <p>
                <span className="font-semibold text-zinc-700">Due:</span>{" "}
                {new Date(data.dueDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              <p>
                <span className="font-semibold text-zinc-700">Status:</span>
                <span
                  className={`ml-1 inline-flex rounded-full px-2 py-0.5 font-medium ${
                    data.status === "Pending"
                      ? "bg-zinc-100 text-zinc-700"
                      : data.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : data.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : ""
                  }`}
                >
                  {data.status}
                </span>
              </p>

              <p>
                <span className="font-semibold text-zinc-700">Assign To:</span>{" "}
                {data.assignTo}
              </p>
            </div>
          </div>

          {/* ACTION MENU */}
          <div className="relative z-20">
            {/* MENU DROPDOWN */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenUpdateModel(true);
                  }}
                >
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTaskDeleteModel(true);
                  }}
                >
                  Delete
                </DropdownMenuItem>
                {data.status !== "completed" && (
                  <DropdownMenuItem
                    className="text-green-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      mutate({ ...data, status: "completed" });
                    }}
                  >
                    Mark as Completed
                  </DropdownMenuItem>
                )}
                {data.status === "completed" && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      mutate({ ...data, status: "inProgress" });
                    }}
                  >
                    Mark as inProgress
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </article>
    </>
  );
};

export default TaskCard;
