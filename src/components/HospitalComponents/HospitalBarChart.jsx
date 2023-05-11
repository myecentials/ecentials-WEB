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

import bardata from "../../static/bardata";

const HospitalBarChart = () => {
  return (
    <div
      className="chat p-1"
      style={{ borderRadius: "10px", minHeight: "25rem" }}
    >
      <div className="d-flex justify-content-between mx-2 my-1">
        <h6 className="text-deep py-3">Tracking History</h6>
      </div>
      <ResponsiveContainer height={280}>
        <BarChart data={bardata} barGap={2} barSize={25}>
          <CartesianGrid stroke="#c1bbeb" />
          <XAxis
            dataKey="days"
            tickLine={false}
            axisLine={false}
            interval={0}
            fontSize={11}
          />
          <YAxis tickLine={false} axisLine={false} />
          {/* <Tooltip
            // cursor={false}
            contentStyle={{
              backgroundColor: "#4d44b5",
              color: "#fff",
              borderRadius: "10px",
            }}
            itemStyle={{ color: "#fff" }}
          /> */}

          <Bar
            dataKey="lastweek"
            fill="#FF7E86"
            radius={[50, 50, 0, 0]}
            name="last week"
          />
          {/* <Bar
            dataKey="thisweek"
            fill="#FCC43E"
            radius={[10, 10, 0, 0]}
            name="this week"
          /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HospitalBarChart;
