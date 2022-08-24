import React from "react";
import RevenueCardBottom from "./RevenueCardBottom";
import RevenueCardHeader from "./RevenueCardHeader";

const ReportInventoryCard = () => {
  return (
    <div className="card bg-white border-0 report_container__height">
      <RevenueCardHeader header="Inventory" subheader="Category" />
      <RevenueCardBottom />
    </div>
  );
};

export default ReportInventoryCard;
