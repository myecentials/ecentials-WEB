import React from "react";

const InvoiceDrugCard = (props) => {
  const handleClick = () => {};
  return (
    <div
      className="card rounded border-0 invoice-card shadow-sm"
      onClick={props.handleClick}
    >
      <img
        src={props.drug_img}
        alt=""
        width={100}
        className="d-block mx-auto mt-2"
        style={{ pointerEvents: "none" }}
      />
      <div className="d-flex justify-content-between align-items-center mx-2 mt-3">
        <h6 className="" style={{ fontSize: "10px" }}>
          {props.drug_name}
        </h6>
        <h6 style={{ fontSize: "10px", color: "#42CB91" }}>GH₵{props.price}</h6>
      </div>
      <p style={{ lineHeight: 0, fontSize: "10px" }} className="mx-2">
        {props.category}
      </p>
      <h6 className="text-center mt-2" style={{ fontSize: "12px" }}>
        ({props.stock}) Units
      </h6>
      <span className="counter">{props.drug_count}</span>
    </div>
  );
};

export default InvoiceDrugCard;
