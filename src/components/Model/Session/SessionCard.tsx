import { useState } from "react";
import SessionDetailsModel from "./SessionDetailsModel";
import type { SessionData } from "@/pages/SessionPage";

const SessionCard = (data: SessionData) => {
  const [sessionModelOpen, setSessionModelOpen] = useState(false);
  return (
    <>
      {sessionModelOpen && (
        <SessionDetailsModel closeModal={setSessionModelOpen} {...data} />
      )}

      <div
        className="sessionCard relative group bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        onClick={() => {
          setSessionModelOpen(true);
        }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-zinc-900 via-zinc-700 to-zinc-400 rounded-t-2xl"></div>

        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-zinc-900 group-hover:text-black">
              {data.title}
            </h3>

            <p className="text-sm text-zinc-500 mt-1">
              Client:
              <span className="font-medium text-zinc-700">
                {data.clientName}
              </span>
            </p>
          </div>

          <span className="text-xs bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full font-medium">
            {data.caseTitle}
          </span>
        </div>

        <div className="mt-5 space-y-2 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">📅</span>
            <span>
              {new Date(data.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400">⏰</span>
            <span>{data.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400">📍</span>
            <span>{data.location}</span>
          </div>
        </div>

        <div className="mt-5 flex justify-between items-center">
          <span className="text-sm text-zinc-500 group-hover:text-zinc-900 font-medium">
            View →
          </span>
        </div>
      </div>
    </>
  );
};

export default SessionCard;
