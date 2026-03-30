import { Calendar, Clock8 } from "lucide-react"
import { useState } from "react"

import { formatDate, formatTime } from "@/utils/formate"
import SessionDetailsModel from "./SessionDetailsModel"
import type { SessionWithCaseResponse } from "@/types/sessionType"
import { Dialog } from "../ui/dialog"

const SessionCard = ({ data }: { data: SessionWithCaseResponse }) => {
  const [openView, setOpenView] = useState<boolean>(false)

  return (
    <Dialog
      open={openView}
      onOpenChange={(open) => {
        if (!open) {
          setOpenView(false)
        }
      }}
    >
      {openView && (
        <SessionDetailsModel data={data} setOpenView={setOpenView} />
      )}

      <div
        className="sessionCard group relative cursor-pointer rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        onClick={() => {
          setOpenView(true)
        }}
      >
        <div className="absolute top-0 left-0 h-1 w-full rounded-t-2xl bg-black"></div>

        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-black">
              {data.session.courtName}
            </h3>

            <p className="mt-1 text-sm text-black">
              Case :
              <span className="font-semibold text-zinc-700">
                {" "}
                {data.case.title}
              </span>
            </p>
          </div>
          <div></div>
        </div>

        <div className="mt-5 space-y-2 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">
              <Calendar />
            </span>
            <span>{formatDate(data.session.sessionDate)}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400">
              <Clock8 />
            </span>
            <span>{formatTime(data.session.sessionTime)}</span>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default SessionCard
