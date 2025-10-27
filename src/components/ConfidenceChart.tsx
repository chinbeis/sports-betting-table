"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ConfidenceChartProps {
  data: { name: string; profit: number }[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      name: string;
      profit: number;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-foreground">{payload[0].payload.name}</p>
        <p className={`font-bold ${payload[0].value >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          Profit: ₮{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function ConfidenceChart({ data }: ConfidenceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis 
          dataKey="name" 
          className="text-foreground"
          tick={{ fill: 'currentColor' }}
        />
        <YAxis 
          className="text-foreground"
          tick={{ fill: 'currentColor' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          wrapperStyle={{ color: 'currentColor' }}
        />
        <Bar 
          dataKey="profit" 
          fill="#6366f1"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}