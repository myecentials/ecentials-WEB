import React from "react";
import FlexCustomerCard from "./FlexCustomerCard";
import RevenueCardBottom from "./RevenueCardBottom";
import RevenueCardHeader from "./RevenueCardHeader";

const ReportCustomerReviesCard = () => {
  return (
    <div className="card bg-white border-0 report_container__height">
      <RevenueCardHeader header="Customer Reviews" subheader="Messages" />
      <div className="report_revenue__card_overflow">
        <div className="mx-2">
          <FlexCustomerCard />
          <FlexCustomerCard />
          <FlexCustomerCard />
          <FlexCustomerCard />
        </div>
      </div>
      <RevenueCardBottom content="SEE ALL REVIEWS" />
    </div>
  );
};

export default ReportCustomerReviesCard;
