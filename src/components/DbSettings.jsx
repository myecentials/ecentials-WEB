import React from "react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import danger from "../assets/icons/svg/danger.svg";
import axios from "../config/api/axios";
// import useAuth from "../hooks/useAuth";
import csv from "../static/drugs.csv";
import { setToken,facility_id } from "../app/features/authSlice/authSlice";
import { useSelector } from "react-redux";

const DbSettings = () => {
  const [file, setFile] = useState(null);
  const facilityId = useSelector(facility_id)
  const token = useSelector(setToken)
  // const { auth } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(file)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("store_id", facilityId);
    const myPromise = axios.post(
      "/pharmacy/drugs/upload-drugs-from-file",
      formData,
      {
        headers: {
          "auth-token": token,
          "Content-Type": 'multipart/form-data'
        },
      }
    );

    toast.promise(
      myPromise,
      {
        loading: "Loading...",
        success: res => res.data.message,
        error: "An errror occured",
      },
      // setFile(null)
    );
  };

  return (
    <div className="bg-white pb-5" style={{ borderRadius: "10px" }}>
      <Toaster />
      <h6 className="pt-5 px-3">Restore Database</h6>
      <hr className="my-0" />
      <div className="text-danger mt-3 mx-3 d-flex  rounded bg-warn">
        <img src={danger} alt="" className="mx-3" />
        <p className="my-2">
          Note: Can only import .csv files.{" "}
          <a href={csv} download="ecentials_drugs_format.csv">
            Download file format
          </a>
        </p>
      </div>

      <form className="row g-3 align-items-center mt-2 mx-3">
        <div className="col-auto">
          <label htmlFor="file" className="col-form-label">
            Import*
          </label>
        </div>
        <div className="col-auto">
          <input
            type="file"
            className="form-control "
            aria-describedby="passwordHelpInline"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <div className="col-auto">
          <input
            type="button"
            className="btn btn-primary"
            value="Import"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default DbSettings;
