import {
  getAllUser,
  getCaseCount,
  getCompony,
  getTaskCount,
} from "@/api/adminAPi";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { Pie, PieChart } from "recharts";

const AdminDashBoard = () => {
  const { data, isLoading } = useQuery({
    queryFn: getAllUser,
    queryKey: ["allUser"],
  });
  const {
    data: caseCount,
    isLoading: caseCountLoading,
    isError: caseIsError,
  } = useQuery({
    queryFn: getCaseCount,
    queryKey: ["casesCount"],
  });
  const {
    data: TaskCount,
    isLoading: taskCountLoading,
    isError: taskIsError,
  } = useQuery({
    queryFn: getTaskCount,
    queryKey: ["taskCount"],
  });
  const {
    data: Compony,
    isLoading: componyLoading,
    isError: componyIsError,
  } = useQuery({
    queryFn: getCompony,
    queryKey: ["getCompony"],
  });

  const chartData = [
    { browser: "chrome", visitors: 275, fill: "#156456" },
    { browser: "firefox", visitors: 187, fill: "#123548" },
    { browser: "edge", visitors: 173, fill: "#852426" },
  ];
  const chartConfig = {
    chrome: {
      label: "Chrome",
      color: "#374dbd",
    },
    firefox: {
      label: "Firefox",
      color: "#374dbd",
    },
    edge: {
      label: "Edge",
      color: "#374dbd",
    },
  } satisfies ChartConfig;

  return (
    <>
      <>
        {/* user count */}
        <article className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300">
          <div className="flex items-start justify-between">
            <h2 className="text-sm font-semibold text-zinc-600 capitalize">
              total user
            </h2>
            <div className="rounded-lg bg-zinc-100 p-2 text-zinc-700 transition duration-200 group-hover:bg-zinc-200">
              <img src={"/client.svg"} alt={"Icon"} className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-5 text-3xl font-extrabold text-zinc-900">
            {!isLoading && data.length}
            {isLoading && 0}
          </p>
        </article>

        {/* case count */}
        <article className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300">
          <div className="flex items-start justify-between">
            <h2 className="text-sm font-semibold text-zinc-600 capitalize">
              Case Status
            </h2>
            <div className="rounded-lg bg-zinc-100 p-2 text-zinc-700 transition duration-200 group-hover:bg-zinc-200">
              <img src={"/cases.svg"} alt={"Icon"} className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-5 text-xs font-extrabold text-zinc-900 flex flex-col">
            {!caseCountLoading && !caseIsError && (
              <>
                <span>Open Cases : {caseCount.openCases}</span>
                <span>Closed Cases : {caseCount.closedCases}</span>
                <span>
                  New Cases in Last 30Days : {caseCount.newCasesLast30Days}
                </span>
              </>
            )}
            {caseCountLoading && (
              <>
                <span>Open Cases : {0}</span>
                <span>Closed Cases : {0}</span>
                <span>New Cases in Last 30Days : {0}</span>
              </>
            )}
          </p>
        </article>
        {/* task count */}
        <article className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300">
          <div className="flex items-start justify-between">
            <h2 className="text-sm font-semibold text-zinc-600 capitalize">
              Task Status
            </h2>
            <div className="rounded-lg bg-zinc-100 p-2 text-zinc-700 transition duration-200 group-hover:bg-zinc-200">
              <img src={"/task.svg"} alt={"Icon"} className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-5 text-xs font-extrabold text-zinc-900 flex flex-col">
            {!taskCountLoading && !taskIsError && (
              <>
                <span>Task Due Today : {TaskCount.dueToday}</span>
                <span>over Due Task : {TaskCount.overdue}</span>
                <span>Completed : {TaskCount.completed}</span>
              </>
            )}
            {taskCountLoading && (
              <>
                <span>Task Due Today : {0}</span>
                <span>over Due Task : {0}</span>
                <span>Completed : {0}</span>
              </>
            )}
          </p>
        </article>
        {/* company count */}
        <article className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300">
          <div className="flex items-start justify-between">
            <h2 className="text-sm font-semibold text-zinc-600 capitalize">
              User Status
            </h2>
            <div className="rounded-lg bg-zinc-100 p-2 text-zinc-700 transition duration-200 group-hover:bg-zinc-200">
              <img src={"/cases.svg"} alt={"Icon"} className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-5 text-xs font-extrabold text-zinc-900 flex flex-col">
            {!componyLoading && !componyIsError && (
              <>
                <span>Total Lawyer : {Compony?.lawyers.length}</span>
                <span>Total Staff : {Compony?.staff.length}</span>
              </>
            )}
            {componyLoading && (
              <>
                <span>Total Lawyer : {0}</span>
                <span>Total Staff : {0}</span>
              </>
            )}
          </p>
        </article>
        <article className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-62.5 pb-0 [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="visitors"
                label
                nameKey="browser"
              />
            </PieChart>
          </ChartContainer>
        </article>
      </>
    </>
  );
};

export default AdminDashBoard;
