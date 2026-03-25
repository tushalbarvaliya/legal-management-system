import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreVertical } from "lucide-react"
import type { LawyerDataType } from "@/data/lawyerData"
import BlockLawyerModel from "./BlockLawyerModel"
import { useLocation, useNavigate } from "react-router-dom"
import DeleteLawyerModel from "./DeleteLawyerModel"
import UpdateLawyerModel from "./UpdateLawyerModel"
import LawyerDetailsModel from "./LawyerDetailsModel"

const LawyerCard = (lawyer: LawyerDataType) => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  return (
    <>
      {pathname == `/lawyer/delete/${lawyer.lawyer.id}` && (
        <DeleteLawyerModel {...lawyer} />
      )}
      {pathname == `/lawyer/edit/${lawyer.lawyer.id}` && (
        <UpdateLawyerModel {...lawyer} />
      )}
      {pathname == `/lawyer/${lawyer.lawyer.id}` && (
        <LawyerDetailsModel {...lawyer} />
      )}
      {pathname == `/lawyer/block/${lawyer.lawyer.id}` && (
        <BlockLawyerModel {...lawyer} />
      )}

      <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
        {/* LEFT SECTION */}
        <div className="flex flex-1 items-start gap-4 sm:items-center">
          {/* Avatar */}
          <div className="flex h-12 w-12 min-w-12 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
            {lawyer.user.firstName?.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="flex w-full flex-col gap-2">
            {/* Name */}
            <p className="text-base font-semibold text-zinc-900">
              {lawyer.user.firstName} {lawyer.user.lastName}
            </p>

            {/* Details */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-1 text-xs text-zinc-600 sm:grid-cols-2 lg:grid-cols-4">
              <p>
                <span className="font-medium text-zinc-800">Email:</span>{" "}
                {lawyer.user.email}
              </p>
              <p>
                <span className="font-medium text-zinc-800">Username:</span>{" "}
                {lawyer.user.name}
              </p>
              <p>
                <span className="font-medium text-zinc-800">Phone:</span>{" "}
                {lawyer.user.phoneNumber}
              </p>
              <p>
                <span className="font-medium text-zinc-800">
                  Specialization:
                </span>{" "}
                {lawyer.lawyer.specialization}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          {/* MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-zinc-100">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40 font-medium">
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/lawyer/${lawyer.lawyer.id}`)
                }}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/lawyer/edit/${lawyer.lawyer.id}`)
                }}
              >
                Edit
              </DropdownMenuItem>
              
                <DropdownMenuItem
                  onClick={() => {
                    navigate(`/lawyer/block/${lawyer.lawyer.id}`)
                  }}
                >
                  Block
                </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  navigate(`/lawyer/delete/${lawyer.lawyer.id}`)
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  )
}

export default LawyerCard
