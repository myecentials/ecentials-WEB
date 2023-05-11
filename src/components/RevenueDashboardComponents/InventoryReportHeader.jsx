import React from "react";
import expand from "../../assets/icons/svg/expand.svg";
import calander from "../../assets/icons/svg/calendar.svg";
import { BsChevronDown } from "react-icons/bs";

const InventoryReportHeader = (props) => {
  return (
    <>
      <div className="d-flex justify-content-between pt-3 pb-2 align-items-center mx-2">
        <div className="d-flex align-items-center">
          <div className="revenue_image__circle rounded-circle bg-light">
            <img src={expand} alt="" />
          </div>

          <div className="text-purple small truancate mx-1">
            <b>{props.header}</b>
          </div>
        </div>
        <button className="btn text-nowrap bg-white border-0 small shadow-sm d-flex justify-content-center align-items-center">
          <img src={calander} alt="" width={15} />
          <span className="mx-2">12 Oct 2022</span>
          <BsChevronDown />
        </button>
      </div>
      <hr className="mt-1 bg-user" />
    </>
  );
};

export default InventoryReportHeader;
