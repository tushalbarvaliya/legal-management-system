import { Plus } from "lucide-react"

import AddClientModel from "./AddClientModel"
import { useAppSelector } from "@/hooks/hooks"
import { Link, useLocation } from "react-router-dom"

const ClientHeader = () => {
  const role = useAppSelector((state) => state.auth.role)
  const pathname = useLocation().pathname

  return (
    <>
      {pathname === "/client/add" && <AddClientModel />}
      <section className="shadow-soft rounded-2xl border border-zinc-200 bg-linear-to-br from-white to-zinc-50 p-5 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Client Management
            </h1>
            <p className="mt-2 text-sm text-zinc-600 sm:text-base">
              Add, edit, and manage your clients with quick actions from a
              single list.
            </p>
            <p className="mt-3 inline-flex items-center rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-600">
              Smart search, quick actions, and detailed client profiles
            </p>
          </div>
          {role == "lawyer" && (
            <Link to="/client/add">
              <button className="fixed right-6 bottom-6 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:outline-none lg:right-8 lg:bottom-8 dark:bg-white">
                <Plus className="dark:stroke-black" />
              </button>
            </Link>
          )}
        </div>
      </section>
    </>
  )
}

export default ClientHeader
