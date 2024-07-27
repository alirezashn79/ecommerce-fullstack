"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function GrowthChart() {
  const data = [
    {
      date: "1403/1",
      current: 4000,
      prev: 3000,
    },
    {
      date: "1403/2",
      current: 2500,
      prev: 4000,
    },
    {
      date: "1403/3",
      current: 3800,
      prev: 2500,
    },
    {
      date: "1403/4",
      current: 5600,
      prev: 3800,
    },
    {
      date: "1403/5",
      current: 2200,
      prev: 5600,
    },
    {
      date: "1403/6",
      current: 6300,
      prev: 2200,
    },
  ];
  return (
    <ResponsiveContainer width={"100%"} height={"92.7%"}>
      <LineChart
        width={500}
        height={200}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 0,
        }}
        data={data}
      >
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Line type="monotone" dataKey="prev" stroke="#8884d8" />
        <Line type="monotone" dataKey="current" stroke="#82ca9d" />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
}
