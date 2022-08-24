import React from "react";
import calander from "../../assets/icons/svg/calendar.svg";
import { BsChevronDown } from "react-icons/bs";

const DateMenu = () => {
  return (
    <button className="bg-white rounded small d-flex align-items-center border-0 p-2">
      <img src={calander} alt="" />
      <span className="mx-2">19.12.2020-25.12.2020</span>
      <BsChevronDown style={{ marginLeft: "1rem" }} />
    </button>
  );
};

export default DateMenu;
