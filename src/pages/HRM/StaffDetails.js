import React from "react";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import BreadOutlined from "../../components/BreadOutlined";
import BreadCrumb from "../../components/BreadCrumb";
import StaffDetailsHeader from "../../components/StaffDetailsHeader";
import location from "../../assets/icons/svg/location.svg";
import phone from "../../assets/icons/svg/phone.svg";
import emailwhite from "../../assets/icons/svg/emailwhite.svg";

const StaffDetails = () => {
  return (
    <div className="d-flex">
      <div className="col-md-3 bg-white left">
        <SideBar />
      </div>
      <div className="col-md-9 middle">
        <div className="d-flex justify-content-md-between align-items-center mt-md-5">
          <div className="d-flex mx-4">
            <BreadOutlined name="HRM" breadcrumb="/hrm/staff" />
            <BreadCrumb name="Staff" breadcrumb="/hrm/staff" />
          </div>
          <div className="d-md-block d-none">
            <NavIcons />
          </div>
        </div>
        <div className="row mt-4 mx-2">
          <div className="col-md-8">
            <div className="card border-0">
              <StaffDetailsHeader />
              <div className="staff-name mx-4">
                <h6 className="text-deep">Andrews Opoku</h6>
                <p className="gray-text small mt-0">Staff</p>
              </div>
              <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="rounded-circle circle staff-icons">
                    <img src={location} alt="" />
                  </div>
                  <span className="text-deep mx-2 small">Accra, Ghana</span>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="rounded-circle circle staff-icons">
                    <img src={phone} alt="" />
                  </div>
                  <span className="text-deep mx-2 small">+233 54 509 8438</span>
                </div>
                <div className="d-flex justify-content-center align-items-center">
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
              <div class="form-check mx-3">
                <input
                  class="form-check-input admin"
                  type="checkbox"
                  value=""
                  id="rememberme"
                />
                <label
                  class="form-check-label text-deep small "
                  for="rememberme"
                >
                  Admin
                </label>
              </div>
              <div className="about text-deep mx-3">
                <h6 className="mt-4">About</h6>
                <p className="mt-2 w-75">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                  optio explicabo placeat eum voluptates repellendus nisi veniam
                  vel quaerat unde aperiam nemo, dolore officia dicta omnis
                  minima porro praesentium ad?
                </p>
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
          <div className="col-md-4 bg-white ">
            <h6 className="text-deep mt-3 mx-3">Latest Activity</h6>
            <div class="form-check">
              <input
                class="form-check-input border-0 bg-user p-2"
                type="radio"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                <span className="small">
                  <b className="text-deep">Karen Hope</b> moved order "#2678"
                  from <b className="text-deep">On Progress</b> to{" "}
                  <b className="text-deep">Done</b>
                </span>
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input border-0 bg-user p-2"
                type="radio"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                <span className="small">
                  <b className="text-deep">Karen Hope</b> moved order "#2678"
                  from <b className="text-deep">On Progress</b> to{" "}
                  <b className="text-deep">Done</b>
                </span>
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input border-0 bg-user" type="radio" />
              <label class="form-check-label" for="flexRadioDefault1">
                <span className="small">
                  <b className="text-deep">Karen Hope</b> moved order "#2678"
                  from <b className="text-deep">On Progress</b> to{" "}
                  <b className="text-deep">Done</b>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetails;
