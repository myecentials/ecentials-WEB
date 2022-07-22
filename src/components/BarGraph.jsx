import React from "react";
import {
  Bar,
  Legend,
  ResponsiveContainer,
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import bardata from "../static/bardata";

const BarGraph = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className="chat p-2" style={{ borderRadius: "10px" }}>
      <ResponsiveContainer width={370} height={320}>
        <BarChart
          width={400}
          height={200}
          data={bardata}
          barGap={2}
          barSize={10}
        >
          <CartesianGrid />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          <Legend
            verticalAlign="top"
            height={40}
            align="right"
            iconType="circle"
          />
          <Bar dataKey="lastweek" fill="#FB7D5B" radius={[10, 10, 0, 0]} />
          <Bar dataKey="thisweek" fill="#FCC43E" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;
