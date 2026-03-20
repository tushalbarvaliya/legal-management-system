import type { TaskData } from "@/types/taskType";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import TaskDetailsModel from "./TaskDetailsModel";
import UpdateTaskModel from "./UpdateTaskModel";
import DeleteTaskModel from "./DeleteTaskModel";
import type { taskDatatype } from "@/Data/taskData";

const getPriorityColor = (priority: string) => {
  if (priority == "low") {
    return "bg-zinc-100 text-zinc-700";
  } else if (priority == "medium") {
    return "bg-amber-100 text-amber-700";
  } else if (priority == "high") {
    return "bg-rose-100 text-rose-700";
  }
};

const formatData = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusColor = (status: string) => {
  if (status === "pending") {
    return "bg-zinc-100 text-zinc-700";
  } else if (status === "inProgress") {
    return "bg-blue-100 text-blue-700";
  } else if (status === "completed") {
    return "bg-emerald-100 text-emerald-700";
  }
};
const TaskCard = (data: taskDatatype) => {
  const [openDetailsModel, setOpenDetailsModel] = useState(false);
  const [openUpdateTaskModel, setUpdateTaskModel] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  return (
    <>
      {openDetailsModel && (
        <TaskDetailsModel {...data} closeModal={setOpenDetailsModel} />
      )}
      {openUpdateTaskModel && (
        <UpdateTaskModel {...data} closeModal={setUpdateTaskModel} />
      )}
      {openDeleteModel && (
        <DeleteTaskModel {...data} closeModal={setOpenDeleteModel} />
      )}
      <article
        className="group relative cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 shadow-sm transition duration-200 hover:bg-zinc-100/80 hover:shadow-soft"
        onClick={() => {
          setOpenDetailsModel(true);
        }}
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
                {formatData(data.createdAt)}
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
                {formatData(data.createdAt)}
              </p>

              <p>
                <span className="font-semibold text-zinc-700">Status:</span>
                <span
                  className={`ml-1 inline-flex rounded-full px-2 py-0.5 font-medium ${getStatusColor(data.status)}`}
                >
                  {data.status}
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
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setUpdateTaskModel(true);
                  }}
                >
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-rose-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDeleteModel(true);
                  }}
                >
                  Delete
                </DropdownMenuItem>
                {/* <DropdownMenuItem className="text-green-600">
                  Mark as Completed
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </article>
    </>
  );
};

export default TaskCard;
