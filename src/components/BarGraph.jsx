import React from "react";
import {
  Bar,
  ResponsiveContainer,
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import bardata from "../static/bardata";

const BarGraph = () => {
  return (
    <div className="chat p-1" style={{ borderRadius: "10px" }}>
      <div className="d-flex justify-content-between mx-2 my-1">
        <h6 className="text-deep">Finance</h6>
        <div className="d-flex">
          <div className="d-flex justify-content-center align-items-center">
            <span className="rounded-circle legend-left"></span>
            <span className="gray-text small mx-2">This week</span>
          </div>
          <div className="d-flex justify-content-center align-items-center mx-2">
            <span className="rounded-circle legend-right"></span>
            <span className="gray-text small mx-2">Last week</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer height={280}>
        <BarChart data={bardata} barGap={2} barSize={10}>
          <CartesianGrid stroke="#c1bbeb" />
          <XAxis dataKey="days" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip
            cursor={false}
            contentStyle={{
              backgroundColor: "#4d44b5",
              color: "#fff",
              borderRadius: "10px",
            }}
            itemStyle={{ color: "#fff" }}
          />

          <Bar
            dataKey="lastweek"
            fill="#FB7D5B"
            radius={[10, 10, 0, 0]}
            name="last week"
          />
          <Bar
            dataKey="thisweek"
            fill="#FCC43E"
            radius={[10, 10, 0, 0]}
            name="this week"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;
