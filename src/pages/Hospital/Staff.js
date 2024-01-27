import React from "react";
import DateHeader from "../../components/DateHeader";
import BreadCrumb from "../../components/BreadCrumb";
// import NavIcons from "../../components/NavIcons";
// import SideBar from "../../components/SideBar";
import StaffCard from "../../components/Pharmacy/Hrm/StaffCard";
import BreadOutlined from "../../components/BreadOutlined";
// import SearchBar from "../../components/SearchBar";
// import activeStaff from "../../static/activeStaff";
import leftchev from "../../assets/icons/svg/leftchev.svg";
import rightchev from "../../assets/icons/svg/rightchev.svg";
import chevfilldown from "../../assets/icons/svg/chevfilldown.svg";
import add from "../../assets/icons/svg/add.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import axios from "../../config/api/axios";
import { useState } from "react";
import { useEffect } from "react";
import { Modal} from "reactstrap";
// import CountUp from "react-countup";
import empty from "../../assets/images/svgs/empty.svg";
import PharmacyName from "../../components/PharmacyName";
import HospitalSidebar from "../../components/Hospital/HospitalSidebar";
const HStaff = () => {
  // const [value, setValue] = useState(0);

  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        "/hospital/staff",
        {
          hospitalId: sessionStorage.getItem("facility_id"),
        },
        { headers: { "auth-token": sessionStorage.getItem("userToken") } }
      )
      .then((res) => {
        setDetails(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Helmet>
        <title>Staff</title>
      </Helmet>
      <Header />
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <HospitalSidebar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">HRMhg</h6>
              <DateHeader />
              <div className="d-flex">
                <BreadOutlined name="HRM" breadcrumb="/hospital/management" />
                <BreadCrumb
                  name="Staff"
                  breadcrumb="/hospital/management"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="d-md-flex justify-content-between mt-4">
            <div className="mx-3"></div>
            <div className="d-flex justify-content-evenly  mt-md-0 mt-3">
              <button
                className="btn outline-btn rounded-pill px-4 text-nowrap"
                style={{ color: "#4D44B5" }}
              >
                Newest{" "}
                <img src={chevfilldown} alt="" width={15} className="mx-2" />
              </button>
              <Link
                to="/hospital/management/add-staff"
                className="btn mx-md-3 signup-btn rounded-pill px-4 text-nowrap"
              >
                <img src={add} alt="" width={10} className="mx-2" /> New Staff
              </Link>
            </div>
          </div>
          <Modal isOpen={isLoading}></Modal>
          {details.length === 0 ? (
            <div className="staff_contain">
              <img
                src={empty}
                alt=""
                className="img-fluid d-block"
                width={300}
              />
              <p className="text-center mt-2 text-deep">No Staff Available</p>
            </div>
          ) : (
            <div className="row mt-md-5 mx-3 pb-5 d-grid-3">
              {details.map(
                (
                  { first_name, last_name, photo, department, _id, terminated },
                  index
                ) => (
                  <div className="col-lg-3 gy-3" key={_id}>
                    <StaffCard
                      to="/hospital/management/edit-staff"
                      image={photo}
                      link={`/hrm/staff/${first_name} ${last_name} ${_id}`}
                      name={`${first_name} ${last_name}`}
                      field={department}
                      id={index}
                      active={terminated}
                    />
                  </div>
                )
              )}
            </div>
          )}

          <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5">
            <p className="small text-center">
              Showing <span className="text-lightdeep">1-{details.length}</span>{" "}
              from <span className="text-lightdeep">{details.length}</span> data
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <img src={leftchev} alt="" className="mx-3" />
              <div className="circle rounded-circle mail circle-bgdeep text-white">
                1
              </div>
              <div className="circle rounded-circle mail mx-2">2</div>
              <div className="circle rounded-circle mail">3</div>
              <img src={rightchev} alt="" className="mx-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HStaff;
