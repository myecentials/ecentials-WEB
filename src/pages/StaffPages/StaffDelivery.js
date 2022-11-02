import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Link } from "react-router-dom";
import BreadOutlined from "../../components/BreadOutlined";
import AllOrders from "../../components/AllOrders";
import AssignedOrder from "../../components/AssignedOrders";
import UnassignedOrder from "../../components/UnassignedOrder";
import AllCouriers from "../../components/AllCouriers";
import AvailableCouriers from "../../components/AvailableCouriers";
import OntripCouriers from "../../components/OntripCouriers";
import GoogleMapDisplay from "../../GoogleMap/GoogleMap";
import StaffSideBar from "../../components/StaffComponents/StaffSidebar";
import StaffAllOrders from "../../components/StaffComponents/StaffAllOrders";
import StaffAllCouriers from "../../components/StaffComponents/StaffAllCouriers";
import StaffNavBar from "../../components/StaffComponents/StaffNavBar";
import Header from "../../components/Header";
import DateHeader from "../../components/StaffComponents/DateHeader";

const StaffDelivery = () => {
  const [display, setDisplay] = useState(<StaffAllOrders />);
  const [display1, setDisplay1] = useState(<StaffAllCouriers />);

  const handleClick = (click) => {
    if (click === "assigned") {
      setDisplay(<AssignedOrder />);
      setDisplay1(<OntripCouriers />);
    } else if (click === "unassigned") {
      setDisplay(<UnassignedOrder />);
      setDisplay1(<AvailableCouriers />);
    } else if (click === "all") {
      setDisplay(<AllOrders />);
      setDisplay1(<AllCouriers />);
    }
  };

  return (
    <>
      <Helmet>
        <title>Delivery Orders</title>
      </Helmet>
      <Header />
      <StaffNavBar />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <StaffSideBar />
        </div>
        <div className="col-md-9 middle">
          <DateHeader title="Delivery" />
          <div className="d-flex justify-content-md-between">
            <div className="d-flex mx-4">
              <BreadOutlined name="Delivery" breadcrumb="" />
              <BreadCrumb name="Orders" breadcrumb="" hasStyles={true} />
            </div>
          </div>

          <div className="mt-4 mx-md-3 mx-2">
            <div className="row gy-lg-0 gy-4 mb-5">
              <div className="col-lg-4">
                <div
                  className="px-3 py-4 bg-white "
                  style={{
                    borderRadius: "40px",
                  }}
                >
                  <h4 className="text-deep">Order</h4>
                  <div className="d-flex my-3 small justify-content-start align-items-start">
                    <Link
                      to=""
                      className="light-purple"
                      onClick={() => handleClick("assigned")}
                    >
                      Assigned
                    </Link>
                    <Link
                      to=""
                      className="light-purple mx-2"
                      onClick={() => handleClick("unassigned")}
                    >
                      Unassigned
                    </Link>
                    <Link
                      to=""
                      className="light-purple"
                      onClick={() => handleClick("all")}
                    >
                      All
                    </Link>
                  </div>
                  <div className="my-4 delivery_orders__container">
                    {display}
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div
                  className="bg-white px-2 py-4 row"
                  style={{
                    borderRadius: "40px",
                  }}
                >
                  <div className="col-sm-4">
                    <div className="">
                      <h4 className="text-deep">Couriers</h4>
                      <div className="d-flex my-3 small justify-content-start align-items-start">
                        <Link
                          to=""
                          className="light-purple"
                          onClick={() => handleClick("unassigned")}
                        >
                          Available
                        </Link>
                        <Link
                          to=""
                          className="light-purple text-nowrap"
                          onClick={() => handleClick("assigned")}
                        >
                          On-trip
                        </Link>
                        <Link
                          to=""
                          className="light-purple"
                          onClick={() => handleClick("all")}
                        >
                          All
                        </Link>
                      </div>
                      {display1}
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div
                      className=""
                      style={{
                        borderRadius: "40px",
                      }}
                    >
                      <GoogleMapDisplay />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffDelivery;
