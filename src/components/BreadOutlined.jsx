import React from "react";
import { Link } from "react-router-dom";
import breadoutlined from "../assets/icons/png/breadoutlined.png";
import { useRef } from "react";
import { useSpring, animated } from "react-spring";
const BreadOutlined = (props) => {
  const n = useRef(0);
  const styles = useSpring({
    from: { x: -100 },
    to: { x: 0 },
    config: { duration: 1000 },
    loop: {
      x: 0,
    },
  });
  return (
    <animated.div>
      <div className="bread-outlined">
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
