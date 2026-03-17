import AddTaskModel from "@/components/Task/AddTaskModel";
import TaskCard from "@/components/Task/TaskCard";
import TaskCardSkeleton from "@/components/Task/TaskCardSkeleton";
import type { TaskData } from "@/types/taskType";
import { useState } from "react";

const tasks: TaskData[] = [
  {
    _id: "69b6ad73bbf11e70835795f8",
    title: "Test test dhasdf",
    assignTo: "Ketul Panchal",
    description: "this is fot test purpose only",
    priority: "high",
    status: "inProgress",
    dueDate: "2026-03-20T00:00:00.000Z",
    createdAt: "2026-03-15T13:00:35.097Z",
    updatedAt: "2026-03-16T11:59:18.437Z",
    __v: 0,
  },
  {
    _id: "69b7ac9b481e0666be31df1c",
    title: "tushal",
    assignTo: "tushL",
    description: "tushal",
    priority: "low",
    status: "inProgress",
    dueDate: "2026-03-17T00:00:00.000Z",
    createdAt: "2026-03-16T07:09:15.720Z",
    updatedAt: "2026-03-16T09:50:48.225Z",
    __v: 0,
  },
  {
    _id: "69b7b6d6e627ce45ad361450",
    title: "test 4 ",
    assignTo: "rtusblsaib",
    description: "sdiuvn ",
    priority: "medium",
    status: "inProgress",
    dueDate: "2026-03-18T00:00:00.000Z",
    createdAt: "2026-03-16T07:52:54.554Z",
    updatedAt: "2026-03-16T07:52:54.554Z",
    __v: 0,
  },
  {
    _id: "69b7f06da57b15fe8e55b152",
    title: "tushLA",
    assignTo: "Tushal Patel",
    description: "dsfjasdv sdvadu ",
    priority: "medium",
    status: "inProgress",
    dueDate: "2026-03-23T00:00:00.000Z",
    createdAt: "2026-03-16T11:58:37.493Z",
    updatedAt: "2026-03-16T11:58:37.493Z",
    __v: 0,
  },
  {
    _id: "69b7f0b9a57b15fe8e55b161",
    title: "dfgxfgdf",
    assignTo: "Tushal Patel",
    description: "xcvxcvcxvcxv",
    priority: "medium",
    status: "inProgress",
    dueDate: "2026-03-24T00:00:00.000Z",
    createdAt: "2026-03-16T11:59:53.068Z",
    updatedAt: "2026-03-16T11:59:53.068Z",
    __v: 0,
  },
  {
    _id: "69b7f0b9a57b15fe8e55b163",
    title: "dfgxfgdf",
    assignTo: "Tushal Patel",
    description: "xcvxcvcxvcxv",
    priority: "medium",
    status: "inProgress",
    dueDate: "2026-03-24T00:00:00.000Z",
    createdAt: "2026-03-16T11:59:53.209Z",
    updatedAt: "2026-03-16T11:59:53.209Z",
    __v: 0,
  },
  {
    _id: "69b7f0b9a57b15fe8e55b165",
    title: "dfgxfgdf",
    assignTo: "Tushal Patel",
    description: "xcvxcvcxvcxv",
    priority: "medium",
    status: "inProgress",
    dueDate: "2026-03-24T00:00:00.000Z",
    createdAt: "2026-03-16T11:59:53.387Z",
    updatedAt: "2026-03-16T11:59:53.387Z",
    __v: 0,
  },
  {
    _id: "69b7f0b9a57b15fe8e55b167",
    title: "dfgxfgdf",
    assignTo: "Tushal Patel",
    description: "xcvxcvcxvcxv",
    priority: "medium",
    status: "inProgress",
    dueDate: "2026-03-24T00:00:00.000Z",
    createdAt: "2026-03-16T11:59:53.548Z",
    updatedAt: "2026-03-16T11:59:53.548Z",
    __v: 0,
  },
];

const TaskPage = () => {
  const [taskAddModel, setTaskAddModel] = useState(false);
  return (
    <>
      <section className="rounded-2xl  border border-zinc-200 bg-white p-4 shadow-soft sm:p-6">
        {/* header */}
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
                className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3 text-sm text-zinc-800 outline-none transition duration-200 placeholder:text-zinc-400 focus:border-zinc-400"
              />
            </label>
            <select className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 outline-none transition duration-200 focus:border-zinc-400">
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 outline-none transition duration-200 focus:border-zinc-400">
              <option value="all">All Statuses</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* analysis of task */}
        <div className="mt-5 space-y-3 overflow-y-scroll no-scrollbar">
          <div className="flex rounded-full justify-center items-center gap-4 flex-wrap text-xs text-stone-500">
            <p className="rounded-full bg-blue-200 px-2 text-blue-800">
              Total Task: {8}
            </p>
            <p className="rounded-full bg-emerald-200 px-2 text-emerald-800">
              Completed: {1}
            </p>
            <p className="rounded-full bg-amber-100 px-2  text-amber-800">
              In Process: {2}
            </p>
          </div>
        </div>

        {/* Add button ADD */}
        <button className="fixed bottom-6 right-6 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 lg:bottom-8 lg:right-8">
          <img
            src="/plus.svg"
            alt="+"
            className="h-6 w-6"
            onClick={() => {
              setTaskAddModel(true);
            }}
          />
        </button>
        {taskAddModel && <AddTaskModel closeModal={setTaskAddModel} />}

        {/* list of task */}
        <div className="mt-5 space-y-3 overflow-y-hidden">
          {tasks.map((item: TaskData) => (
            <>
              <TaskCard key={item._id} {...item} />
              <TaskCardSkeleton />
            </>
          ))}
        </div>
      </section>
    </>
  );
};

export default TaskPage;
