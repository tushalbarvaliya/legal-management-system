import { type StaffData } from "@/Data/staffData";
import { formatData } from "@/utils/formatDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";

const StaffCard = ({ staff }: { staff: StaffData }) => {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm hover:shadow-md transition">
        {/* LEFT SECTION */}
        <div className="flex items-start sm:items-center gap-4 flex-1">
          {/* Avatar */}
          <div className="h-12 w-12 min-w-12 rounded-full bg-black flex items-center justify-center text-white font-bold text-lg">
            {staff.firstName?.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-2 w-full">
            {/* Name */}
            <p className="font-semibold text-zinc-900 text-base">
              {staff.firstName} {staff.lastName ?? ""}
            </p>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-1 text-xs text-zinc-600">
              <p>
                <span className="font-medium text-zinc-800">Email:</span>{" "}
                {staff.email}
              </p>
              <p>
                <span className="font-medium text-zinc-800">Username:</span>{" "}
                {staff.name}
              </p>
              <p>
                <span className="font-medium text-zinc-800">Phone:</span>{" "}
                {staff.phoneNumber}
              </p>
              <p>
                <span className="font-medium text-zinc-800">created At:</span>{" "}
                {formatData(staff.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          {/* Status Badge */}
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap ${
              staff.isBlocked === '\u0000'
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {staff.isBlocked === '\u0000' ? "Active" : "Blocked"}
          </span>

          {/* MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-zinc-100">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40 font-medium">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Block</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default StaffCard;
