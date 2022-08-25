import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const RevenueCardBottom = (props) => {
  return (
    <>
      <hr className="bg-user" />
      <div className="d-flex justify-content-end align-items-center mx-3 pb-2">
        <div className="d-flex align-items-center">
          <Link to={props.link} className="text-purple mx-2">
            {props.content}
          </Link>
          <BsChevronRight />
        </div>
      </div>
    </>
  );
};

export default RevenueCardBottom;
