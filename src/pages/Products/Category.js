import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import SearchBar from "../../components/SearchBar";
import add from "../../assets/icons/svg/add.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import BreadOutlined from "../../components/BreadOutlined";
import CategoryList from "../../components/CategoryList";

const Category = () => {
  return (
    <>
      <Helmet>
        <title>Category</title>
      </Helmet>
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex mx-4">
              <BreadOutlined name="Products" breadcrumb="/products" />
              <BreadCrumb name="Category" breadcrumb="" />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
          </div>

          <div className="mt-4">
            <CategoryList />
          </div>
          {/* End of Table */}
        </div>
      </div>
    </>
  );
};

export default Category;
