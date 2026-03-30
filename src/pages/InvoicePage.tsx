import { Plus } from "lucide-react"

import InvoiceList from "@/components/invoice/InvoiceList"
import AddInvoiceModel from "@/components/invoice/AddInvoiceModel"
import { useState } from "react"
import { Dialog } from "@/components/ui/dialog"

const InvoicePage = () => {
  const [openAdd, setOpenAdd] = useState<boolean>(false)
  return (
    <Dialog
      open={openAdd}
      onOpenChange={(open) => {
        if (!open) {
          setOpenAdd(false)
        }
      }}
    >
      {openAdd && <AddInvoiceModel setOpen={setOpenAdd} />}
      <button
        className="fixed right-6 bottom-6 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:outline-none lg:right-8 lg:bottom-8"
        onClick={() => {
          setOpenAdd(true)
        }}
      >
        <Plus />
      </button>
      <div className="space-y-4">
        <InvoiceList />
      </div>
    </Dialog>
  )
}

export default InvoicePage
