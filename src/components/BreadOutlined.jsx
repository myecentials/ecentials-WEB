import React from "react";
import { Link } from "react-router-dom";
import breadoutlined from "../assets/icons/png/breadoutlined.png";

const BreadOutlined = (props) => {
  return (
    <div className="bread-outlined">
      <img src={breadoutlined} alt="" />
      <h6>
        <Link
          to={props.breadcrumb}
          style={{ color: "#4D44B5", fontWeight: "bold" }}
        >
          {props.name}
        </Link>
      </h6>
    </div>
  );
};

export default BreadOutlined;
