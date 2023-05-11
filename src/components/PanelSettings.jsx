import React from "react";

const PanelSettings = () => {
  return (
    <div className="bg-white pb-5" style={{ borderRadius: "10px" }}>
      <h6 className="pt-5 px-3">Panel Settings</h6>
      <hr className="my-0" />
      <p className="mx-3 mt-4">Appearance</p>
      <select name="" id="" className="form-control mt-3 mx-3 w-md-50 w-75">
        <option value="">Use device theme</option>
        <option value="">Use custome theme</option>
      </select>
    </div>
  );
};

export default PanelSettings;
