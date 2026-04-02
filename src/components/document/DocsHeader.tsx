import { Plus } from "lucide-react"
import { useState } from "react"

import AddDocsModal from "./AddDocsModal"
import { Dialog } from "../ui/dialog"

const DocsHeader = () => {
  const [openAdd, setOpenAdd] = useState<boolean>(false)
  return (
    <Dialog
      open={openAdd}
      onOpenChange={(open) => {
        if (!open) setOpenAdd(false)
      }}
    >
      {openAdd && <AddDocsModal setOpenAdd={setOpenAdd}/>}
      <section className="shadow-soft rounded-2xl border border-zinc-200 bg-linear-to-br from-white to-zinc-50 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Document Management
            </h1>
          </div>
          <button
            className="fixed right-6 bottom-6 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:outline-none lg:right-8 lg:bottom-8"
            type="button"
            onClick={() => {
              setOpenAdd(true)
            }}
          >
            <Plus />
          </button>
        </div>
      </section>
    </Dialog>
  )
}

export default DocsHeader
