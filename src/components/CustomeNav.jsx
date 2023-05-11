import React from "react";
import { Navbar, Button, Collapse } from "reactstrap";
import NavIcons from "./NavIcons";
import { useState } from "react";
import OpenNav from "./OpenNav";
import arrow from "../assets/icons/svg/arrowdown.svg";

const CustomeNav = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="d-md-none d-block">
      <Navbar className={isOpen ? "bg-white" : ""} {...args}>
        <OpenNav />
        <Button onClick={toggle} className="bg border-0">
          {isOpen ? (
            <img src={arrow} alt="" style={{ transform: "rotate(180deg)" }} />
          ) : (
            <img src={arrow} alt="" />
          )}
        </Button>
        <Collapse isOpen={isOpen} navbar>
          <div className="mt-3">
            <NavIcons />
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomeNav;
