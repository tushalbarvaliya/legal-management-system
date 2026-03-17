import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A bar chart with an active bar";

const chartConfig = {
  visitors: {
    label: "value",
  },
  Admin: {
    label: "Admin",
    color: "var(--chart-1)",
  },
  Lawyer: {
    label: "Lawyer",
    color: "var(--chart-2)",
  },
  Staff: {
    label: "Staff",
    color: "var(--chart-3)",
  },
  Guest: {
    label: "Guest",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function ChartBarActive({
  admin,
  lawyer,
  staff,
  guest,
}: {
  admin: number;
  lawyer: number;
  staff: number;
  guest: number;
}) {
  const chartData = [
    { browser: "Admin", value: admin, fill: "var(--color-Admin)" },
    { browser: "Lawyer", value: lawyer, fill: "var(--color-Lawyer)" },
    { browser: "Staff", value: staff, fill: "var(--color-Staff)" },
    { browser: "Guest", value: guest, fill: "var(--color-Guest)" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Active</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="value"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
