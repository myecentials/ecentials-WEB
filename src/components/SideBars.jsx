import React from "react";
import dashboard from "../assets/icons/svg/dash.svg";
import ebusiness from "../assets/images/png/ebusiness.svg";
import { NavLink } from "react-router-dom";
import { BsChevronDown, BsHouse } from "react-icons/bs";
import { Collapse } from "reactstrap";

const SideBars = () => {
  return (
    <div className="sidebar">
      <ul class="list-group">
        <NavLink to="/dashboard" className="mx-auto mb-2">
          {" "}
          <img src={ebusiness} alt="" width={120} />
        </NavLink>
        {/* DASHBOARD */}
        <NavLink to="/dashboard" class="d-block bg-warning">
          <NavLink
            to="/dashboard"
            className="d-flex justify-content-between sidebar_contain align-items-center px-2"
            style={({ isActive }) =>
              isActive
                ? { backgroundColor: "#f3f4ff", color: "#0d6efd" }
                : { backgroundColor: "#fff", color: "#B5B5C3" }
            }
          >
            <div className="d-flex align-items-center mx-3">
              <img src={dashboard} width={25} alt="" />
              <span className="mx-3">Dashboard</span>
            </div>
            <BsChevronDown />
          </NavLink>
        </NavLink>
        {/* INVOICE */}
        <NavLink class="d-block bg-warning">
          <NavLink
            to="/invoices"
            className="d-flex justify-content-between sidebar_contain align-items-center px-2"
            style={({ isActive }) =>
              isActive
                ? { backgroundColor: "#f3f4ff", color: "#0d6efd" }
                : { backgroundColor: "#fff", color: "#B5B5C3" }
            }
          >
            <div className="d-flex align-items-center mx-3">
              <img src={dashboard} width={25} alt="" />
              <span className="mx-3">Dashboard</span>
            </div>
            <BsChevronDown />
          </NavLink>
        </NavLink>
      </ul>
    </div>
  );
};

export default SideBars;
