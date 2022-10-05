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

const StaffProducts = () => {
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <StaffSideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex mx-4">
              <BreadCrumb
                name="Products"
                breadcrumb="/products"
                hasStyles={true}
              />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
          </div>
          <div className="d-md-flex justify-content-between mt-4">
            <div className="mx-3">
              <SearchBar radius="50px" />
            </div>
            <div className="d-flex justify-content-end  mt-md-0 mt-3">
              <Link
                to="/products/add-products"
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
