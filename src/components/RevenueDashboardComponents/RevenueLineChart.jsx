import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  // Label,
  Tooltip,
} from "recharts";
import RevenueLegend from "./RevenueLegend";
// import data from "../../static/revenuedata";

const RevenueLineChart = ({data}) => {
  
  return (
    <ResponsiveContainer width="100%" height="100%" >
      <LineChart min-width={500} height={800} data={data}   >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="endDate" tickLine={false} axisLine={false} fontSize={11} />
        <YAxis tickLine={false} axisLine={false} />
        <Legend content={<RevenueLegend />} />
        <Line dataKey="total_pickups" stroke="#339AF0" dot={false} />
        <Line dataKey="quantity_of_drugs" stroke="#00FF00" dot={false} />
        <Line dataKey="total_deliveries" stroke="#FF922B" dot={false} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueLineChart;
