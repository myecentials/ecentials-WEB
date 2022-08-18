import React from "react";
import drug1 from "../assets/images/png/oraddrug4.png";

const InvoiceDrugCard = () => {
  const handleClick = () => {};
  return (
    <div
      className="card rounded border-0 invoice-card d-flex justify-content-center align-items-center"
      onClick={handleClick}
    >
      <img src={drug1} alt="" width={100} />
      <h6 className="text-deep text-center mt-3">Ibuprofen (400)</h6>
      <span className="counter">0</span>
    </div>
  );
};

export default InvoiceDrugCard;
