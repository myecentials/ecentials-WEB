import React from "react";
import bluechecked from "../../assets/icons/svg/bluechecked.svg";
import greenchecked from "../../assets/icons/svg/greenchecked.svg";
import pinkchecked from "../../assets/icons/svg/pinkchecked.svg";

const RevenueLegend = () => {
  const drugs = ["TOTAL", "DRUGS", "DELIVERY"];
  const checkimage = [bluechecked, greenchecked, pinkchecked];

  return (
    <ul className="d-flex">
      {drugs.map((drug, index) => (
        <li className="d-flex">
          <img src={checkimage[index]} alt="" />
          <span className="mx-2 small" style={{ fontSize: "10px" }}>
            {drug}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default RevenueLegend;
