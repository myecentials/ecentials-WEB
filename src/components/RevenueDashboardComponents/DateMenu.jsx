import React from "react";
import calander from "../../assets/icons/svg/calendar.svg";
import { BsChevronDown } from "react-icons/bs";

const DateMenu = (props) => {
  return (
    <div className="d-flex justify-content-end align-items-end">
      <button
        className="bg-white shadow-sm rounded small d-flex align-items-center border-0 p-2"
        onClick={props.handleClick}
      >
        <img src={calander} alt="calender" />
        <span className="mx-2">{props.startDate}- {props.endDate}</span>
        <BsChevronDown style={{ marginLeft: "1rem" }} />
      </button>
    </div>
  );
};

export default DateMenu;
