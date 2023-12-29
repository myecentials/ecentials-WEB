import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../config/api/axios";
import { useGetPharmacyInfoMutation } from "../app/features/authSlice/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { facility_id, pharmacyInfo  } from "../app/features/authSlice/authSlice";
import { toast ,Toaster} from 'react-hot-toast';

const PharmacyName = () => {
  const [getinfo] = useGetPharmacyInfoMutation();
  const facilityid = useSelector(facility_id);
  const dispatch = useDispatch();
  useEffect(() => {
    // axios
    //   .post(
    //     "/pharmacy/information/fetch-pharmacy-information",
    //     {
    //       pharmacy_id: sessionStorage.getItem("facility_id"),
    //     },
    //     { headers: { "auth-token": sessionStorage.getItem("userToken") } }
    //   )
    //   .then((res) => {
    //     sessionStorage.setItem("name", res.data.data.name);
    //     setName(res.data.data.name);
    //     const data = res.data.data;
    //     sessionStorage.setItem("pharmacyInfo", JSON.stringify(data));
    //   })
    //   .catch((err) => console.log(err));
    const fetchData = async () => {
      try{
        const results = await getinfo(facilityid).unwrap();
        dispatch(pharmacyInfo(results?.data));
        sessionStorage.setItem("pharmacyInfo", JSON.stringify(results?.data));
      }catch (error) {
        console.log(error)
        if (error.status === "FETCH_ERROR")
				toast.error("Error fetching pharmacy name, retry");
      }
      
    };
    fetchData();
  }, []);

  const name = useSelector((state) => state?.auth?.data?.name);

  return (
    <div className="mx-4 pb-4 d-none d-md-block">
      <Toaster/>
      <h5 className="text-deep text-end">Company Name</h5>
      <h5 className="small light-deep text-center">{name}</h5>
    </div>
  );
};

export default PharmacyName;
