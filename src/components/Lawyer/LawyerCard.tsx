import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import DeleteLawyerModel from "./DeleteLawyerModel";
import UpdateLawyerModel from "./UpdateLawyerModel";
import BlockLawyerModel from "./BlockLawyerModel";

export type LawyerData = {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  specialization: string;
  name?: string | undefined;
  userId: string;
  updatedAt: string;
  isBlocked: string;
  createdAt: string;
  password?: string | undefined;
  role?: string | undefined;
  isDeleted?: boolean | undefined;
  address?: string | undefined;
  companyId?: string | undefined;
  id: string;
};

const LawyerCard = ({ lawyer }: { lawyer: LawyerData }) => {
  const [deleteModel, setDeleteModel] = useState(false);
  const [updateModel, setUpdateModel] = useState(false);
  const [blockModel, setBlockModel] = useState(false);
  return (
    <>
      {deleteModel && (
        <DeleteLawyerModel closeModal={setDeleteModel} {...lawyer} />
      )}
      {updateModel && (
        <UpdateLawyerModel closeModal={setUpdateModel} {...lawyer} />
      )}
      {blockModel && (
        <BlockLawyerModel closeModal={setBlockModel} {...lawyer} />
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm hover:shadow-md transition">
        {/* LEFT SECTION */}
        <div className="flex items-start sm:items-center gap-4 flex-1">
          {/* Avatar */}
          <div className="h-12 w-12 min-w-12 rounded-full bg-black flex items-center justify-center text-white font-bold text-lg">
            {lawyer.firstName?.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-2 w-full">
            {/* Name */}
            <p className="font-semibold text-zinc-900 text-base">
              {lawyer.firstName} {lawyer.lastName ?? ""}
            </p>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-1 text-xs text-zinc-600">
              <p>
                <span className="font-medium text-zinc-800">Email:</span>{" "}
                {lawyer.email}
              </p>
              <p>
                <span className="font-medium text-zinc-800">Username:</span>{" "}
                {lawyer.name}
              </p>
              <p>
                <span className="font-medium text-zinc-800">Phone:</span>{" "}
                {lawyer.phoneNumber}
              </p>
              <p>
                <span className="font-medium text-zinc-800">
                  Specialization:
                </span>{" "}
                {lawyer.specialization}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          {/* Status Badge */}
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap ${
              lawyer.isBlocked === "\u0000"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {lawyer.isBlocked === "\u0000" ? "Active" : "Blocked"}
          </span>

          {/* MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-zinc-100">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40 font-medium">
              <DropdownMenuItem onClick={() => setUpdateModel(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setBlockModel(true)}>
                Block
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => setDeleteModel(true)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default LawyerCard;
