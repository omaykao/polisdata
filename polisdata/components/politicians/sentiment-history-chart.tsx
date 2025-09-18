"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState } from "react";
import { formatDate } from "@/lib/utils";

interface SentimentHistoryChartProps {
  politicianId: string;
}

export function SentimentHistoryChart({ politicianId }: SentimentHistoryChartProps) {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");
  const [chartType, setChartType] = useState<"area" | "line" | "bar">("area");

  // Generate mock historical data
  const generateHistoricalData = () => {
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const data = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // Generate realistic sentiment scores with some variation
      const basePositive = 45 + Math.random() * 20;
      const baseNegative = 15 + Math.random() * 15;
      const baseNeutral = 100 - basePositive - baseNegative;

      data.push({
        date: date.toISOString().split('T')[0],
        positive: Math.round(basePositive),
        negative: Math.round(baseNegative),
        neutral: Math.round(baseNeutral),
        score: Math.round(60 + Math.random() * 30), // Perception score
      });
    }

    return data;
  };

  const data = generateHistoricalData();

  const chartConfig = {
    positive: {
      label: "Positivo",
      color: "var(--chart-positive)",
    },
    neutral: {
      label: "Neutro",
      color: "var(--chart-neutral)",
    },
    negative: {
      label: "Negativo",
      color: "var(--chart-negative)",
    },
    score: {
      label: "Score",
      color: "var(--chart-4)",
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case "area":
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              }}
              className="text-xs"
            />
            <YAxis className="text-xs" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="positive"
              stackId="1"
              stroke={chartConfig.positive.color}
              fill={chartConfig.positive.color}
              fillOpacity={0.6}
              name="Positivo"
            />
            <Area
              type="monotone"
              dataKey="neutral"
              stackId="1"
              stroke={chartConfig.neutral.color}
              fill={chartConfig.neutral.color}
              fillOpacity={0.6}
              name="Neutro"
            />
            <Area
              type="monotone"
              dataKey="negative"
              stackId="1"
              stroke={chartConfig.negative.color}
              fill={chartConfig.negative.color}
              fillOpacity={0.6}
              name="Negativo"
            />
          </AreaChart>
        );
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              }}
              className="text-xs"
            />
            <YAxis className="text-xs" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="positive"
              stroke={chartConfig.positive.color}
              strokeWidth={2}
              dot={false}
              name="Positivo"
            />
            <Line
              type="monotone"
              dataKey="negative"
              stroke={chartConfig.negative.color}
              strokeWidth={2}
              dot={false}
              name="Negativo"
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke={chartConfig.score.color}
              strokeWidth={2}
              dot={false}
              name="Score de Percepção"
            />
          </LineChart>
        );
      case "bar":
        return (
          <BarChart data={data.filter((_, i) => i % Math.ceil(data.length / 15) === 0)}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              }}
              className="text-xs"
            />
            <YAxis className="text-xs" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar
              dataKey="positive"
              stackId="a"
              fill={chartConfig.positive.color}
              name="Positivo"
            />
            <Bar
              dataKey="neutral"
              stackId="a"
              fill={chartConfig.neutral.color}
              name="Neutro"
            />
            <Bar
              dataKey="negative"
              stackId="a"
              fill={chartConfig.negative.color}
              name="Negativo"
            />
          </BarChart>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Histórico de Sentimento</CardTitle>
            <CardDescription>
              Evolução da percepção pública ao longo do tempo
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as "7d" | "30d" | "90d")}>
              <TabsList>
                <TabsTrigger value="7d">7 dias</TabsTrigger>
                <TabsTrigger value="30d">30 dias</TabsTrigger>
                <TabsTrigger value="90d">90 dias</TabsTrigger>
              </TabsList>
            </Tabs>
            <Tabs value={chartType} onValueChange={(v) => setChartType(v as "area" | "line" | "bar")}>
              <TabsList>
                <TabsTrigger value="area">Área</TabsTrigger>
                <TabsTrigger value="line">Linha</TabsTrigger>
                <TabsTrigger value="bar">Barras</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Média Positiva</p>
            <p className="text-2xl font-bold text-green-600">
              {(data.reduce((sum, d) => sum + d.positive, 0) / data.length).toFixed(1)}%
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Média Negativa</p>
            <p className="text-2xl font-bold text-red-600">
              {(data.reduce((sum, d) => sum + d.negative, 0) / data.length).toFixed(1)}%
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Score Médio</p>
            <p className="text-2xl font-bold">
              {(data.reduce((sum, d) => sum + d.score, 0) / data.length).toFixed(1)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Tendência</p>
            <p className="text-2xl font-bold text-blue-600">
              {data[data.length - 1].score > data[0].score ? "↑" : "↓"}
              {Math.abs(data[data.length - 1].score - data[0].score).toFixed(1)}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}