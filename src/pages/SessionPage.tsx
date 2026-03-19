import { getAllSession } from "@/api/sessionAPi";
import AddSessionModel from "@/components/Session/AddSessionModel";
import SessionCard from "@/components/Session/SessionCard";
import SessionCardSkeleton from "@/components/Session/SessionCardSkeleton";
import type { SessionData } from "@/types/sessionType";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

const SessionPage = () => {
  const [sessionAddModel, setSessionAddModel] = useState(false);

  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const { data: sessions, isLoading } = useQuery({
    queryKey: ["sessions"],
    queryFn: getAllSession,
  });

  const filteredSessions = useMemo(() => {
    return sessions?.data?.filter((session: SessionData) => {
      const matchesSearch =
        session.title?.toLowerCase().includes(search.toLowerCase()) ||
        session.clientId?.toLowerCase().includes(search.toLowerCase()) ||
        session.caseId?.toLowerCase().includes(search.toLowerCase()) ||
        session.sessionLocation?.toLowerCase().includes(search.toLowerCase());

      const matchesDate = !dateFilter || session.sessionDate >= dateFilter;

      return matchesSearch && matchesDate;
    });
  }, [search, dateFilter, sessions]);

  const handleClear = () => {
    setSearch("");
    setDateFilter("");
  };

  return (
    <>
      {sessionAddModel && <AddSessionModel closeModal={setSessionAddModel} />}

      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-soft sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
              Sessions Management
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Manage and review all scheduled sessions
            </p>
          </div>

          {/* Filters */}
          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <label className="relative w-full sm:min-w-55 md:min-w-65">
              <img
                src="/search.svg"
                alt="search"
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
              />
              <input
                type="search"
                placeholder="Search sessions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 py-2.5 pl-9 pr-3 text-sm"
              />
            </label>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
            />

            <button
              onClick={handleClear}
              className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm text-white hover:bg-zinc-800"
            >
              Clear
            </button>
          </div>
        </div>

        <p className="mt-4 text-sm text-zinc-500">
          Showing {filteredSessions?.length} sessions
        </p>

        <div className="mt-5">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {isLoading && (
              <>
                <SessionCardSkeleton />
                <SessionCardSkeleton />
                <SessionCardSkeleton />
                <SessionCardSkeleton />
              </>
            )}
            {filteredSessions?.length > 0 ? (
              filteredSessions?.map((item: SessionData) => (
                <SessionCard key={item._id} {...item} />
              ))
            ) : (
              <p className="col-span-full text-center text-sm text-zinc-500">
                No sessions found
              </p>
            )}
          </div>

          {/* Optional skeleton */}
          {/* <SessionCardSkeleton /> */}
        </div>

        <button
          onClick={() => setSessionAddModel(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-zinc-900 text-white"
        >
          +
        </button>
      </section>
    </>
  );
};

export default SessionPage;
