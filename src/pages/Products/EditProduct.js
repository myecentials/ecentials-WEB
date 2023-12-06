import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import { BsX } from "react-icons/bs";
import CustomeNav from "../../components/CustomeNav";
import drug from "../../static/drugs.json";
import Navbar from "reactstrap";
import {
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";
import Header from "../../components/Header";
import { useEffect } from "react";
import axios from "../../config/api/axios";
import { useNavigate } from "react-router-dom";
import PharmacyName from "../../components/PharmacyName";
import { select } from "d3";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Select from "react-select";
import DateHeader from "../../components/DateHeader";
import { facility_id,setToken  } from './../../app/features/authSlice/authSlice';
import { useSelector } from "react-redux";

const EditProduct = () => {
  const { auth } = useAuth();
  const token = useSelector(setToken)
  const facilityId = useSelector(facility_id)


  const [drugDetails, setDrugDetails] = useState({
    name: "",
    price: "",
    selling_price: "",
    description: "",
    medicine_group: "",
    dosage: "",
    total_stock: 1,
    manufacturer: "",
    discount: "",
    nhis: "N/A",
    expiry_date: "",
    store_id: facilityId,
    // category_id: sessionStorage.getItem("categoryId"),
    image: null,
  });

  const [categoryId, setCategoryId] = useState([]);
  const [data, setData] = useState([]);
  const [mydata, setMyData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


  // Check if expiry_date is a valid date
  const isValidDate = drugDetails.expiry_date && !isNaN(new Date(drugDetails.expiry_date).getTime());
  
  // If it's a valid date, format it; otherwise, use an empty string
  const formattedExpiryDate = isValidDate ? new Date(drugDetails.expiry_date).toISOString().split('T')[0] : '';
  


  useEffect(() => {
    axios
      .post(
        "/pharmacy/drug-category/fetch-drug-categories",
        { pharmacy_id: facilityId },
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((res) => {
        //  ;
        setCategoryId(res.data.data);
        sessionStorage.setItem("categoryId", res.data.data[0]._id);
        sessionStorage.setItem("medicineGroup", res.data.data[0].name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox"
        ? (e.target.value = e.target.checked === true ? "NHIS" : "N/A")
        : e.target.type === "file"
        ? e.target.files[0]
        : e.target.value;
    setDrugDetails({ ...drugDetails, [name]: value });
  };

  const productInfo = sessionStorage.getItem("productSelected");
  const newProduct = JSON.parse(productInfo);
  // console.log(newProduct);
  useEffect(() => {
    setDrugDetails({ ...drugDetails, ...newProduct });
  }, []);

  const navigate = useNavigate();

  const {
    name,
    description,
    image,
    total_stock,
    level,
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
  formData.append("total_stock", total_stock);
  formData.append("manufacturer", manufacturer);
  formData.append("dosage", dosage);
  formData.append("price", price);
  formData.append("selling_price", selling_price);
  formData.append("expiry_date", expiry_date);
  formData.append("store_id", store_id);
  formData.append("category_id", category_id);
  formData.append("drug_id", newProduct._id);
  formData.append("medicine_group", medicine_group);
  formData.append("nhis", nhis);
  formData.append("level", level);
  formData.append("image", image);

  const handleClick = async () => {
    const myPromise = axios.post(
      "/pharmacy/drugs/update-drug-information",
      formData,
      {
        headers: {
          "auth-token": token,
          "Content-Type" : "multipart/form-data"
        },
      }
    );
    toast.promise(
      myPromise,
      {
        loading: "Loading...",
        success: "Update Successful",
        error: "An error occured",
      },
      setTimeout(() => {
        navigate("/products");
      }, 3000)
    );
  };

  useEffect(() => {
    axios
      .post(
        "/pharmacy/wholesaler/fetch-wholesalers",
        {
          facility_id: facilityId,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .post(
        "/pharmacy/drugs",
        {
          store_id: facilityId,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((res) => setMyData(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  let count = 0;

  // for (let item of mydata) {
  //   const { name, medicine_group, dosage } = item;
  //   if (
  //     name === drugDetails.name &&
  //     medicine_group === drugDetails.medicine_group &&
  //     dosage === drugDetails.dosage
  //   ) {
  //     count++;
  //   }
  // }

  const handleClose = () => {
    setIsOpen(false);
  };

  const categories = [];
  for (let drugCat of drug) {
    const { dosage_form } = drugCat;
    if (!categories.includes(dosage_form)) {
      categories.push(dosage_form);
    }
  }

  for (let catId of categoryId) {
    const { name } = catId;
    if (!categories.includes(name)) {
      categories.push(name);
    }
  }

  const drugStrength = [];
  for (let drugStr of drug) {
    const { strength } = drugStr;
    if (!drugStrength.includes(strength)) {
      drugStrength.push(strength);
    }
  }

  const levels = [
    // A,M,B1,B2, C,D,SD,PD
    {
      label: "A",
      value: "A",
    },
    {
      label: "M",
      value: "M",
    },
    {
      label: "B1",
      value: "B1",
    },
    {
      label: "B2",
      value: "B2",
    },
    {
      label: "C",
      value: "C",
    },
    {
      label: "D",
      value: "D",
    },
    {
      label: "SD",
      value: "SD",
    },
    {
      label: "PD",
      value: "PD",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Edit Products</title>
      </Helmet>
      <Header />
      <CustomeNav />
      <Toaster />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">PRODUCTS</h6>
              <DateHeader />
              <div className="d-flex">
                <BreadOutlined name="Products" breadcrumb="/products" />
                <BreadCrumb
                  name="Edit Products"
                  breadcrumb=""
                  width="9rem"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
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
                    {/* <FormGroup>
                      <Label className="small" htmlFor="fname">
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
                    </FormGroup> */}
                    <FormGroup>
                      <Label className="small" htmlFor="number">
                        <b>Medicine Group*</b>
                      </Label>
                      <Input
                        id="number"
                        name="medicine_group"
                        type="text"
                        onChange={handleChange}
                        value={drugDetails.medicine_group}
                        placeholder="Tablet"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label className="small" htmlFor="number">
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

                    {/* <FormGroup>
                      <Label className="small" htmlFor="fname">
                        <b>Medicine Name*</b>
                      </Label>
                      <Select
                        isSearchable={true}
                        options={drug.sort().map(({ generic_name }) => ({
                          value: generic_name,
                          label: generic_name,
                        }))}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: "#C1BBEB",
                          }),
                        }}
                        onChange={(e) =>
                          setDrugDetails({ ...drugDetails, name: e.value })
                        }
                      />
                    </FormGroup> */}

                    <FormGroup>
                      <Label className="small" htmlFor="number">
                        <b>Level Of Prescription*</b>
                      </Label>
                      <Input
                        id="number"
                        name="level"
                        type="text"
                        onChange={handleChange}
                        value={drugDetails.level}
                        placeholder="Tablet"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" htmlFor="number">
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
                      <Label className="small" htmlFor="number">
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
                      <Label className="small" htmlFor="number">
                        <b>Quantity *</b>
                      </Label>
                      <Input
                        id="number"
                        name="total_stock"
                        type="number"
                        onChange={handleChange}
                        value={drugDetails.total_stock}
                        style={{ borderColor: "#C1BBEB" }}
                        min={1}
                      />
                    </FormGroup>

                    {/* <FormGroup>
                      <Label className="small" htmlFor="fname">
                        <b>Dosage*</b>
                      </Label>
                      <Input
                        invalid={count === 1 ? true : false}
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
                      {count === 1 ? (
                        <FormFeedback>
                          Drug Already exist. Try changing the medicine group,
                          name or dosage
                        </FormFeedback>
                      ) : (
                        ""
                      )}
                    </FormGroup> */}

                    <FormGroup>
                      <Label className="small" htmlFor="number">
                        <b>Dosage*</b>
                      </Label>
                      <Input
                        id="number"
                        name="dosage"
                        type="text"
                        onChange={handleChange}
                        value={drugDetails.dosage}
                        placeholder="Tablet"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label className="small" htmlFor="number">
                        <b>Supplier/Company Name*</b>
                      </Label>
                      <Input
                        id="manufacturer"
                        name="manufacturer"
                        type="select"
                        onChange={handleChange}
                        value={drugDetails.manufacturer}
                        style={{ borderColor: "#C1BBEB" }}
                      >
                        {data.length === 0 ? (
                          <option value="" disabled>
                            --Please add a wholesaler--
                          </option>
                        ) : (
                          <>
                            {data.map(({ name }, index) => (
                              <option value={name} key={index}>
                                {name}
                              </option>
                            ))}
                          </>
                        )}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" htmlFor="number">
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
                      <Label className="small" htmlFor="number">
                        <b>Expiry Date*</b>
                      </Label>
                      <Input
                        id="number"
                        name="expiry_date"
                        type="date"
                        defaultValue={formattedExpiryDate}
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
                      <Label className="small mx-2" htmlFor="number">
                        <b>Accept NHIS*</b>
                      </Label>
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" htmlFor="number">
                        <b>Photo*</b>
                      </Label>
                      <div className="drug-photo">
                        {drugDetails.image ? (
                          <img
                            src={drugDetails.image}
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
                          name="image"
                          // value={drugDetails.image}
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

export default EditProduct;
