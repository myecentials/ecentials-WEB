import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";
import Header from "../../components/Header";
import { useEffect } from "react";
import axios from "../../config/api/axios";
import axiosCall from "axios";
import { useNavigate } from "react-router-dom";
import PharmacyName from "../../components/PharmacyName";
import { select } from "d3";
import drug from "../../static/drugs.json";
import { toast, Toaster } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Select from "react-select";
import DateHeader from "../../components/DateHeader";
import { useSelector } from "react-redux";
import { facility_id, setToken } from "../../app/features/authSlice/authSlice";

const AddProducts = () => {
  const { auth } = useAuth();
  const facilityid = useSelector(facility_id);
  const token = useSelector(setToken);

  const [drugDetails, setDrugDetails] = useState({
    name: "",
    price: "",
    selling_price: "",
    description: "",
    medicine_group: "Select medicine group",
    level: "",
    dosage: "250mg",
    total_stock: 1,
    manufacturer: "",
    discount: "",
    nhis: "N/A",
    otc: "N/A",
    expiry_date: "",
    store_id: facilityid,
    category_id: sessionStorage.getItem("categoryId"),
    picture: null,
  });

  const [categoryId, setCategoryId] = useState([]);
  const [data, setData] = useState([]);
  const [mydata, setMyData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    axios
      .post("/pharmacy/drug-category/fetch-drug-categories", {
        pharmacy_id: facilityid,
      })
      .then((res) => {
        // console.log(res);
        setCategoryId(res.data.data);
        sessionStorage.setItem("categoryId", res.data.data[0]._id);
        sessionStorage.setItem("medicineGroup", res.data.data[0].name);
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "Network Error") {
          setError(true);
          setErrorMsg("Network Error");
        }
      });
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox"
        ? (e.target.value = e.target.checked
            ? e.target.name.toUpperCase()
            : "N/A")
        : e.target.type === "file"
        ? e.target.files[0]
        : e.target.value;
    setDrugDetails({ ...drugDetails, [name]: value });
  };

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

  const navigate = useNavigate();

  const {
    name,
    description,
    picture,
    total_stock,
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
    level,
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
  // formData.append("category_id", category_id);
  formData.append("medicine_group", medicine_group);
  formData.append("level", level);
  formData.append("nhis", nhis);
  formData.append("picture", picture);

  const handleClick = async () => {
    if (name == "" || total_stock == "" || price == "" || selling_price == "") {
      toast.error("Please fill out required fileds");
    } else {
      const myPromise = axios.post("/pharmacy/drugs/add-new-drug", formData, {
        headers: {
          "auth-token": token,
        },
      });
      toast.promise(
        myPromise,
        {
          loading: "Loading",
          success: (res) =>
            `${
              res.data.message === "an error occurred, please try again"
                ? "please reload page and try again"
                : res.data.message
            }`,
          error: "Please fill all required fields",
        },
        setTimeout(() => {
          navigate("/products");
        }, 2000)
      );
    }
  };

  useEffect(() => {
    axios
      .post("/pharmacy/wholesaler/fetch-wholesalers")
      .then((res) => {
        // console.log(res);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .post("/pharmacy/drugs", {
        store_id: facilityid,
      })
      .then((res) => setMyData(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  let count = 0;

  for (let item of mydata) {
    const { name, medicine_group, dosage } = item;
    if (
      name === drugDetails.name &&
      medicine_group === drugDetails.medicine_group &&
      dosage === drugDetails.dosage
    ) {
      count++;
    }
  }

  const [drugs, setDrugs] = useState([]);

  // console.log(auth.token);

  // useEffect(() => {
  //   axiosCall
  //     .get("https://dgidb.org/api/v2/drugs?count=14449")
  //     .then((res) => {
  //       console.log(res);
  //       setDrugs(res.data.records);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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

  // console.log(drugDetails.level);

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
              <h6 className="mt-2 text-deep">PRODUCTS</h6>
              <Toaster />
              <DateHeader />
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
                      <Label className="small" htmlFor="number">
                        <b>Medicine Name*</b>
                      </Label>
                      <Input
                        id="drug"
                        name="name"
                        list="drugs"
                        onChange={handleChange}
                        value={drugDetails.name}
                        placeholder="Tablet"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                      <datalist id="drugs">
                        {drugs.map(({ name }, index) => (
                          <option value={name} key={index} />
                        ))}
                      </datalist>
                    </FormGroup> */}

                    <FormGroup>
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
                    </FormGroup>

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
                        <option disabled className="disabled">
                          Please select drug category
                        </option>
                        {categories.sort().map((item, index) => {
                          return (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup> */}
                    {/* <FormGroup>
                      <Label className="small" htmlFor="fname">
                        <b>Medicine Group*</b>
                      </Label>
                      <Input
                        id="medicine_group"
                        name="medicine_group"
                        type="select"
                        onChange={handleChange}
                        value={drugDetails.medicine_group}
                        style={{ borderColor: "#C1BBEB" }}
                      >
                        <option disabled>Select medicine group</option>
                        {categories.map((item, index) => {
                          return (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup> */}
                    <FormGroup>
                      <Label className="small" htmlFor="fname">
                        <b>Medicine Group*</b>
                      </Label>
                      <Select
                        isSearchable={true}
                        options={categories.sort().map((item) => ({
                          value: item,
                          label: item,
                        }))}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: "#C1BBEB",
                          }),
                        }}
                        onChange={(e) =>
                          setDrugDetails({
                            ...drugDetails,
                            medicine_group: e.value,
                          })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" htmlFor="fname">
                        <b>Level Of Prescription*</b>
                      </Label>
                      <Select
                        isSearchable={true}
                        options={levels.map(({ label, value }) => ({
                          label: label,
                          value: value,
                        }))}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: "#C1BBEB",
                          }),
                        }}
                        onChange={(e) =>
                          setDrugDetails({
                            ...drugDetails,
                            level: e.value,
                          })
                        }
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
                        {drugStrength.sort().map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                       
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
                      <Label className="small" htmlFor="fname">
                        <b>Dosage*</b>
                      </Label>
                      <Select
                        isSearchable={true}
                        options={drugStrength.sort().map((item) => ({
                          value: item,
                          label: item,
                        }))}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: "#C1BBEB",
                          }),
                        }}
                        onChange={(e) =>
                          setDrugDetails({ ...drugDetails, dosage: e.value })
                        }
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label className="small" htmlFor="number">
                        <b>Supplier/Company Name*</b>
                      </Label>
                      <Input
                        id="manufacturer"
                        name="manufacturer"
                        type="text"
                        list="wholesaler"
                        onChange={handleChange}
                        value={drugDetails.manufacturer}
                        style={{ borderColor: "#C1BBEB" }}
                      />

                      <datalist id="wholesaler">
                        {data.map(({ name }, index) => (
                          <option value={name} key={index}>
                            {name}
                          </option>
                        ))}
                      </datalist>
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
                      <Label className="small mx-2" htmlFor="number">
                        <b>Accept NHIS*</b>
                      </Label>
                    </FormGroup>
                    {/* <FormGroup>
                      <Input
                        id="number"
                        name="otc"
                        type="checkbox"
                        value={drugDetails.otc}
                        onChange={handleChange}
                        style={{ borderColor: "#C1BBEB" }}
                      />
                      <Label className="small mx-2" htmlFor="number">
                        <b>OTC*</b>
                      </Label>
                    </FormGroup> */}
                    <FormGroup>
                      <Label className="small" htmlFor="number">
                        <b>Photo*</b>
                      </Label>
                      <div className="drug-photo">
                        {drugDetails.picture ? (
                          <img
                            src={URL.createObjectURL(drugDetails.picture)}
                            alt=""
                            className="img-fluid h-100 w-100"
                            style={{
                              aspectRatio: "3 / 2",
                              objectFit: "contain",
                              mixBlendMode: "darken",
                              pointerEvents: "none",
                            }}
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
