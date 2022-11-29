import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Form, FormGroup, Input, Label } from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";
import Header from "../../components/Header";
import { useEffect } from "react";
import axios from "../../config/api/axios";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  let objToday = new Date(),
    weekday = new Array(
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ),
    dayOfWeek = weekday[objToday.getDay()],
    domEnder = (function () {
      let a = objToday;
      if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
      a = parseInt((a + "").charAt(1));
      return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th";
    })(),
    dayOfMonth =
      today + (objToday.getDate() < 10)
        ? "0" + objToday.getDate() + domEnder
        : objToday.getDate() + domEnder,
    months = new Array(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear(),
    curHour =
      objToday.getHours() > 12
        ? objToday.getHours() - 12
        : objToday.getHours() < 10
        ? "0" + objToday.getHours()
        : objToday.getHours(),
    curMinute =
      objToday.getMinutes() < 10
        ? "0" + objToday.getMinutes()
        : objToday.getMinutes(),
    curSeconds =
      objToday.getSeconds() < 10
        ? "0" + objToday.getSeconds()
        : objToday.getSeconds(),
    curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
  let today =
    curHour +
    ":" +
    curMinute +
    "." +
    curSeconds +
    curMeridiem +
    " " +
    dayOfWeek +
    " " +
    dayOfMonth +
    " of " +
    curMonth +
    ", " +
    curYear;

  
  const [drugDetails, setDrugDetails] = useState({
    name: "",
    price: "",
    selling_price: "",
    description: "",
    medicine_group: localStorage.getItem("medicineGroup"),
    dosage: "250mg",
    quantity: 1,
    manufacturer: "",
    discount: "",
    nhis: false,
    expiry_date: "",
    store_id: localStorage.getItem("facility_id"),
    category_id: localStorage.getItem("categoryId"),
    picture: null,
  });

  const [categoryId, setCategoryId] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    axios
      .post(
        "/pharmacy/drug-category/fetch-drug-categories",
        { pharmacy_id: localStorage.getItem("facility_id") },
      )
      .then((res) => {
        // console.log(res);
        setCategoryId(res.data.data);
        localStorage.setItem("categoryId", res.data.data[0]._id);
        localStorage.setItem("medicineGroup", res.data.data[0].name);
      })
      .catch((err) => {
        console.log(err);
        if(err.message === "Network Error"){
          setError(true)
          setErrorMsg("Network Error")
        }
      });
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox"
        ? e.target.checked
        : e.target.type === "file"
        ? e.target.files[0]
        : e.target.value;
    setDrugDetails({ ...drugDetails, [name]: value });
  };

  const navigate = useNavigate();

  const {
    name,
    description,
    picture,
    quantity,
    manufacturer,
    dosage,
    price,
    selling_price,
    expiry_date,
    store_id,
    category_id,
    medicine_group,
    nhis,
    discount,
  } = drugDetails;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("quantity", quantity);
  formData.append("manufacturer", manufacturer);
  formData.append("dosage", dosage);
  formData.append("price", price);
  formData.append("selling_price", selling_price);
  formData.append("expiry_date", expiry_date);
  formData.append("store_id", store_id);
  formData.append("category_id", category_id);
  formData.append("medicine_group", medicine_group);
  // formData.append("nhis", nhis);
  formData.append("picture", picture);

  const handleClick = async () => {
    setIsLoading(true)
    // console.log(drugDetails);
    if (
      name == "" ||
      description == "" ||
      picture == "" ||
      quantity == "" ||
      manufacturer == "" ||
      price == "" ||
      selling_price == ""
    ) {
      setIsLoading(false)
      setError(true);
      setErrorMsg("Please input all fields");
    } else {
      await axios
        .post("/pharmacy/drugs/add-new-drug", formData)
        .then((res) => {
          // console.log(res);
          if (res.data.error) {
            setIsLoading(false)
            setError(true);
            setErrorMsg("Something went wrong");
          } else {
            navigate("/products");
            setIsLoading(false)
          }
        })
        .catch((err) => {
          console.log(err);
          if(err.message === "Network Error"){
            setIsLoading(false)
            setError(true)
            setErrorMsg("Network Error")
          }
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Products</title>
      </Helmet>
      <Header />
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">Settings</h6>
              <p className="small gray-text">
                <span className="text-primary">{dayOfWeek}, </span>
                {dayOfMonth} {curMonth}, {curYear}
              </p>
              <div className="d-flex">
                <BreadOutlined name="Products" breadcrumb="/products" />
                <BreadCrumb
                  name="Add Products"
                  breadcrumb=""
                  width="9rem"
                  hasStyles={true}
                />
              </div>
            </div>
            <div className="mx-4 d-none d-md-block">
              <h5 className="text-deep">Company Name</h5>
              <h5 className="small light-deep">Orange Drugs Limited</h5>
            </div>
          </div>

          <div className="text-deep mx-3 mt-4">
            Please add category, group, dosage, company name before adding
            medicine.
          </div>
          <div className="mx-md-3 mx-2">
            <div
              className="card border-0 pb-3 rounded"
              style={{ borderRadius: "10px" }}
            >
              <div className="ms-bg text-white py-2">
                <h6 className="mx-3">PRODUCT DETAILS</h6>
              </div>
              <div className="mx-md-4 mt-3 text-deep">
                <div className="mx-3">
                  <Form>
                    {error ? <p className="error">{errorMsg}</p> : ""}
                    <FormGroup>
                      <Label className="small" for="fname">
                        <b>Category*</b>
                      </Label>
                      <Input
                        id="category"
                        name="category_id"
                        type="select"
                        onChange={handleChange}
                        value={drugDetails.category_id}
                        style={{ borderColor: "#C1BBEB" }}
                      >
                        {categoryId.length === 0 ? (
                          <option value="select" disabled>
                            Please first add drug category
                          </option>
                        ) : (
                          <>
                            {" "}
                            {categoryId.map(({ name, _id }) => {
                              return (
                                <option value={_id} key={_id}>
                                  {name}
                                </option>
                              );
                            })}
                          </>
                        )}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="fname">
                        <b>Medicine Group*</b>
                      </Label>
                      <Input
                        id="category"
                        name="medicine_group"
                        type="select"
                        onChange={handleChange}
                        value={drugDetails.medicine_group}
                        style={{ borderColor: "#C1BBEB" }}
                      >
                        {categoryId.length === 0 ? (
                          <option value="select" disabled>
                            Please first add drug category
                          </option>
                        ) : (
                          <>
                            {" "}
                            {categoryId.map(({ name, _id }) => {
                              return (
                                <option value={name} key={_id}>
                                  {name}
                                </option>
                              );
                            })}
                          </>
                        )}
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Medicine Name*</b>
                      </Label>
                      <Input
                        id="number"
                        name="name"
                        type="text"
                        onChange={handleChange}
                        value={drugDetails.name}
                        placeholder="Tablet"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Purchase Price per Piece (GHS) *</b>
                      </Label>
                      <Input
                        id="number"
                        name="price"
                        type="text"
                        onChange={handleChange}
                        value={drugDetails.price}
                        placeholder="200"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Selling Price per Piece (GHS) *</b>
                      </Label>
                      <Input
                        id="number"
                        name="selling_price"
                        type="text"
                        placeholder="250"
                        onChange={handleChange}
                        value={drugDetails.selling_price}
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Quantity *</b>
                      </Label>
                      <Input
                        id="number"
                        name="quantity"
                        type="number"
                        onChange={handleChange}
                        value={drugDetails.quantity}
                        style={{ borderColor: "#C1BBEB" }}
                        min={1}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label className="small" for="fname">
                        <b>Dosage*</b>
                      </Label>
                      <Input
                        id="category"
                        name="dosage"
                        type="select"
                        value={drugDetails.dosage}
                        onChange={handleChange}
                        style={{ borderColor: "#C1BBEB" }}
                      >
                        <option value="250mg">250mg</option>
                        <option value="500mg">500mg</option>
                        <option value="1000mg">1000mg</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Supplier/Company Name*</b>
                      </Label>
                      <Input
                        id="number"
                        name="manufacturer"
                        type="text"
                        onChange={handleChange}
                        value={drugDetails.manufacturer}
                        placeholder="Tobinco Pharmaceutical Company"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Medicine Description*</b>
                      </Label>
                      <Input
                        maxLength={2000}
                        max={200}
                        height={500}
                        id="number"
                        name="description"
                        type="textarea"
                        value={drugDetails.description}
                        placeholder=""
                        onChange={handleChange}
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Expiry Date*</b>
                      </Label>
                      <Input
                        id="number"
                        name="expiry_date"
                        type="date"
                        value={drugDetails.expiry_date}
                        onChange={handleChange}
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        id="number"
                        name="nhis"
                        type="checkbox"
                        value={drugDetails.nhis}
                        onChange={handleChange}
                        style={{ borderColor: "#C1BBEB" }}
                      />
                      <Label className="small mx-2" for="number">
                        <b>Accept NHIS*</b>
                      </Label>
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Photo*</b>
                      </Label>
                      <div className="drug-photo">
                        {drugDetails.picture ? (
                          <img
                            src={URL.createObjectURL(drugDetails.picture)}
                            alt=""
                            className="img-fluid h-100 w-100"
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
                          name="picture"
                          // value={drugDetails.picture}
                          onChange={handleChange}
                        />
                      </div>
                    </FormGroup>
                  </Form>
                </div>
                <div className="d-flex justify-content-end align-items-end mt-5">
                <button
              type="submit"
              className="ms-bg text-white rounded-pill px-4 mb-5 save py-2"
              onClick={handleClick}
            >
              {isLoading ? (
                <span className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </span>
              ) : (
                "Submit"
              )}
            </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
