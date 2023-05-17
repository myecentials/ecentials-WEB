import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";
import orders from "../../static/orders";
import mapimage from "../../assets/icons/svg/map.svg";
import drug1 from "../../assets/images/png/oraddrug1.png";
import drug2 from "../../assets/images/png/oraddrug2.png";
import morevert from "../../assets/icons/svg/morevert.svg";
import AllCouriers from "../../components/AllCouriers";
import OntripCouriers from "../../components/OntripCouriers";
import AvailableCouriers from "../../components/AvailableCouriers";
import GoogleMapDisplay from "../../GoogleMap/GoogleMap";
import Header from "../../components/Header";
import PharmacyName from "../../components/PharmacyName";
import DateHeader from "../../components/DateHeader";

const AssignDelivery = () => {
  const [display1, setDisplay1] = useState(<AllCouriers />);

  const handleClick = (click) => {
    if (click === "assigned") {
      setDisplay1(<OntripCouriers />);
    } else if (click === "unassigned") {
      setDisplay1(<AvailableCouriers />);
    } else if (click === "all") {
      setDisplay1(<AllCouriers />);
    }
  };

  const newList = orders.filter((datas) => !datas.isAssigned);

  return (
    <>
      <Helmet>
        <title>Deliver Orders</title>
      </Helmet>
      <Header />
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">DELIVERY</h6>
              <DateHeader />
              <div className="d-flex">
                <BreadOutlined name="Delivery" breadcrumb="/delivery/orders" />
                <BreadCrumb name="Orders" breadcrumb="" />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="mt-4 mx-md-3 mx-2 mb-5">
            <div className="row main-container gy-lg-0 gy-4">
              <div className="col-lg-4">
                <div
                  className="bg-white"
                  style={{
                    borderRadius: "40px",
                  }}
                >
                  <div className="py-4 px-3">
                    <h4 className="text-deep">#ORD-5494</h4>
                    <p className="small deliverer-name text-purple">
                      07/07.2022 3:15PM
                    </p>
                    <div className="row d-border">
                      <div className="col-8">
                        <div className="d-flex">
                          <img src={mapimage} alt="" width={15} />
                          <span className="small deliverer-name text-purple mx-2">
                            Accra, 27 New Ave
                          </span>
                        </div>
                      </div>
                      <h4 className="col-4 dl-border text-center my-0 text-purple">
                        -
                      </h4>
                    </div>
                  </div>
                  <div className="d-flex flex-column justify-content-between col-left">
                    <div className="mb-md-5 pb-md-5">
                      <Table borderless responsive className="d-border">
                        <tbody>
                          <tr>
                            <td>
                              <img src={drug1} alt="" />
                            </td>
                            <td>
                              <div className="d-flex flex-column deliverer-name text-purple">
                                <span>Acetaminophen</span>
                                <span>350mg</span>
                              </div>
                            </td>
                            <td className="small deliverer-name">X5</td>
                            <td className="small deliverer-name text-nowrap">
                              GHC 100
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src={drug2} alt="" />
                            </td>
                            <td>
                              <div className="d-flex flex-column deliverer-name text-purple">
                                <span>Acetaminophen</span>
                                <span>350mg</span>
                              </div>
                            </td>
                            <td className="small deliverer-name">X5</td>
                            <td className="small deliverer-name text-nowrap">
                              GHC 100
                            </td>
                          </tr>
                        </tbody>
                      </Table>

                      <h5 className="total-price mx-2 text-end text-purple">
                        GHC 200
                      </h5>
                    </div>

                    {/*  */}

                    <div className="col-bottom-container pb-4">
                      <div className="d-flex mb-4 justify-content-between align-items-center mx-3 mt-2">
                        <span className="small text-purple">Asign to: </span>
                        <img src={morevert} alt="" width={20} />
                      </div>
                      <div className="py-3 px-2 scroll-container">
                        {newList.map(
                          ({ name, image, driverId, timeleft, isAssigned }) => (
                            <Link to="/delivery/orders/assign/order-id">
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
                              </div>
                            </Link>
                          )
                        )}
                      </div>
                    </div>

                    {/*  */}
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
                    <div>
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

          {/*  */}
        </div>
      </div>
    </>
  );
};

export default AssignDelivery;
