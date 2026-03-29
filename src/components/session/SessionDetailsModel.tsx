// import type { sessionDataType } from "@/data/sessionData"
// import { useNavigate } from "react-router-dom"
// import { Calendar, Clock8, X } from "lucide-react"
// import { formatDate } from "@/utils/formate"

// const SessionDetailsModel = (data: sessionDataType) => {
//   const navigate = useNavigate()
//   return (
//     <>
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
//         <div className="w-full max-w-xl animate-[fadeIn_.2s_ease] rounded-2xl border border-zinc-200 bg-white shadow-2xl">
//           <div className="flex items-center justify-between border-b px-6 py-4">
//             <h2 className="text-lg font-semibold text-zinc-900">
//               Session Details
//             </h2>

//             <button
//               onClick={() => {
//                 navigate("/session")
//               }}
//               className="text-xl text-zinc-400 hover:text-zinc-700"
//             >
//               <X />
//             </button>
//           </div>

//           <div className="space-y-4 px-6 py-5 text-sm text-zinc-700">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-xs text-zinc-500">Court Name</p>
//                 <p className="font-medium">{data.courtName}</p>
//               </div>

//               <div>
//                 <p className="text-xs text-zinc-500">Client ID</p>
//                 <p className="font-medium">{data.clientId}</p>
//               </div>

//               <div>
//                 <p className="text-xs text-zinc-500">Case ID</p>
//                 <p className="font-medium">{data.caseId}</p>
//               </div>

//               <div>
//                 <p className="text-xs text-zinc-500">Date</p>
//                 <p className="flex font-medium">
//                   <span>
//                     <Calendar className="mr-2 h-5 w-5" />
//                   </span>
//                   {formatDate(data.sessionDate)}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-xs text-zinc-500">Time</p>
//                 <p className="flex font-medium">
//                   <span>
//                     <Clock8 className="mr-2 h-5 w-5" />
//                   </span>{" "}
//                   {data.sessionTime}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-4 px-6 pb-6">
//             <button
//               className="w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:scale-[1.02] hover:bg-black"
//               onClick={() => {
//                 navigate("/session")
//               }}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default SessionDetailsModel
import { Calendar, Clock8 } from "lucide-react"
import { formatDate, formatTime } from "@/utils/formate"

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { SessionWithCaseResponse } from "@/types/sessionType"

type Props = {
  data: SessionWithCaseResponse
  setOpenView: React.Dispatch<React.SetStateAction<boolean>>
}

const SessionDetailsModal = ({ data,setOpenView }: Props) => {

  return (
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Session Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm text-zinc-700">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-500">Court Name</p>
              <p className="font-medium">{data.session.courtName}</p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">Client ID</p>
              <p className="font-medium">{data.session.clientId}</p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">Case </p>
              <p className="font-medium">{data.case.title}</p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">Date</p>
              <p className="flex items-center font-medium">
                <Calendar className="mr-2 h-4 w-4" />
                {formatDate(data.session.sessionDate)}
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">Time</p>
              <p className="flex items-center font-medium">
                <Clock8 className="mr-2 h-4 w-4" />
                {formatTime(data.session.sessionTime)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            className="w-full"
            onClick={() => {
              setOpenView(false)
            }}
          >
            Close
          </Button>
        </div>
      </DialogContent>
  )
}

export default SessionDetailsModal
