import React, { useState } from "react";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import BreadOutlined from "../../components/BreadOutlined";
import BreadCrumb from "../../components/BreadCrumb";
import StaffDetailsHeader from "../../components/StaffDetailsHeader";
import location from "../../assets/icons/svg/location.svg";
import phone from "../../assets/icons/svg/phone.svg";
import emailwhite from "../../assets/icons/svg/emailwhite.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import activeStaff from "../../static/activeStaff";

const StaffDetails = () => {
  let Mydesc;
  activeStaff.filter(({ desc }, index) => {
    if (index === 0) {
      Mydesc = desc;
    }
  });

  // STAFF DATA
  const [data, setData] = useState(activeStaff);

  return (
    <>
      <Helmet>
        <title>Staff Details</title>
      </Helmet>
      <CustomeNav />
      <div className="d-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex mx-4">
              <BreadOutlined name="HRM" breadcrumb="/hrm/staff" />
              <BreadOutlined name="Staff" breadcrumb="/hrm/staff" />
              <BreadCrumb name="Andrews" breadcrumb="/hrm/staff/name" />
            </div>
            <div className="d-lg-block d-none">
              <NavIcons />
            </div>
          </div>
          <div className="row mt-4 mx-1">
            <div className="col-md-8 mb-5">
              <div className="card border-0">
                <StaffDetailsHeader />
                <div className="staff-name mx-4">
                  <h6 className="text-deep">Andrews Opoku</h6>
                  <p className="gray-text small mt-0">Staff</p>
                </div>
                <div className="d-lg-flex grid-2 mx-lg-0 mx-3 justify-content-md-around">
                  <div className="d-flex justify-content-lg-center  align-items-center">
                    <div className="rounded-circle circle staff-icons">
                      <img src={location} alt="" />
                    </div>
                    <span className="text-deep mx-2 small">Accra, Ghana</span>
                  </div>
                  <div className="d-flex my-lg-0 my-3 justify-content-lg-center  align-items-center">
                    <div className="rounded-circle circle staff-icons">
                      <img src={phone} alt="" />
                    </div>
                    <span className="text-deep mx-2 small">
                      +233 54 509 8438
                    </span>
                  </div>

                  <div className="d-flex justify-content-lg-center  align-items-center">
                    <div className="rounded-circle circle staff-icons">
                      <img src={emailwhite} alt="" />
                    </div>
                    <span className="text-deep mx-2 small">
                      aopoku255@gmail.com
                    </span>
                  </div>
                </div>
                {/* Privilagees */}
                <h6 className="text-deep mx-3 mt-4">Priviledges</h6>
                <div className="form-check mx-3">
                  <input
                    className="form-check-input admin"
                    type="checkbox"
                    value=""
                    id="rememberme"
                  />
                  <label
                    className="form-check-label text-deep small "
                    htmlFor="rememberme"
                  >
                    Admin
                  </label>
                </div>
                <div className="about text-deep mx-3">
                  <h6 className="mt-4">About</h6>
                  <p className="mt-2 w-md-75">{Mydesc}</p>
                </div>
                <h6 className="text-deep mx-3 mt-4">Education</h6>
                <ul>
                  <li className="mt-3 small mx-3 text-deep">
                    <b>Kwame Nkrumah University of Science and Technology</b>
                    <p className="small gray-text">2013 - 2017</p>
                  </li>
                  <li className="mt-3 small mx-3 text-deep">
                    <b>Master of Electrical Engineering, Havard University</b>
                    <p className="small gray-text">2017 - 2020</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-md-4 bg-white mb-md-0 mb-5 pb-5">
              <h6 className="text-deep mt-3 mx-3">Latest Activity</h6>
              <ul className="mt-3 small">
                <li className="list-disc list">
                  <div className="pb-4">
                    <div>
                      <b className="text-deep">Karen Hope</b> moved order “
                      <span className="text-tomato">#2678</span> “ from{" "}
                      <b className="text-deep">On Progress</b> to{" "}
                      <b className="text-deep">Done</b>
                    </div>
                    <div className="gray-text small mt-2">
                      2 March 2021, 13:45 PM
                    </div>
                  </div>
                </li>
                <li className="list-disc list">
                  <div className="pb-4">
                    <div>
                      <b className="text-deep">Samantha William</b> add new{" "}
                      <b className="text-deep">4</b> attached files
                    </div>
                    <div className="gray-text small">
                      2 March 2021, 13:45 PM
                    </div>
                  </div>
                </li>
                <li className="list-disc list">
                  <div className="pb-4">
                    <div>
                      <b className="text-deep">Jenny</b> moved order “
                      <span className="text-tomato">#2678</span> “ from{" "}
                      <b className="text-deep">On Progress</b> to{" "}
                      <b className="text-deep">Done</b>
                    </div>
                    <div className="gray-text small mt-2">
                      2 March 2021, 13:45 PM
                    </div>
                  </div>
                </li>
                <li className="list-disc list">
                  <div className="">
                    <div>
                      <b className="text-deep">Samantha William</b> created new{" "}
                      <b className="text-tomato">Task</b>
                    </div>
                    <div className="gray-text small mt-2">
                      2 March 2021, 13:45 PM
                    </div>
                  </div>
                </li>
                <li className="list-disc list"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffDetails;
