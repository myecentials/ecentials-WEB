import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../../../components/Header";
import NavBar from "../../../../components/NavBar";
import HospitalSidebar from "../../../../components/HospitalComponents/HospitalSidebar";
import CompanyNameHeader from "../../../../components/HospitalComponents/CompanyNameHeader";
import FullCalendar from "@fullcalendar/react";
import dayGrid from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import interaction from "@fullcalendar/interaction";
import "../../../../assets/styles/appointment.css";
import calendar from "../../../../assets/images/svgs/hospital/calendar.svg";
import allday from "../../../../assets/images/svgs/hospital/allday.svg";
import refresh from "../../../../assets/images/svgs/hospital/refresh.svg";
import printer from "../../../../assets/images/svgs/hospital/printer.svg";

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
          <div className="d-flex justify-content-between align-items-center mt-4">
            <div>
              <div className="d-flex">
                <div className="refresh card border-0 p-3 rounded-0">
                  <img src={refresh} alt="" />
                </div>
                <div className="printer card border-0 p-3 rounded-0 mx-3">
                  <img src={printer} alt="" />
                </div>
              </div>
            </div>
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
              plugins={[dayGrid, timeGrid, interaction]}
              allDayClassNames="d-none"
              weekNumbers={false}
              // dayHeaderFormat={}
              headerToolbar={{
                left: "prev,next,today",
                center: "title",
                end: "timeGridDay,timeGridWeek,dayGridMonth",
              }}
              editable={true}
              dayHeaderFormat={{ day: "numeric", weekday: "short" }}
              // nowIndicator={true}
              eventDurationEditable={true}
              dragScroll={true}
              
              events={[
                {
                  title: "Fever, headache, vomitting, cough, itching palm",
                  borderColor: "#fff",
                  backgroundColor: "#A162F7",
                  classNames: "event",
                  start: new Date(),
                  // end: new Date("Thu May 11 2023 03:17:45 GMT+0000"),
                  className: "px-2 radius",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
