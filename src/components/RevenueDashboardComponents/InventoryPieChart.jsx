import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default class InventoryPieChart extends PureComponent {
  render() {
    return (
      <PieChart width={200} height={170} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={105}
          cy={50}
          innerRadius={30}
          outerRadius={55}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend iconType="circle" />
      </PieChart>
    );
  }
}
