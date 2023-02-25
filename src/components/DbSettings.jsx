import React from "react";
import danger from "../assets/icons/svg/danger.svg";

const DbSettings = () => {
  return (
    <div className="bg-white pb-5" style={{ borderRadius: "10px" }}>
      <h6 className="pt-5 px-3">Restore Database</h6>
      <hr className="my-0" />
      <div className="text-danger mt-3 mx-3 d-flex  rounded bg-warn">
        <img src={danger} alt="" className="mx-3" />
        <p className="my-2">
          Note: If you import any sql, previous data will be destroyed
        </p>
      </div>
      <div className="row g-3 align-items-center mt-2 mx-3">
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
          />
        </div>
        <div className="col-auto">
          <input type="button" className="btn btn-primary" value="Import" />
        </div>
      </div>
    </div>
  );
};

export default DbSettings;
