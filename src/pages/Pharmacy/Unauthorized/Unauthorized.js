import React from "react";
import DateHeader from "../../../components/DateHeader";
import Footer from "../../../components/Footer";
import PharmacyName from "../../../components/PharmacyName";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <>
      <div className="container">
      
        <div className="contain">
          <div className="login card shadow-lg border-0 p-3 text-center">
            <h1 className="text-deep">OOPS!!!</h1>
            <p className="text-deep">Looks like you are unathorized to access this page</p>
            <Link to="/pharmacy/dashboard" className="ms-bg text-white rounded py-2">Back To Dashboard</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Unauthorized;
