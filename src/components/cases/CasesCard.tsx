import { MoreVertical } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/hooks";
import { formatDate } from "@/utils/formate";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
// import DeleteCaseModel from "./DeleteTaskModel";
// import CaseDetailModel from "./CaseDetailModel";
// import EditCaseModel from "./EditCaseModel";
// import type { caseDataType } from "@/Data/caseData";
// import { formatData } from "@/utils/formatDate";

const CasesCard = (data: caseDataType) => {
  const role = useAppSelector((state) => state.auth.role);
  const [deleteModel, setDeleteModel] = useState(false);
  const [detailsModel, setDetailsModel] = useState(false);
  const [updateModel, setUpdateModel] = useState(false);
  return (
    <>
      {/* {deleteModel && <DeleteCaseModel closeModal={setDeleteModel} {...data} />} */}
      {/* {detailsModel && (
        <CaseDetailModel closeModal={setDetailsModel} {...data} />
      )} */}
      {/* {updateModel && <EditCaseModel closeModal={setUpdateModel} {...data} />} */}

      {/* TASK CARD */}
      <article className="group relative cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 shadow-sm transition duration-200 hover:bg-zinc-100/80 hover:shadow-soft">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            {/* TITLE */}
            <div className="group/title relative inline-flex max-w-full items-center">
              <h2 className="truncate text-sm font-semibold text-zinc-900 transition duration-200 group-hover:text-zinc-950">
                {data.title}
              </h2>

              {/* TOOLTIP */}
              <div className="pointer-events-none absolute left-0 top-full z-10 mt-2 hidden w-70 max-w-[70vw] rounded-lg bg-zinc-900/95 p-3 text-xs leading-relaxed text-zinc-100 opacity-0 shadow-lg backdrop-blur-sm transition duration-200 group-hover/title:block group-hover/title:opacity-100">
                {data.description}
              </div>
            </div>

            {/* INFO GRID */}
            <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-zinc-600 sm:grid-cols-2 lg:grid-cols-4">
              <p>
                <span className="font-semibold text-zinc-700">Created:</span>{" "}
                {formatDate(data.createdAt)}
              </p>

              <p>
                <span className="font-semibold text-zinc-700">Priority:</span>
                <span
                  className={`ml-1 inline-flex rounded-full px-2 py-0.5 font-medium `}
                >
                  {data.caseStage}
                </span>
              </p>

              <p>
                <span className="font-semibold text-zinc-700">
                  Client Name :
                </span>{" "}
                {data.clientId}
              </p>
              <p>
                <span className="font-semibold text-zinc-700">
                  Case Type :{" "}
                </span>{" "}
                {data.type}
              </p>
            </div>
          </div>

          {/* MENU DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => {
                  setDetailsModel(true);
                }}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setUpdateModel(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              {role == "lawyer" && (
                <>
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => {
                      setDeleteModel(true);
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </article>
    </>
  );
};

export default CasesCard;