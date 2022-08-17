import React from "react";
import { useState } from "react";
import ItemsCard from "../../components/ItemsCard";
import SearchBar from "../../components/SearchBar";
import notification from "../../assets/icons/svg/notification.svg";
import settings from "../../assets/icons/svg/settings.svg";
import circleperson from "../../assets/icons/svg/circleperson.svg";
import continueicon from "../../assets/icons/svg/continue.svg";
import { Link } from "react-router-dom";
import ActiveStaff from "../../components/ActiveStaff";
import CurvedChat from "../../components/CurvedChat";
import SideBar from "../../components/SideBar";
import { Collapse } from "reactstrap";
import DeliveryCalander from "../../components/DeliveryCalander";
import BarGraph from "../../components/BarGraph";
import Shipment from "../../components/Shipment";
import { Helmet } from "react-helmet";
import NavBar from "../../components/NavBar";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div>
        <NavBar name={<ActiveStaff />} />
        <div className="d-md-flex dashboard">
          {/* LEFT */}
          <div className="col-md-3 d-none d-md-block left">
            <SideBar />
          </div>

          {/* MIDDLE */}
          <div className="col-md-6 px-3 middle">
            <div className="d-block d-md-flex mt-md-5 mt-2 justify-content-between">
              <h5 className="mt-2 text-deep">Dashboard</h5>
              <SearchBar />
            </div>
            <ItemsCard />
            <CurvedChat />
            <div className="row my-3 gy-lg-0 gy-3 reverse">
              <div className="col-lg-6">
                <DeliveryCalander />
              </div>
              <div className="col-lg-6 ">
                <BarGraph />
              </div>
            </div>

            <Shipment />
          </div>

          {/* RIGHT */}
          <div className="col-md-3 d-md-block d-none right ">
            <div className="card border-0">
              <div className="mx-4 pb-4">
                <h5 className="mt-5 text-deep">Company Name</h5>
                <h5 className="small light-deep">Orange Drugs Limited</h5>
              </div>
            </div>
            <div className="icons py-2">
              <Link to="" className="card circle rounded-circle border-0 disc">
                <img src={notification} alt="" width={20} />
                <div
                  className="rounded-circle"
                  style={{ width: "5px", height: "5px" }}
                ></div>
              </Link>
              <Link
                to="/settings"
                className="card circle rounded-circle border-0"
              >
                <img src={settings} alt="" width={20} />
              </Link>
              <Link to="" className="card circle rounded-circle border-0">
                <img src={circleperson} alt="" width={20} />
              </Link>
              <Link
                to="/login"
                className="card circle rounded-circle border-0"
                style={{ backgroundColor: "#F15744" }}
              >
                <img src={continueicon} alt="" width={20} />
              </Link>
            </div>
            <div className="mx-4 mt-4">
              <h5 className="text-deep">Active Staff</h5>
              <p className="gray-text">
                You have <b>57</b> staff online
              </p>
              <ActiveStaff />
              <Collapse isOpen={isOpen}>
                <ActiveStaff />
              </Collapse>
              <button
                className="btn mb-4 mx-auto d-block w-75 rounded-pill border-0"
                style={{
                  backgroundColor: "#c1bbeb",
                  color: "#4d44b5",
                  fontWeight: "bold",
                }}
                onClick={handleClick}
              >
                {isOpen ? "View Less" : "View More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
