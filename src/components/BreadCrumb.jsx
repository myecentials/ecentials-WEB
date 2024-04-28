import React from "react";
import { Link } from "react-router-dom";
import breadcrumb from "../assets/icons/png/breadcrumb.png";
// import { useRef } from "react";
import { useSpring, animated } from "react-spring";

const BreadCrumb = (props) => {
  // const n = useRef(0);
  const styles = useSpring({
    from: { x: -100 },
    to: { x: 0 },
    config: { duration: 1000 },
    loop: {
      x: 0,
    },
  });
  return (
    <animated.div style={props.hasStyles && styles}>
      <div className="bread-outlined" style={{ width: props.width, minWidth: props.minWidth }}>
        <img src={breadcrumb} alt="" />
        <h6 className="text-white text-center text-sm-center">
          <Link to={props.breadcrumb} className="text-white  small">
            {props.name}
          </Link>
        </h6>
      </div>
    </animated.div>
  );
};

export default BreadCrumb;
