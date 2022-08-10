import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import menulist from "../../assets/icons/svg/menulist.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Label, Col, Row } from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";
import delmale from "../../assets/images/png/delmale.png";
import delfemale from "../../assets/images/png/delfemale.png";
import orders from "../../static/orders";
import AllOrders from "../../components/AllOrders";
import AssignDelivery from "./AssignDelivery";
import AssignedOrder from "../../components/AssignedOrders";
import UnassignedOrder from "../../components/UnassignedOrder";

const Delivery = () => {
  const [data, setData] = useState(orders);

  const [display, setDisplay] = useState(<AllOrders />);

  const handleClick = (click) => {
    if (click === "assigned") {
      setDisplay(<AssignedOrder />);
    } else if (click === "unassigned") {
      setDisplay(<UnassignedOrder />);
    } else if (click === "all") {
      setDisplay(<AllOrders />);
    }
  };

  return (
    <>
      <Helmet>
        <title>Delivery Orders</title>
      </Helmet>
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-md-between  mt-md-5">
            <div className="d-flex mx-4">
              <BreadOutlined name="Delivery" breadcrumb="" />
              <BreadCrumb name="Orders" breadcrumb="" />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
          </div>

          <div className="mt-4 mx-md-5 mx-2">
            <div className="row " style={{ height: "40rem" }}>
              <div className="col-4">
                <div
                  className="px-3 py-4 bg-white"
                  style={{
                    height: "100%",
                    width: "100%",
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
                  <div className="my-4">{display}</div>
                </div>
              </div>
              <div className="col-8">
                <div
                  className="bg-white px-2 py-4 row"
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "40px",
                  }}
                >
                  <div className="col-4">
                    <div>
                      <h4 className="text-deep">Couriers</h4>
                      <div className="d-flex my-3 small justify-content-start align-items-start">
                        <Link to="" className="light-purple">
                          Available
                        </Link>
                        <Link to="" className="light-purple text-nowrap">
                          On-trip
                        </Link>
                        <Link to="" className="light-purple">
                          All
                        </Link>
                      </div>
                      {data.map(
                        ({ name, image, driverId, timeleft, isAssigned }) => (
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="d-flex deliverer-name align-items-center text-purple">
                              <div className="rounded-circle bg-user">
                                <img
                                  src={image}
                                  alt=""
                                  className="rounded-circle circle"
                                />
                              </div>
                              <div className="d-flex flex-column small mx-1">
                                <span className="">
                                  {name.firstName()} {name.lastName()}
                                </span>
                                <span>{driverId}</span>
                              </div>
                            </div>
                            {isAssigned === true && (
                              <p
                                className={
                                  timeleft < 10 ? "text-warning" : "text-purple"
                                }
                              >
                                {timeleft}'
                              </p>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="col-8">
                    <div
                      className="bg-warning"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "40px",
                      }}
                    ></div>
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

export default Delivery;
