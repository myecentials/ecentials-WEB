import React from "react";
import home from "../assets/images/svgs/home.svg";
import add from "../assets/images/svgs/add.svg";
import { Link } from "react-router-dom";

const HomeHeader = () => {
  return (
    <div className="d-flex align-items-center">
      <div
        className="d-flex align-items-center bg-white justify-content-center"
        style={{ width: "2.5rem", height: "2.5rem" }}
      >
        <img src={home} alt="" width={20} className="img-fluid" />
      </div>
      <Link to="" className="mx-2">
        <img src={add} alt="" width={15} />
      </Link>
    </div>
  );
};

export default HomeHeader;
