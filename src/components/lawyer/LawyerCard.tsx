import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreVertical } from "lucide-react"
import type { LawyerDataType } from "@/types/lawyerType"
import LawyerDetails from "./LawyerDetails"
import { Dialog } from "../ui/dialog"
import UpdateLawyer from "./UpdateLawyer"
import { useState } from "react"
import BlockModel from "../BlockModel"
import { toast } from "sonner"
import UnblockModel from "../UnblockModel"
import DeleteModel from "../DeleteModel"
import {
  useBlockLawyerMutation,
  useDeleteLawyerMutation,
  useUnblockLawyerMutation,
} from "@/store/services/lawyerAPI"

const LawyerCard = (lawyer: LawyerDataType) => {
  const [openDetails, setOpenDetails] = useState<boolean>(false)
  const [openUpdate, setOpenUpdate] = useState<boolean>(false)
  const [openUnblock, setOpenUnblock] = useState<boolean>(false)
  const [openBlock, setOpenBlock] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)

  const [blockLawyer, { isLoading: isPendingBlock }] = useBlockLawyerMutation()
  const mutateBlock = async (_: number) => {
    try {
      await blockLawyer(lawyer.lawyer.id).unwrap()
      toast.success("Block Lawyer Successfully", { duration: 1500 })
      setOpenBlock(false)
    } catch {
      toast.error(`Block Failed`)
    }
  }

  const [unblockLawyer, { isLoading: isPendingUnblock }] =
    useUnblockLawyerMutation()
  const mutateUnblock = async (_: number) => {
    try {
      await unblockLawyer(lawyer.lawyer.id).unwrap()
      toast.success("Unblock Lawyer Successfully", { duration: 1500 })
      setOpenUnblock(false)
    } catch {
      toast.error(`Unblock Failed`)
    }
  }

  

  const [deleteLawyer, { isLoading: deleteIsPending }] =
    useDeleteLawyerMutation()
  const deleteMutate = async (_: number) => {
    try {
      await deleteLawyer(lawyer.lawyer.id).unwrap()
      toast.success("Delete Lawyer Successfully", { duration: 1500 })
      setOpenDelete(false)
    } catch {
      toast.error(`Delete Failed`)
    }
  }

  return (
    <Dialog
      open={openDelete || openUpdate || openDetails || openBlock || openUnblock}
      onOpenChange={(open) => {
        if (!open) {
          setOpenUnblock(false)
          setOpenDetails(false)
          setOpenUpdate(false)
          setOpenBlock(false)
          setOpenDelete(false)
        }
      }}
    >
      {openDelete && (
        <DeleteModel
          title="Delete Lawyer"
          subTitle="Are you sure you want to delete this user?"
          detailsTitle={`${lawyer.user.firstName} ${lawyer.user.lastName}`}
          id={lawyer.lawyer.id}
          mutate={deleteMutate}
          isPending={deleteIsPending}
          setOpenDelete={setOpenDelete}
        />
      )}
      {openBlock && (
        <BlockModel
          id={lawyer.lawyer.id}
          title="Block Lawyer"
          detailsTitle={`${lawyer.user.firstName} ${lawyer.user.lastName}`}
          subTitle="Are you Sure You Want to Block This Lawyer?"
          isPending={isPendingBlock}
          mutate={mutateBlock}
          onClosed={setOpenBlock}
        />
      )}
      {openUpdate && (
        <UpdateLawyer lawyer={lawyer} setOpenUpdate={setOpenUpdate} />
      )}
      {openDetails && (
        <LawyerDetails lawyer={lawyer} setOpenDetails={setOpenDetails} />
      )}
      {openUnblock && (
        <UnblockModel
          title="Unblock Lawyer"
          subTitle="Are you sure you want to Unblock this user?"
          detailsTitle={`${lawyer.user.firstName} ${lawyer.user.lastName}`}
          id={lawyer.lawyer.id}
          mutate={mutateUnblock}
          isPending={isPendingUnblock}
          setOpenUnblock={setOpenUnblock}
        />
      )}

      <div className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
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
              {lawyer.user.firstName} {lawyer.user.lastName}{" "}
              {lawyer.lawyer.isDeleted === "\u0001" && (
                <span className="rounded-full bg-red-200 px-2 py-1 text-xs text-red-500">
                  {"Delete"}
                </span>
              )}{" "}
              {lawyer.lawyer.isBlocked === "\u0001" && (
                <span className="rounded-full bg-stone-200 px-2 py-1 text-xs text-stone-500">
                  {"Blocked"}
                </span>
              )}
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
                  setOpenDetails(true)
                }}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpenUpdate(true)
                }}
              >
                Edit
              </DropdownMenuItem>

              {lawyer.lawyer.isBlocked === "\u0000" && (
                <DropdownMenuItem
                  onClick={() => {
                    setOpenBlock(true)
                  }}
                >
                  Block
                </DropdownMenuItem>
              )}
              {lawyer.lawyer.isBlocked === "\u0001" && (
                <DropdownMenuItem
                  onClick={() => {
                    setOpenUnblock(true)
                  }}
                >
                  Unblock
                </DropdownMenuItem>
              )}

              {lawyer.lawyer.isDeleted === "\u0000" && (
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

export default LawyerCard
