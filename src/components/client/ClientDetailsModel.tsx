import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { formatDate } from "@/utils/formate"
import type { ClientDataType } from "@/data/clientData"


const ClientDetailsModel = (data: ClientDataType) => {
  const navigate=useNavigate()
  return (
    <>
      <div className="fixed inset-0 z-70">
        {/* hidden*/}
        <div className="absolute inset-0 h-screen bg-zinc-900/45"></div>
        <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4 sm:p-6">
          <div className="shadow-soft w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white">
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 sm:px-6">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
                Client Details
                <p className="mt-2 text-xs text-stone-600">
                  {formatDate(data.client.createdAt)}
                </p>
              </h3>
              <button
                type="button"
                className="rounded-lg border border-zinc-200 p-2 text-zinc-700 transition duration-200 hover:bg-zinc-100"
                onClick={() => {
                  navigate('/client')
                }}
              >
                <X />
              </button>
            </div>
            <div className="space-y-4 px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-lg font-semibold text-zinc-900">
                  {data.user.firstName} {data.user.lastName}
                </p>
                {data.client.isBlocked == "\u0001" && (
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-black">
                    {data.client.isBlocked ? "Block" : ""}
                  </span>
                )}
                {data.client.isDeleted === "\u0001" && (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                    {data.client.isDeleted ? "Delete" : ""}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 gap-3 text-sm text-zinc-700 sm:grid-cols-2">
                <p>
                  <span className="font-medium text-zinc-500">Mobile:</span>{" "}
                  <span>{data.user.phoneNumber}</span>
                </p>
                <p>
                  <span className="font-medium text-zinc-500">
                    Other Phone:
                  </span>{" "}
                  {/* <span>{data.otherNumber}</span> */}
                </p>
                <p>
                  <span className="font-medium text-zinc-500">Occupation:</span>{" "}
                  <span>{data.client.occupation}</span>
                </p>
                <p>
                  <span className="font-medium text-zinc-500">Gender:</span>{" "}
                  <span>{data.user.gender}</span>
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <p className="text-xs font-semibold tracking-[0.12em] text-zinc-500 uppercase">
                  Email
                </p>
                <p className="mt-1 text-sm text-zinc-700">{data.user.email}</p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <p className="text-xs font-semibold tracking-[0.12em] text-zinc-500 uppercase">
                  Address
                </p>
                <p className="mt-1 text-sm text-zinc-700">{data.user.address}</p>
              </div>

              <div className="flex justify-end border-t border-zinc-200 pt-4">
                <button
                  type="button"
                  className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800"
                  onClick={() => {
                    navigate('/client')
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
  )
}

export default ClientDetailsModel
