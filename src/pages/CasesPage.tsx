import { useMemo, useState } from "react";
import CasesCard from "@/components/Case/CasesCard";
import CasesCardSkeleton from "@/components/Case/CasesCardSkeleton";
import AddCaseModel from "@/components/Case/AddCaseModel";
import { useQuery } from "@tanstack/react-query";
import { getAddCase } from "@/api/caseAPI";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ErrorMessage from "@/components/ErrorMessage";
import type { caseDataType } from "@/Data/caseData";

const CasesPage = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  const [addModel, setAddModel] = useState(false);
  const [search, setSearch] = useState("");

  const {
    data: cases,
    isLoading,
    isError,
  } = useQuery<caseDataType[]>({
    queryKey: ["cases"],
    queryFn: getAddCase,
  });

  const filteredCases: caseDataType[] | undefined = useMemo(() => {
    return cases?.filter((item: caseDataType) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [search, cases]);

  return (
    <>
      {addModel && <AddCaseModel closeModal={setAddModel} />}
      {/* ADD TASK BUTTON */}
      {role == "lawyer" && (
        <button
          className="fixed bottom-6 right-6 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 lg:bottom-8 lg:right-8"
          onClick={() => {
            setAddModel(true);
          }}
        >
          <img src="/plus.svg" alt="+" className="h-6 w-6" />
        </button>
      )}

      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-soft sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
              Cases Management
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Track deadlines, update priorities, and manage work in one place.
            </p>
          </div>

          {/* Search + Filter */}
          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            {/* Search */}
            <label className="relative w-full sm:min-w-55 md:min-w-65">
              <img
                src="/search.svg"
                alt="search"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
              />
              <input
                type="search"
                placeholder="Search by title, description, client..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-zinc-400"
                disabled={isLoading || isError}
              />
            </label>

            {/* Priority Filter */}
          </div>
        </div>

        {/* List */}
        <div className="mt-5 space-y-3">
          {isLoading && (
            <>
              <CasesCardSkeleton />
              <CasesCardSkeleton />
              <CasesCardSkeleton />
            </>
          )}
          {isError && <ErrorMessage />}
          {!isLoading &&
            !isError &&
            (filteredCases && filteredCases?.length > 0 ? (
              filteredCases.map((item: caseDataType) => (
                <div>
                  <CasesCard {...item} key={item.id} />
                  {/* <CasesCardSkeleton /> */}
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-zinc-500 py-6">
                No cases found
              </p>
            ))}
        </div>
      </section>
    </>
  );
};

export default CasesPage;
