import { MoreVertical } from "lucide-react"

import { Button } from "../ui/button"
import { formatDate } from "@/utils/formate"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import type { StaffUserMapping } from "@/data/satffData"
import { useMutation } from "@tanstack/react-query"
import { deleteStaff } from "@/api/staffAPI"
import { queryClient } from "@/main"
import { useLocation, useNavigate } from "react-router-dom"
import StaffDetailsModel from "./StaffDetailsModel"
import BlockStaffModel from "./BlockStaffModel"
import UpdateStaffModel from "./UpdateStaffModel"

const StaffCard = (staff: StaffUserMapping) => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  const { mutate } = useMutation({
    mutationFn: deleteStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] })
      navigate("/staff")
    },
  })

  return (
    <>
      {pathname == `/staff/${staff.staff.id}` && (
        <StaffDetailsModel {...staff} />
      )}
      {pathname == `/staff/block/${staff.staff.id}` && (
        <BlockStaffModel {...staff} />
      )}
      {pathname == `/staff/edit/${staff.staff.id}` && (
        <UpdateStaffModel {...staff} />
      )}
      <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
        {/* LEFT SECTION */}
        <div className="flex flex-1 items-start gap-4 sm:items-center">
          {/* Avatar */}
          <div className="flex h-12 w-12 min-w-12 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
            {staff.user.firstName?.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="flex w-full flex-col gap-2">
            {/* Name */}
            <p className="text-base font-semibold text-zinc-900">
              {staff.user.firstName} {staff.user.lastName ?? ""}
            </p>

            {/* Details */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-1 text-xs text-zinc-600 sm:grid-cols-2 lg:grid-cols-4">
              <p>
                <span className="font-medium text-zinc-800">Email:</span>{" "}
                {staff.user.email}
              </p>
              <p>
                <span className="font-medium text-zinc-800">Username:</span>{" "}
                {staff.user.name}
              </p>
              <p>
                <span className="font-medium text-zinc-800">Phone:</span>{" "}
                {staff.user.phoneNumber}
              </p>
              <p>
                <span className="font-medium text-zinc-800">created At:</span>{" "}
                {formatDate(staff.staff.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          {/* Status Badge */}
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${
              staff.user.isBlocked === "\u0000"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {staff.user.isBlocked === "\u0000" ? "Active" : "Blocked"}
          </span>

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
                  navigate(`/staff/${staff.staff.id}`)
                }}
              >
                view
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/staff/block/${staff.staff.id}`)
                }}
              >
                Block
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/staff/edit/${staff.staff.id}`)
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  mutate(staff)
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

export default StaffCard
