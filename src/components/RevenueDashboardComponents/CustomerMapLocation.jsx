import React, { useState } from "react";
import CustomerMaps from "./CustomerMaps";
import RevenueCardHeader from "./RevenueCardHeader";
import RevenueCardBottom from "./RevenueCardBottom";
import MoreMenu from "./MoreMenu";

const CustomerMapLocation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className="card bg-white border-0 report_container__height"
      handleClick={handleClick}
    >
      <RevenueCardHeader
        header="Customers Map Location"
        subheader="Report Center"
      />
      <MoreMenu isOpen={isOpen} />
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
      <RevenueCardBottom
        content="SEE DETAILS"
        link="/reports/customer-map-location-details"
      />
    </div>
  );
};

export default CustomerMapLocation;
