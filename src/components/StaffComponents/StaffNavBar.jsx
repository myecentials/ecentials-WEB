import React, { useState } from "react";
import arrow from "../../assets/icons/svg/arrowdown.svg";
import { Collapse, Navbar, Button } from "reactstrap";
import ActiveStaff from "../ActiveStaff";
import OpenNav from "../OpenNav";
import NavIcons from "../NavIcons";
import StaffOpenNav from "./StaffOpenNav";

const StaffNavBar = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="d-md-none d-block">
      <Navbar {...args}>
        <StaffOpenNav />
        <Button onClick={toggle} className="bg border-0">
          {isOpen ? (
            <img src={arrow} alt="" style={{ transform: "rotate(180deg)" }} />
          ) : (
            <img src={arrow} alt="" />
          )}
        </Button>
        <Collapse isOpen={isOpen} navbar>
          <div className="mt-3">
            <div className="my-2">
              <NavIcons />
            </div>
            <ActiveStaff />
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default StaffNavBar;