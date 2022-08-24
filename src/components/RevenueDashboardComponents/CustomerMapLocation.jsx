import React from "react";
import CustomerMaps from "./CustomerMaps";
import RevenueCardHeader from "./RevenueCardHeader";
import RevenueCardBottom from "./RevenueCardBottom";

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
            <CustomerMaps />
            <CustomerMaps />
            <CustomerMaps />
            <CustomerMaps />
          </div>
          <div className="col-8"></div>
        </div>
      </div>
      <RevenueCardBottom content="SEE DETAILS" />
    </div>
  );
};

export default CustomerMapLocation;
