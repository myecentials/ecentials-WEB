import React, { useState } from "react";
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
import HospitalCalendar from "../../../../components/HospitalComponents/HospitalCalendar";
import { Col, Collapse, Input, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import Tabs from "../../../../components/HospitalComponents/Tabs";
import DateHeader from "../../../../components/DateHeader";
import circlegreen from "../../../../assets/images/svgs/hospital/circlegreen.svg"
import chev from "../../../../assets/images/svgs/hospital/chev.svg"
import {FaTimes, faTimes} from "react-icons/fa"
import {TiUser} from "react-icons/ti"
import {HiPhone} from "react-icons/hi"
import {MdEmail, MdLocationOn} from "react-icons/md"
import { NavLink } from "react-router-dom";

const Appointments = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenCal, setIsOpenCal] = useState(false)

  const handleClick = () => {
    console.log("hello")
  }

  const handlenCalendar = () => {
    setIsOpenCal(!isOpenCal)
  }

  const handleModal = () => {
    setIsOpen(true)
  }

  return (
    <>
      <Helmet>Doctors Dashboard</Helmet>
      <Header />
      <NavBar />
      <div className="d-md-flex dashboard">
        <div className="col-md-3 d-none d-md-block left">
          <HospitalSidebar />
        </div>
        <div className="col-md-9 px-3 middle appointment_container">
          <CompanyNameHeader title="APPOINTMENTS" />
          <div className="appointment_container">
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
            <div className="">
              <button className="btn_appointement" onClick={handlenCalendar}>
                <img src={calendar} alt="" width={15} className="" />
                <span className="mx-1">Set Appointment</span>
              </button>
            </div>
          </div>
              <div className="appointment_calendar  border-0 shadow d-flex justify-content-end align-items-end">
                <Collapse isOpen={isOpenCal} className="">
                  <div className="p-4">

                  <h5 className="mx-3">Select a Date & Time</h5>
                  <div className="d-flex">
                  <HospitalCalendar/>
                  <div>
                    <DateHeader/>
                    <p className="bg-light p-2 rounded my-2 small">Times you're available</p>
                    <p className="text-primary d-flex justify-content-between align-items-center mx-2 border p-2 rounded">
                      <img src={circlegreen} alt="" width={8}/>
                      <span>8:00 am - 9:30 am</span>
                      </p>
                    <p className="text-primary d-flex justify-content-between align-items-center mx-2 border p-2 rounded">
                      <img src={circlegreen} alt="" width={8}/>
                      <span>10:00 am -11:30 am</span>
                      </p>
                    <p className="text-primary d-flex justify-content-between align-items-center mx-2 border p-2 rounded">
                      <img src={circlegreen} alt="" width={8}/>
                      <span>1:00 am - 2:30 am</span>
                      </p>
                    <p className="text-primary d-flex justify-content-between align-items-center mx-2 border p-2 rounded">
                      <img src={circlegreen} alt="" width={8}/>
                      <span>3:00 am - 4:30 am</span>
                      </p>
                  </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div></div>
                    <div className="d-flex">

                    <div className="btn btn-outline-light text-secondary mx-4 px-4">Reset</div>
                    <div className="btn btn-primary px-4">Save</div>
                    </div>
                  </div>
                  </div>
                </Collapse>
              </div>
             
          <div className="my-5">
            <div className="d-flex align-items-end">
            <div className="cal card border-0 p-3">
            <FullCalendar
              plugins={[dayGrid, timeGrid, interaction]}
              allDayClassNames="d-none"
              weekNumbers={false}
              // dayHeaderFormat={}
              day
              headerToolbar={{
                left: "prev,next,today",
                center: "title",
                end: "timeGridDay,timeGridWeek,dayGridMonth",
              }}
              editable={true}
              dayHeaderFormat={{ day: "numeric", weekday: "short" }}
              // dayHeaderContent={<p>ji</p>}
              // nowIndicator={true}
              dateClick={handleClick}
              eventDurationEditable={true}
              dragScroll={true}
              eventMinHeight={200}
              navLinks={true}
              selectable={true}
              displayEventTime={true}
              // dayCellContent={<><p>hELLO</p><p>hI</p></>}
              // eventContent={[<><p>Hello</p><p>Hi</p><p>ji</p></>]}
              events={[
                {
                  title: "Fever, headache, vomitting, cough, itching palm",
                  borderColor: "#fff",
                  backgroundColor: "#A162F7",
                  classNames: "event",
                  start: new Date(),
                  end: new Date("Wed May 17 2023 13:17:45 GMT+0000"),
                  // end: new Date("Thu May 11 2023 03:17:45 GMT+0000"),
                  className: "px-2 radius",
                  
                  

                },
              ]}
            />
            </div>
            <div>
              <button className="rounded-circle bg-primary border-0 text-white mx-3 mb-3" style={{padding: "0.5rem 1rem", fontSize: "1.2rem"}} onClick={handleModal}>+</button>
            </div>
           

            <Modal isOpen={isOpen} centered className="border-0 overflow-x-scroll" fade>
            <ModalHeader toggle={e => setIsOpen(false)} close={<FaTimes size={25} onClick={e => setIsOpen(false)} style={{cursor: "pointer"}}/>} className="bg-primary text-white">
              Add Appointment
            </ModalHeader>
              <ModalBody>
               <nav className="tab_container">
                <NavLink className="tablink">Details</NavLink>
                <NavLink className="tablink">Recurrence</NavLink>
                <NavLink className="tablink">Notes</NavLink>
                
               </nav>
               <div className="tab_body my-3">
                <b className="mx-1">Date</b><span>Tue 19 Nov 2022</span>
                 <p className="mb-0 mt-3"><b>Patient</b></p>
                <div className="row">
                  <div className="col">
                    
                  <div className="input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping"><TiUser size={20} color="rgba(0, 0, 0, 0.5)"/></span>
                  <input type="text" className="form-control" placeholder="First Name" aria-label="Username" aria-describedby="addon-wrapping"/>
                </div>
                  </div>
                  <div className="col">
                  <div className="input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping"><TiUser size={20} color="rgba(0, 0, 0, 0.5)"/></span>
                  <input type="text" className="form-control" placeholder="Last Name" aria-label="Username" aria-describedby="addon-wrapping"/>
                </div>
                  </div>
                  
                </div>
                <div className="row my-3">
                  <div className="col">
                    
                  <div className="input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping"><HiPhone size={20} color="rgba(0, 0, 0, 0.5)"/></span>
                  <input type="text" className="form-control" placeholder="Phone Number" aria-label="Username" aria-describedby="addon-wrapping"/>
                </div>
                  </div>
                  <div className="col">
                  <div className="input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping"><MdEmail size={20} color="rgba(0, 0, 0, 0.5)"/></span>
                  <input type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping"/>
                </div>
                  </div>
                  
                </div>
                <div className="row">
                  <div className="col">
                    
                  <div className="input-group flex-nowrap">
                  <input type="text" className="form-control" style={{borderRight: "none"}} placeholder="New Patient" aria-label="Username" aria-describedby="addon-wrapping"/>
                  <span className="input-group-text bg-white" id="addon-wrapping" >
                    <img src={chev} alt="" width={8}/>
                  </span>
                </div>
                  </div>
                  <div className="col">
                  <div className="input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping"><MdLocationOn size={20} color="rgba(0, 0, 0, 0.5)"/></span>
                  <input type="text" className="form-control" placeholder="Address" aria-label="Username" aria-describedby="addon-wrapping"/>
                </div>
                  </div>
                  
                </div>
                <p className="mb-0 mt-3"><b>Description</b></p>
                <Input type="textarea" className="form-control" rows={5}/>
                <div className="overflow-x-hidden">

                <div className="services  bg-light py-4 px-3 my-4">
                <p className="mb-0"><b>Service 1</b></p>
                <div className="row">
                  <div className="col">
                    
                  <div className="input-group flex-nowrap">
                  <input type="text" className="form-control" style={{borderRight: "none"}} placeholder="New Patient" aria-label="Username" aria-describedby="addon-wrapping"/>
                  <span className="input-group-text bg-white" id="addon-wrapping" >
                    <img src={chev} alt="" width={8}/>
                  </span>
                </div>
                  </div>
                  <div className="col">
                    
                  <div className="input-group flex-nowrap">
                  <input type="text" className="form-control" style={{borderRight: "none"}} placeholder="New Patient" aria-label="Username" aria-describedby="addon-wrapping"/>
                  <span className="input-group-text bg-white" id="addon-wrapping" >
                    <img src={chev} alt="" width={8}/>
                  </span>
                </div>
                  </div>
                  <div className="col">
                    
                  <div className="input-group flex-nowrap">
                  <input type="text" className="form-control" style={{borderRight: "none"}} placeholder="New Patient" aria-label="Username" aria-describedby="addon-wrapping"/>
                  <span className="input-group-text bg-white" id="addon-wrapping" >
                    <img src={chev} alt="" width={8}/>
                  </span>
                </div>
                  </div>
                  <div className="col">
                    
                  <div className="input-group flex-nowrap">
                  <input type="text" className="form-control" style={{borderRight: "none"}} placeholder="New Patient" aria-label="Username" aria-describedby="addon-wrapping"/>
                  <span className="input-group-text bg-white" id="addon-wrapping" >
                    <img src={chev} alt="" width={8}/>
                  </span>
                </div>
                  </div>
                  <div className="col">
                    
                  <div className="input-group flex-nowrap">
                  <input type="text" className="form-control" style={{borderRight: "none"}} placeholder="New Patient" aria-label="Username" aria-describedby="addon-wrapping"/>
                  <span className="input-group-text bg-white" id="addon-wrapping" >
                    <img src={chev} alt="" width={8}/>
                  </span>
                </div>
                  </div>
                 
                  
                </div>
                </div>

                </div>
               </div>
              </ModalBody>
            </Modal>
           
            
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
