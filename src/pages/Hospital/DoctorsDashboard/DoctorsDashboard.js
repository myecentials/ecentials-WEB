import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
// import HomeHeader from "../../../components/HomeHeader";
import Header from "../../../components/Header";
import NavBar from "../../../components/NavBar";
import CompanyNameHeader from "../../../components/HospitalComponents/CompanyNameHeader";
import HospitalSidebar from "../../../components/HospitalComponents/HospitalSidebar";
import HospitalCalendar from "../../../components/HospitalComponents/HospitalCalendar";
// import dayGrid from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import HospitalBarChart from "../../../components/HospitalComponents/HospitalBarChart";
import HospitalCard from "../../../components/HospitalComponents/HospitalCard";
import refer from "../../../assets/images/svgs/hospital/refer.svg";
import schedule from "../../../assets/images/svgs/hospital/scedule.svg";
import timer from "../../../assets/images/svgs/hospital/clock.svg";
import "../../../assets/styles/doctors.css";
import axios from "../../../config/api/axios";

const DoctorsDashboard = () => {
  const [data, setData] = useState([]);

  const facility_id = sessionStorage.getItem("facility_id");

  useEffect(() => {
    axios
      .get(`/hospitals/${facility_id}/appointments`)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Helmet>Doctors Dashboard</Helmet>
      <Header />
      <NavBar />
      <div className="d-md-flex dashboard">
        <div className="col-md-3 d-none d-md-block left">
          <HospitalSidebar />
        </div>
        <div className="col-md-9 px-3 middle">
          <CompanyNameHeader title="Home" />
          <div className="row gx-3 my-4">
            <div className="col-4">
              <div className="card border-0" style={{ height: "20rem" }}>
                {/* <h5 className="text-deep p-2 mt-2">Upcoming Events</h5> */}
                <HospitalCalendar />
              </div>
            </div>

            <div className="col-4 rounded">
              <div
                className="card border-0 rounded px-3 pb-4"
                style={{
                  height: "20rem",
                  borderRadius: "20px",
                  overflowY: "hidden",
                }}
              >
                <h6 className="text-deep p-2">Upcoming Events</h6>
                <FullCalendar
                  plugins={[timeGrid]}
                  headerToolbar={false}
                  initialView="timeGridDay"
                  height="100%"
                  dayCellClassNames="bg-white"
                  slotLabelClassNames="bg-white border-0"
                  slotLaneClassNames="bg-white"
                  viewClassNames="bg-white"
                  allDayClassNames="d-none"
                  dayHeaderClassNames="d-none"
                  events={data}
                  // dragScroll={false}
                />
              </div>
            </div>
            <div className="col-4">
              <HospitalBarChart />
            </div>
          </div>

          <div className="doctors_card_grid mx-auto">
            <HospitalCard
              className="hospital_card_circle bg"
              field="Refer"
              img={refer}
              width={20}
              textClass="text-deeps"
            />
            <HospitalCard
              className="hospital_card_circle bg"
              field="My Schedule"
              img={schedule}
              width={20}
              textClass="text-deeps"
            />
            <HospitalCard
              className="hospital_card_circle bg"
              field="Medical Records"
              img={timer}
              width={20}
              textClass="text-deeps"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorsDashboard;
