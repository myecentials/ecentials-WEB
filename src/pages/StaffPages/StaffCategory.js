import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import BreadOutlined from "../../components/BreadOutlined";
import CategoryList from "../../components/CategoryList";
import StaffSideBar from "../../components/StaffComponents/StaffSidebar";
import StaffCategoryList from "../../components/StaffComponents/StaffCategoryList";
import StaffNavBar from "../../components/StaffComponents/StaffNavBar";

const StaffCategory = () => {
  return (
    <>
      <Helmet>
        <title>Category</title>
      </Helmet>
      <StaffNavBar />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <StaffSideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex mx-4">
              <BreadOutlined name="Products" breadcrumb="/staff-products" />
              <BreadCrumb name="Category" breadcrumb="" hasStyles={true} />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
          </div>

          <div className="mt-4">
            <StaffCategoryList />
          </div>
          {/* End of Table */}
        </div>
      </div>
    </>
  );
};

export default StaffCategory;
