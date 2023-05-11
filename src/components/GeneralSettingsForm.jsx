import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import axios from "../config/api/axios";
import logo from "../logo.svg";
import { BsX } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
const GeneralSettingsForm = () => {
  const {auth} = useAuth()
  const [details, setDetails] = useState({
    store_id: sessionStorage.getItem("facility_id"),
    name: "",
    email: "",
    gps_address: "",
    phone_number: "",
    open_hours: "",
    licence_no: "",
    photo: null,
    logo: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "file"
        ? e.target.files[0]
        : e.target.type === "checkbox"
        ? details.privileges.push(e.target.name)
        : e.target.value;
    setDetails({ ...details, [name]: value });
  };

  useEffect(() => {
    axios
      .post(
        "/pharmacy/information/fetch-pharmacy-information",
        {
          pharmacy_id: sessionStorage.getItem("facility_id"),
        },
        { headers: { "auth-token": auth.token || sessionStorage.getItem("userToken") } }
      )
      .then((res) => {
        setDetails({ ...details, ...res.data.data });
      })
      .catch((err) => console.log(err));
  }, []);

  const {
    store_id,
    name,
    email,
    gps_address,
    phone_number,
    open_hours,
    licence_no,
    photo,
    logo,
  } = details;

  const updateInfo = {
    store_id,
    name,
    email,
    gps_address,
    phone_number,
    open_hours,
    licence_no,
    logo,
  };

  const formData = new FormData();
  formData.append("store_id", details.store_id);
  formData.append("name", details.name);
  formData.append("email", details.email);
  formData.append("gps_address", details.gps_address);
  formData.append("phone_number", details.phone_number);
  formData.append("open_hours", details.open_hours);
  formData.append("licence_no", details.licence_no);
  formData.append("logo", details.photo);

  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    const myPromise = axios.post(
      "/pharmacies/update-pharmacy-information",
      formData,
      { headers: { "auth-token": auth.token || sessionStorage.getItem("userToken") } }
    );
    toast.promise(myPromise, {
      loading: "Loading",
      success: (res) => `${res.data.message}`,
      error: "An error occured",
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

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
            <input
              type="text"
              className="form-control mb-4"
              name="name"
              value={details.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="text" className="small mb-2">
              Address
            </label>
            <input
              type="address"
              className="form-control mb-4"
              name="gps_address"
              value={details.gps_address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="location" className="small mb-2">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control mb-4"
              name="phone_number"
              value={details.phone_number}
              onChange={handleChange}
            />
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
            <input
              type="text"
              className="form-control mb-4"
              name="licence_no"
              value={details.licence_no}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="location" className="small mb-2">
              Email
            </label>
            <input
              type="email"
              className="form-control mb-4"
              name="email"
              value={details.email}
              onChange={handleChange}
            />
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
      <div className="drug-photo mx-3" style={{ cursor: "pointer" }}>
        {details.logo ? (
          <img
            src={details.photo ? URL.createObjectURL(details.photo) : logo}
            alt=""
            className="w-100 h-100"
          />
        ) : (
          <p className="small file_name">
            Drag and drop or click here to select image
          </p>
        )}
        <input
          type="file"
          className="drug_file"
          accept="image/*"
          name="photo"
          onChange={handleChange}
        />
      </div>
      <hr className="mx-3" />
      <input
        type="submit"
        className="btn signup-btn btn-lg px-5 mx-auto d-block rounded-0"
        value="Save & Exit"
        onClick={handleClick}
      />
      <Toast
        isOpen={isOpen}
        onClick={handleClose}
        className="toast-position text-success border-0"
      >
        <ToastHeader className="py-3">
          <BsX className="cancel_icon" size={20} />
        </ToastHeader>
        <ToastBody>Pharmacy information updated successfully</ToastBody>
      </Toast>
      <Toaster />
    </div>
  );
};

export default GeneralSettingsForm;
