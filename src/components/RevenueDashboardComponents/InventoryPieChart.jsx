import React, { PureComponent } from "react";
import bullet from "../../assets/icons/svg/bullet.svg";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Label,
} from "recharts";
import MyLegend from "./Legend";

const data = [
  { name: "syrup", value: 300 },
  { name: "Empty", value: 300 },
  { name: "Injections", value: 200 },
  { name: "Tablet", value: 500 },
];
const COLORS = ["#0088FE", "rgba(0, 0, 0, 0.1)", "#FF8042", "#00C49F"];

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
        <Legend
          iconSize={10}
          iconType="circle"
          align="center"
          height={25}
          content={<MyLegend />}
        />

        <Tooltip />
      </PieChart>
    );
  }
}
