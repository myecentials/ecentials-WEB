import React, { Component } from "react";
import "../assets/styles/dashboard.css";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
  ReferenceLine,
} from "recharts";

import data from "../static/data.js";

class CurvedChat extends Component {
  state = {};
  render() {
    return (
      <div className="mt-3 card chat border-0" style={{ borderRadius: "10px" }}>
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
          <CartesianGrid horizontal={false} />
          <Tooltip />
          <Legend
            verticalAlign="top"
            height={40}
            align="right"
            iconSize={10}
            iconType="wye"
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
          />
          <Area
            type="monotone"
            dataKey="lastweek"
            stroke="#FCC42E"
            strokeWidth={3}
            fillOpacity={10}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </div>
    );
  }
}

export default CurvedChat;
