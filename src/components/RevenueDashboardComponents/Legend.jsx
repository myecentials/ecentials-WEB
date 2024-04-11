import React, { useState, useEffect } from "react";
import { FaDotCircle } from "react-icons/fa";
import { useFetchInventoryMutation } from '../../app/features/report/reportApiSlice';
import { facility_id } from '../../app/features/authSlice/authSlice';
import { useSelector } from "react-redux";

const MyLegend = ({ colors }) => {
  const [inventory, setInventory] = useState([]);
  const [fetchInventory] = useFetchInventoryMutation();
  const facilityId = useSelector(facility_id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchInventory(facilityId);
        setInventory(result?.data?.data?.drugs);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [facilityId, fetchInventory]);

  const drugs = [...new Set(inventory?.map(item => item.medicine_group || 'Empty'))];

  //console.log(drugs)

  return (
    <div className="revenue-pie" >
      {drugs.map((drug, index) => (
        <li key={index} className="d-flex ">
          <FaDotCircle style={{ color: colors[index] }} />
          <span className="mx-2 ">{drug}</span>
        </li>
      ))}
    </div>
  );
};

export default MyLegend;
