import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useQuery } from "@tanstack/react-query"
import { Pie, PieChart } from "recharts"
import { Spinner } from "../ui/spinner"
import {
  getAllUser,
  getCaseCount,
  getCompony,
  getTaskCount,
} from "@/api/adminAPI"
import Card from "../Card"

const AdminDashBoard = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getAllUser,
    queryKey: ["allUser"],
  })

  const { data: caseCount, isLoading: caseLoading } = useQuery({
    queryFn: getCaseCount,
    queryKey: ["casesCount"],
  })

  const { data: taskCount, isLoading: taskLoading } = useQuery({
    queryFn: getTaskCount,
    queryKey: ["taskCount"],
  })

  const { data: company, isLoading: companyLoading } = useQuery({
    queryFn: getCompony,
    queryKey: ["company"],
  })

  const chartData = [
    { name: "Lawyer", value: company?.lawyers?.length || 0, fill: "#4f46e5" },
    { name: "Staff", value: company?.staff?.length || 0, fill: "#06b6d4" },
    { name: "User", value: users?.length || 0, fill: "#f59e0b" },
  ]

  const chartConfig = {
    Lawyer: { label: "Lawyer" },
    Staff: { label: "Staff" },
    User: { label: "User" },
  } satisfies ChartConfig

  return (
    <div className="space-y-6">
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
              {users?.length || 0}
            </p>
          )}
        </Card>

        {/* CASES */}
        <Card title="Case Status" icon="/cases.svg">
          {caseLoading ? (
            <Spinner />
          ) : (
            <div className="space-y-2 text-sm text-zinc-700">
              <p>Open: {caseCount?.openCases || 0}</p>
              <p>Closed: {caseCount?.closedCases || 0}</p>
              <p>Last 30 Days: {caseCount?.newCasesLast30Days || 0}</p>
            </div>
          )}
        </Card>

        {/* TASKS */}
        <Card title="Task Status" icon="/task.svg">
          {taskLoading ? (
            <Spinner />
          ) : (
            <div className="space-y-2 text-sm text-zinc-700">
              <p>Due Today: {taskCount?.dueToday || 0}</p>
              <p>Overdue: {taskCount?.overdue || 0}</p>
              <p>Completed: {taskCount?.completed || 0}</p>
            </div>
          )}
        </Card>

        {/* COMPANY */}
        <Card title="User Distribution" icon="/staff.svg">
          {companyLoading ? (
            <Spinner />
          ) : (
            <div className="space-y-2 text-sm text-zinc-700">
              <p>Lawyers: {company?.lawyers?.length || 0}</p>
              <p>Staff: {company?.staff?.length || 0}</p>
            </div>
          )}
        </Card>
      </div>

      {/* CHART SECTION */}
      <div className="rounded-2xl border  bg-white p-6 shadow-sm border-black">
        <h2 className="mb-4 text-lg font-semibold text-zinc-800">
          User Analytics
        </h2>

        {(companyLoading || isLoading) && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}

        {!companyLoading && !isLoading && (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-72"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie data={chartData} dataKey="value" nameKey="name" label />
            </PieChart>
          </ChartContainer>
        )}
      </div>
    </div>
  )
}

export default AdminDashBoard
