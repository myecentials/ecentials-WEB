import { he } from "faker/lib/locales";
import React from "react";

const InventoryReportBottom = (props) => {
  return (
    <>
      <hr className="bg-user" />
      <div
        className="d-flex justify-content-between align-items-center mx-3 pb-2"
        style={{ fontSize: "11px" }}
      >
        <span className="small">{props.text}</span>
        <span className="small d-flex align-items-center">
          <span className="d-flex align-items-center mx-3">
            <span
              style={{
                width: "15px",
                height: "2px",
                backgroundColor: `${props.color1}`,
                marginRight: "5px",
              }}
            ></span>
            <span className="gray-text">{props.data1}</span>
          </span>
          <span className="d-flex align-items-center">
            <span
              style={{
                width: "15px",
                height: "2px",
                backgroundColor: `${props.color2}`,
                marginRight: "5px",
              }}
            ></span>
            <span className="gray-text">{props.data2}</span>
          </span>
        </span>
      </div>
    </>
  );
};

export default InventoryReportBottom;
