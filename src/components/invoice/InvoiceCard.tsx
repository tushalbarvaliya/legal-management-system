import { useMutation } from "@tanstack/react-query"
import { MoreVertical } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import type { Payment } from "@/types/invoiceType"
import { formatDate } from "@/utils/formate"
import { Button } from "../ui/button"
import EditInvoiceModel from "./EditInvoiceModel"
import { deleteInvoice, pay } from "@/api/invoiceAPI"
import InvoiceDetailsModal from "./InvoiceDetailsModal"
import { useAppSelector } from "@/hooks/hooks"
import { Dialog } from "../ui/dialog"
import DeleteModel from "../DeleteModel"
import { queryClient } from "@/main"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const InvoiceCard = (invoice: Payment) => {
  const [openView, setOpenView] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const role = useAppSelector((state) => state.auth.role)
  const { mutate: DeleteMutate, isPending: DeleteIsPending } = useMutation({
    mutationFn: deleteInvoice,
    onSuccess: () => {
      toast.success("Invoice Deleted")
      queryClient.invalidateQueries({ queryKey: ["invoices"] })
      setOpenDelete(false)
    },
    onError: (error) => {
      toast.error(`Error ${error}`)
    },
  })
  const { mutate } = useMutation({
    mutationFn: pay,
    onSuccess: (data) => {
      window.location.href = data.checkout_url
    },
  })
  return (
    <Dialog
      open={openView || openDelete || openEdit}
      onOpenChange={(open) => {
        if (!open) {
          setOpenView(false)
          setOpenEdit(false)
          setOpenDelete(false)
        }
      }}
    >
      {openEdit && <EditInvoiceModel data={invoice} setOpen={setOpenEdit} />}
      {openDelete && (
        <DeleteModel
          title="Delete Invoice"
          subTitle="Are you sure you want to delete This invoice?"
          detailsTitle={`${invoice.totalAmount}`}
          id={invoice.id}
          isPending={DeleteIsPending}
          mutate={DeleteMutate}
          setOpenDelete={setOpenDelete}
        />
      )}
      {openView && (
        <InvoiceDetailsModal data={invoice} setOpenView={setOpenView} />
      )}
      <div className="shadow-soft rounded-2xl border border-zinc-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs tracking-[0.2em] text-zinc-900 uppercase">
              Case ID: {invoice.caseId}
            </p>
            <p className="mt-1 text-lg font-semibold text-zinc-900">
              Client ID: {invoice.clientId}
            </p>
          </div>

          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={() => {
                    setOpenView(true)
                  }}
                >
                  View
                </DropdownMenuItem>
                {role === "lawyer" && invoice.paymentStatus == "pending" && (
                  <>
                    <DropdownMenuItem
                      onClick={() => {
                        setOpenEdit(true)
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={() => {
                        setOpenDelete(true)
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
                {role === "client" && invoice.status!='paid' && (
                  <DropdownMenuItem
                    className="text-green-500"
                    onClick={() => {
                      mutate(invoice.id)
                    }}
                  >
                    Pay
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-zinc-600">
          <div>
            <p className="text-xs text-zinc-400 uppercase">Total Amount</p>
            <p className="font-medium text-zinc-800">${invoice.totalAmount}</p>
          </div>

          <div>
            <p className="text-xs text-zinc-400 uppercase">Total Hours</p>
            <p className="font-medium text-zinc-800">{invoice.totalHours}</p>
          </div>

          <div>
            <p className="text-xs text-zinc-400 uppercase">Status</p>
            <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold">
              {invoice.status}
            </span>
          </div>

          <div>
            <p className="text-xs text-zinc-400 uppercase">Invoice Date</p>
            <p className="font-medium text-zinc-800">
              {formatDate(invoice.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default InvoiceCard
