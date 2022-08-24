import React from "react";
import { Progress } from "reactstrap";

const CustomerMaps = () => {
  return (
    <div className="d-flex flex-column mb-2">
      <div
        className="d-flex justify-content-between small"
        style={{ fontSize: "11px" }}
      >
        <span className="text-purple">Kumasi</span>
        <span className="gray-text">580 User</span>
      </div>
      <Progress className="rounded-pill" value={50} style={{ height: "8px" }} />
    </div>
  );
};

export default CustomerMaps;
