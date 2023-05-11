import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import bardata from "../../static/bardata";

export default class InventoryBarChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={bardata} barSize={20}>
          <CartesianGrid vertical={false} horizontal={false} />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#72FFBB" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#3CFE38" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B09FFF" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#8D79F6" stopOpacity={1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="days"
            fontSize={10}
            interval={0}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tickLine={false} axisLine={false} />

          <Bar
            dataKey="lastweek"
            stackId="a"
            fill="url(#colorUv)"
            radius={[0, 0, 5, 5]}
            scale={100}
          />
          <Bar
            dataKey="thisweek"
            stackId="a"
            fill="url(#colorPv)"
            radius={[3, 3, 0, 0]}
            barSize={5}
            offset={1}
          />
          <Bar
            dataKey="thisweek"
            stackId="a"
            fill="#A08CFB"
            barSize={22}
            opacity={0.2}
            radius={[5, 5, 0, 0]}
          />
          <Tooltip cursor={false} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
