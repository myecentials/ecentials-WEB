import React from "react";
import bullet from "../../assets/icons/svg/bullet.svg";

const MyLegend = () => {
  const drugs = ["syrup", "injection", "tablet", "empty"];
  return (
    <ul className="revenue_user">
      {drugs.map((drug, index) => (
        <li className="d-flex">
          <input type="radio" checked /> <span className="mx-2">{drug}</span>
        </li>
      ))}
    </ul>
  );
};

export default MyLegend;
