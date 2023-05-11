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

const data = [
  {
    name: "Mon",
    uv: 400,
    pv: 240,
    amt: 240,
  },
  {
    name: "Tues",
    uv: 300,
    pv: 139,
    amt: 210,
  },
  {
    name: "Wed",
    uv: 200,
    pv: 180,
    amt: 220,
  },
  {
    name: "Thu",
    uv: 278,
    pv: 190,
    amt: 200,
  },
  {
    name: "Fri",
    uv: 189,
    pv: 180,
    amt: 218,
  },
  {
    name: "Sat",
    uv: 239,
    pv: 180,
    amt: 250,
  },
  {
    name: "Sun",
    uv: 349,
    pv: 130,
    amt: 110,
  },
];

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} interval={0} axisLine={false} />
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          <Bar dataKey="pv" fill="#0097F7" barSize={15} radius={[4, 4, 0, 0]} />
          <Bar dataKey="uv" fill="#FBFFEF" barSize={15} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
