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

import DataTable from "react-data-table-component";

const AddProducts = () => {
  const [fdaDrugs, setFdaDrugs] = useState([]);
  const [pending, setPending] = useState(true);

  const columns = [
    { name: "Brand Name", selector: (row) => row.openfda?.brand_name },
    { name: "Generic Name", selector: (row) => row.openfda?.generic_name },
    { name: "Product NDC", selector: (row) => row.openfda?.product_ndc },
    { name: "Package NDC", selector: (row) => row.openfda?.package_ndc },
    { name: "Route", selector: (row) => row.openfda?.route[0] },
    { name: "Substance Name", selector: (row) => row.openfda?.substance_name },
    { name: "Product Type", selector: (row) => row.openfda?.product_type },
    {
      name: "More Info",
      cell: (row) => (
        <Link
          to={`/products/${row?.openfda?.brand_name[0]}`}
          onClick={() => handleDrugMore(row)}
        >
          More
        </Link>
      ),
    },
  ];

  useEffect(() => {
    const getFdaDrugs = async () => {
      try {
        const response = await axiosCall.get(
          "https://api.fda.gov/drug/label.json?search=_exists_:openfda&limit=50"
        );
        setFdaDrugs(response?.data?.results);
        // console.log(response?.data?.results)
      } catch (error) {
        console.log(error);
      } finally {
        setPending(false);
      }
    };
    getFdaDrugs();
  }, []);

  const dispatch = useDispatch();

  const handleDrugMore = (drugs) => {
    dispatch(massDrugs({ ...drugs }));
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
                <BreadOutlined
                  name="Add Products"
                  breadcrumb="/products/add-products"
                  width="9rem"
                />
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
            <DataTable
              columns={columns}
              data={fdaDrugs}
              pagination
              customStyles={customStyles}
              selectableRows
              striped
              onSelectedRowsChange={handleChange}
              progressPending={pending}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProducts;

const handleChange = ({ selectedRows }) => {
  selectedRows.forEach((data, index) => {
    const brandName = data?.openfda?.brand_name[0];

    if (brandName) {
      console.log(`Brand Name for item ${index + 1}:`, brandName);
    } else {
      console.log(`Brand Name not found for item ${index + 1}`);
    }
  });

  // You can set state or dispatch with something like Redux so we can use the retrieved data
};

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "blue",
      color: "white",
      fontSize: "18px",
      fontWeight: 800,
    },
  },
  cells: {
    style: {
      fontSize: "16px",
      fontWeight: 500,
    },
  },
};
