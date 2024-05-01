import React from "react";

const InvoiceDrugCard = (props) => {
  const isOTC = props.level === "A1" || props.level === "B2";

  return (
    <div
      className="bg-white"
      onClick={props.handleClick}
      onFocus={props.handleFocus}
      style={{borderRadius: "4px"}}
    >
      <input
        type="checkbox"
        name=""
        id=""
        className=" m-2"
        onChange={props.handleChange}
        disabled={props.stock <= 0}
      />
      <img
        src={props.drug_img}
        alt=""
        width={100}
        className="d-block mx-auto mt-2"
        style={{
          pointerEvents: "none",
          aspectRatio: "3 / 2",
          width: "75%",
          objectFit: "contain",
          mixBlendMode: "darken",
        }}
      />
      <div className="d-flex justify-content-between align-items-center mx-2 mt-3">
        <h6 className="" style={{ fontSize: "10px" }}>
          {props.drug_name}
        </h6>
        <h6 style={{ fontSize: "10px", color: "#42CB91" }}>
          GH₵{props.price}
        </h6>
      </div>

      <div className="d-flex justify-content-between align-items-center mx-2 mt-3">
        <p style={{ lineHeight: 0, fontSize: "11px" }} className="mx-2">
          {props.category}
        </p>
        <p style={{ lineHeight: 0, fontSize: "11px" ,borderRadius: "4px",  backgroundColor: "brown" }} className={`mx-2 text-white `}>
            <div style={{ height: 10}}   className="p-2" >
              Non-Drug
            </div>
        </p>
      </div>
      <h6 className="text-center mt-2" style={{ fontSize: "12px" }}>
        ({props.stock}) Units
      </h6>
    </div>
  );
};

export default InvoiceDrugCard;
