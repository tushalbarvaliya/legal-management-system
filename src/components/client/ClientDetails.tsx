import { useNavigate } from "react-router-dom"

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { formatDate } from "@/utils/formate"
import type {  ClientUserMapping } from "@/types/clientType"

type Props = {
  data: ClientUserMapping
}

const ClientDetails = ({ data }: Props) => {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate("/client")
  }

  return (
    <DialogContent className="max-w-2xl p-0">
      {/* Header */}
      <DialogHeader className="border-b px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <DialogTitle className="text-lg font-semibold tracking-tight text-zinc-900">
              Client Details
            </DialogTitle>
            <p className="mt-2 text-xs text-stone-600">
              {formatDate(data.client.createdAt)}
            </p>
          </div>
        </div>
      </DialogHeader>

      {/* Body */}
      <div className="space-y-4 px-5 py-4 sm:px-6 sm:py-5">
        {/* Name + Status */}
        <div className="flex gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-lg font-semibold text-zinc-900">
            {data.user.firstName} {data.user.lastName}
          </p>

          {data.client.isBlocked === "\u0001" && (
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-black">
              Block
            </span>
          )}

          {data.client.isDeleted === "\u0001" && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
              Deleted
            </span>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-3 text-sm text-zinc-700 sm:grid-cols-2">
          <p>
            <span className="font-medium text-zinc-500">Mobile:</span>{" "}
            <span>{data.user.phoneNumber}</span>
          </p>

          <p>
            <span className="font-medium text-zinc-500">Other Phone:</span>{" "}
            <span>-</span>
          </p>

          <p>
            <span className="font-medium text-zinc-500">Occupation:</span>{" "}
            <span>{data.client.occupation}</span>
          </p>

          <p>
            <span className="font-medium text-zinc-500">Gender:</span>{" "}
            <span>{data.user.gender}</span>
          </p>
        </div>

        {/* Email */}
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-xs font-semibold tracking-[0.12em] text-zinc-500 uppercase">
            Email
          </p>
          <p className="mt-1 text-sm text-zinc-700">{data.user.email}</p>
        </div>

        {/* Address */}
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-xs font-semibold tracking-[0.12em] text-zinc-500 uppercase">
            Address
          </p>
          <p className="mt-1 text-sm text-zinc-700">{data.user.address}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-zinc-200 pt-4">
          <button
            type="button"
            className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </DialogContent>
  )
}

export default ClientDetails
