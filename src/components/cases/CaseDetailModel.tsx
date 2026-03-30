import { Link, useNavigate } from "react-router-dom"

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatDate } from "@/utils/formate"
import type { Case } from "@/types/caseType"

type Props = {
  data: Case
}

const CaseDetailModal = ({ data }: Props) => {
  const navigate = useNavigate()
  return (
    <>
      <DialogContent className="max-w-xl p-5 sm:p-6 lg:min-w-200">
        {/* Header */}
        <DialogHeader className="flex flex-row items-start justify-between">
          <div>
            <DialogTitle className="text-xl font-bold">
              {data.caseNumber} {data.title}
            </DialogTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              Created At {formatDate(data.createdAt)}
            </p>
          </div>
        </DialogHeader>

        {/* Body */}
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Case Description
            </p>
            <p className="mt-1 rounded-xl bg-muted p-3">
              {data.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard label="Status" value={data.status} />
            <InfoCard label="Case Type" value={data.type} />

            <Link to={`/client/${data.clientId}`}>
              <InfoCard label="Client " value={`${data.clientId}`} />
            </Link>

            <InfoCard label="Case City" value={data.caseCity} />
            <InfoCard label="Case Stage" value={data.caseStage} />

            <InfoCard
              label="Expected Closing Date"
              value={formatDate(data.caseClosedDate)}
            />

            <InfoCard label="Case ID" value={String(data.id)} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex justify-end">
          <button
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            onClick={() => navigate("/cases")}
          >
            Close
          </button>
        </div>
      </DialogContent>
    </>
  )
}

export default CaseDetailModal

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl border bg-muted p-3">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="mt-1 font-semibold">{value}</p>
  </div>
)
