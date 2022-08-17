import React from "react";
import { Link } from "react-router-dom";
import breadoutlined from "../assets/icons/png/breadoutlined.png";
import { animated } from "react-spring";
const BreadOutlined = (props) => {
  return (
    <animated.div>
      <div className="bread-outlined" style={{ width: props.width }}>
        <img src={breadoutlined} alt="" />
        <h6>
          <Link
            className="small"
            to={props.breadcrumb}
            style={{ color: "#4D44B5", fontWeight: "bold" }}
          >
            {props.name}
          </Link>
        </h6>
      </div>
    </animated.div>
  );
};

export default BreadOutlined;
