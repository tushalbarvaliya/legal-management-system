import { MoreVertical } from "lucide-react"

import { Button } from "../ui/button"
import { formatDate } from "@/utils/formate"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import type { StaffUserMapping } from "@/types/staffType"
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Dialog } from "../ui/dialog"
import UpdateStaff from "./UpdateStaff"
import StaffDetailsDialog from "./StaffDetailsModel"
import { useMutation } from "@tanstack/react-query"
import { blockStaff, deleteStaff, patchUnblockStaff } from "@/api/staffAPI"
import { toast } from "sonner"
import { queryClient } from "@/main"
import DeleteModel from "../DeleteModel"
import BlockModel from "../BlockModel"
import UnblockModel from "../UnblockModel"

const StaffCard = (staff: StaffUserMapping) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [openUnblock, setOpenUnblock] = useState<boolean>(false)
  const [openBlock, setOpenBlock] = useState<boolean>(false)
  const navigate = useNavigate()
  const pathname = useLocation().pathname

  const { mutate: DeleteMutate, isPending: DeleteIsPending } = useMutation({
    mutationFn: deleteStaff,
    onSuccess: () => {
      toast.success("Delete Lawyer Successfully", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["staff"] })
      setOpenDelete(false)
    },
    onError: (error) => {
      toast.error(`Error ${error.message}`)
    },
  })

  const { mutate: BlockMutate, isPending: BlockIsPending } = useMutation({
    mutationFn: blockStaff,
    onSuccess: () => {
      toast.success("Block Staff Successfully", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["staff"] })
      setOpenBlock(false)
    },
    onError: (error) => {
      toast.error(`Error ${error.message}`)
    },
  })

  const { mutate: UnblockMutate, isPending: UnblockIsPending } = useMutation({
    mutationFn: patchUnblockStaff,
    onSuccess: () => {
      setOpenUnblock(false)
      toast.success("Unblock Staff Successfully", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["staff"] })
    },
    onError: (error) => {
      toast.error(`Error ${error.message}`)
    },
  })

  return (
    <Dialog
      open={
        openDelete ||
        openUnblock ||
        openBlock ||
        pathname == `/staff/edit/${staff.staff.id}` ||
        pathname == `/staff/${staff.staff.id}`
      }
      onOpenChange={(open) => {
        setOpenDelete(false)
        setOpenUnblock(false)
        setOpenBlock(false)
        if (!open) navigate("/staff")
      }}
    >
      {pathname == `/staff/${staff.staff.id}` && (
        <StaffDetailsDialog staff={staff} />
      )}
      {openBlock && (
        <BlockModel
          title="Block Staff"
          subTitle="Are you sure you want to block this staff?"
          detailsTitle={`${staff.user.firstName}  ${staff.user.lastName}`}
          id={staff.staff.id}
          isPending={BlockIsPending}
          mutate={BlockMutate}
          onClosed={setOpenBlock}
        />
      )}

      {pathname == `/staff/edit/${staff.staff.id}` && (
        <UpdateStaff staff={staff} />
      )}
      {openDelete && (
        <DeleteModel
          title="Delete Staff"
          subTitle="Are you sure you want to delete this staff?"
          detailsTitle={`${staff.user.firstName}  ${staff.user.lastName}`}
          id={staff.staff.id}
          isPending={DeleteIsPending}
          mutate={DeleteMutate}
          setOpenDelete={setOpenDelete}
        />
      )}
      {openUnblock && (
        <UnblockModel
          title="Unblock Staff"
          subTitle="Are you sure you want to unblock this staff?"
          detailsTitle={`${staff.user.firstName}  ${staff.user.lastName}`}
          id={staff.staff.id}
          isPending={UnblockIsPending}
          mutate={UnblockMutate}
          setOpenUnblock={setOpenUnblock}
        />
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
              staff.staff.isBlocked === 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {staff.staff.isBlocked === 0 ? "Active" : "Blocked"}
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
                View
              </DropdownMenuItem>
              {staff.staff.isBlocked === 0 && (
                <DropdownMenuItem
                  onClick={() => {
                    setOpenBlock(true)
                  }}
                >
                  Block
                </DropdownMenuItem>
              )}
              {staff.staff.isBlocked === 1 && (
                <DropdownMenuItem
                  onClick={() => {
                    setOpenUnblock(true)
                  }}
                >
                  Unblock
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/staff/edit/${staff.staff.id}`)
                }}
              >
                Edit
              </DropdownMenuItem>
              {staff.staff.isBlocked == 0 && (
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => {
                    setOpenDelete(true)
                  }}
                >
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Dialog>
  )
}

export default StaffCard
