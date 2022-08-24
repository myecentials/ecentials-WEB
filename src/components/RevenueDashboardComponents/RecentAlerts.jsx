import React from "react";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

const RecentAlerts = (props) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <span className="small">
            <b>{props.name}</b> {props.content}
          </span>
          <span className="small gray-text" style={{ fontSize: "10px" }}>
            Nov 24, 2020 | 09:26:08 AM
          </span>
        </div>
        <div
          className="text-white rounded-circle d-flex justify-content-center align-items-center"
          style={{
            width: "1rem",
            height: "1rem",
            backgroundColor: `${props.return ? "#D45151" : "#51CF66"}`,
          }}
        >
          {props.return ? (
            <BsArrowDown size={10} className="" />
          ) : (
            <BsArrowUp size={10} className="" />
          )}
        </div>
      </div>
      <hr className="bg-user mt-1" />
    </div>
  );
};

export default RecentAlerts;
