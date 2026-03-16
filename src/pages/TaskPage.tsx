import { getAllTask, taskAnalysis } from "@/api/taskAPI";
import TaskCard, { type task } from "@/components/Model/Task/TaskCard";
import NoClientFound from "@/components/NoClientFound";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
const TaskPage = () => {
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("all");
  const [status, setStatus] = useState("all");

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["task"],
    queryFn: getAllTask,
  });
  const { data: taskAnalysisData } = useQuery({
    queryKey: ["taskAnalysis"],
    queryFn: taskAnalysis,
  });

  const filteredTasks = tasks?.filter((task: task) => {
    const matchSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchPriority =
      priority === "all" ||
      task.priority.toLowerCase() === priority.toLowerCase();

    const matchStatus =
      status === "all" || task.status.toLowerCase() === status.toLowerCase();

    return matchSearch && matchPriority && matchStatus;
  });
  return (
    <>
      <section className="rounded-2xl  border border-zinc-200 bg-white p-4 shadow-soft sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Task Management
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Track deadlines, update priorities, and manage work in one place.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <label className="relative w-full min-w-0 sm:min-w-55 md:min-w-65">
              <span className="sr-only">Search tasks</span>

              <img
                src="/search.svg"
                alt="search"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
              />
              <input
                id="searchInput"
                type="search"
                placeholder="Search by title or description"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3 text-sm text-zinc-800 outline-none transition duration-200 placeholder:text-zinc-400 focus:border-zinc-400"
              />
            </label>
            <select
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 outline-none transition duration-200 focus:border-zinc-400"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 outline-none transition duration-200 focus:border-zinc-400"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="mt-5 space-y-3 overflow-y-scroll no-scrollbar">
          <p className="hidden rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center text-sm text-zinc-600">
            No tasks match your current search or filters.
          </p>
          <div className="flex rounded-full justify-center items-center gap-4 flex-wrap text-sm text-stone-500">
            <p className="rounded-full bg-blue-200 px-2 text-blue-800">
              Total Task {taskAnalysisData?.total}
            </p>
            <p className="rounded-full bg-emerald-200 px-2 text-emerald-800">
              {taskAnalysisData?.completed} Completed
            </p>
            <p className="rounded-full bg-amber-100 px-2  text-amber-800">
              {taskAnalysisData?.inProgress} In Process
            </p>
          </div>
          {!isLoading && (
            <div className="mt-5 space-y-3 overflow-y-hidden">
              {filteredTasks.map((item: task) => (
                <TaskCard {...item} key={item._id} />
              ))}
              {filteredTasks?.length == 0 && <NoClientFound title={"Task"} />}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TaskPage;
