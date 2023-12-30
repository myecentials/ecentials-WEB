import React, { useState } from "react";
import RevenueCardHeader from "./RevenueCardHeader";
import greencircle from "../../assets/images/svgs/greencircle.svg";
// import { BsArrowUp } from "react-icons/bs";
import RecentAlerts from "./RecentAlerts";
import RevenueCardBottom from "./RevenueCardBottom";
import MoreMenu from "./MoreMenu";

const ReportActivityMonitorCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="card shadow bg-white border-0 report_container__height">
      <RevenueCardHeader
        header="Activity Monitor"
        subheader="Report Center"
        handleClick={handleClick}
      />
      <MoreMenu isOpen={isOpen} />
      <div
        className="report_revenue__card_overflow"
        style={{ height: "13rem" }}
      >
        <div className="mx-2">
          <div
            className="d-flex justify-content-center rounded align-items-center"
            style={{ height: "4rem", backgroundColor: "#D3F9D8" }}
          >
            <img src={greencircle} alt="" width={45} className="mx-2" />
            <div className="d-flex  flex-column justify-content-start align-items-start">
              <b className="small">Safe</b>
              <span className="small" style={{ fontSize: "10px" }}>
                All modules are running smoothly.{" "}
              </span>
            </div>
          </div>
          <p className="small my-2">Recent alerts</p>
          <RecentAlerts name="Andrews" content="signed in" />
          <RecentAlerts name="Jennifer" content="signed in" />
          <RecentAlerts
            name="INV-78564"
            content="was returned."
            return={true}
          />
          <RecentAlerts
            name="INV-78564"
            content="was returned."
            return={true}
          />
          <RecentAlerts name="Jennifer" content="signed in" />
          <RecentAlerts name="Andrews" content="signed in" />
          <RecentAlerts name="Jennifer" content="signed in" />
          <RecentAlerts
            name="INV-78564"
            content="was returned."
            return={true}
          />
          <RecentAlerts
            name="INV-78564"
            content="was returned."
            return={true}
          />
          <RecentAlerts name="Jennifer" content="signed in" />
        </div>
      </div>
      <RevenueCardBottom content="SEE ALERTS" link="/reports/activity-log" />
    </div>
  );
};

export default ReportActivityMonitorCard;
