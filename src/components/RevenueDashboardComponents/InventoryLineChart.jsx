import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import data from "../../static/data";

export default class InventoryLineChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data}
          margin={{
            right: 30,
          }}
        >
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis
            dataKey="month"
            type="category"
            interval={0}
            minTickGap={50}
            fontSize={8}
            tickSize={10}
          />
          <YAxis tickSize={10} />

          <Line
            type="monotone"
            dataKey="lastweek"
            stroke="#6C60FF"
            dot={false}
          />
          <Line
            type="monotone"
            dot={false}
            dataKey="thisweek"
            stroke="#CE2A96"
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
