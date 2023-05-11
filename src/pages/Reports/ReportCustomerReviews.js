import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import BookmarkReviews from "../../components/BookmarkReviews";
import ReadReviews from "../../components/ReadReviews";
import NewReviews from "../../components/NewReviews";
import Header from "../../components/Header";
import PharmacyName from "../../components/PharmacyName";

const ReportCustomerReviews = () => {
  const [display, setDisplay] = useState(<BookmarkReviews />);
  const handleClick = (click) => {
    if (click === "bookmark") {
      setDisplay(<BookmarkReviews />);
      document.getElementById("bookmark").classList.add("active-tab");
      document.getElementById("new").classList.remove("active-tab");
      document.getElementById("read").classList.remove("active-tab");
    } else if (click === "read") {
      setDisplay(<ReadReviews />);
      document.getElementById("read").classList.add("active-tab");
      document.getElementById("bookmark").classList.remove("active-tab");
      document.getElementById("new").classList.remove("active-tab");
    } else if (click === "new") {
      setDisplay(<NewReviews />);
      document.getElementById("new").classList.add("active-tab");
      document.getElementById("bookmark").classList.remove("active-tab");
      document.getElementById("read").classList.remove("active-tab");
    }

    return display;
  };

  return (
    <>
      <Helmet>
        <title>Customer Reviews</title>
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
              <h6 className="mt-2 text-deep">Settings</h6>
              <DateHeader />
              <div className="d-flex flex-wrap">
                <BreadCrumb
                  name="Report Dashboard"
                  breadcrumb="/reports/report-dashboard"
                  width="11.5rem"
                />
                <BreadCrumb
                  name="Customer Reviews"
                  breadcrumb=""
                  width="11.5rem"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
          </div>
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex flex-wrap">
              <BreadCrumb
                name="Report Dashboard"
                breadcrumb="/reports/report-dashboard"
                width="11.5rem"
              />
              <BreadCrumb
                name="Customer Reviews"
                breadcrumb=""
                width="11.5rem"
                hasStyles={true}
              />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
          </div>
          <div className="mt-4 mx-3">
            <div className="card border-0 bg-white">
              <div className="d-md-flex justify-content-between align-items-center m-3">
                <div className="">
                  <h6 className="text-deep">Customer reviews</h6>
                  <p className="gray-text">More than 400+ new reviews</p>
                </div>
                <div className="d-flex">
                  <button className="btn-refresh">Refresh</button>
                  <button className="btn-export">Export as PDF</button>
                </div>
              </div>
              <div className="d-flex">
                <Link
                  to=""
                  className="tab"
                  id="new"
                  onClick={() => handleClick("new")}
                >
                  New
                </Link>
                <Link
                  to=""
                  id="read"
                  className="tab mx-2"
                  onClick={() => handleClick("read")}
                >
                  Read
                </Link>
                <Link
                  to=""
                  id="bookmark"
                  className="tab active-tab"
                  onClick={() => handleClick("bookmark")}
                >
                  Bookmarked
                </Link>
              </div>
              <div
                className="ms-bg"
                style={{ height: "3rem", width: "100%" }}
              ></div>
              <Table borderless responsive>
                <thead className="bg-light">
                  <tr>
                    <th>USER</th>
                    <th>HIGHLIGHT</th>
                    <th>RATING</th>
                    <th>DATE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>{display}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportCustomerReviews;
