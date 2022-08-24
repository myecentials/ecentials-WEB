import { Tooltip } from "bootstrap";
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
} from "recharts";

const RevenueLineChart = () => {
  const data = [
    {
      name: "Dec 19",
      uv: 4000,
      qv: 3000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Dec 20",
      uv: 3000,
      qv: 2500,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Dec 21",
      uv: 2000,
      qv: 1000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Dec 22",
      uv: 2780,
      qv: 2380,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Dec 23",
      uv: 1890,
      qv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Dec 24",
      uv: 2390,
      qv: 2690,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Dec 25",
      uv: 3490,
      qv: 1790,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />

        <Legend iconType="circle" />
        <Line dataKey="pv" stroke="#8884d8" dot={false} />
        <Line dataKey="uv" stroke="#82ca9d" dot={false} />
        <Line dataKey="qv" stroke="#82ca9d" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueLineChart;
