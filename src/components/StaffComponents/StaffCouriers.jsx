import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const StaffCouriers = (props) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="d-flex deliverer-name align-items-center text-purple">
        <div className="rounded-circle bg-user">
          <img src={props.image} alt="" className="rounded-circle circle" />
        </div>
        <div className="d-flex flex-column small mx-1">
          <span className="">
            {props.name.firstName()} {props.name.lastName()}
          </span>
          <span>{props.driverId}</span>
        </div>
      </div>
      {props.isAssigned === true && (
        <div style={{ width: "2rem", height: "2rem" }}>
          <CircularProgressbar
            styles={buildStyles({
              textSize: "45px",
              textColor: "#4D44B5",
              pathColor: "#0097F7",
              strokeLinecap: "rounded",
              trailColor: "white",
            })}
            text={`${props.timeleft}'`}
            minValue={1}
            maxValue={59}
            value={props.timeleft}
          />
        </div>
      )}
    </div>
  );
};

export default StaffCouriers;
