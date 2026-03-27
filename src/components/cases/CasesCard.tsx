import { MoreVertical } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/hooks/hooks"
import { formatDate } from "@/utils/formate"
import type { CaseDataType } from "@/types/caseType"
import DeleteCaseModel from "./DeleteCaseModel"
import CaseDetailModel from "./CaseDetailModel"
import EditCaseModel from "./EditCaseModel"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

const CasesCard = (data: CaseDataType) => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const role = useAppSelector((state) => state.auth.role)
  return (
    <>
      {pathname === `/cases/delete/${data.id}` && <DeleteCaseModel {...data} />}
      {pathname === `/cases/${data.id}` && <CaseDetailModel {...data} />}
      {pathname === `/cases/edit/${data.id}` && <EditCaseModel {...data} />}

      {/* TASK CARD */}
      <article className="group hover:shadow-soft relative cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 shadow-sm transition duration-200 hover:bg-zinc-100/80">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            {/* TITLE */}
            <div className="group/title relative inline-flex max-w-full items-center">
              <h2 className="truncate text-sm font-semibold text-zinc-900 transition duration-200 group-hover:text-zinc-950">
                {data.id}{" "}{data.title}
              </h2>

              {/* TOOLTIP */}
              <div className="pointer-events-none absolute top-full left-0 z-10 mt-2 hidden w-70 max-w-[70vw] rounded-lg bg-zinc-900/95 p-3 text-xs leading-relaxed text-zinc-100 opacity-0 shadow-lg backdrop-blur-sm transition duration-200 group-hover/title:block group-hover/title:opacity-100">
                {data.description}
              </div>
            </div>

            {/* INFO GRID */}
            <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-zinc-600 sm:grid-cols-2 lg:grid-cols-4">
              <p>
                <span className="font-semibold text-zinc-700">Created:</span>{" "}
                {formatDate(data.createdAt)}
              </p>

              <p>
                <span className="font-semibold text-zinc-700">Priority:</span>
                <span
                  className={`ml-1 inline-flex rounded-full px-2 py-0.5 font-medium`}
                >
                  {data.caseStage}
                </span>
              </p>

              <p>
                <span className="font-semibold text-zinc-700">
                  Client Name :
                </span>{" "}
                {data.clientId}
              </p>
              <p>
                <span className="font-semibold text-zinc-700">
                  Case Type :{" "}
                </span>{" "}
                {data.type}
              </p>
            </div>
          </div>

          {/* MENU DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/cases/${data.id}`)
                }}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/cases/edit/${data.id}`)
                }}
              >
                Edit
              </DropdownMenuItem>
              {role == "lawyer" && (
                <>
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => {
                      navigate(`/cases/delete/${data.id}`)
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </article>
    </>
  )
}

export default CasesCard
