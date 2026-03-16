import { getSession } from "@/api/sessionAPI";
import AddSessionModel from "@/components/Model/Session/AddSessionModel";
import SessionCard from "@/components/Model/Session/SessionCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
export type SessionData = {
  _id: string;
  title: string;
  date: string;
  clientName: string;
  clientId: string;
  caseTitle: string;
  caseId: string;
  location: string;
  time: string;
  createdAt: string;
  updatedAt: string;
  note: string;
};

const SessionPage = () => {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sessionAddModel, setSessionAddModel] = useState(false);
  const { data } = useQuery<SessionData[]>({
    queryFn: getSession,
    queryKey: ["session"],
  });
  const filteredSessions = data?.filter((session) => {
    const searchMatch =
      session.title.toLowerCase().includes(search.toLowerCase()) ||
      session.clientName.toLowerCase().includes(search.toLowerCase()) ||
      session.caseTitle.toLowerCase().includes(search.toLowerCase());

    const dateMatch = dateFilter
      ? new Date(session.date) >= new Date(dateFilter)
      : true;

    return searchMatch && dateMatch;
  });
  return (
    <>
      {sessionAddModel && <AddSessionModel closeModal={setSessionAddModel} />}
      <section className="rounded-2xl  border border-zinc-200 bg-white p-4 shadow-soft sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Sessions Management
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Manage and review all scheduled sessions
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or description"
                className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3 text-sm text-zinc-800 outline-none transition duration-200 placeholder:text-zinc-400 focus:border-zinc-400"
              />
            </label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3 text-sm text-zinc-800 outline-none transition duration-200 placeholder:text-zinc-400 focus:border-zinc-400"
            />
            <button
              className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 hover:scale-[1.02]"
              onClick={() => {
                setDateFilter("");
                setSearch("");
              }}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-3 overflow-y-scroll no-scrollbar">
          <p className="hidden rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center text-sm text-zinc-600">
            No tasks match your current search or filters.
          </p>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-3">
            {filteredSessions?.map((item) => (
              <SessionCard {...item} key={item._id} />
            ))}
          </div>
        </div>
        <button
          className="fixed bottom-6 right-6 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 lg:bottom-8 lg:right-8"
          onClick={() => {
            setSessionAddModel(true);
          }}
        >
          <img src="/plus.svg" alt="+" className="h-6 w-6" />
        </button>
      </section>
    </>
  );
};

export default SessionPage;
