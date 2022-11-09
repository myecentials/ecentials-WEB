import React from "react";
import hospital from "../../assets/images/svgs/hospital.svg";
import store from "../../assets/images/svgs/store.svg";
import ambulance from "../../assets/images/svgs/ambulance.svg";
import delivery from "../../assets/images/svgs/delivery.svg";
import lab from "../../assets/images/svgs/lab.svg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "../../components/Footer";
import useAuth from "../../hooks/useAuth";

const Signup = () => {
  const { auth } = useAuth();
  return (
    <>
      <Helmet>
        <title>Sign up for</title>
      </Helmet>
      <div className="contain">
        <h3 className="mt-4">Sign up for </h3>
        <div className="grid my-5">
          <Link to="/signup/hospital-signup">
            <div className="card border-0">
              <img src={hospital} alt="" className="card-img-top" />
              <div className="card-body">
                <h4 className="text-center text-dark">Hospital</h4>
              </div>
            </div>
          </Link>
          <Link to="/signup/store-signup">
            <div className="card border-0">
              <img src={store} alt="" className="card-img-top" />
              <div className="card-body">
                <h4 className="text-center text-dark">Pharmacy</h4>
              </div>
            </div>
          </Link>
          <Link to="/signup/ambulance-signup">
            <div className="card border-0">
              <img src={ambulance} alt="" className="card-img-top" />
              <div className="card-body">
                <h4 className="text-center text-dark">Ambulance</h4>
              </div>
            </div>
          </Link>
          <Link to="/signup/delivery-signup">
            <div className="card border-0">
              <img src={delivery} alt="" className="card-img-top" />
              <div className="card-body">
                <h4 className="text-center text-dark">Delivery</h4>
              </div>
            </div>
          </Link>
          <Link to="/signup/lab-signup">
            <div className="card border-0">
              <img src={lab} alt="" className="card-img-top" />
              <div className="card-body">
                <h4 className="text-center text-dark">Lab</h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
