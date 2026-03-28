import { formatDate } from "@/utils/formate"
import type { LawyerDataType } from "@/types/lawyerType"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const LawyerDetails = ({
  lawyer,
  setOpenDetails,
}: {
  lawyer: LawyerDataType
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <DialogContent className="no-scrollbar max-h-[99vh] w-full max-w-2xl overflow-y-auto lg:min-w-200">
      {/* Header */}
      <DialogHeader className="flex flex-row items-center justify-between border-b pb-3">
        <div>
          <DialogTitle>Lawyer Details</DialogTitle>
          <p className="mt-1 text-xs text-zinc-500">
            {formatDate(lawyer.lawyer.createdAt)}
          </p>
        </div>
      </DialogHeader>

      {/* Body */}
      <div className="space-y-4 py-4">
        {/* Name + Status */}
        <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-zinc-50 p-4">
          <p className="text-lg font-semibold">
            {lawyer.user.firstName} {lawyer.user.lastName}
          </p>

          {lawyer.lawyer.isBlocked === 1 && (
            <span className="rounded-full bg-zinc-200 px-3 py-1 text-xs">
              Block
            </span>
          )}

          {lawyer.lawyer.isDeleted === 1 && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">
              Deleted
            </span>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <p>
            <span className="font-medium text-zinc-500">Mobile:</span>{" "}
            {lawyer.user.phoneNumber}
          </p>

          <p>
            <span className="font-medium text-zinc-500">Gender:</span>{" "}
            {lawyer.user.gender}
          </p>

          <p>
            <span className="font-medium text-zinc-500">Specialization:</span>{" "}
            {lawyer.lawyer.specialization}
          </p>

          <p>
            <span className="font-medium text-zinc-500">Role:</span>{" "}
            {lawyer.user.role}
          </p>
        </div>

        {/* Email */}
        <div className="rounded-xl border p-4">
          <p className="text-xs font-semibold text-zinc-500 uppercase">Email</p>
          <p className="mt-1 text-sm">{lawyer.user.email}</p>
        </div>

        {/* Address */}
        <div className="rounded-xl border p-4">
          <p className="text-xs font-semibold text-zinc-500 uppercase">
            Address
          </p>
          <p className="mt-1 text-sm">{lawyer.user.address}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t pt-4">
          <Button onClick={() => setOpenDetails(false)}>Close</Button>
        </div>
      </div>
    </DialogContent>
  )
}

export default LawyerDetails
