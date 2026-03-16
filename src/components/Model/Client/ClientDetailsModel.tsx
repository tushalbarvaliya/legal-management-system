import type { ClientProps } from "@/types/clientType";

type clientDetailModel = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & ClientProps;

const ClientDetailsModel = (data: clientDetailModel) => {
  return (
    <>
      <div className="fixed inset-0 z-70 ">
        {/* hidden*/}
        <div className="absolute inset-0 bg-zinc-900/45 h-screen"></div>
        <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white shadow-soft">
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 sm:px-6">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
                Client Details
              </h3>
              <button
                type="button"
                className="rounded-lg border border-zinc-200 p-2 text-zinc-700 transition duration-200 hover:bg-zinc-100"
                onClick={() => {
                  data.closeModal((prev) => !prev);
                }}
              >
                <img src="/x.svg" alt="x" className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4 px-5 py-4 sm:px-6 sm:py-5">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-lg font-semibold text-zinc-900">
                  {data.firstName} {data.lastName}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">
                  {data.clientId}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 text-sm text-zinc-700 sm:grid-cols-2">
                <p>
                  <span className="font-medium text-zinc-500">Mobile:</span>{" "}
                  <span>{data.mobileNumber}</span>
                </p>
                <p>
                  <span className="font-medium text-zinc-500">
                    Other Phone:
                  </span>{" "}
                  <span>{data.otherNumber}</span>
                </p>
                <p>
                  <span className="font-medium text-zinc-500">Occupation:</span>{" "}
                  <span>{data.occupation}</span>
                </p>
                <p>
                  <span className="font-medium text-zinc-500">Gender:</span>{" "}
                  <span>{data.gender}</span>
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                  Address
                </p>
                <p className="mt-1 text-sm text-zinc-700">{data.address}</p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                  Notes
                </p>
                <p className="mt-1 text-sm text-zinc-700">{data.notes}</p>
              </div>
              <div className="flex justify-end border-t border-zinc-200 pt-4">
                <button
                  type="button"
                  className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800"
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
      </div>
    </>
  );
};

export default ClientDetailsModel;
