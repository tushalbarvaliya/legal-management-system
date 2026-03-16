import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import AddCase from "./AddCase";

export type Case = {
  _id: string;
  caseTitle: string;
  CaseDescription: string;
  caseType: string;
  clientId: string;
  clientName: string;
  priority: string;
  createdAt: string;
};

const CasesCard = (data: Case) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openUpdateModel, setOpenUpdateModel] = useState(false);
  const [taskDeleteModel, setTaskDeleteModel] = useState(false);
  const [taskAddModel, setTaskAddModel] = useState(false);

  const param = useParams();
  const navigate = useNavigate();

  const isModelOpen = param.id === String(data._id);
  return (
    <>
      {/* ADD Case MODAL */}

      {taskAddModel && <AddCase closeModal={setTaskAddModel} />}

      {/* Case DETAILS MODAL (URL controlled) */}

      {/* {isModelOpen && (
        <TaskDetailsModel {...data} closeModal={() => navigate("/tasks")} />
      )} */}

      {/* UPDATE MODAL Case*/}

      {/* {openUpdateModel && (
        <UpdateTaskModel {...data} closeModal={setOpenUpdateModel} />
      )} */}

      {/* DELETE MODAL */}

      {/* {taskDeleteModel && (
        <DeleteTaskModel {...data} closeModal={setTaskDeleteModel} />
      )} */}

      {/* ADD TASK BUTTON */}
      <button
        className="fixed bottom-6 right-6 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 lg:bottom-8 lg:right-8"
        onClick={() => setTaskAddModel(true)}
      >
        <img src="/plus.svg" alt="+" className="h-6 w-6" />
      </button>

      {/* TASK CARD */}
      <article
        className="group relative cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 shadow-sm transition duration-200 hover:bg-zinc-100/80 hover:shadow-soft"
        onClick={() => navigate(`/tasks/${data._id}`)}
      >
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            {/* TITLE */}
            <div className="group/title relative inline-flex max-w-full items-center">
              <h2 className="truncate text-sm font-semibold text-zinc-900 transition duration-200 group-hover:text-zinc-950">
                {data.caseTitle}
              </h2>

              {/* TOOLTIP */}
              <div className="pointer-events-none absolute left-0 top-full z-10 mt-2 hidden w-70 max-w-[70vw] rounded-lg bg-zinc-900/95 p-3 text-xs leading-relaxed text-zinc-100 opacity-0 shadow-lg backdrop-blur-sm transition duration-200 group-hover/title:block group-hover/title:opacity-100">
                {data.CaseDescription}
              </div>
            </div>

            {/* INFO GRID */}
            <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-zinc-600 sm:grid-cols-2 lg:grid-cols-4">
              <p>
                <span className="font-semibold text-zinc-700">Created:</span>{" "}
                {data.createdAt}
              </p>

              <p>
                <span className="font-semibold text-zinc-700">Priority:</span>
                <span
                  className={`ml-1 inline-flex rounded-full px-2 py-0.5 font-medium ${
                    data.priority === "Low"
                      ? "bg-zinc-100 text-zinc-700"
                      : data.priority === "Medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {data.priority}
                </span>
              </p>

              <p>
                <span className="font-semibold text-zinc-700">
                  Client Name:
                </span>{" "}
                {data.clientName}
              </p>
              <p>
                <span className="font-semibold text-zinc-700">
                  Case Type :
                </span>{" "}
                {data.caseType}
              </p>
            </div>
          </div>

          {/* ACTION MENU */}
          <div className="relative z-20">
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition duration-200 hover:bg-zinc-100"
              aria-label="Task actions"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((prev) => !prev);
              }}
            >
              <span className="text-lg leading-none">⋮</span>
            </button>

            {/* MENU DROPDOWN */}
            <div
              className={`absolute right-0 top-0 z-30 ${
                menuOpen ? "" : "hidden"
              } min-w-35 rounded-lg border border-zinc-200 bg-white p-1 shadow-soft`}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                className="block w-full rounded-md px-3 py-2 text-left text-sm text-zinc-700 transition duration-150 hover:bg-zinc-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenUpdateModel(true);
                }}
              >
                Edit
              </button>

              <button
                className="block w-full rounded-md px-3 py-2 text-left text-sm text-rose-600 transition duration-150 hover:bg-rose-50"
                onClick={(e) => {
                  e.stopPropagation();
                  setTaskDeleteModel(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default CasesCard;
