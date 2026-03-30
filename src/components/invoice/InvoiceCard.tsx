import type { invoiceDataType } from "@/types/invoiceType"
import { formatDate } from "@/utils/formate"
import { useLocation, useNavigate } from "react-router-dom"
import DeleteInvoiceModel from "./DeleteInvoiceModel"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreVertical } from "lucide-react"
import InvoiceDetailsModal from "./InvoiceDetailsModal"
import EditInvoiceModel from "./EditInvoiceModel"
import { useMutation } from "@tanstack/react-query"
import { pay } from "@/api/invoiceAPI"
import { useAppSelector } from "@/hooks/hooks"

const InvoiceCard = (invoice: invoiceDataType) => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const role = useAppSelector((state) => state.auth.role)
  const { mutate } = useMutation({
    mutationFn: pay,
    onSuccess: (data) => {
      window.location.href = data.checkout_url
    },
  })
  return (
    <>
      {pathname === `/invoice/edit/${invoice.id}` && (
        <EditInvoiceModel {...invoice} />
      )}
      {pathname === `/invoice/delete/${invoice.id}` && (
        <DeleteInvoiceModel {...invoice} />
      )}
      {pathname === `/invoice/${invoice.id}` && (
        <InvoiceDetailsModal {...invoice} />
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
                    navigate(`/invoice/${invoice.id}`)
                  }}
                >
                  View
                </DropdownMenuItem>
                {role === "lawyer" && (
                  <>
                    <DropdownMenuItem
                      onClick={() => {
                        navigate(`/invoice/edit/${invoice.id}`)
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={() => {
                        navigate(`/invoice/delete/${invoice.id}`)
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
                {role === "client" && (
                  <DropdownMenuItem
                    className="text-green-500"
                    onClick={() => {
                      mutate(invoice)
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
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
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
    </>
  )
}

export default InvoiceCard
