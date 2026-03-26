import { useNavigate } from "react-router-dom"

import { formatDate } from "@/utils/formate"
import type { LawyerDataType } from "@/types/lawyerType"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const LawyerDetailsModel = (data: LawyerDataType) => {
  const navigate = useNavigate()

  return (
    <DialogContent className="max-h-[99vh] w-full max-w-2xl lg:min-w-200 overflow-y-auto no-scrollbar">
      {/* Header */}
      <DialogHeader className="flex flex-row items-center justify-between border-b pb-3">
        <div>
          <DialogTitle>Lawyer Details</DialogTitle>
          <p className="mt-1 text-xs text-zinc-500">
            {formatDate(data.lawyer.createdAt)}
          </p>
        </div>
      </DialogHeader>

      {/* Body */}
      <div className="space-y-4 py-4">
        {/* Name + Status */}
        <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-zinc-50 p-4">
          <p className="text-lg font-semibold">
            {data.user.firstName} {data.user.lastName}
          </p>

          {data.lawyer.isBlocked === "\u0001" && (
            <span className="rounded-full bg-zinc-200 px-3 py-1 text-xs">
              Block
            </span>
          )}

          {data.lawyer.isDeleted === "\u0001" && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">
              Deleted
            </span>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <p>
            <span className="font-medium text-zinc-500">Mobile:</span>{" "}
            {data.user.phoneNumber}
          </p>

          <p>
            <span className="font-medium text-zinc-500">Gender:</span>{" "}
            {data.user.gender}
          </p>

          <p>
            <span className="font-medium text-zinc-500">Specialization:</span>{" "}
            {data.lawyer.specialization}
          </p>

          <p>
            <span className="font-medium text-zinc-500">Role:</span>{" "}
            {data.user.role}
          </p>
        </div>

        {/* Email */}
        <div className="rounded-xl border p-4">
          <p className="text-xs font-semibold text-zinc-500 uppercase">Email</p>
          <p className="mt-1 text-sm">{data.user.email}</p>
        </div>

        {/* Address */}
        <div className="rounded-xl border p-4">
          <p className="text-xs font-semibold text-zinc-500 uppercase">
            Address
          </p>
          <p className="mt-1 text-sm">{data.user.address}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t pt-4 ">
          <Button onClick={() => navigate("/lawyer")}>Close</Button>
        </div>
      </div>
    </DialogContent>
  )
}

export default LawyerDetailsModel
