import type { caseDataType } from "@/Data/caseData";
import { formatData } from "@/utils/formatDate";

type TaskDetailsProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & caseDataType;

const CaseDetailModel = (data: TaskDetailsProps) => {
  return (
    <>
      <div className="fixed inset-0 z-70 ">
        <div className="absolute inset-0 bg-zinc-900/45 h-screen"></div>
        <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-900">
                  {data.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-500">
                  Created{" "}
                  {formatData(data.createdAt)}
                </p>
              </div>
              <button
                className="rounded-lg border border-zinc-200 p-2 text-zinc-600 transition duration-200 hover:bg-zinc-100"
                onClick={() => {
                  data.closeModal((prev) => !prev);
                }}
              >
                <img src="/x.svg" alt="x" className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-zinc-700">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
                  data Description
                </p>
                <p className="mt-1 rounded-xl bg-zinc-50 p-3 leading-relaxed">
                  {data.description}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                  <p className="text-xs text-zinc-500">Priority</p>
                  <p className="mt-1 font-semibold text-zinc-900">
                    {data.status}
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                  <p className="text-xs text-zinc-500">Case Type</p>
                  <p className="mt-1 font-semibold text-zinc-900">
                    {data.type}
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                  <p className="text-xs text-zinc-500">client Name</p>
                  <p className="mt-1 font-semibold text-zinc-900">
                    {data.clientId}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800"
                onClick={() => {
                  data.closeModal((prev) => !prev);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseDetailModel;
