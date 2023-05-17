import FullCalendar from "@fullcalendar/react";
import React from "react";
import { Helmet } from "react-helmet";
import HomeHeader from "../../../components/HomeHeader";
import Header from "../../../components/Header";
import NavBar from "../../../components/NavBar";
import CompanyNameHeader from "../../../components/HospitalComponents/CompanyNameHeader";
import HospitalSidebar from "../../../components/HospitalComponents/HospitalSidebar";
import HospitalCalendar from "../../../components/HospitalComponents/HospitalCalendar";
import dayGrid from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import HospitalBarChart from "../../../components/HospitalComponents/HospitalBarChart";
import HospitalCard from "../../../components/HospitalComponents/HospitalCard";
import refer from "../../../assets/images/svgs/hospital/refer.svg";
import schedule from "../../../assets/images/svgs/hospital/scedule.svg";
import timer from "../../../assets/images/svgs/hospital/clock.svg";
import "../../../assets/styles/doctors.css";

const DoctorsDashboard = () => {
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
          <div className="row gx-2 my-4">
            <div className="col-4">
              <div className="card border-0" style={{ height: "20rem" }}>
                {/* <h5 className="text-deep p-2 mt-2">Upcoming Events</h5> */}
                <HospitalCalendar />
              </div>
            </div>

            <div className="col-8 rounded">
              <div
                className="card border-0 rounded p-3"
                style={{
                  height: "20rem",
                  borderRadius: "20px",
                  overflowY: "hidden",
                }}
              >
                <h5 className="text-deep p-2">Upcoming Events</h5>
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
                  events={[
                    {
                      title: "John Doe",
                      borderColor: "#fff",
                      backgroundColor: "#A162F7",
                      start: new Date(),
                      // end: new Date("Thu May 11 2023 03:17:45 GMT+0000"),
                      className: "px-2 radius",
                    },
                    {
                      title: "John Doe",
                      borderColor: "#fff",
                      backgroundColor: "#70CF97",
                      start: new Date("Wed May 17 2023 15:17:45 GMT+0000"),
                      className: "px-2 radius",
                    },
                  ]}
                  // dragScroll={false}
                />
              </div>
            </div>
          </div>
          <div className="row my-4">
            <div className="col-8">
              <HospitalBarChart />
            </div>
            <div className="col-4">
              <div className="doctors_card_grid">
                <HospitalCard
                  className="hospital_card_circle bg"
                  field="Patient Search"
                  img={refer}
                  width={20}
                  textClass="text-deeps"
                />
                <HospitalCard
                  className="hospital_card_circle bg"
                  field="Patient Search"
                  img={schedule}
                  width={20}
                  textClass="text-deeps"
                />
                <HospitalCard
                  className="hospital_card_circle bg"
                  field="Patient Search"
                  img={timer}
                  width={20}
                  textClass="text-deeps"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorsDashboard;
