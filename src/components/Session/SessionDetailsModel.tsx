import type { SessionData } from "@/types/sessionType";
import { useState } from "react";
import DeleteSessionModel from "./DeleteSessionModel";

type SessionDetailsProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & SessionData;

const formatData = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const SessionDetailsModel = (data: SessionDetailsProps) => {
  const [sessionDeleteModel, setSessionDeleteModel] = useState(false);
  return (
    <>
      {/* DELETE MODAL */}
      {sessionDeleteModel && (
        <DeleteSessionModel {...data} closeModal={setSessionDeleteModel} />
      )}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white shadow-2xl animate-[fadeIn_.2s_ease]">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-zinc-900">
              Session Details
            </h2>

            <button
              onClick={() => {
                data.closeModal(false);
              }}
              className="text-zinc-400 hover:text-zinc-700 text-xl"
            >
              ✕
            </button>
          </div>

          <div className="px-6 py-5 space-y-4 text-sm text-zinc-700">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-500">Session Title</p>
                <p className="font-medium">{data.title}</p>
              </div>

              <div>
                <p className="text-xs text-zinc-500">Client</p>
                <p className="font-medium">{data.clientId}</p>
              </div>

              <div>
                <p className="text-xs text-zinc-500">Case</p>
                <p className="font-medium">{data.caseId}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Court Name</p>
                <p className="font-medium">{data.courtName}</p>
              </div>

              <div>
                <p className="text-xs text-zinc-500">Date</p>
                <p className="font-medium flex">
                  <span>
                    <img
                      src="/session.svg"
                      alt="session"
                      className="h-5 w-5 mr-2"
                    />
                  </span>
                  {formatData(data.sessionDate)}
                </p>
              </div>

              <div>
                <p className="text-xs text-zinc-500">Time</p>
                <p className="font-medium flex">
                  <span>
                    <img
                      src="/clock-icon.svg"
                      alt="clock"
                      className="h-5 w-5 mr-2"
                    />
                  </span>{" "}
                  {data.sessionTime}
                </p>
              </div>

              <div>
                <p className="text-xs text-zinc-500">Location</p>
                <p className="font-medium flex">
                  <span>
                    <img
                      src="/location.svg"
                      alt="location"
                      className="h-5 w-5 mr-2"
                    />
                  </span>{" "}
                  {data.sessionLocation}
                </p>
              </div>
            </div>
            {data.note && (
              <div className="pt-2 border-t">
                <p className="text-xs text-zinc-500 mb-1">Notes</p>

                <div className="bg-zinc-50 border rounded-lg p-3 text-sm text-zinc-700">
                  {data.note}
                </div>
              </div>
            )}
          </div>

          <div className="px-6 pb-6 flex gap-4">
            <button
              className="w-full rounded-lg bg-red-500 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 hover:scale-[1.02]"
              onClick={() => {
                setSessionDeleteModel(true);
              }}
            >
              Delete
            </button>
            <button
              className="w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-black hover:scale-[1.02]"
              onClick={() => {
                data.closeModal(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionDetailsModel;
