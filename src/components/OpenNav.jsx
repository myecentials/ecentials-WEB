import React, { useState } from "react";
import { Offcanvas, OffcanvasHeader, OffcanvasBody, Button } from "reactstrap";
import { FiMenu } from "react-icons/fi";
import SideBar from "./SideBar";

const OpenNav = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="">
            <h5 className="text-deep">Company Name</h5>
            <h5 className="small light-deep">Orange Drugs Limited</h5>
          </div>
        </OffcanvasHeader>
        <OffcanvasBody>
          <SideBar />
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default OpenNav;
