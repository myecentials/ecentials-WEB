import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

const NetIncomeCard = (props) => {
  const fValue = 80;
  return (
    <div
      className={
        props.border
          ? "card bg-white w-100 mb-2 revenue_income__card"
          : "card border-0 bg-primary w-100 text-white mb-2 revenue_income__card"
      }
    >
      <div className="d-flex justify-content-center align-items-center">
        <div style={{ width: "4rem", height: "4rem" }} className="mx-2">
          <CircularProgressbarWithChildren
            text={props.text}
            value={props.value}
            minValue={1}
            maxValue={100}
            styles={buildStyles({
              pathColor: `${props.pathColor}`,
              trailColor: `${props.trailColor}`,
              textColor: `${props.textColor}`,
              textSize: "1.5rem",
            })}
          ></CircularProgressbarWithChildren>
        </div>

        <div className="line">
          <p className="small text-nowrap" style={{ fontSize: "11px" }}>
            {props.header}
          </p>
          <h6 className="small">GHC {props.amount}</h6>
        </div>
      </div>
    </div>
  );
};

export default NetIncomeCard;
