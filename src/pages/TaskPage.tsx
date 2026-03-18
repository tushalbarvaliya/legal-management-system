import { getAllTask } from "@/api/taskAPI";
import AddTaskModel from "@/components/Task/AddTaskModel";
import TaskCard from "@/components/Task/TaskCard";
import type { TaskData } from "@/types/taskType";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";


const TaskPage = () => {
  const [taskAddModel, setTaskAddModel] = useState(false);

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTask,
  });

  // filtered data
  const filteredTasks = useMemo(() => {
    return tasks?.filter((task: TaskData) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());

      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [search, priorityFilter, statusFilter, tasks]);

  // stats
  const total = filteredTasks?.length;
  const completed = filteredTasks?.filter(
    (t: TaskData) => t.status === "completed",
  ).length;
  const inProgress = filteredTasks?.filter(
    (t: TaskData) => t.status === "inProgress",
  ).length;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-soft sm:p-6">
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
          {/*  Search */}
          <input
            type="search"
            placeholder="Search by title or description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          />

          {/*  Priority */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {/*  Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-5 flex flex-wrap justify-center gap-4 text-xs text-stone-500">
        <p className="rounded-full bg-blue-200 px-2 text-blue-800">
          Total Task: {total}
        </p>
        <p className="rounded-full bg-emerald-200 px-2 text-emerald-800">
          Completed: {completed}
        </p>
        <p className="rounded-full bg-amber-100 px-2 text-amber-800">
          In Process: {inProgress}
        </p>
      </div>

      {/* ➕ Add Button */}
      <button
        onClick={() => setTaskAddModel(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-zinc-900 text-white"
      >
        +
      </button>

      {taskAddModel && <AddTaskModel closeModal={setTaskAddModel} />}

      {/* Task List */}
      <div className="mt-5 space-y-3">
        {filteredTasks?.length > 0 ? (
          filteredTasks?.map((item: TaskData) => (
            <TaskCard key={item._id} {...item} />
          ))
        ) : (
          <p className="text-center text-sm text-zinc-900">No tasks found</p>
        )}
      </div>
    </section>
  );
};

export default TaskPage;
