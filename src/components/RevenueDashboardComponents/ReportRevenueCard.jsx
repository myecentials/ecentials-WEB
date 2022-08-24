import React from "react";
import { Collapse } from "reactstrap";
import { useState } from "react";

import NetIncomeCard from "./NetIncomeCard";
import RevenueCardBottom from "./RevenueCardBottom";

import RevenueCardHeader from "./RevenueCardHeader";
import RevenueLineChart from "./RevenueLineChart";
import recycle from "../../assets/icons/svg/recycle.svg";
import download from "../../assets/icons/svg/download.svg";
import remove from "../../assets/icons/svg/trash_full.svg";

const ReportRevenueCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="card bg-white border-0 report_container__height">
      <RevenueCardHeader
        header="Revenue"
        subheader="Report Center"
        handleClick={handleClick}
      />

      <div className="revenue_body mx-3">
        <div className="d-flex justify-content-start align-items-start">
          {/* <div className="d-flex align-items-center mb-2">
            <b className="gray-text small" style={{ fontSize: "12px" }}>
              REVENUE
            </b>
            <span
              className="mx-2"
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              1.5M
            </span>
            <span className="gray-text" style={{ fontSize: "12px" }}>
              -0.8%
            </span>
          </div> */}
        </div>
        <Collapse isOpen={isOpen} className="collapse">
          <div className="card bg-white shadow border-0">
            <div className="d-flex flex-column mx-2 my-2">
              <span className="gray-text">Delivery</span>
              <span className="d-flex small mb-3">
                <img src={recycle} alt="" />
                <span className="mx-2">Refresh Data</span>
              </span>
              <span className="d-flex small mb-3">
                <img src={download} alt="" />
                <span className="mx-2">Download (as CSV)</span>
              </span>
              <span className="d-flex small">
                <img src={remove} alt="" />
                <span className="mx-2" style={{ color: "#D45151" }}>
                  Remove Section
                </span>
              </span>
            </div>
          </div>
        </Collapse>
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

      <RevenueCardBottom content="SEE DETAILS" />
    </div>
  );
};

export default ReportRevenueCard;
