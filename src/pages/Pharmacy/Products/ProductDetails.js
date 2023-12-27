import React, { useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import NavIcons from "../../../components/NavIcons";
import SideBar from "../../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../../components/CustomeNav";
import { Form, FormFeedback, FormGroup, Input, Label, Table } from "reactstrap";
import BreadOutlined from "../../../components/BreadOutlined";
import Header from "../../../components/Header";
import { useEffect } from "react";
import axios from "../../../config/api/axios";
import axiosCall from "axios";
import { Link, useNavigate } from "react-router-dom";
import PharmacyName from "../../../components/PharmacyName";
import { select } from "d3";
import drug from "../../../static/drugs.json";
import { toast, Toaster } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import Select from "react-select";
import DateHeader from "../../../components/DateHeader";
import { useSelector } from "react-redux";
import { facility_id, setToken } from "../../../app/features/authSlice/authSlice";
import { massdrug } from "../../../app/features/products/productsSlice";

const ProductDetails = () => {
    const [fdaDrugs, setFdaDrugs] = useState([]);
    const drug = useSelector(massdrug)
    const { active_ingredient, inactive_ingredient, purpose, dosage_and_administration, indications_and_usage, warnings, do_not_use, pregnancy_or_breast_feeding, stop_use, keep_out_of_reach_of_children, storage_and_handling } = drug




    return (
        <>
            <Helmet>
                <title>Add Products</title>
            </Helmet>           
                <div className="col-md-9 middle">
                    <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
                        <div>
                            <h6 className="mt-2 text-deep">PRODUCTS</h6>
                            <Toaster />
                            <DateHeader />
                            <div className="d-flex">
                                <BreadOutlined name="Products" breadcrumb="/pharmacy/products" />
                                <BreadOutlined name="Add Products" breadcrumb="/pharmacy/products/add-products" width="9rem" />
                                <BreadOutlined name="Mass Upload" breadcrumb="/pharmacy/products/mass-upload" width="9rem" />
                                {/* <BreadCrumb
                                    name={drug?.openfda?.brand_name}
                                    breadcrumb=""
                                    minWidth="15rem"
                                    // width="9rem"
                                    hasStyles={true}
                                /> */}
                            </div>
                        </div>
                        <PharmacyName />
                    </div>

                    {/* <div className="text-deep mx-3 mt-4">
            Please add category, group, dosage, company name before adding
            medicine.
          </div> */}
                    <div className="mx-md-3 mx-2">
                        <div
                            className="card border-0 pb-3 rounded mt-4 px-3 pt-3"
                            style={{ borderRadius: "10px" }}
                        >
                            <h6>Active Ingredient In Each Drug</h6>
                            <p>{drug?.active_ingredient}</p>
                            <h6>Inactive Ingredient</h6>
                            <p>{drug?.inactive_ingredient}</p>
                            <h6>Purpose</h6>
                            <p>{drug?.purpose}</p>
                            <h6>Indications And Usage</h6>
                            <p>{drug?.indications_and_usage}</p>
                            <h6>Dosage And Administration</h6>
                            <p>{drug?.dosage_and_administration}</p>
                            <h6>Warning</h6>
                            <p>{drug?.warnings}</p>
                            <h6>Do Not Use</h6>
                            <p>{drug?.do_not_use}</p>
                            <h6>Pregnancy Or Breast Feeding</h6>
                            <p>{drug?.pregnancy_or_breast_feeding}</p>
                            <h6>Stop Use</h6>
                            <p>{drug?.stop_use}</p>
                            <h6>Storage and Handling</h6>
                            <p>{drug?.storage_and_handling}</p>
                            <h6>Keep Out Of Reach Of Children</h6>
                            <p>{drug?.keep_out_of_reach_of_children}</p>
                        </div>
                    </div>
                </div>
        </>
    );
};

export default ProductDetails;
