import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AddLawyerModel from "@/components/Lawyer/AddLawyerModel";
import LawyerCardSkeleton from "@/components/Lawyer/LawyerCardSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import { getAllStaff } from "@/api/staffAPI";
import StaffCard from "@/components/Staff/StaffCard";
import type { StaffData } from "@/Data/staffData";

const StaffPage = () => {
  const [addModelOpen, setAddModelOpen] = useState(false);
  const {
    data: StaffData,
    isLoading,
    isError,
  } = useQuery<StaffData[]>({
    queryKey: ["staff"],
    queryFn: getAllStaff,
  });

  // const [search, setSearch] = useState("");
  // const filteredLawyers = useMemo(() => {
  //   return lawyerData?.filter((lawyer) => {
  //     if (!lawyer) return false;
  //     const searchMatch =
  //       lawyer.firstName?.toLowerCase().includes(search.toLowerCase()) ||
  //       lawyer.lastName?.toLowerCase().includes(search.toLowerCase()) ||
  //       lawyer.email?.toLowerCase().includes(search.toLowerCase()) ||
  //       lawyer.phoneNumber?.includes(search);
  //     return searchMatch;
  //   });
  // }, [lawyerData, search]);

  return (
    <>
      {/* {addModelOpen && <AddLawyerModel onClose={setAddModelOpen} />} */}
      {/* Add Button */}
      <button
        className="fixed bottom-6 right-6 h-14 z-99 w-14 rounded-full bg-zinc-900 text-white shadow-xl hover:scale-105"
        onClick={() => {
          setAddModelOpen(true);
        }}
      >
        <img src="/plus.svg" alt="+" className="h-6 w-6 m-auto" />
      </button>
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-soft sm:p-6 mt-4 space-y-4">
        {/* Header */}
        <section className="rounded-2xl border border-stone-200 bg-stone-800 p-5 shadow-soft sm:p-6 text-white">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-2xl font-bold  sm:text-3xl">
                Staff Management
              </h1>
              <p className="mt-2 text-sm ">Manage your Staff efficiently.</p>
            </div>
          </div>
        </section>

        {/*  Search  */}
        <div className="flex gap-4 flex-wrap">
          {/* Search */}
          <div className="relative flex-1">
            <img
              src="/search.svg"
              alt="search"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            />
            <input
              type="search"
              placeholder="Search Staff..."
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 py-2.5 pl-9 pr-3 text-sm focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
              disabled={isError || isLoading}
            />
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {!isLoading && isError && <ErrorMessage />}
          {isLoading && (
            <>
              <LawyerCardSkeleton />
              <LawyerCardSkeleton />
              <LawyerCardSkeleton />
            </>
          )}
          {!isLoading && !isError && StaffData?.length === 0 && (
            <p className="text-sm text-zinc-500">No results found</p>
          )}
          {StaffData?.map((staff) => {
            return staff ? <StaffCard key={staff.id} staff={staff} /> : null;
          })}
        </div>
      </div>
    </>
  );
};

export default StaffPage;
