import React from "react";
import expand from "../../assets/icons/svg/expand.svg";
import hvert from "../../assets/icons/svg/more_vertical.svg";

const RevenueCardHeader = (props) => {
  return (
    <>
      <div
        className="d-flex justify-content-between pt-3 pb-2 align-items-center"
        style={{ marginLeft: "1rem" }}
      >
        <div className="d-flex">
          <div className="revenue_image__circle rounded-circle bg-light">
            <img src={expand} alt="" />
          </div>
          <div className="mx-2 small">
            <div className="text-purple">
              <b>{props.header}</b>
            </div>
            <div className="gray-text">{props.subheader}</div>
          </div>
        </div>
        <button className="border-0 btn">
          <img src={hvert} alt="" />
        </button>
      </div>
      <hr className="mt-1 bg-user" />
    </>
  );
};

export default RevenueCardHeader;
