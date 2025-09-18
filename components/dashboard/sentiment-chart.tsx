"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts";
import { SentimentAnalysis } from "@/lib/types";
import { formatPercentage, formatNumber } from "@/lib/utils";

interface SentimentChartProps {
  data: SentimentAnalysis;
}

export function SentimentChart({ data }: SentimentChartProps) {
  const chartData = [
    {
      name: "Positivo",
      value: data.positive,
      color: "var(--chart-positive)",
    },
    {
      name: "Neutro",
      value: data.neutral,
      color: "var(--chart-neutral)",
    },
    {
      name: "Negativo",
      value: data.negative,
      color: "var(--chart-negative)",
    },
  ];

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
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Sentimento Geral</CardTitle>
        <CardDescription>
          Consolidado de {formatNumber(data.sampleSize)} menções analisadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ value }) => `${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Confiança da Análise</span>
            <span className="font-medium">{formatPercentage(data.confidence * 100)}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${data.confidence * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}