import React from "react";
import { Progress } from "reactstrap";
import RevenueCardHeader from "./RevenueCardHeader";

const CustomerMapLocation = () => {
  return (
    <div className="card bg-white border-0 report_container__height">
      <RevenueCardHeader
        header="Customers Map Location"
        subheader="Report Center"
      />
      <div className="mx-3">
        <div className="row">
          <div className="col-4">
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between">
                <span className="text-purple">Europe</span>
                <span className="gray-text">580 User</span>
              </div>
              <Progress className="rounded-pill" value={50} />
            </div>
          </div>
          <div className="col-8"></div>
        </div>
      </div>
    </div>
  );
};

export default CustomerMapLocation;
