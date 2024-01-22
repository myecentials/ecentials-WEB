import React from "react";
// import { Collapse } from "reactstrap";
import { useState } from "react";

import NetIncomeCard from "./NetIncomeCard";
import RevenueCardBottom from "./RevenueCardBottom";

import RevenueCardHeader from "./RevenueCardHeader";
import RevenueLineChart from "./RevenueLineChart";

import MoreMenu from "./MoreMenu";

const ReportRevenueCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="card shadow bg-white border-0 report_container__height">
      <RevenueCardHeader
        header="Revenue"
        subheader="Report Center"
        handleClick={handleClick}
      />
      <div className="d-flex mx-4 align-items-center">
        <span className="gray-text small">REVENUE</span>
        <span className="mx-2" style={{ fontSize: "1.2rem" }}>
          1.5M
        </span>
        <span className="gray-text small">-0.8%</span>
      </div>
      <div className="revenue_body mx-3">
        <MoreMenu isOpen={isOpen} />
        <div className="row gy-sm-0 gy-3">
          <div className="col-sm-6">
            <RevenueLineChart />
          </div>
          <div className="col-sm-6">
            <div className="d-flex align-items-center flex-column">
              <NetIncomeCard
                header="Net Income"
                text={`${80}%`}
                trailColor="rgba(255, 255, 255, 0.3)"
                pathColor="#ffffff"
                textColor="#ffffff"
                amount="300,000"
                value={80}
              />
              <NetIncomeCard
                border={true}
                header="Average Spend"
                text={`${20}%`}
                trailColor="rgba(0, 0, 0, 0.1)"
                pathColor="#f15744"
                textColor="#000000"
                amount="2,000,000"
                value={20}
              />
            </div>
          </div>
        </div>
      </div>

      <RevenueCardBottom content="SEE DETAILS" link="" />
    </div>
  );
};

export default ReportRevenueCard;
