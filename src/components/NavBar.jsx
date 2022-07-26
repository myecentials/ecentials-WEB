import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import arrow from "../assets/icons/svg/arrowdown.svg";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from "reactstrap";
import ActiveStaff from "./ActiveStaff";
import OpenNav from "./OpenNav";
import SideBar from "./SideBar";

const NavBar = (args, props) => {
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
            <ActiveStaff />
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
