import { getAllClient } from "@/api/clientAPI";
import ClientCard from "@/components/Client/ClientCard";
import ClientCardSkeleton from "@/components/Client/ClientCardSkeleton";
import ClientHeader from "@/components/Client/ClientHeader";
import NoClientFound from "@/components/NoClientFound";
import type { ClientProps } from "@/types/clientType";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const ClientPage = () => {
  const [search, setSearch] = useState("");
  const { data: clients, isLoading } = useQuery<ClientProps[]>({
    queryKey: ["client"],
    queryFn: getAllClient,
  });

  const filteredClients = clients?.filter((clients: ClientProps) =>
    Object.values(clients).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase()),
    ),
  );
  return (
    <>
      <ClientHeader />
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-soft sm:p-6 mt-2">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Client List
          </h2>
        </div>
        <div className="mb-4">
          <label htmlFor="clientSearchInput" className="sr-only">
            Search clients
          </label>
          <div className="relative">
            <img
              src="/search.svg"
              alt="search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3 text-sm text-zinc-900 outline-none transition duration-200 placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <div id="clientList" className="space-y-3">
          {/* map for client list */}
          {!isLoading &&
            filteredClients?.map((item: ClientProps) => {
                return <ClientCard key={item._id} {...item} />;
            })}
            <ClientCardSkeleton/>
          {filteredClients?.length == 0 && <NoClientFound title="client" />}
        </div>
      </section>
    </>
  );
};

export default ClientPage;
