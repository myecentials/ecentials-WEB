import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../../../components/Header";
import NavBar from "../../../../components/NavBar";
import HospitalSidebar from "../../../../components/HospitalComponents/HospitalSidebar";
import CompanyNameHeader from "../../../../components/HospitalComponents/CompanyNameHeader";
import FullCalendar from "@fullcalendar/react";
import dayGrid from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import "../../../../assets/styles/appointment.css";
import calendar from "../../../../assets/images/svgs/hospital/calendar.svg";
import allday from "../../../../assets/images/svgs/hospital/allday.svg";

const Appointments = () => {
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
          <div className="d-flex justify-content-between align-items-center">
            <div></div>
            <div>
              <button className="btn_appointement">
                <img src={calendar} alt="" width={15} className="" />
                <span className="mx-1">Set Appointment</span>
              </button>
              <div className="card border-0 d-none">
                <FullCalendar
                  plugins={[dayGrid]}
                  themeSystem="bootstrap5"
                  headerToolbar={{ left: "title", right: "prev,next" }}
                />
              </div>
            </div>
          </div>
          <div className="my-5 card border-0 p-3">
            <FullCalendar
              plugins={[dayGrid, timeGrid]}
              allDayClassNames="d-none"
              weekNumbers={false}
              // dayHeaderFormat={}
              headerToolbar={{
                left: "prev,next,today",
                center: "title",
                end: "timeGridDay,timeGridWeek,dayGridMonth",
              }}
              dayHeaderFormat={ {day: 'numeric', weekday: 'short'} }
              nowIndicator={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
