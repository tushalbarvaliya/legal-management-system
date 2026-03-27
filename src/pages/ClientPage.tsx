import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Search } from "lucide-react"

import type { ClientResponse, ClientUserMapping } from "@/types/clientType"
import { getAllClient } from "@/api/clientAPI"
import ClientCardSkeleton from "@/components/client/ClientCardSkeleton"
import ClientHeader from "@/components/client/ClientHeader"
import ErrorMessage from "@/components/ErrorMessage"
import NoFound from "@/components/NoFound"
import ClientCard from "@/components/client/ClientCard"

const ClientPage = () => {
  const [search, setSearch] = useState("")

  const {
    data: clients,
    isLoading,
    isError,
  } = useQuery<ClientResponse>({
    queryKey: ["client"],
    queryFn: getAllClient,
  })

  let filteredClients = clients?.data?.filter((clients: ClientUserMapping) =>
    Object.values(clients).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  )
  filteredClients = filteredClients?.filter(
    (item) => item.client.isDeleted == "\u0000"
  )

  return (
    <>
      <ClientHeader />
      <section className="shadow-soft mt-2 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
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
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pr-3 pl-9 text-sm text-zinc-900 transition duration-200 outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              disabled={isError || isLoading}
            />
          </div>
        </div>
        <div id="clientList" className="space-y-3">
          {/* map for client list */}
          {isError && <ErrorMessage />}
          {!isLoading &&
            !isError &&
            filteredClients?.map((item: ClientUserMapping) => {
              return <ClientCard key={item.client.id} {...item} />
            })}
          {isLoading && (
            <>
              <ClientCardSkeleton />
              <ClientCardSkeleton />
              <ClientCardSkeleton />
              <ClientCardSkeleton />
            </>
          )}
          {filteredClients?.length == 0 && <NoFound title="client" />}
        </div>
      </section>
    </>
  )
}

export default ClientPage
