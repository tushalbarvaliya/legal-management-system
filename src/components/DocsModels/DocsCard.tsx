import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DocumentData } from "@/types/docsType";
import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import UpdateDocsModel from "./UpdateDocsModel";
import DeleteDocsModel from "./DeleteDocsModel";

const DocsCard = (items: DocumentData) => {
  const [updateModel, setUpdateModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  return (
    <>
      {updateModel && (
        <UpdateDocsModel {...items} closeModal={setUpdateModel} />
      )}
      {deleteModel && (
        <DeleteDocsModel {...items} closeModal={setDeleteModel} />
      )}
      <div className="w-full rounded-xl border p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-100/80 flex">
        {/* Left Content */}
        <div className="flex-1">
          <div className="flex items-start gap-3">
            {/* Title + Tooltip */}
            <div className="relative group w-fit">
              <h2 className="truncate text-sm font-semibold text-zinc-900 cursor-pointer">
                {items.title}
              </h2>

              {/* Tooltip */}
              <div className="absolute left-0 top-full z-10 mt-2 hidden w-64 rounded-lg bg-zinc-900/95 p-3 text-xs text-zinc-100 opacity-0 shadow-lg transition-all duration-200 translate-y-1 group-hover:block group-hover:opacity-100 group-hover:translate-y-0">
                {items.description}
              </div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex justify-between mt-2 text-[10px] text-zinc-600 mr-40">
            <p>
              File:{" "}
              <span className="bg-blue-100 capitalize ml-1 inline-flex rounded-full px-2 py-0.5 font-medium">
                {items.fileType}
              </span>
            </p>
            <p>
              Case ID:{" "}
              <span className="bg-blue-100 capitalize ml-1 inline-flex rounded-full px-2 py-0.5 font-medium">
                {items.caseId}
              </span>
            </p>
            <p>
              Client ID:{" "}
              <span className="bg-blue-100 capitalize ml-1 inline-flex rounded-full px-2 py-0.5 font-medium">
                {items.clientId}
              </span>
            </p>
          </div>
        </div>

        {/*right Menu */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40 font-medium">
              <DropdownMenuItem>View</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setUpdateModel(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  setDeleteModel(true);
                }}
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

export default DocsCard;
