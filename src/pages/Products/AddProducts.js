import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Form, FormGroup, Input, Label } from "reactstrap";
import Select from "react-select";
import axiosCall from "axios";
import { Link} from "react-router-dom";
import { useSelector  } from "react-redux";

import BreadCrumb from "../../components/BreadCrumb";
import SideBar from "../../components/SideBar";
import CustomeNav from "../../components/CustomeNav";
import BreadOutlined from "../../components/BreadOutlined";
import DateHeader from "../../components/DateHeader";
import Header from "../../components/Header";
import PharmacyName from "../../components/PharmacyName";
import axios from "../../config/api/axios";
import drug from "../../static/drugs.json";
import { toast, Toaster } from "react-hot-toast";
import { facility_id, setToken } from "../../app/features/authSlice/authSlice";

const AddProducts = () => {
  // const navigate = useNavigate();
  const facilityid = useSelector(facility_id);
  const token = useSelector(setToken);
  const [categoryId] = useState([]);
  const [error] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg] = useState("");
  const [fdaDrugs, setFdaDrugs] = useState([]);
  const [drugDetails, setDrugDetails] = useState({
    name: "",
    price: "",
    selling_price: "",
    description: "",
    medicine_group: "",
    // level: "",
    dosage: "",
    total_stock: 1,
    manufacturer: "",
    discount: "",
    nhis: "N/A",
    // otc: "N/A",
    expiry_date: "",
    store_id: facilityid,
    category_id: "",
    picture: null,
  });

  
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

  // useEffect(() => {
  //   axios
  //     .post("/pharmacy/drug-category/fetch-drug-categories", {
  //       pharmacy_id: facilityid,
  //     })
  //     .then((res) => {
  //       //  ;
  //       setCategoryId(res.data.data);
  //       sessionStorage.setItem("categoryId", res.data.data[0]._id);
  //       sessionStorage.setItem("medicineGroup", res.data.data[0].name);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       if (err.message === "Network Error") {
  //         setError(true);
  //         setErrorMsg("Network Error");
  //       }
  //     });
  // }, []);

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
    medicine_group,
    nhis,
    level,
  } = drugDetails;

  const formData = new FormData();

  formData.append("name", name); //
  formData.append("description", description); //
  formData.append("total_stock", total_stock);
  formData.append("manufacturer", manufacturer); //
  formData.append("dosage", dosage); //
  formData.append("price", price); //
  formData.append("selling_price", selling_price);
  formData.append("expiry_date", expiry_date); //
  formData.append("store_id", store_id); //
  // formData.append("category_id", "6362bdcfe75eb05f85e05109"); //
  formData.append("medicine_group", medicine_group); //
  formData.append("level", level);
  formData.append("nhis", nhis);
  formData.append("picture", picture); //

  useEffect(() => {
    const getFdaDrugs = async () => {
      try {
        const response = await axiosCall.get(
          "https://api.fda.gov/drug/label.json?search=_exists_:openfda&limit=10"
        );
        setFdaDrugs(response?.data?.results);
        setIsLoading(false)
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getFdaDrugs();
  }, []);

  // useEffect(() => {
  //   axios
  //     .post("/pharmacy/wholesaler/fetch-wholesalers")
  //     .then((res) => {
  //       //  ;
  //       setData(res.data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   axios
  //     .post("/pharmacy/drugs", {
  //       store_id: facilityid,
  //     },
  //     {
  //       headers: {
  //         "auth-token": token,
  //       },
  //     })
  //     .then((res) => setMyData(res.data.data))
  //     .catch((err) => console.log(err));
  // }, []);
  // let count = 0;

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

  // console.log(auth.token);

  // useEffect(() => {
  //   axiosCall
  //     .get("https://dgidb.org/api/v2/drugs?count=14449")
  //     .then((res) => {
  //        ;
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

  const handleMedicineNameChange = (selectedOption) => {
    const selectedDrug = fdaDrugs.find(
      (drug) => drug.id === selectedOption.value
    );
    setDrugDetails({
      ...drugDetails,
      name: selectedDrug
        ? selectedDrug.openfda?.generic_name?.[0] ?? "No Name"
        : "",
      description: selectedDrug
        ? selectedDrug.purpose?.[0] ?? "No Description"
        : "",
      medicine_group: selectedDrug
        ? selectedDrug.openfda?.route?.[0] ?? "No Med Group"
        : "",
      manufacturer: selectedDrug
        ? selectedDrug.openfda?.manufacturer_name?.[0] ?? "No Manufacturer"
        : "",
      store_id: facilityid,
      category_id: "6362bdcfe75eb05f85e05106", //selectedOption.value
      picture: null,
      nhis: "N/A",
      otc: "N/A",
      expiry_date: "",
      price: "",
      selling_price: "",
      level: "",
      dosage: "",
      total_stock: 1,
    });
  };

 
  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true)
  //   try {

  //     const res = await axios.post("/pharmacy/drugs/add-new-drug" , formData ,{
  //       headers : {
  //         "Content-Type" : "multipart/form-data",
  //         "auth-token" : token
  //       }

  //     })
     
  //     toast.promise(
  //       Promise.resolve(res),
  //       {
  //         loading: "Loading",
  //         success: (res) =>
  //           `${res?.data?.error?.message 
  //             ? "Plase fill all fields"
  //             : "Drug added successfully"
  //           }`,
  //         error: " An error occured, please fill all required fields",
  //       },
      
  //       setIsLoading(false)

  //     );
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false)
  //   }
  // };
  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const res = await axios.post("/pharmacy/drugs/add-new-drug", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": token,
        },
      });
  
      toast.promise(
        Promise.resolve(res),
        {
          loading: "Loading",
          success: (res) => res.data.message,
          error:(res) => { 
            if (res.data.error.message){
              return "An error occurred, please fill all required fields"
            }
            },
        },
      );
      console.log(res);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
          <Toaster/>

          <div className="text-deep mx-3 mt-4">
            Please add category, group, dosage, company name before adding
            medicine.
          </div>
          <div className="mx-md-3 mx-2">
            <div
              className="card border-0 pb-3 rounded"
              style={{ borderRadius: "10px" }}
            >
              <div className="ms-bg text-white py-4 d-flex justify-content-between align-items-center">
                <h6 className="mx-3">PRODUCT DETAILS</h6>
                <Link
                  to="/products/mass-upload"
                  className="btn btn-light px-3 mx-3"
                  style={{ color: "#4D44B5" }}
                >
                  Mass Upload
                </Link>
              </div>
              <div className="mx-md-4 mt-3 text-deep">
                <div className="mx-3">
                  <Form>
                    {error ? <p className="error">{errorMsg}</p> : ""}
                    <FormGroup>
                      <Label className="small" htmlFor="fname">
                        <b>Medicine Name*</b>
                      </Label>
                      <Select
                      isLoading={isLoading}
                      isDisabled={isLoading}
                        isSearchable={true}
                        options={fdaDrugs.map((row) => ({
                          value: row?.id,
                          label: row.openfda?.generic_name?.[0],
                        }))}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: "#C1BBEB",
                          }),
                        }}
                        onChange={handleMedicineNameChange}
                      />
                    </FormGroup>
  
                    <FormGroup>
                      <Label className="small" htmlFor="fname">
                        <b>Medicine Group</b>
                      </Label>
                      <Input
                        id="number"
                        name="price"
                        type="text"
                        onChange={handleChange}
                        placeholder={drugDetails.medicine_group}
                        style={{ borderColor: "#C1BBEB" }}
                        readOnly={true}
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
                      <Label className="small" htmlFor="price">
                        <b>Purchase Price per Piece (GHS) *</b>
                      </Label>
                      <Input
                        id="price"
                        name="price"
                        type="text"
                        onChange={handleChange}
                        value={drugDetails.price}
                        placeholder="200"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" htmlFor="selling_price">
                        <b>Selling Price per Piece (GHS) *</b>
                      </Label>
                      <Input
                        id="selling_price"
                        name="selling_price"
                        type="text"
                        placeholder="250"
                        onChange={handleChange}
                        value={drugDetails.selling_price}
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" htmlFor="total_stock">
                        <b>Quantity *</b>
                      </Label>
                      <Input
                        id="total_stock"
                        name="total_stock"
                        type="number"
                        onChange={handleChange}
                        value={drugDetails.total_stock}
                        style={{ borderColor: "#C1BBEB" }}
                        min={1}
                      />
                    </FormGroup>

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
                      <Label className="small" htmlFor="manufacturer">
                        <b>Supplier/Company Name*</b>
                      </Label>
                      <Input
                        id="manufacturer"
                        name="manufacturer"
                        type="text"
                        list="wholesaler"
                        // onChange={handleChange}
                        value={drugDetails.manufacturer}
                        style={{ borderColor: "#C1BBEB" }}
                        readOnly={true}
                      />

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
                        // onChange={handleChange}
                        style={{ borderColor: "#C1BBEB" }}
                        readOnly={true}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" htmlFor="expiry_date">
                        <b>Expiry Date*</b>
                      </Label>
                      <Input
                        id="expiry_date"
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
                  disabled = {isLoading}
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

