import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import MyLegend from "./Legend";
import { useFetchInventoryMutation } from '../../app/features/report/reportApiSlice';
import { facility_id } from '../../app/features/authSlice/authSlice';
import { useSelector } from "react-redux";

const InventoryPieChart = () => {
  const [inventory, setInventory] = useState([]);
  const [fetchInventory] = useFetchInventoryMutation();
  const facilityId = useSelector(facility_id);

  //console.log(inventory);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchInventory(facilityId);
        console.log(result)
        setInventory(result?.data?.data?.drugs);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [facilityId, fetchInventory]);

  const medicineGroups  = [...new Set(inventory.map(item => item.medicine_group || 'Empty'))];

  const COLORS = generateColors(medicineGroups.length);

  function generateColors(numColors) {
    const hueStep = 360 / numColors;
    let hue = 0;
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(`hsl(${hue}, 70%, 50%)`);
      hue += hueStep;
    }
    return colors;
  }

  const totals = inventory.reduce((acc, item) => {
    const medicineGroup = item.medicine_group || 'Empty'; 
    acc[medicineGroup] = (acc[medicineGroup] || 0) + item.total_stock;
    return acc;
  }, {});


  //console.log('pie', inventory)
  const chartData = Object.entries(totals).map(([name, value]) => ({ name, value }));

  return (
    <PieChart width={460} height={170}>
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
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip /> 
      <Legend
        iconSize={10}
        iconType="circle"
        align="center"
        height={25}
        content={<MyLegend colors={COLORS}/>}
      />
    </PieChart>
  );
};

export default InventoryPieChart;
