import React from "react";
import DateHeader from "../DateHeader";
import Search from "../Search";
import PharmacyName from "../PharmacyName";

const CompanyNameHeader = (props) => {
  return (
    <div className="d-block d-md-flex mt-md-4 mt-2 justify-content-between align-items-center">
      <div>
        <h5 className="mt-2 text-deep">{props.title}</h5>
        <DateHeader />
        <div className="d-md-none">
          <Search />
        </div>
      </div>
      <PharmacyName />
    </div>
  );
};

export default CompanyNameHeader;
