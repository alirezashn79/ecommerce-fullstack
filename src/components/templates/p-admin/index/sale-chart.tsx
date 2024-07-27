"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function SaleChart() {
  const data = [
    {
      date: "1403/01",
      sale: 1000,
    },
    {
      date: "1403/02",
      sale: 2500,
    },
    {
      date: "1403/03",
      sale: 1800,
    },
    {
      date: "1403/04",
      sale: 3200,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height={"92.7%"}>
      <AreaChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="sale" />
        <Area type="monotone" dataKey="sale" stroke="#8884d8" fill="#8884d8" />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
}
