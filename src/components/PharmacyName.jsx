import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../config/api/axios";

const PharmacyName = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    axios
      .post("/pharmacy/information/fetch-pharmacy-information", {
        pharmacy_id: localStorage.getItem("facility_id"),
      })
      .then((res) => {
        setName(res.data.data.name);
        const data = res.data.data;
        localStorage.setItem("pharmacyInfo", JSON.stringify(data));
      })
      .catch((err) => console.log(err));
  });
  return (
    <div className="mx-4 pb-4 d-none d-md-block">
      <h5 className="text-deep text-end">Company Name</h5>
      <h5 className="small light-deep text-center">{name}</h5>
    </div>
  );
};

export default PharmacyName;
