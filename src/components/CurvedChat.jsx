import React, { Component } from "react";
import "../assets/styles/dashboard.css";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

import data from "../static/data.js";

class CurvedChat extends Component {
  state = {};
  render() {
    return (
      <div className="mt-3 card chat border-0" style={{ borderRadius: "10px" }}>
        <div className="d-flex justify-content-between mx-2 my-3">
          <h6 className="text-deep">Sales graph</h6>
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
        <ResponsiveContainer>
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FB7D5B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FB7D5B" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FCC43E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FCC43E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <CartesianGrid stroke="#c1bbeb" horizontal={false} />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                color: "#303972",
              }}
            />

            <ReferenceLine
              x="Sep"
              stroke="#000"
              strokeDasharray="3 3"
              height={0}
            />

            <Area
              type="monotone"
              dataKey="thisweek"
              stroke="#FB7D5B"
              strokeWidth={3}
              fillOpacity={10}
              fill="url(#colorUv)"
              name="last week"
              animationBegin={1500}
              animationDuration={2500}
              animationEasing="ease-in"
            />
            <Area
              type="monotone"
              dataKey="lastweek"
              stroke="#FCC42E"
              strokeWidth={3}
              fillOpacity={10}
              fill="url(#colorPv)"
              name="this week"
              animationBegin={1000}
              animationDuration={2000}
              animationEasing="ease-in"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default CurvedChat;
