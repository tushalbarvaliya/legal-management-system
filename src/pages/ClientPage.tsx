import { useState } from "react"
import { Search } from "lucide-react"
import { Virtuoso } from "react-virtuoso"

import type { ClientUserMapping } from "@/types/clientType"
import ClientCardSkeleton from "@/components/client/ClientCardSkeleton"
import ClientHeader from "@/components/client/ClientHeader"
import ErrorMessage from "@/components/ErrorMessage"
import NoFound from "@/components/NoFound"
import ClientCard from "@/components/client/ClientCard"
import { Helmet } from "react-helmet-async"
import { useGetClientQuery } from "@/store/services/clientAPI"

const ClientPage = () => {
  const [search, setSearch] = useState("")

  const { data: clients, isLoading, isError } = useGetClientQuery()
  const filteredClients = clients?.data.filter((item: ClientUserMapping) =>
    [...Object.values(item.client), ...Object.values(item.user)].some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  )

  return (
    <>
      <Helmet>
        <title>Client Management</title>
      </Helmet>
      <section className="shadow-soft mt-2 h-[90vh] rounded-2xl border-zinc-200 bg-white">
        <ClientHeader />
        <div className="mx-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between ">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Client List
          </h2>
          <div className="mb-4 flex">
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
        </div>
        {/* map for client list */}
        <div className="sm:h-[75%] h-[70%] ">
          {isError && <ErrorMessage />}
          {!isLoading &&
            !isError &&
            filteredClients &&
            filteredClients?.length > 0 && (
              <Virtuoso
                style={{ height: '100%'}}
                data={filteredClients}
                overscan={200}
                className="no-scrollbar"
                itemContent={(_index, client) => (
                  <ClientCard client={client} key={client.client.id} />
                )}
              />
            )}
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
