// import { X } from "lucide-react"
// import { useNavigate } from "react-router-dom"

// import { formatDate } from "@/utils/formate"
// import type { StaffDetailsType } from "@/types/staff"

// const StaffDetailsModel = (staff: StaffDetailsType) => {
//   const navigate = useNavigate()

//   return (
//     <>
//       <div className="fixed inset-0 z-70">
//         {/* overlay */}
//         <div className="absolute inset-0 h-screen bg-zinc-900/45"></div>

//         <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4 sm:p-6">
//           <div className="shadow-soft w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white">
//             {/* Header */}
//             <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 sm:px-6">
//               <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
//                 Staff Details
//                 <p className="mt-2 text-xs text-stone-600">
//                   {formatDate(staff.staff.createdAt)}
//                 </p>
//               </h3>

//               <button
//                 type="button"
//                 className="rounded-lg border border-zinc-200 p-2 text-zinc-700 hover:bg-zinc-100"
//                 onClick={() => navigate("/staff")}
//               >
//                 <X />
//               </button>
//             </div>

//             {/* Body */}
//             <div className="space-y-4 px-5 py-4 sm:px-6 sm:py-5">
//               {/* Name + Status */}
//               <div className="flex gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
//                 <p className="text-lg font-semibold text-zinc-900">
//                   {staff.user.firstName} {staff.user.lastName}
//                 </p>

//                 {staff.staff.isBlocked === "\u0001" && (
//                   <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-black">
//                     Block
//                   </span>
//                 )}

//                 {staff.user.isDeleted && (
//                   <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
//                     Deleted
//                   </span>
//                 )}
//               </div>

//               {/* Info Grid */}
//               <div className="grid grid-cols-1 gap-3 text-sm text-zinc-700 sm:grid-cols-2">
//                 <p>
//                   <span className="font-medium text-zinc-500">Mobile:</span>{" "}
//                   <span>{staff.user.phoneNumber}</span>
//                 </p>

//                 <p>
//                   <span className="font-medium text-zinc-500">Gender:</span>{" "}
//                   <span>{staff.user.gender}</span>
//                 </p>

//                 <p>
//                   <span className="font-medium text-zinc-500">Lawyer ID:</span>{" "}
//                   <span>{staff.staff.lawyerId}</span>
//                 </p>

//                 <p>
//                   <span className="font-medium text-zinc-500">Case ID:</span>{" "}
//                   <span>{staff.staff.caseId}</span>
//                 </p>

//                 <p>
//                   <span className="font-medium text-zinc-500">Task ID:</span>{" "}
//                   <span>{staff.staff.taskId ?? "N/A"}</span>
//                 </p>
//               </div>

//               {/* Email */}
//               <div className="rounded-xl border border-zinc-200 bg-white p-4">
//                 <p className="text-xs font-semibold text-zinc-500 uppercase">
//                   Email
//                 </p>
//                 <p className="mt-1 text-sm text-zinc-700">{staff.user.email}</p>
//               </div>

//               {/* Address */}
//               <div className="rounded-xl border border-zinc-200 bg-white p-4">
//                 <p className="text-xs font-semibold text-zinc-500 uppercase">
//                   Address
//                 </p>
//                 <p className="mt-1 text-sm text-zinc-700">
//                   {staff.user.address}
//                 </p>
//               </div>

//               {/* Footer */}
//               <div className="flex justify-end border-t border-zinc-200 pt-4">
//                 <button
//                   type="button"
//                   className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
//                   onClick={() => navigate("/staff")}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default StaffDetailsModel
import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { formatDate } from "@/utils/formate"
import type { StaffUserMapping } from "@/types/staffType"

type Props = {
  staff: StaffUserMapping
}

const StaffDetailsDialog = ({ staff }: Props) => {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate("/staff")
  }

  return (
    <DialogContent className="max-w-2xl p-0 lg:min-w-200">
      {/* Header */}
      <DialogHeader className="border-b px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <DialogTitle className="text-lg font-semibold tracking-tight text-zinc-900">
              Staff Details
            </DialogTitle>
            <p className="mt-2 text-xs text-stone-600">
              {formatDate(staff.staff.createdAt)}
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg border border-zinc-200 p-2 text-zinc-700 hover:bg-zinc-100"
            onClick={handleClose}
          >
            <X />
          </button>
        </div>
      </DialogHeader>

      {/* Body */}
      <div className="space-y-4 px-5 py-4 sm:px-6 sm:py-5">
        {/* Name + Status */}
        <div className="flex gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-lg font-semibold text-zinc-900">
            {staff.user.firstName} {staff.user.lastName}
          </p>

          {staff.staff.isBlocked === "\u0001" && (
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-black">
              Block
            </span>
          )}

          {staff.user.isDeleted && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
              Deleted
            </span>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-3 text-sm text-zinc-700 sm:grid-cols-2">
          <p>
            <span className="font-medium text-zinc-500">Mobile:</span>{" "}
            <span>{staff.user.phoneNumber}</span>
          </p>

          <p>
            <span className="font-medium text-zinc-500">Gender:</span>{" "}
            <span>{staff.user.gender}</span>
          </p>

          <p>
            <span className="font-medium text-zinc-500">Lawyer ID:</span>{" "}
            <span>{staff.staff.lawyerId}</span>
          </p>

          <p>
            <span className="font-medium text-zinc-500">Case ID:</span>{" "}
            <span>{staff.staff.caseId}</span>
          </p>

          <p>
            <span className="font-medium text-zinc-500">Task ID:</span>{" "}
            <span>{staff.staff.taskId ?? "N/A"}</span>
          </p>
        </div>

        {/* Email */}
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-xs font-semibold text-zinc-500 uppercase">Email</p>
          <p className="mt-1 text-sm text-zinc-700">{staff.user.email}</p>
        </div>

        {/* Address */}
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-xs font-semibold text-zinc-500 uppercase">
            Address
          </p>
          <p className="mt-1 text-sm text-zinc-700">{staff.user.address}</p>
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

export default StaffDetailsDialog
