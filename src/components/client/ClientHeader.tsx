import { useState } from "react"
import { Plus } from "lucide-react"

import { useAppSelector } from "@/hooks/hooks"
import { Dialog } from "../ui/dialog"
import { Button } from "../ui/button"
import AddClient from "./AddClient"

const ClientHeader = () => {
  const role = useAppSelector((state) => state.auth.role)
  const [openAdd, setOpenAdd] = useState<boolean>(false)

  return (
    <Dialog
      open={openAdd}
      onOpenChange={(open) => {
        if (!open) {setOpenAdd(false)}
      }}
    >
      {openAdd && <AddClient setOpenAdd={setOpenAdd}/>}
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
            <Button
              className="fixed right-6 bottom-6 z-20 h-14 w-14 rounded-full p-6 hover:cursor-pointer"
              onClick={() => {
                setOpenAdd(true)
              }}
            >
              <Plus className="dark:stroke-black" />
            </Button>
          )}
        </div>
      </section>
    </Dialog>
  )
}

export default ClientHeader
