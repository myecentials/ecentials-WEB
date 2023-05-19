import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../../../components/Header";
import NavBar from "../../../../components/NavBar";
import HospitalSidebar from "../../../../components/HospitalComponents/HospitalSidebar";
import CompanyNameHeader from "../../../../components/HospitalComponents/CompanyNameHeader";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

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
          <div className="card border-0 rounded-0">
            <div>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                // checkboxSelection
                // disableRowSelectionOnClick
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingAppointments;
