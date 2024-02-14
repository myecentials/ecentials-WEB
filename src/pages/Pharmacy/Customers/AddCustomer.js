import React,{ useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Col } from "reactstrap";
import { useSelector } from "react-redux";

import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
// import NavIcons from "../../../components/NavIcons";
// import SideBar from "../../../components/SideBar";
import menulist from "../../../assets/icons/svg/menulist.svg";
import mail from "../../../assets/icons/svg/mail.svg";
// import CustomeNav from "../../../components/CustomeNav";
import BreadOutlined from "../../../components/BreadOutlined";
// import Header from "../../../components/Header";
import axios from "../../../config/api/axios";
import PharmacyName from "../../../components/PharmacyName";
import { facility_id ,setToken } from "../../../app/features/authSlice/authSlice";
import {toast, Toaster } from 'react-hot-toast';
import Select from "react-select";


const AddCustomers = () => {

  const  facilityid = useSelector(facility_id) 

  const token = useSelector(setToken)
  const [details, setDetails] = useState({
    facility_id : facilityid,
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    country: "",
  });

  const regions =[
    {
      "label": "Ahafo Region",
      "value": "Ahafo Region"
    },
    {
      "label": "Ashanti Region",
      "value": "Ashanti Region"
    },
    {
      "label": "Bono Region",
      "value": "Bono Region"
    },
    {
      "label": "Bono East Region",
      "value": "Bono East Region"
    },
    {
      "label": "Central Region",
      "value": "Central Region"
    },
    {
      "label": "Eastern Region",
      "value": "Eastern Region"
    },
    {
      "label": "Greater Accra Region",
      "value": "Greater Accra Region"
    },
    {
      "label": "Northern Region",
      "value": "Northern Region"
    },
    {
      "label": "Oti Region",
      "value": "Oti Region"
    },
    {
      "label": "Savannah Region",
      "value": "Savannah Region"
    },
    {
      "label": "Upper East Region",
      "value": "Upper East Region"
    },
    {
      "label": "Upper West Region",
      "value": "Upper West Region"
    },
    {
      "label": "Volta Region",
      "value": "Volta Region"
    },
    {
      "label": "Western Region",
      "value": "Western Region"
    },
    {
      "label": "Western North Region",
      "value": "Western North Region"
    }
  ]
  

  const [error, setError] = useState(false);
  const [, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [name]: value });
  };

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const remove = toast.loading("Adding customer...")
    if (details.name === "") {
      setError(true);
      setErrorMsg("Please input all fields");
      setIsLoading(false);
      toast.remove(remove)
      toast.error("Please input all fields")
    } else {
      axios
        .post(
          "/pharmacy/customers/add-new-customer",
          details ,
          { headers: { "auth-token": token } }
        )
        .then((res) => {
          if (res.data.message === "success") {
            toast.remove(remove)
toast.success("Customer Added")
setTimeout(() => navigate("/pharmacy/customers/customers-list"),1500)
            
          }
          if (res.data.error.code === 11000) {
            setError(true);
            setErrorMsg(`${details.name} already exist. Check customer list`);
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Customers</title>
      </Helmet>
<Toaster/>
        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">CUSTOMERS</h6>
              <DateHeader />
              <div className="d-flex">
                <BreadOutlined
                  name="Customers"
                  breadcrumb="/pharmacy/customers/add-customers"
                  width="8rem"
                />
                <BreadCrumb
                  name="Add Customers"
                  breadcrumb=""
                  width="10rem"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="mt-4 mx-md-5 mx-2">
            <div
              className="card border-0 pb-3 my-5 rounded"
              style={{ borderRadius: "10px" }}
            >
              <div
                className="ms-bg text-white pt-2 d-flex align-items-center justify-content-between"
                style={{
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "10px",
                }}
              >
                <h6 className="mx-3 text-nowrap">Add Customer</h6>
                <h6 className="mx-3">
                  <Link
                    to="/pharmacy/customers/customers-list"
                    className="btn btn-light d-flex"
                  >
                    <img src={menulist} alt="" />
                    <b
                      className="mx-2 small text-nowrap"
                      style={{ color: "#4D44B5" }}
                    >
                      Customer List
                    </b>
                  </Link>
                </h6>
              </div>
              <div className="mx-4 mt-3 text-deep">
                <Form>
                  {error ? <div className="error">{errorMsg}</div> : ""}
                  <FormGroup row>
                    <Label
                      htmlFor="exampleEmail"
                      sm={2}
                      className="text-nowrap"
                    >
                      Customer Name*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="name"
                        placeholder="Andrews Opoku"
                        value={details.name}
                        onChange={handleChange}
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label
                      htmlFor="exampleEmail"
                      sm={2}
                      className="text-nowrap"
                    >
                      Email Addresss*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="email"
                        placeholder="example@gmail.com"
                        value={details.email}
                        onChange={handleChange}
                        type="email"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label
                      htmlFor="exampleEmail"
                      sm={2}
                      className="text-nowrap"
                    >
                      Phone*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="phone"
                        placeholder="+233545098438"
                        value={details.phone}
                        onChange={handleChange}
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label
                      htmlFor="exampleEmail"
                      sm={2}
                      className="text-nowrap"
                    >
                      Address*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="address"
                        placeholder="PLT 16 BLK III"
                        value={details.address}
                        onChange={handleChange}
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label
                      htmlFor="exampleEmail"
                      sm={2}
                      className="text-nowrap"
                    >
                      City*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="city"
                        placeholder="Kumasi"
                        value={details.city}
                        onChange={handleChange}
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col sm={10} className="w-category">
                       
                        <Label
                      htmlFor="exampleEmail"
                      sm={2}
                      className="text-nowrap"
                    >
                      Region*
                    </Label>
                       
                        <Select
                          isSearchable={true}
                          options={regions.sort().map(({ label,value }) => ({
                            value,
                            label,
                          }))}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderColor: "#C1BBEB",
                            }),
                          }}
                          onChange={(e) =>
                            setDetails({ ...details, region: e.value })
                          }
                        />
                     
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label
                      htmlFor="exampleEmail"
                      sm={2}
                      className="text-nowrap"
                    >
                      Country*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="country"
                        placeholder="Ghana"
                        value={details.country}
                        onChange={handleChange}
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>

                  <div className="d-flex justify-content-end align-items-end mt-4">
                    <img src={mail} alt="" />
                    <input
                      type="submit"
                      value="Save"
                      onClick={handleClick}
                      className="ms-bg text-white rounded-pill px-4 py-2"
                    />
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default AddCustomers;
