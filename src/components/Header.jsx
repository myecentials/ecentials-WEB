import React from "react";
import NavIcons from "../components/NavIcons";
import Search from "../components/Search";

const Header = () => {
  return (
    <div className="bg-white py-2 d-none d-md-flex justify-content-center align-items-center header_container">
      <Search />
      <div className="header_container__navicons">
        <NavIcons />
      </div>
    </div>
  );
};

export default Header;
