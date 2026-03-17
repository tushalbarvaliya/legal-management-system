import { getLawyer } from "@/api/lawyerAPI";
import LawyerCard from "@/components/Lawyer/LawyerCard";
import { useQuery } from "@tanstack/react-query";

const LawyerPage = () => {
  const { data: lawyerData } = useQuery({
    queryKey: ["lawyer"],
    queryFn: getLawyer,
  });
  console.log(lawyerData);
  return (
    <>
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-soft sm:p-6 mt-4 space-y-4">
        <section className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white to-zinc-50 p-5 shadow-soft sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                Lawyer Management
              </h1>
              <p className="mt-2 text-sm text-zinc-600 sm:text-base">
                Add, edit, and manage your lawyer with quick actions from a
                single list.
              </p>
            </div>
            <button className="fixed bottom-6 right-6 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 lg:bottom-8 lg:right-8">
              <img src="/plus.svg" alt="+" className="h-6 w-6" />
            </button>
          </div>
        </section>

        {/* search */}

        <div className="mb-3 flex gap-4 flex-wrap ">
          {/* Search */}
          <div className="relative flex-1 ">
            <img
              src="/search.svg"
              alt="search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            />
            <input
              type="search"
              placeholder="Search documents here..."
              className="w-full rounded-xl border border-zinc-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
            />
          </div>

          {/* Lawyer Type */}
          <select className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm">
            <option value="all">All Type</option>
          </select>
        </div>

        {/* list of lawyer */}
        {/* map the lawyer details */}
        <div className="space-y-3">
          {lawyerData?.map((lawyer) =>
            lawyer ? <LawyerCard key={lawyer.id} lawyer={lawyer} /> : null,
          )}
        </div>
      </div>
    </>
  );
};

export default LawyerPage;
