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
