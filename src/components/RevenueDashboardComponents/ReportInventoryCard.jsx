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
    <div className="card shadow bg-white border-0 report_container__height">
      <RevenueCardHeader
        header="Inventory"
        subheader="Category"
        handleClick={handleClick}
      />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "13rem" }}
      >
        <MoreMenu isOpen={isOpen} />
        <InventoryPieChart />
      </div>
      <RevenueCardBottom
        content="SEE DETAILS"
        link="/pharmacy/reports/inventory-report"
      />
    </div>
  );
};

export default ReportInventoryCard;
