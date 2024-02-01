import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import MyLegend from "./Legend";
import { useFetchInventoryMutation } from '../../app/features/report/reportApiSlice';
import { facility_id } from '../../app/features/authSlice/authSlice';
import { useSelector } from "react-redux";

const COLORS = ["#339AF0", "#F3F3F4", "#FF922B", "#51CF66"];

const InventoryPieChart = () => {
  const [inventory, setInventory] = useState([]);
  const [fetchInventory] = useFetchInventoryMutation();
  const facilityId = useSelector(facility_id);

  console.log(inventory);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchInventory(facilityId);
        setInventory(result.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [fetchInventory]);

  const totals = inventory.reduce((acc, item) => {
    const medicineGroup = item.medicine_group || 'Empty'; 
    acc[medicineGroup] = (acc[medicineGroup] || 0) + item.total_stock;
    return acc;
  }, {});

  const chartData = Object.entries(totals).map(([name, value]) => ({ name, value }));

  return (
    <PieChart width={200} height={170}>
      <Pie
        data={chartData}
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={65}
        fill="#8884d8"
        dataKey="value"
        strokeWidth={0}
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        iconSize={10}
        iconType="circle"
        align="center"
        height={25}
        content={<MyLegend />}
      />
    </PieChart>
  );
};

export default InventoryPieChart;
