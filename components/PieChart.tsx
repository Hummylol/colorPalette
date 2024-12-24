"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useColorContext } from "../app/context/ColorContext";

export function PieChartComponent() {
  const { colors } = useColorContext(); // Access colors from the context

  const chartData = [
    { browser: "chrome", visitors: 275, fill: colors[0] || "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: colors[1] || "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: colors[2] || "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: colors[3] || "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: colors[4] || "var(--color-other)" },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: colors[0] || "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: colors[1] || "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: colors[2] || "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: colors[3] || "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: colors[4] || "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium ">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
