import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Label,
  Tooltip,
} from "recharts";
import RevenueLegend from "./RevenueLegend";
import data from "../../static/revenuedata";

const RevenueLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="days" tickLine={false} axisLine={false} fontSize={11} />
        <YAxis tickLine={false} axisLine={false} />
        <Legend content={<RevenueLegend />} />
        <Line dataKey="total" stroke="#339AF0" dot={false} />
        <Line dataKey="drugs" stroke="#845EF7" dot={false} />
        <Line dataKey="delivery" stroke="#FF922B" dot={false} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueLineChart;
