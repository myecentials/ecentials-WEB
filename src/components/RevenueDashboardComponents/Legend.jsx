import React from "react";
import bluechecked from "../../assets/icons/svg/bluechecked.svg";
import greenchecked from "../../assets/icons/svg/greenchecked.svg";
import pinkchecked from "../../assets/icons/svg/pinkchecked.svg";
import graychecked from "../../assets/icons/svg/graychecked.svg";

const MyLegend = () => {
  const drugs = ["SYRUP", "INJECTION", "TABLET", "EMPTY"];
  const checkimage = [bluechecked, greenchecked, pinkchecked, graychecked];

  return (
    <ul className="revenue_user">
      {drugs.map((drug, index) => (
        <li className="d-flex">
          <img src={checkimage[index]} alt="" />
          <span className="mx-2">{drug}</span>
        </li>
      ))}
    </ul>
  );
};

export default MyLegend;
