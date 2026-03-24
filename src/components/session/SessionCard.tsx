import { formatDate, formatTime } from "@/utils/formate"
import { useLocation, useNavigate } from "react-router-dom"
import type { sessionDataType } from "@/data/sessionData"
import { Calendar, Clock8, MoreVertical } from "lucide-react"

import { Button } from "../ui/button"
import SessionDetailsModel from "./SessionDetailsModel"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const SessionCard = (data: sessionDataType) => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  return (
    <>
      {pathname === `/session/${data.id}` && <SessionDetailsModel {...data} />}

      <div className="sessionCard group relative cursor-pointer rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="absolute top-0 left-0 h-1 w-full rounded-t-2xl bg-black"></div>

        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-black">
              {data.courtName}
            </h3>

            <p className="mt-1 text-sm text-black">
              Client Id:
              <span className="font-semibold text-zinc-700">
                {" "}
                {data.caseId}
              </span>
            </p>
          </div>
          <div>
            {/* Drop down menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4 text-black" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/session/${data.id}`)
                  }}
                >
                  View
                </DropdownMenuItem>
                  </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-5 space-y-2 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">
              <Calendar />
            </span>
            <span>{formatDate(data.sessionDate)}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400">
              <Clock8 />
            </span>
            <span>{formatTime(data.sessionTime)}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default SessionCard
