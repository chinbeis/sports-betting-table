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

interface MoodChartProps {
  data: { name: string; wins: number; losses: number }[];
}

export function MoodChart({ data }: MoodChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="wins" fill="#82ca9d" />
        <Bar dataKey="losses" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
