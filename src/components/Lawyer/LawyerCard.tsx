import type { userData } from "@/api/lawyerAPI";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";

const LawyerCard = ({ lawyer }: { lawyer: userData }) => {

  

  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
          {lawyer.firstName.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="font-semibold text-zinc-900">
            {lawyer.firstName} {lawyer.lastName}
          </p>
          <p className="text-sm text-black">Email : {lawyer.email}</p>
          <p className="text-xs text-black">
            phone Number : {lawyer.phoneNumber}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            lawyer.isBlocked === "\u0000"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {lawyer.isBlocked === "\u0000" ? "Active" : "Blocked"}
        </span>

        {/* ACTION MENU */}
        <div className="relative z-20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
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
    </div>
  );
};

export default LawyerCard;
