import React, { useEffect, useRef, useState } from "react";
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
import {
  Col,
  Collapse,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import Tabs from "../../../../components/HospitalComponents/Tabs";
import DateHeader from "../../../../components/DateHeader";
import circlegreen from "../../../../assets/images/svgs/hospital/circlegreen.svg";
import cedi from "../../../../assets/images/svgs/hospital/cedi.svg";
import chev from "../../../../assets/images/svgs/hospital/chev.svg";
import { FaTimes, faTimes } from "react-icons/fa";
import { TiUser } from "react-icons/ti";
import { HiPhone } from "react-icons/hi";
import { VscAdd } from "react-icons/vsc";
import { MdEmail, MdLocationOn, MdCancel } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { BsXLg } from "react-icons/bs";
import axios from "../../../../config/api/axios";

const Appointments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCal, setIsOpenCal] = useState(false);
  const [isOpenchange, setIsOpenChange] = useState(false);
  const [validate, setValidate] = useState(false);
  const [tabindex, setTabIndex] = useState("1");
  const [repeat, setRepeat] = useState("none");

  const handleClick = (info) => {
    console.log(info);
  };

  const handlenCalendar = () => {
    setIsOpenCal(!isOpenCal);
  };

  const handleModal = () => {
    setIsOpen(true);
  };
  const handlechangeDate = () => {
    setIsOpenChange(!isOpenchange);
  };

  const [dvalue, setDvalue] = useState("");
  const [dayvalue, setDayvalue] = useState("");

  const dateRef = useRef(null);

  const handleTabClick = (e) => {
    setTabIndex(e);
  };

  const handleValidate = () => {
    setValidate(true);
  };

  const handleRepeat = (e) => {
    setRepeat(e.target.value);
  };

  const printRef = useRef();

  const [count, setCount] = useState(1);

  const handleAdd = () => {
    setCount((count) => count + 1);
  };
  const handleRemove = () => {
    setCount((count) => count - 1);
  };
  const tables = [];
  for (let i = 0; i < count - 1; i++) {
    tables.push("hi");
  }

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
        <div className="col-md-9 px-3 middle appointment_container">
          <CompanyNameHeader title="APPOINTMENTS" />
          <div className="appointment_container">
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                <div className="d-flex">
                  <div className="refresh card border-0 p-3 rounded-0">
                    <img src={refresh} alt="" />
                  </div>
                  <ReactToPrint
                    trigger={() => (
                      <Link
                        to=""
                        className="printer card border-0 p-3 rounded-0 mx-3"
                      >
                        <img src={printer} alt="" />
                      </Link>
                    )}
                    content={() => printRef.current}
                  />
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
                    <HospitalCalendar />
                    <div>
                      <DateHeader />
                      <p className="bg-light p-2 rounded my-2 small">
                        Times you're available
                      </p>
                      <p className="text-primary d-flex justify-content-between align-items-center mx-2 border p-2 rounded">
                        <img src={circlegreen} alt="" width={8} />
                        <span>8:00 am - 9:30 am</span>
                      </p>
                      <p className="text-primary d-flex justify-content-between align-items-center mx-2 border p-2 rounded">
                        <img src={circlegreen} alt="" width={8} />
                        <span>10:00 am -11:30 am</span>
                      </p>
                      <p className="text-primary d-flex justify-content-between align-items-center mx-2 border p-2 rounded">
                        <img src={circlegreen} alt="" width={8} />
                        <span>1:00 am - 2:30 am</span>
                      </p>
                      <p className="text-primary d-flex justify-content-between align-items-center mx-2 border p-2 rounded">
                        <img src={circlegreen} alt="" width={8} />
                        <span>3:00 am - 4:30 am</span>
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div></div>
                    <div className="d-flex">
                      <div className="btn btn-outline-light text-secondary mx-4 px-4">
                        Reset
                      </div>
                      <div className="btn btn-primary px-4">Save</div>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>

            <div className="my-5">
              <div className="d-flex align-items-end">
                <div className="cal card border-0 p-3" ref={printRef}>
                  <FullCalendar
                    plugins={[dayGrid, timeGrid, interaction]}
                    allDayClassNames="d-none"
                    weekNumbers={false}
                    height="100vh"
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
                    // dragScroll={true}
                    // eventMinHeight={100}
                    navLinks={true}
                    selectable={true}
                    displayEventTime={true}
                    // dayCellContent={<><p>hELLO</p><p>hI</p></>}
                    // eventContent={[<><p>Hello</p><p>Hi</p><p>ji</p></>]}
                    events={data}
                  />
                </div>
                <div>
                  <button
                    className="rounded-circle bg-primary border-0 text-white mx-3 mb-3"
                    style={{ padding: "0.5rem 1rem", fontSize: "1.2rem" }}
                    onClick={handleModal}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <Modal
              isOpen={isOpen}
              centered
              className="border-0 overflow-x-scroll overflow-y-scroll modal text-secondary"
              fade
              scrollable={true}
              // fullscreen
              size="xl"
            >
              <div>
                <ModalHeader
                  toggle={(e) => setIsOpen(false)}
                  close={
                    <FaTimes
                      size={25}
                      onClick={(e) => setIsOpen(false)}
                      style={{ cursor: "pointer" }}
                    />
                  }
                  className="bg-primary text-white"
                >
                  Add Appointment
                </ModalHeader>
                <div
                  style={{
                    minHeight: "30rem",
                    // height: "30rem",
                    // overflowY: "hidden",
                  }}
                >
                  <ModalBody>
                    <Nav
                      tabs
                      className="tab_container pb-1 d-flex justify-content-between align-items-center"
                      style={{ height: "2.7rem" }}
                    >
                      <div className="d-md-flex">
                        <NavItem>
                          <NavLink
                            className="tablink"
                            onClick={(e) => handleTabClick("1")}
                            style={
                              tabindex === "1"
                                ? {
                                    backgroundColor: "white",
                                    color: "dodgerblue",
                                    // borderRadius: "5px",
                                    borderTop: "1px solid #B5B5C3",
                                    borderLeft: "1px solid #B5B5C3",
                                    borderRight: "1px solid #B5B5C3",
                                    borderTopRightRadius: "5px",
                                    borderTopLeftRadius: "5px",
                                  }
                                : {}
                            }
                          >
                            Details
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className="tablink"
                            onClick={(e) => handleTabClick("2")}
                            style={
                              tabindex === "2"
                                ? {
                                    backgroundColor: "white",
                                    color: "dodgerblue",
                                    // borderRadius: "5px",
                                    borderTop: "1px solid #B5B5C3",
                                    borderLeft: "1px solid #B5B5C3",
                                    borderRight: "1px solid #B5B5C3",
                                    borderTopRightRadius: "5px",
                                    borderTopLeftRadius: "5px",
                                  }
                                : {}
                            }
                          >
                            Recurrence
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className="tablink"
                            onClick={(e) => handleTabClick("3")}
                            style={
                              tabindex === "3"
                                ? {
                                    backgroundColor: "white",
                                    color: "dodgerblue",
                                    // borderRadius: "5px",
                                    borderTop: "1px solid #B5B5C3",
                                    borderLeft: "1px solid #B5B5C3",
                                    borderRight: "1px solid #B5B5C3",
                                    borderTopRightRadius: "5px",
                                    borderTopLeftRadius: "5px",
                                  }
                                : {}
                            }
                          >
                            Notes
                          </NavLink>
                        </NavItem>
                      </div>
                      {tabindex === "1" ? (
                        <div className="d-flex flex-nowrap align-items-center">
                          <span className="text-nowrap">Patient ID</span>
                          <input
                            type="text"
                            className="form-control mx-3"
                            placeholder="Enter ID or Email to validate"
                            style={{ width: "15rem" }}
                          />
                          <button
                            className="btn btn-primary"
                            onClick={handleValidate}
                          >
                            Validate
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </Nav>

                    <TabContent className="tab_body my-3" activeTab={tabindex}>
                      <TabPane tabId="1">
                        <Row>
                          <Col>
                            <b>Date</b>{" "}
                            <span className="mx-3">
                              {dvalue == "" ? (
                                <>
                                  {new Date().toLocaleDateString("en-US", {
                                    weekday: "short",
                                  })}{" "}
                                  {new Date().toLocaleDateString("en-US", {
                                    dateStyle: "medium",
                                  })}
                                </>
                              ) : (
                                <>
                                  {dayvalue} {dvalue}
                                </>
                              )}
                            </span>
                            <span
                              className="text-primary"
                              style={{ cursor: "pointer" }}
                              onClick={handlechangeDate}
                            >
                              change Date
                            </span>
                            <Collapse isOpen={isOpenchange}>
                              <div className="change_date shadow mt-5">
                                <HospitalCalendar
                                  onChange={({ $d }) => {
                                    setDvalue(
                                      new Date($d).toLocaleDateString("en-US", {
                                        dateStyle: "medium",
                                      })
                                    );
                                    setDayvalue(
                                      new Date($d).toLocaleDateString("en-US", {
                                        weekday: "short",
                                      })
                                    );
                                    setIsOpenChange(false);
                                  }}
                                />
                              </div>
                            </Collapse>
                          </Col>
                        </Row>
                        {validate ? (
                          <>
                            <p className="mb-0 mt-3">
                              <b>Patient</b>
                            </p>
                            <div className="card bg-light p-3 text-secondary tables_pane">
                              <div className="d-flex justify-content-between align-items-start">
                                <p>Andrews Opoku</p>
                                <MdCancel
                                  color="#808080"
                                  size={25}
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) => setValidate(false)}
                                />
                              </div>
                              <hr />
                              <div className="d-flex align-items-center">
                                <div className="d-flex align-items-center">
                                  <HiPhone color="rgba(0, 0, 0, 0.5)" />
                                  <span className="small mx-2">0545098438</span>
                                </div>
                                <div className="d-flex align-items-center mx-4">
                                  <MdEmail color="rgba(0, 0, 0, 0.5)" />
                                  <span className="small mx-2">
                                    aopoku255@gmail.com
                                  </span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <MdLocationOn color="rgba(0, 0, 0, 0.5)" />
                                  <span className="small mx-2">
                                    PLT 16 BLK III
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="row">
                            <div className="col-8">
                              <p className="mb-0 mt-3">
                                <b>Patient</b>
                              </p>
                              <div className="row">
                                <div className="col">
                                  <div className="input-group flex-nowrap">
                                    <span
                                      className="input-group-text"
                                      id="addon-wrapping"
                                    >
                                      <TiUser
                                        size={20}
                                        color="rgba(0, 0, 0, 0.5)"
                                      />
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="First Name"
                                      aria-label="Username"
                                      aria-describedby="addon-wrapping"
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="input-group flex-nowrap">
                                    <span
                                      className="input-group-text"
                                      id="addon-wrapping"
                                    >
                                      <TiUser
                                        size={20}
                                        color="rgba(0, 0, 0, 0.5)"
                                      />
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Last Name"
                                      aria-label="Username"
                                      aria-describedby="addon-wrapping"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row my-3">
                                <div className="col">
                                  <div className="input-group flex-nowrap">
                                    <span
                                      className="input-group-text"
                                      id="addon-wrapping"
                                    >
                                      <HiPhone
                                        size={20}
                                        color="rgba(0, 0, 0, 0.5)"
                                      />
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Phone Number"
                                      aria-label="Username"
                                      aria-describedby="addon-wrapping"
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="input-group flex-nowrap">
                                    <span
                                      className="input-group-text"
                                      id="addon-wrapping"
                                    >
                                      <MdEmail
                                        size={20}
                                        color="rgba(0, 0, 0, 0.5)"
                                      />
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Email"
                                      aria-label="Username"
                                      aria-describedby="addon-wrapping"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <div className="input-group flex-nowrap">
                                    <Input
                                      type="select"
                                      className="form-control"
                                      placeholder="New Patient"
                                      aria-label="Username"
                                      aria-describedby="addon-wrapping"
                                    >
                                      <option value="">New paitent</option>
                                      <option value="">Refered paitent</option>
                                      <option value="">Old paitent</option>
                                      <option value=""></option>
                                    </Input>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="input-group flex-nowrap">
                                    <span
                                      className="input-group-text"
                                      id="addon-wrapping"
                                    >
                                      <MdLocationOn
                                        size={20}
                                        color="rgba(0, 0, 0, 0.5)"
                                      />
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Address"
                                      aria-label="Username"
                                      aria-describedby="addon-wrapping"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-4">
                              <p className="mb-0 mt-3">
                                <b>Complaint</b>
                              </p>
                              <Input
                                type="textarea"
                                className="form-control"
                                style={{
                                  height: "9rem",
                                  minHeight: "9rem",
                                }}
                              />
                            </div>
                          </div>
                        )}
                        <div className="overflow-x-hidden bg-light my-4">
                          <Table
                            responsive
                            borderless
                            width={700}
                            style={{ width: "70vw" }}
                          >
                            <tbody>
                              <tr className="d-flex align-items-end">
                                <td className="text-nowrap my-2">
                                  <b>Service 1</b>
                                </td>
                                <td>
                                  <p></p>
                                  <div className="input-group flex-nowrap table_input">
                                    <Input
                                      type="select"
                                      className="form-control "
                                      placeholder="New Patient"
                                      aria-label="Username"
                                      aria-describedby="addon-wrapping"
                                    >
                                      <option value="">Service 1</option>
                                      <option value="">Service 2</option>
                                      <option value="">Service 3</option>

                                      <option value=""></option>
                                    </Input>
                                  </div>
                                </td>
                                <td>
                                  <p className="mb-0 text-secondary">Staff</p>
                                  <div className="input-group flex-nowrap table_input">
                                    <Input
                                      type="select"
                                      className="form-control"
                                      placeholder="New Patient"
                                      aria-label="Username"
                                      aria-describedby="addon-wrapping"
                                    >
                                      <option value="">Andrews</option>
                                      <option value="">Jesse</option>
                                      <option value="">Fred</option>

                                      <option value=""></option>
                                    </Input>
                                  </div>
                                </td>
                                <td>
                                  <p className="mb-0 text-secondary">
                                    Start Time
                                  </p>
                                  <div className="input-group flex-nowrap">
                                    <input
                                      type="time"
                                      className="form-control"
                                      placeholder="staff Name"
                                      aria-label="Username"
                                      aria-describedby="addon-wrapping"
                                      pattern="[0-9]{2}:[0-9]{2}"
                                      required
                                    />
                                    {/* <span className="input-group-text bg-white" id="addon-wrapping" >
                    <img src={chev} alt="" width={8}/>
                  </span> */}
                                  </div>
                                </td>
                                <td>
                                  <p className="mb-0 text-secondary">
                                    End Time
                                  </p>
                                  <div className="input-group flex-nowrap">
                                    <input
                                      type="time"
                                      className="form-control"
                                      placeholder="00:00"
                                      aria-label="Username"
                                      aria-describedby="addon-wrapping"
                                      pattern="[0-9]{2}:[0-9]{2}"
                                      required
                                    />
                                    {/* <span className="input-group-text bg-white" id="addon-wrapping" >
                    <img src={chev} alt="" width={8}/>
                  </span> */}
                                  </div>
                                </td>
                                <td>
                                  <p className="mb-0 text-secondary">Bill</p>
                                  <div className="input-group flex-nowrap table_input">
                                    <span
                                      className="input-group-text"
                                      id="addon-wrapping"
                                    >
                                      <img src={cedi} alt="" width={10} />
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder=""
                                      aria-label="Username"
                                      aria-describedby="addon-wrapping"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex">
                                    <button
                                      className="btn"
                                      style={{ backgroundColor: "#42CB91" }}
                                      onClick={handleAdd}
                                    >
                                      <VscAdd color="#fff" />
                                    </button>
                                    {count > 1 ? (
                                      <button
                                        className="btn btn-outline-secondary bg-white mx-3 text-nowrap text-secondary"
                                        style={{ backgroundColor: "#42CB91" }}
                                        onClick={(e) => setCount(1)}
                                      >
                                        Clear All
                                      </button>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                        {tables.map(({}, index) => (
                          <div className="overflow-x-hidden bg-light my-4 tables_pane">
                            <Table
                              responsive
                              borderless
                              width={700}
                              style={{ width: "70vw" }}
                            >
                              <tbody>
                                <tr className="d-flex align-items-end">
                                  <td className="text-nowrap my-2">
                                    <b>Service {index + 2}</b>
                                  </td>
                                  <td>
                                    <p></p>
                                    <div className="input-group flex-nowrap table_input">
                                      <Input
                                        type="select"
                                        className="form-control "
                                        placeholder="New Patient"
                                        aria-label="Username"
                                        aria-describedby="addon-wrapping"
                                      >
                                        <option value="">Service 1</option>
                                        <option value="">Service 2</option>
                                        <option value="">Service 3</option>

                                        <option value=""></option>
                                      </Input>
                                    </div>
                                  </td>
                                  <td>
                                    <p className="mb-0 text-secondary">Staff</p>
                                    <div className="input-group flex-nowrap table_input">
                                      <Input
                                        type="select"
                                        className="form-control"
                                        placeholder="New Patient"
                                        aria-label="Username"
                                        aria-describedby="addon-wrapping"
                                      >
                                        <option value="">Andrews</option>
                                        <option value="">Jesse</option>
                                        <option value="">Fred</option>

                                        <option value=""></option>
                                      </Input>
                                    </div>
                                  </td>
                                  <td>
                                    <p className="mb-0 text-secondary">
                                      Start Time
                                    </p>
                                    <div className="input-group flex-nowrap">
                                      <input
                                        type="time"
                                        className="form-control"
                                        placeholder="staff Name"
                                        aria-label="Username"
                                        aria-describedby="addon-wrapping"
                                        pattern="[0-9]{2}:[0-9]{2}"
                                        required
                                      />
                                      {/* <span className="input-group-text bg-white" id="addon-wrapping" >
                    <img src={chev} alt="" width={8}/>
                  </span> */}
                                    </div>
                                  </td>
                                  <td>
                                    <p className="mb-0 text-secondary">
                                      End Time
                                    </p>
                                    <div className="input-group flex-nowrap">
                                      <input
                                        type="time"
                                        className="form-control"
                                        placeholder="00:00"
                                        aria-label="Username"
                                        aria-describedby="addon-wrapping"
                                        pattern="[0-9]{2}:[0-9]{2}"
                                        required
                                      />
                                      {/* <span className="input-group-text bg-white" id="addon-wrapping" >
                    <img src={chev} alt="" width={8}/>
                  </span> */}
                                    </div>
                                  </td>
                                  <td>
                                    <p className="mb-0 text-secondary">Bill</p>
                                    <div className="input-group flex-nowrap table_input">
                                      <span
                                        className="input-group-text"
                                        id="addon-wrapping"
                                      >
                                        <img src={cedi} alt="" width={10} />
                                      </span>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        aria-label="Username"
                                        aria-describedby="addon-wrapping"
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex">
                                      <button
                                        className="btn"
                                        style={{ backgroundColor: "#42CB91" }}
                                        onClick={handleAdd}
                                      >
                                        <VscAdd color="#fff" />
                                      </button>
                                      <button
                                        className="btn text-danger bg-white border mx-3"
                                        onClick={handleRemove}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        ))}
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Col>
                            <Row className="d-flex align-items-center">
                              <Col md={repeat === "weekly" ? 2 : 1}>
                                <b className="mt-2">Repeat</b>
                              </Col>
                              <Col md={2}>
                                <Input
                                  type="select"
                                  className="form-control"
                                  placeholder="New Patient"
                                  aria-label="Username"
                                  aria-describedby="addon-wrapping"
                                  onChange={handleRepeat}
                                  // value={repeat}
                                >
                                  <option value="none">None</option>
                                  <option value="weekly">Weekly</option>
                                </Input>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        {repeat === "weekly" ? (
                          <>
                            <Row className="my-3">
                              <Col>
                                <Row className="d-flex align-items-center">
                                  <Col md={2}>
                                    <b className="mt-2">Repeat Every</b>
                                  </Col>
                                  <Col md={2}>
                                    <Input
                                      type="select"
                                      className="form-control"
                                      placeholder="New Patient"
                                      aria-label="Username"
                                      aria-describedby="addon-wrapping"
                                      // onChange={handleRepeat}
                                      // value={repeat}
                                    >
                                      <option value="none">5</option>
                                      <option value="weekly">7</option>
                                    </Input>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row className="d-flex align-items-center">
                              <Col md={2}>
                                <b className="mt-2">Ends</b>
                              </Col>
                              <Col md={2}>
                                <Input
                                  type="select"
                                  className="form-control"
                                  placeholder="New Patient"
                                  aria-label="Username"
                                  aria-describedby="addon-wrapping"
                                  // onChange={handleRepeat}
                                  // value={repeat}
                                >
                                  <option value="none">1</option>
                                  <option value="weekly">2</option>
                                  <option value="weekly">3</option>
                                  <option value="weekly">4</option>
                                  <option value="weekly">5</option>
                                  <option value="weekly">6</option>
                                  <option value="weekly">7</option>
                                </Input>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={2}></Col>
                              <Col md={2}>
                                <div
                                  className="btn-toolbar mt-3"
                                  role="toolbar"
                                  aria-label="Toolbar with button groups"
                                >
                                  <div
                                    className="btn-group me-2"
                                    role="group"
                                    aria-label="First group"
                                  >
                                    <button
                                      style={{ width: "3rem" }}
                                      type="button"
                                      className="btn btn-outline-secondary btn-sm"
                                    >
                                      Mon
                                    </button>
                                    <button
                                      style={{ width: "3rem" }}
                                      type="button"
                                      className="btn btn-outline-secondary btn-sm"
                                    >
                                      Tue
                                    </button>
                                    <button
                                      style={{ width: "3rem" }}
                                      type="button"
                                      className="btn btn-outline-secondary btn-sm"
                                    >
                                      Wed
                                    </button>
                                    <button
                                      style={{ width: "3rem" }}
                                      type="button"
                                      className="btn btn-outline-secondary btn-sm"
                                    >
                                      Thu
                                    </button>
                                    <button
                                      style={{ width: "3rem" }}
                                      type="button"
                                      className="btn btn-outline-secondary btn-sm"
                                    >
                                      Fri
                                    </button>
                                    <button
                                      style={{ width: "3rem" }}
                                      type="button"
                                      className="btn btn-outline-secondary btn-sm"
                                    >
                                      Sat
                                    </button>
                                    <button
                                      style={{ width: "3rem" }}
                                      type="button"
                                      className="btn btn-outline-secondary btn-sm"
                                    >
                                      Sun
                                    </button>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </>
                        ) : (
                          ""
                        )}
                      </TabPane>
                      <TabPane tabId="3">
                        <div>
                          <label htmlFor="">
                            <b>Notes</b>
                          </label>
                          <Input
                            type="textarea"
                            className="form-control"
                            rows={5}
                          />
                        </div>
                        <div className="mt-4">
                          <label htmlFor="">
                            <b>Recommendations</b>
                          </label>
                          <Input
                            type="textarea"
                            className="form-control"
                            rows={5}
                          />
                        </div>
                      </TabPane>
                    </TabContent>
                  </ModalBody>
                </div>
                <ModalFooter className="bg-light border-0">
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="d-flex">
                      <div className="btn btn-outline-secondary mx-4 px-3">
                        Cancel
                      </div>
                      <div className="btn btn-primary px-3">Save</div>
                    </div>
                  </div>
                </ModalFooter>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
