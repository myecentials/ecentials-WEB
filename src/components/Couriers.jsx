import React from "react";

const Couriers = (props) => {
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
        <p className={props.timeleft < 10 ? "text-warning" : "text-purple"}>
          {props.timeleft}'
        </p>
      )}
    </div>
  );
};

export default Couriers;
