import React from "react";
import DateHeader from "../../components/DateHeader";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import SearchBar from "../../components/SearchBar";
import add from "../../assets/icons/svg/add.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Link } from "react-router-dom";
import ProductsTable from "../../components/ProductsTable";
import Header from "../../components/Header";
import PharmacyName from "../../components/PharmacyName";
import { useState } from "react";




const Products = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <Helmet>
        <title>Products</title>
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
              <DateHeader />
              <div className="d-flex">
                <BreadCrumb
                  name="Products"
                  breadcrumb="/products"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="d-md-flex justify-content-between mt-4">
            <div className="mx-3">
              <SearchBar
                radius="50px"
                onChange={(e) => setSearchText(e.target.value)}
              />
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
            <ProductsTable search={searchText} />
          </div>
          {/* End of Table */}
        </div>
      </div>
    </>
  );
};

export default Products;
