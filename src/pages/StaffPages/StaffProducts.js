import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import SearchBar from "../../components/SearchBar";
import add from "../../assets/icons/svg/add.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Link } from "react-router-dom";
import ProductsTable from "../../components/ProductsTable";
import StaffSideBar from "../../components/StaffComponents/StaffSidebar";
import StaffProductsTable from "../../components/StaffComponents/StaffProductsTable";
import StaffNavBar from "../../components/StaffComponents/StaffNavBar";
import DateHeader from "../../components/StaffComponents/DateHeader";
import Header from "../../components/Header";

const StaffProducts = () => {
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Header />
      <StaffNavBar />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <StaffSideBar />
        </div>
        <div className="col-md-9 middle">
          <DateHeader title="Products" />
          <div className="d-flex justify-content-md-between align-items-center ">
            <div className="d-flex mx-4">
              <BreadCrumb
                name="Products"
                breadcrumb="/staff-products"
                hasStyles={true}
              />
            </div>
          </div>
          <div className="d-md-flex justify-content-between mt-4">
            <div className="mx-3"></div>
            <div className="d-flex justify-content-end  mt-md-0 mt-3">
              <Link
                to="/staff-products/add-products"
                className="btn mx-md-3 signup-btn rounded-pill px-4 text-nowrap"
              >
                <img src={add} alt="" width={10} className="mx-2" /> Products
              </Link>
            </div>
          </div>

          <div className="mt-4">
            <StaffProductsTable />
          </div>
          {/* End of Table */}
        </div>
      </div>
    </>
  );
};

export default StaffProducts;
