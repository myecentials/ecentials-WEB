import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../../../components/Header";
import NavBar from "../../../../components/NavBar";
import HospitalSidebar from "../../../../components/HospitalComponents/HospitalSidebar";
import CompanyNameHeader from "../../../../components/HospitalComponents/CompanyNameHeader";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { BsCheckLg, BsFunnel, BsSearch, BsXLg } from "react-icons/bs";
import { Input, Table } from "reactstrap";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import staff from "../../../../assets/images/png/staff.jpeg";
import pending_data from "../../../../static/pending";
import { FaTimes } from "react-icons/fa";

const PendingAppointments = () => {
  const rows = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ];

  const columns = [
    {
      field: "col1",
      headerName: "Patient Name",
    },
    { field: "col2", headerName: "Patient ID" },
  ];

  const [search, setSearch] = useState("");
  const [genderSearch, setGenderSearch] = useState("all");
  const [indexnum, setIndexNum] = useState("all");
  const [enteries, setEnteries] = useState(10);

  console.log(genderSearch);

  const handleCorrect = (e) => {
    console.log(e);
  };

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
          <CompanyNameHeader title="APPOINTMENT" />
          <div className="d-flex justify-content-between align-items-center my-4">
            <div className="d-flex align-items-center">
              <span>Showing</span>
              <input
                type="number"
                className="form-control mx-2"
                placeholder="10"
                min={10}
                step={10}
                max={pending_data.length}
                onChange={(e) => setEnteries(e.target.value)}
              />
              <span>enteries</span>
            </div>
            <div className="btn btn-light bg-white rounded-0 text-secondary px-3 text-nowrap">
              Filter <BsFunnel />
            </div>
          </div>
          <div className="row gy-3">
            <div className="col-sm">
              <label htmlFor="">Patient</label>
              <div className="input-group flex-nowrap border rounded">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Patient name, Patient id..."
                  aria-label="Username"
                  value={search}
                  aria-describedby="addon-wrapping"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span
                  className="input-group-text bg-white border-0"
                  id="addon-wrapping"
                  style={{ borderLeftColor: "#fff" }}
                >
                  <BsSearch />
                </span>
              </div>
            </div>
            <div className="col-sm">
              <label htmlFor="">Gender</label>
              <div className="input-group flex-nowrap border rounded">
                <Input
                  type="select"
                  className="form-control border-0"
                  placeholder="Patient name, Patient id..."
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                  onChange={(e) => setGenderSearch(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </Input>
              </div>
            </div>
            <div className="col-sm">
              <label htmlFor="">Date</label>
              <div className="input-group flex-nowrap border rounded">
                <input
                  type="date"
                  className="form-control border-0"
                  placeholder="Patient name, Patient id..."
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
              </div>
            </div>
          </div>
          <div className="card border-0 rounded-0 my-4">
            <div className="bg-primary" style={{ height: "3rem" }}></div>
            <Table borderless striped responsive>
              <thead className="small text-nowrap">
                <tr>
                  <th>Patient Name</th>
                  <th className="text-center">Patient ID</th>
                  <th className="text-center">Date</th>
                  <th className="text-center">Gender</th>
                  <th className="text-center">Schedule Time</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {pending_data
                  .filter(({ patient_name, patient_id }) =>
                    patient_name.toLowerCase() === ""
                      ? patient_name
                      : patient_name
                          ?.toLocaleLowerCase()
                          .includes(search.toLocaleLowerCase()) ||
                        patient_id?.includes(search)
                  )
                  .filter(({ gender }) =>
                    genderSearch === "all" ? gender : genderSearch === gender
                  )

                  .slice(0, enteries)
                  .map(
                    (
                      {
                        patient_name,
                        image,
                        patient_id,
                        createdAt,
                        gender,
                        time,
                      },
                      index
                    ) => (
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={image}
                              alt=""
                              width={30}
                              className="mx-2 rounded"
                              style={{ pointerEvents: "none" }}
                            />
                            <span className="text-nowrap">{patient_name}</span>
                          </div>
                        </td>
                        <td className="text-center">{patient_id}</td>
                        <td className="text-center">
                          {new Date(createdAt).toLocaleDateString("en-US", {})}
                        </td>
                        <td className="text-center">{gender}</td>
                        <td className="text-center">
                          {new Date(createdAt).toLocaleTimeString("en-US", {
                            timeStyle: "short",
                          })}
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            <button
                              className="btn btn-sm btn-light bg-white text-success border"
                              onClick={(e) => handleCorrect(index)}
                            >
                              <BsCheckLg size={15} />
                            </button>
                            <button className="btn btn-sm btn-light bg-white text-danger border mx-2">
                              <BsXLg size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingAppointments;
