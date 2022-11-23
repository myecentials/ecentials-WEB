import React from "react";
import hospital from "../../assets/images/svgs/hospital.svg";
import store from "../../assets/images/svgs/store.svg";
import ambulance from "../../assets/images/svgs/ambulance.svg";
import delivery from "../../assets/images/svgs/delivery.svg";
import lab from "../../assets/images/svgs/lab.svg";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "../../components/Footer";
import useAuth from "../../hooks/useAuth";
import axios from "../../config/api/axios";
import { useState } from "react";
import { Modal } from "reactstrap";

const Signup = () => {
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    setIsOpen(true);
    await axios
      .get("/pharmacies/check-whether-owner-has-pharmacy")
      .then((res) => {
        if (res.data.has_pharmacy) {
          navigate("/dashboard");
          const [facility_id] = res.data.data.map((id) =>
            localStorage.setItem("facility_id", id._id)
          );
          setIsOpen(false);
        } else {
          navigate("/signup/store-signup");
          setIsOpen(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Helmet>
        <title>Sign up for</title>
      </Helmet>
      <Modal isOpen={isOpen}></Modal>
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
          <Link to="" onClick={handleClick}>
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
