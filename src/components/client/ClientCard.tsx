import { useState } from "react"
import { MoreVertical } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"

import type { ClientUserMapping } from "@/types/clientType"
import ClientDetailsModel from "./ClientDetails"
import { useAppSelector } from "@/hooks/hooks"
import { Button } from "@/components/ui/button"
import UpdateClient from "./UpdateClient"
import { Dialog } from "../ui/dialog"
import BlockModel from "../BlockModel"
import UnblockModel from "../UnblockModel"
import DeleteModel from "../DeleteModel"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  useBlockClientMutation,
  useDeleteClientMutation,
  useUnblockClientMutation,
} from "@/store/services/clientAPI"

const ClientCard = ({ client }: { client: ClientUserMapping }) => {
  const role = useAppSelector((state) => state.auth.role)
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const [openBlock, setOpenBlock] = useState<boolean>(false)
  const [openUnblock, setOpenUnblock] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  const [deleteClient, { isLoading: DeleteIsPending }] =
    useDeleteClientMutation()
  const [blockClient, { isLoading: BlockIsPending }] = useBlockClientMutation()
  const [unblockClient, { isLoading: UnblockIsPending }] =
    useUnblockClientMutation()

  const handelUnblock = async (_: number) => {
    try {
      await unblockClient(client.client.id).unwrap()
      toast.success("Unblock Lawyer Successfully", { duration: 1500 })
      setOpenUnblock(false)
    } catch {
      toast.error(`Something is Not Right`)
    }
  }

  const handelBlock = async (_: number) => {
    try {
      await blockClient(client.client.id).unwrap()
      toast.success("Block Lawyer Successfully")
      setOpenBlock(false)
    } catch {
      toast.error(`Something is Not Right`)
    }
  }

  const handelDelete = async (_: number) => {
    try {
      await deleteClient(client.client.id).unwrap()
      toast.success(`Client is Delete`)
      setOpenDelete(false)
    } catch {
      toast.error(`Something is Not right`)
    }
  }

  return (
    <Dialog
      open={
        pathname === `/client/${client.client.id}` ||
        openEdit ||
        openDelete ||
        openBlock ||
        openUnblock
      }
      onOpenChange={(open) => {
        setOpenBlock(false)
        setOpenUnblock(false)
        setOpenDelete(false)
        setOpenEdit(false)
        if (!open) navigate("/client")
      }}
    >
      {pathname === `/client/${client.client.id}` && (
        <ClientDetailsModel data={client} />
      )}
      {openEdit && <UpdateClient client={client} setOpenEdit={setOpenEdit} />}

      {openDelete && (
        <DeleteModel
          title="Delete Client"
          subTitle="Are you sure you want to delete this client?"
          detailsTitle={`${client.user.firstName}  ${client.user.lastName}`}
          id={client.client.id}
          isPending={DeleteIsPending}
          mutate={handelDelete}
          setOpenDelete={setOpenDelete}
        />
      )}
      {openBlock && (
        <BlockModel
          title="Block Client"
          subTitle="Are you Sure you want to block this client?"
          detailsTitle={`${client.user.firstName}  ${client.user.lastName}`}
          id={client.client.id}
          isPending={BlockIsPending}
          mutate={handelBlock}
          onClosed={setOpenBlock}
        />
      )}

      {openUnblock && (
        <UnblockModel
          title="Unblock Client"
          subTitle="Aru you sure you want to unblock this client?"
          detailsTitle={`${client.user.firstName}  ${client.user.lastName}`}
          id={client.client.id}
          isPending={UnblockIsPending}
          mutate={handelUnblock}
          setOpenUnblock={setOpenUnblock}
        />
      )}

      <article
        className={`group hover:shadow-soft relative my-2 rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-100/80 sm:p-5`}
      >
        <div className={`flex flex-row justify-between gap-8 sm:items-start`}>
          <div className="flex min-w-0 gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-xs font-semibold text-zinc-700">
              {client.user.firstName[0]}
              {client.user.lastName[0]}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold text-zinc-900">
                  {client.user.firstName} {client.user.lastName}
                </h3>
                {client.client.isBlocked == "\u0001" && (
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-black">
                    {client.client.isBlocked ? "Block" : ""}
                  </span>
                )}
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-zinc-700 sm:grid-cols-3">
                <p>
                  <span className="font-medium text-zinc-500">Mobile :</span>{" "}
                  {client.user.phoneNumber}
                </p>
                <p>
                  <span className="font-medium text-zinc-500">
                    Occupation :
                  </span>{" "}
                  {client.client.occupation}
                </p>
                <p>
                  <span className="font-medium text-zinc-500">Email :</span>{" "}
                  {client.user.email}
                </p>
              </div>
            </div>
          </div>
          {/* menu */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="lg:mr-10">
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4 text-black" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/client/${client.client.id}`)
                }}
              >
                View
              </DropdownMenuItem>
              {role == "lawyer" && (
                <>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenEdit(true)
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  {client.client.isDeleted == "\u0000" && (
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenDelete(true)
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  )}
                  {client.client.isBlocked == "\u0000" && (
                    <DropdownMenuItem
                      onClick={() => {
                        setOpenBlock(true)
                      }}
                    >
                      Block
                    </DropdownMenuItem>
                  )}
                  {client.client.isBlocked == "\u0001" && (
                    <DropdownMenuItem
                      onClick={() => {
                        setOpenUnblock(true)
                      }}
                    >
                      Unblock
                    </DropdownMenuItem>
                  )}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </article>
    </Dialog>
  )
}

export default ClientCard
