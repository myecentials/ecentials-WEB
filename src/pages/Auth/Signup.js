import React from "react";
import DateHeader from "../../components/DateHeader";
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
import { Modal, ModalBody } from "reactstrap";
import { toast, Toaster } from "react-hot-toast";
import develop from "../../assets/images/svgs/develop.svg";
const Signup = () => {
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    const remove = toast.loading("Loading...");
    await axios
      .get("/pharmacies/check-whether-owner-has-pharmacy", {
        headers: {
          "auth-token": auth.token
            ? auth.token
            : sessionStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("has_pharmacy", res.data.has_pharmacy);
        if (res.data.has_pharmacy) {
          navigate("/dashboard");
          const [facility_id] = res.data.data.map((id) => {
            sessionStorage.setItem("facility_id", id._id);
          });
          toast.dismiss(remove);
          setIsOpen(false);
        } else {
          navigate("/signup/store-signup");
          setIsOpen(false);
          toast.dismiss(remove);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleOpenModel = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Sign up for</title>
      </Helmet>
      <Modal isOpen={isOpen}></Modal>
      <div className="contain">
        <Toaster />
        <h3 className="mt-4">
          {sessionStorage.getItem("has_pharmacy")
            ? "Continue to pharmacy"
            : "Sign up for"}{" "}
        </h3>
        <div className="grid my-5">
          <Link to="/hospital/dashboard">
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
                <h4
                  className={
                    sessionStorage.getItem("has_pharmacy")
                      ? "text-center text-success"
                      : "text-center text-dark"
                  }
                >
                  Pharmacy
                </h4>
              </div>
            </div>
          </Link>
          <Link to="" onClick={handleOpenModel}>
            <div className="card border-0">
              <img src={ambulance} alt="" className="card-img-top" />
              <div className="card-body">
                <h4 className="text-center text-dark">Ambulance</h4>
              </div>
            </div>
          </Link>
          <Link to="" onClick={handleOpenModel}>
            <div className="card border-0">
              <img src={delivery} alt="" className="card-img-top" />
              <div className="card-body">
                <h4 className="text-center text-dark">Delivery</h4>
              </div>
            </div>
          </Link>
          <Link to="" onClick={handleOpenModel}>
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
      <Modal isOpen={isOpen} centered>
        <ModalBody>
          <div>
            <img
              src={develop}
              alt=""
              width={150}
              className="mx-auto d-block mb-3"
            />
          </div>
          <h5 className="text-deep text-center mt-4">
            Page Under Contruction visit pharmacy
          </h5>
          <button
            className="mx-auto d-block mb-2 ms-bg text-white px-3 py-1 rounded shadow"
            onClick={() => setIsOpen(false)}
          >
            close
          </button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Signup;
