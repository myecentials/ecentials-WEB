import React, { useState } from "react";
import FlexCustomerCard from "./FlexCustomerCard";
import MoreMenu from "./MoreMenu";
import RevenueCardBottom from "./RevenueCardBottom";
import RevenueCardHeader from "./RevenueCardHeader";

const ReportCustomerReviesCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="card bg-white border-0 report_container__height">
      <RevenueCardHeader
        header="Customer Reviews"
        subheader="Messages"
        handleClick={handleClick}
      />
      <MoreMenu isOpen={isOpen} />
      <div className="report_revenue__card_overflow">
        <div className="mx-2">
          <FlexCustomerCard />
          <FlexCustomerCard />
          <FlexCustomerCard />
          <FlexCustomerCard />
        </div>
      </div>
      <RevenueCardBottom
        content="SEE ALL REVIEWS"
        link="/reports/report-dashboard-customer-reviews"
      />
    </div>
  );
};

export default ReportCustomerReviesCard;
