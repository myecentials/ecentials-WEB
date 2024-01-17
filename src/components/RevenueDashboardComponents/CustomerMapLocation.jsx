import React, { useState } from "react";
import CustomerMaps from "./CustomerMaps";
import RevenueCardHeader from "./RevenueCardHeader";
import RevenueCardBottom from "./RevenueCardBottom";
import MoreMenu from "./MoreMenu";
import GoogleMapDisplay from "../../GoogleMap/GoogleMap";

const CustomerMapLocation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="card shadow bg-white border-0 report_container__height">
      <RevenueCardHeader
        header="Customers Map Location"
        subheader="Report Center"
        handleClick={handleClick}
      />
      <MoreMenu isOpen={isOpen} />
      <div className="report_revenue__card_overflow">
        <div className="mx-3">
          <div className="row">
            <div className="col-4">
              <CustomerMaps name="Europe" users="580 Users" length="50%"/>
              <CustomerMaps name="Asia" users="103 Users" length="20%"/>
              <CustomerMaps name="Africa" users="239 Users" length="70%"/>
              <CustomerMaps name="Australia" users="78 Users" length="10%"/>
              <CustomerMaps name="America" users="78 Users" length="40%"/>
            </div>
            <div className="col-8">
              {/* <GoogleMapDisplay /> */}
            </div>
          </div>
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
