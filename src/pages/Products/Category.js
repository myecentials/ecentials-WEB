import React from "react";
import DateHeader from "../../components/DateHeader";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import BreadOutlined from "../../components/BreadOutlined";
import CategoryList from "../../components/CategoryList";
import Header from "../../components/Header";
import { useEffect } from "react";
import axios from "../../config/api/axios";
import PharmacyName from "../../components/PharmacyName";

const Category = () => {
  return (
    <>
      <Helmet>
        <title>Category</title>
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
              <h6 className="mt-2 text-deep">CATEGORY</h6>
              <DateHeader />
              <div className="d-flex">
                <BreadOutlined name="Products" breadcrumb="/products" />
                <BreadCrumb name="Category" breadcrumb="" hasStyles={true} />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="mt-4 mx-3">
            <CategoryList />
          </div>
          {/* End of Table */}
        </div>
      </div>
    </>
  );
};

export default Category;
