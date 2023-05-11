import React from "react";
import star from "../../assets/icons/svg/Star.svg";

const FlexCustomerCard = () => {
  return (
    <div>
      <div className="d-flex flex-column" style={{ fontSize: "12px" }}>
        <div className="d-flex justify-content-between mb-1">
          <div className="d-flex align-items-center">
            <span className="text-purple">Andrews</span>
            <span className="gray-text small mx-2">20m ago</span>
          </div>
          <div className="d-flex">
            <img src={star} alt="" className="mx-2" />
            <span>5/5</span>
          </div>
        </div>
        <span className="gray-text">
          It is efficient and easy to use, thank you.{" "}
        </span>
      </div>
      <hr className="bg-user mt-1" />
    </div>
  );
};

export default FlexCustomerCard;
