import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Form, FormFeedback, FormGroup, Input, Label, Table } from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";
import Header from "../../components/Header";
import { useEffect } from "react";
import axios from "../../config/api/axios";
import axiosCall from "axios";
import { Link, useNavigate } from "react-router-dom";
import PharmacyName from "../../components/PharmacyName";
import { select } from "d3";
import drug from "../../static/drugs.json";
import { toast, Toaster } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Select from "react-select";
import DateHeader from "../../components/DateHeader";
import { useDispatch, useSelector } from "react-redux";
import { facility_id, setToken } from "../../app/features/authSlice/authSlice";
import { massDrugs } from "../../app/features/products/productsSlice";

const AddProducts = () => {
    const [fdaDrugs, setFdaDrugs] = useState([]);

    useEffect(() => {
        const getFdaDrugs = async () => {
            try {
                const response = await axiosCall.get("https://api.fda.gov/drug/label.json?search=_exists_:openfda&limit=50");
                setFdaDrugs(response?.data?.results);
                console.log(response?.data?.results)
            } catch (error) {
                console.log(error);
            }
        };
        getFdaDrugs();
    }, []);

    const dispatch = useDispatch()

    const handleDrugMore = (drugs) => {
        dispatch(massDrugs({ ...drugs }))
    }


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
                                <BreadOutlined name="Add Products" breadcrumb="/products/add-products" width="9rem" />
                                <BreadCrumb
                                    name="Mass upload"
                                    breadcrumb=""
                                    width="9rem"
                                    hasStyles={true}
                                />
                            </div>
                        </div>
                        <PharmacyName />
                    </div>

                    {/* <div className="text-deep mx-3 mt-4">
            Please add category, group, dosage, company name before adding
            medicine.
          </div> */}
                    <div className="mx-3 card bg-white border-0 mt-5">
                        <div className="d-flex justify-content-between ms-bg py-2 gy-md-0 gy-2 t-header">
                            <div className=" my-0 text-white small ">
                                <span className="mx-2 text-nowrap">
                                    Showing{" "}
                                    <select name="enteries" id="" >
                                        {fdaDrugs?.slice(0, Math.ceil(fdaDrugs.length / 10)).map(({ }, index) => (
                                            <option value={index * 10 + 10}>{index * 10 + 10}</option>
                                        ))}
                                    </select>{" "}
                                    entries
                                </span>
                            </div>


                            <span className="mx-3">
                                <Link to="/products/category">
                                    <div className="btn d-flex btn-light">
                                        {/* <img src={eye} alt="" /> */}
                                        <span className="small mx-2" style={{ color: "#4D44B5" }}>
                                            Category
                                        </span>
                                    </div>
                                </Link>
                            </span>
                        </div>

                        <div className="">
                            <Table striped responsive borderless>
                                <thead className="ms-bg text-white">
                                    <tr className="py-5">
                                        <th></th>
                                        <th className="text-nowrap">Brand Name</th>
                                        <th className="text-nowrap">Generic Name</th>
                                        <th className="text-nowrap">Product NDC</th>
                                        <th className="text-nowrap">Package NDC</th>
                                        <th className="text-nowrap">Route</th>
                                        <th className="text-nowrap">Substance Name</th>
                                        <th className="text-nowrap">Product Type</th>
                                        <th className="text-nowrap">More Info</th>
                                        {/* <th>Drug Image</th>
                                        <th>Dose</th> */}
                                        {/* <th>Category</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        fdaDrugs.map(drugs => <tr>
                                            <td>
                                                <input type="checkbox" name="" id="" />
                                            </td>
                                            <td contentEditable={true}>{drugs?.openfda?.brand_name[0]}</td>
                                            <td>{drugs?.openfda?.generic_name[0]}</td>
                                            <td>{drugs?.openfda?.product_ndc[0]}</td>
                                            <td>{drugs?.openfda?.package_ndc[0]}</td>
                                            <td>{drugs?.openfda?.route[0]}</td>
                                            <td>{drugs?.openfda?.substance_name[0]}</td>
                                            <td>{drugs?.openfda?.product_type[0]}</td>
                                            <td>
                                                <Link to={`/products/${drugs?.openfda?.brand_name[0]}`} onClick={() => handleDrugMore(drugs)}>More</Link>
                                            </td>

                                            {/* <td></td> */}
                                        </tr>)
                                    }
                                </tbody>
                            </Table>
                        </div>

                        <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5">
                            {fdaDrugs.length === 0 ? (
                                <p className="text-deep">
                                    No products available, please add product to see them here
                                </p>
                            ) : (
                                <p className="small text-center">
                                    Showing <span className="text-lightdeep">1-{fdaDrugs.length}</span> from{" "}
                                    <span className="text-lightdeep">{fdaDrugs.length}</span> data
                                </p>
                            )}
                            <div className="d-flex justify-content-center align-items-center">
                                {/* <img src={leftchev} alt="" className="mx-3" /> */}
                                <div className="circle rounded-circle mail circle-bgdeep text-white">
                                    1
                                </div>
                                <div className="circle rounded-circle mail mx-2">2</div>
                                <div className="circle rounded-circle mail">3</div>
                                {/* <img src={rightchev} alt="" className="mx-3" /> */}

                                <Toaster />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProducts;
