import React from "react";
import { Link } from "react-router-dom";
import breadcrumb from "../assets/icons/png/breadcrumb.png";

const BreadCrumb = (props) => {
  return (
    <div className="bread-outlined">
      <img src={breadcrumb} alt="" />
      <h6 className="text-white text-center">
        <Link to={props.breadcrumb} className="text-white small">
          {props.name}
        </Link>
      </h6>
    </div>
  );
};

export default BreadCrumb;
