import { useState } from "react";
import type { ClientProps } from "@/types/clientType";
import ClientDetailsModel from "./ClientDetailsModel";
import DeleteClientModel from "./DeleteClientModel";
import UpdateClientModel from "./UpdateClientModel";
import { useMutation } from "@tanstack/react-query";
import { blockClient, unBlockClient, undoDeleteClient } from "@/api/clientAPI";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { queryClient } from "@/main";
import SoftDeleteModel from "./SoftDeleteModel";

const ClientCard = (data: ClientProps) => {
  const [clientModelOpen, setClientModelOpen] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);
  const [clientDeleteModel, setClientDeleteModel] = useState(false);
  const [clientSoftDeleteModel, setClientSoftDeleteModel] = useState(false);

  const { mutate: blockMutation } = useMutation({
    mutationFn: blockClient,
    onSuccess: () => {
      toast.success("client Block Successfully");
      queryClient.invalidateQueries({ queryKey: ["client"] });
    },
    onError: (error) => {
      toast.success(`Client Block Error ${error}`);
    },
  });
  const { mutate: unblock } = useMutation({
    mutationFn: unBlockClient,
    onSuccess: () => {
      toast.success("client unblock Successfully");
      queryClient.invalidateQueries({ queryKey: ["client"] });
    },
    onError: (error) => {
      toast.success(`Client unblock Error ${error}`);
    },
  });
  const { mutate: undoDelete } = useMutation({
    mutationFn: undoDeleteClient,
    onSuccess: () => {
      toast.success("client unblock Successfully");
      queryClient.invalidateQueries({ queryKey: ["client"] });
    },
    onError: (error) => {
      toast.success(`Client unblock Error ${error}`);
    },
  });
  return (
    <>
      {clientModelOpen && (
        <ClientDetailsModel {...data} closeModal={setClientModelOpen} />
      )}
      {clientDeleteModel && (
        <DeleteClientModel {...data} closeModal={setClientDeleteModel} />
      )}
      {openUpdateModel && (
        <UpdateClientModel {...data} closeModal={setOpenUpdateModel} />
      )}
      {clientSoftDeleteModel && (
        <SoftDeleteModel {...data} closeModal={setClientSoftDeleteModel} />
      )}

      <article
        className={`group relative cursor-pointer rounded-xl border border-zinc-200  bg-zinc-50/40  p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-100/80 hover:shadow-soft sm:p-5 `}
        onClick={() => {
          setClientModelOpen(true);
        }}
      >
        <div
          className={`flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between `}
        >
          <div className="flex min-w-0 gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-xs font-semibold text-zinc-700">
              {data.firstName[0]}
              {data.lastName[0]}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold text-zinc-900">
                  {data.firstName} {data.lastName}
                </h3>
                {data.isBlock && (
                  <span className="text-xs bg-zinc-100 text-black px-3 py-1 rounded-full font-medium">
                    {data.isBlock ? "Block" : ""}
                  </span>
                )}
                {data.isDelete && (
                  <span className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium">
                    {data.isDelete ? "Delete" : ""}
                  </span>
                )}
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-zinc-700 sm:grid-cols-2">
                <p>
                  <span className="font-medium text-zinc-500">Mobile :</span>{" "}
                  {data.mobileNumber}
                </p>
                <p>
                  <span className="font-medium text-zinc-500">
                    Occupation :
                  </span>{" "}
                  {data.occupation}
                </p>
              </div>
            </div>
          </div>
          {/* menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenUpdateModel((prev) => !prev);
                }}
              >
                Edit
              </DropdownMenuItem>
              {!data.isDelete && (
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    setClientSoftDeleteModel((prev) => !prev);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              )}
              {data.isDelete && (
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    undoDelete(data);
                  }}
                >
                  Undo Soft Delete
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setClientDeleteModel((prev) => !prev);
                }}
                className="text-red-500"
              >
                Permanent Delete
              </DropdownMenuItem>
              {!data.isBlock && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    blockMutation(data);
                  }}
                >
                  Block
                </DropdownMenuItem>
              )}
              {data.isBlock && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    unblock(data);
                  }}
                >
                  UnBlock
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </article>
    </>
  );
};

export default ClientCard;
