import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import HospitalSidebar from "../../components/HospitalComponents/HospitalSidebar";
import CompanyNameHeader from "../../components/HospitalComponents/CompanyNameHeader";
import HospitalCard from "../../components/HospitalComponents/HospitalCard";
import Calendar from "react-calendar";
import Example from "../../components/HospitalComponents/Barchat";
import person from "../../assets/images/svgs/hospital/person.svg";
import patient from "../../assets/images/svgs/hospital/patient.svg";
import report from "../../assets/images/svgs/hospital/report.svg";
import drugs from "../../assets/images/svgs/hospital/drugs.svg";
import shift from "../../assets/images/svgs/hospital/shift.svg";
import appointment from "../../assets/images/svgs/hospital/appointmentsvg.svg";
import regist from "../../assets/images/svgs/hospital/regist.svg";
import quese from "../../assets/images/svgs/hospital/quese.svg";
import employee from "../../assets/images/svgs/hospital/employee.svg";
import pharma from "../../assets/images/svgs/hospital/pharma.svg";
import search from "../../assets/images/svgs/hospital/search.svg";
import HomeHeader from "../../components/HomeHeader";
import "../../assets/styles/hospital.css";
import FullCalendar from "@fullcalendar/react";
import daygrid from "@fullcalendar/daygrid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import HospitalCalendar from "../../components/HospitalComponents/HospitalCalendar";

const HospitalDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <HomeHeader />
      <Header />
      <NavBar />

      <div className="d-md-flex dashboard">
        {/* LEFT */}
        <div className="col-md-3 d-none d-md-block left">
          <HospitalSidebar />
        </div>

        {/* MIDDLE */}
        <div className="col-md-9 px-3 middle">
          <CompanyNameHeader title="Home" />
          <div className="hospital_grid my-5">
            <HospitalCard
              className="hospital_card_circle ms-bg"
              count="5700"
              field="Doctors"
              number="3 "
              img={person}
              margin="my-0"
              width={20}
              textClass="text-lights"
              text="Doctors joined this week"
            />
            <HospitalCard
              className="hospital_card_circle bg-tomato"
              count="10K"
              field="Patients"
              number="3 "
              img={patient}
              margin="my-0"
              width={20}
              textClass="text-lights"
              text="Doctors joined this week"
            />
            <HospitalCard
              className="hospital_card_circle bg-primary"
              count="800"
              field="Reports"
              number="3 "
              img={report}
              margin="my-0"
              width={20}
              textClass="text-lights"
              text="Doctors joined this week"
            />
            <HospitalCard
              className="hospital_card_circle bg-success"
              count="100"
              field="Pharmacy"
              number="3 "
              img={drugs}
              margin="my-0"
              width={20}
              textClass="text-lights"
              text="Doctors joined this week"
            />
            <HospitalCard
              className="hospital_card_circle bg"
              field="Appointment"
              img={appointment}
              width={20}
              textClass="text-deeps"
            />
            <HospitalCard
              className="hospital_card_circle bg"
              field="Patient Registration"
              img={regist}
              width={20}
              textClass="text-deeps"
            />
            <HospitalCard
              className="hospital_card_circle bg"
              field="Employee Registration"
              img={employee}
              width={20}
              textClass="text-deeps"
            />
            <HospitalCard
              className="hospital_card_circle bg"
              field="Pharmaceuticals"
              img={pharma}
              width={20}
              textClass="text-deeps"
            />
            <HospitalCard
              className="hospital_card_circle bg"
              field="In-Patients"
              img={employee}
              width={20}
              textClass="text-deeps"
            />
            <HospitalCard
              className="hospital_card_circle bg"
              field="Queues"
              img={quese}
              width={20}
              textClass="text-deeps"
            />
            <HospitalCard
              className="hospital_card_circle bg"
              field="Patient Search"
              img={search}
              width={20}
              textClass="text-deeps"
            />
            <HospitalCard
              className="hospital_card_circle bg"
              field="Shfts & Attendance"
              img={shift}
              width={20}
              textClass="text-deeps"
            />
          </div>

          <div className="row gx-2 mb-4">
            <div className="col-4">
              <div
                className="card border-0 rounded"
                style={{ height: "23rem" }}
              >
                <HospitalCalendar />
              </div>
            </div>
            <div className="col-8">
              <div
                style={{ height: "23rem", width: "100%" }}
                className="card border-0 p-3"
              >
                <div className="d-flex justify-content-between align-items-start small">
                  <h6 className="text-deep">Reported cases</h6>
                  <ul className="d-flex">
                    <li className="d-flex flex-column">
                      <p className="mb-0 text-lights">This week</p>
                      <h6 className="text-deep">5700</h6>
                    </li>
                    <li className="d-flex flex-column mx-4">
                      <p className="mb-0 text-lights">Last week</p>
                      <h6 className="text-deep">5700</h6>
                    </li>
                  </ul>
                </div>
                <Example />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalDashboard;
