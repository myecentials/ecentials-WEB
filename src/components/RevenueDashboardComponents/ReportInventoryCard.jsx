import React, { useState } from "react";
import InventoryPieChart from "./InventoryPieChart";
import MoreMenu from "./MoreMenu";
import RevenueCardBottom from "./RevenueCardBottom";
import RevenueCardHeader from "./RevenueCardHeader";

const ReportInventoryCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="card bg-white border-0 report_container__height">
      <RevenueCardHeader
        header="Inventory"
        subheader="Category"
        handleClick={handleClick}
      />
      <div className="report_revenue__card_overflow d-flex justify-content-center align-items-center">
        <MoreMenu isOpen={isOpen} />
        <InventoryPieChart />
      </div>
      <RevenueCardBottom
        content="SEE DETAILS"
        link="/reports/inventory-report"
      />
    </div>
  );
};

export default ReportInventoryCard;
