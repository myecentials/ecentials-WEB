import React from "react";
import InventoryPieChart from "./InventoryPieChart";
import RevenueCardBottom from "./RevenueCardBottom";
import RevenueCardHeader from "./RevenueCardHeader";

const ReportInventoryCard = () => {
  return (
    <div className="card bg-white border-0 report_container__height">
      <RevenueCardHeader header="Inventory" subheader="Category" />
      <InventoryPieChart />
      <RevenueCardBottom content="SEE DETAILS" />
    </div>
  );
};

export default ReportInventoryCard;
