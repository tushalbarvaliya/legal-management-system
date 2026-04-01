import { useQuery } from "@tanstack/react-query"

import { Spinner } from "../ui/spinner"
import Card from "../Card"
import type { InvoiceResponse } from "@/types/invoiceStatusType"
import {
  caseStatusChange,
  invoiceStatus,
} from "@/api/adminAPI"
import {
  useGetCaseCountQuery,
  useGetTaskCountQuery,
  useGetUserQuery,
} from "@/store/services/adminAPI"

const AdminDashBoard = () => {
  const { data: users, isLoading, isError } = useGetUserQuery()
  const { data: taskCount, isLoading: taskLoading } = useGetTaskCountQuery()
  const {data: caseCount, isLoading: caseLoading}=useGetCaseCountQuery()
  
  const lawyers = users?.data?.filter((item) => item.role === "lawyer")
  const staffs = users?.data?.filter((item) => item.role === "staff")
  const clients = users?.data?.filter((item) => item.role === "client")




  const { data: invoice, isLoading: invoiceLoading } =
    useQuery<InvoiceResponse>({
      queryFn: invoiceStatus,
      queryKey: ["invoice"],
    })

  const { data: caseStatusChangeData, isLoading: caseStatusChangeLoading } =
    useQuery<{
      data: { casesStatusChangeInLast30Days: number }
      message: "success"
    }>({
      queryFn: caseStatusChange,
      queryKey: ["caseChange"],
    })

  return (
    <div className="my-4 space-y-6">
      {/* HEADER */}

      {/* GRID */}
      <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {/* USERS */}
        <Card title="Total Users" icon="/client.svg">
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <p className="text-sm text-red-500">Error loading users</p>
          ) : (
            <p className="text-3xl font-bold text-zinc-900">
              {users?.data.length || 0}
            </p>
          )}
        </Card>

        {/* CASES */}
        <Card title="Case Status" icon="/cases.svg">
          {caseLoading ? (
            <Spinner />
          ) : (
            <div className="space-y-2 text-sm text-zinc-700">
              <p>Open: {caseCount?.data.openCases || 0}</p>
              <p>Closed: {caseCount?.data.closedCases || 0}</p>
              <p>Last 30 Days: {caseCount?.data.newCasesLast30Days || 0}</p>
            </div>
          )}
        </Card>
        {/* CASES */}
        <Card title="Invoice Status" icon="/cases.svg">
          {invoiceLoading ? (
            <Spinner />
          ) : (
            <div className="space-y-2 text-sm text-zinc-700">
              <p>Total Paid: {invoice?.data.total_paid || 0}</p>
              <p>Total Unpaid: {invoice?.data.total_pending || 0}</p>
            </div>
          )}
        </Card>
        <Card title="Case Status" icon="/cases.svg">
          {caseStatusChangeLoading ? (
            <Spinner />
          ) : (
            <div className="space-y-2 text-sm text-zinc-700">
              <p>
                Total Case Status change in Last 30 Days:{" "}
                {caseStatusChangeData?.data.casesStatusChangeInLast30Days || 0}
              </p>
            </div>
          )}
        </Card>

        {/* TASKS */}
        <Card title="Task Status" icon="/task.svg">
          {taskLoading ? (
            <Spinner />
          ) : (
            <div className="space-y-2 text-sm text-zinc-700">
              <p>Completed: {taskCount?.data.completed || 0}</p>
              <p>Overdue: {taskCount?.data.overdue || 0}</p>
              <p>Pending: {taskCount?.data.pending || 0}</p>
            </div>
          )}
        </Card>

        {/* COMPANY */}
        <Card title="User Distribution" icon="/staff.svg">
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="space-y-2 text-sm text-zinc-700">
              <p>Lawyers: {lawyers?.length || 0}</p>
              <p>Staff: {staffs?.length || 0}</p>
              <p>Staff: {clients?.length || 0}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default AdminDashBoard
