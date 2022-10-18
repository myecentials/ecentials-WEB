import React from "react";
import logo from "../logo.svg";

const GeneralSettingsForm = () => {
  return (
    <div className="bg-white pb-5" style={{ borderRadius: "10px" }}>
      <h6 className="pt-5 px-3">General Settings</h6>
      <hr className="my-0" />

      {/* FORM */}
      <div className="row px-3 mt-4">
        <div className="col-md">
          <div className="form-group mb-2">
            <label htmlFor="name" className="small mb-2">
              Company Title*
            </label>
            <input type="text" className="form-control mb-4" />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="text" className="small mb-2">
              Address
            </label>
            <input type="address" className="form-control mb-4" />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="location" className="small mb-2">
              Phone Number
            </label>
            <input type="text" className="form-control mb-4" />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password" className="small mb-2">
              Language
            </label>
            <select name="" id="" className="form-control mb-4">
              <option value="">English(US)</option>
            </select>
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password" className="small mb-2">
              Courier Type
            </label>
            <select name="" id="" className="form-control">
              <option value="">Internal fleet</option>
            </select>{" "}
          </div>
        </div>
        <div className="col-md">
          <div className="form-group mb-2">
            <label htmlFor="name" className="small mb-2">
              Menu Title
            </label>
            <input type="text" className="form-control mb-4" />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email" className="small mb-2">
              License number
            </label>
            <input type="text" className="form-control mb-4" />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="location" className="small mb-2">
              Email
            </label>
            <input type="email" className="form-control mb-4" />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password" className="small mb-2">
              Currency
            </label>
            <select name="" id="" className="form-control">
              <option value="">Ghanaian Cedis</option>
            </select>{" "}
          </div>
        </div>
      </div>
      <p className="mt-4 mx-3">Logo</p>
      <div className="logo-container px-2 mx-3 d-flex justify-content-center align-items-center">
        <img src={logo} alt="" className="w-100" />
      </div>
      <input type="file" name="" id="" className="mt-3 mx-3 pb-5" />
      <hr className="mx-3" />
      <input
        type="submit"
        className="btn signup-btn btn-lg px-5 mx-auto d-block rounded-0"
        value="Save & Exit"
      />
    </div>
  );
};

export default GeneralSettingsForm;
