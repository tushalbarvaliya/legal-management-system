import { MoreVertical } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import type {  ClientUserMapping } from "@/types/clientType"
import { useAppSelector } from "@/hooks/hooks"
import ClientDetailsModel from "./ClientDetails"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Dialog } from "../ui/dialog"
import DeleteClient from "./DeleteClient"
import { useState } from "react"
import BlockClient from "./BlockClient"
import UnblockClient from "./UnblockClient"
import UpdateClient from "./UpdateClient"

const ClientCard = (client: ClientUserMapping) => {
  const role = useAppSelector((state) => state.auth.role)
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const [openBlock, setOpenBlock] = useState<boolean>(false)
  const [openUnblock, setOpenUnblock] = useState<boolean>(false)

  return (
    <Dialog
      open={
        pathname === `/client/${client.client.id}` ||
        pathname === `/client/edit/${client.client.id}` ||
        pathname === `/client/delete/${client.client.id}` ||
        openBlock ||
        openUnblock
      }
      onOpenChange={(open) => {
        setOpenBlock(false)
        setOpenUnblock(false)
        if (!open) navigate("/client")
      }}
    >
      {pathname === `/client/${client.client.id}` && (
        <ClientDetailsModel data={client} />
      )}
      {pathname === `/client/edit/${client.client.id}` && (
        <UpdateClient client={client} />
      )}

      {pathname === `/client/delete/${client.client.id}` && (
        <DeleteClient data={client} />
      )}
      {openBlock && <BlockClient client={client} setOpenBlock={setOpenBlock} />}
      {openUnblock && (
        <UnblockClient client={client} setOpenUnblock={setOpenUnblock} />
      )}

      <article
        className={`group hover:shadow-soft relative rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-100/80 sm:p-5`}
      >
        <div
          className={`flex flex-row gap-4 sm:items-start justify-between`}
        >
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
            <DropdownMenuTrigger asChild>
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
                      navigate(`/client/edit/${client.client.id}`)
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  {!(client.client.isDeleted == "\u0001") && (
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/client/delete/${client.client.id}`)
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  )}
                  {!(client.client.isBlocked == "\u0001") && (
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
