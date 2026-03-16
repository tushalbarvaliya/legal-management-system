import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

export default function UserCard() {
  return (
    <div className="overflow-hidden pt-4 px-2  bg-white rounded-2xl shadow-md  hover:scale-105 transition-all duration-300">
      {/* Image */}
      <div className="flex justify-center items-center">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
          alt="user"
          className="h-40 w-40 object-cover border-2 border-red-500"
        />
      </div>

      <div className="p-4 flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">Sarah Johnson</h3>
        </div>

        {/* Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>Edit</DropdownMenuItem>

            <DropdownMenuItem>Block</DropdownMenuItem>

            <DropdownMenuItem className="text-red-600">
              Delete Permanently
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
