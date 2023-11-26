import React, { useState } from "react";
import { Offcanvas, OffcanvasHeader, OffcanvasBody, Button } from "reactstrap";
import { FiMenu } from "react-icons/fi";
import SideBar from "./SideBar";
import PharmacyName from "./PharmacyName";

const OpenNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pharmacyName = sessionStorage.getItem("name");

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="d-md-none d-block">
      <Button onClick={handleClick} className="bg text-dark border-0">
        <FiMenu style={{ fontSize: "1.5rem" }} />
      </Button>

      <Offcanvas toggle={handleClick} isOpen={isOpen}>
        <OffcanvasHeader toggle={handleClick}>
          <PharmacyName/>
        </OffcanvasHeader>
        <OffcanvasBody>
          <SideBar />
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default OpenNav;
