import React, { useEffect } from "react";
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
import {
  useGetPharmacyInfoMutation,
  useGetSignupsQuery,
} from "../../app/features/authSlice/userApiSlice";
import {
  facility_id,
  pharmacyInfo,
  setHasPharmacy,
  setToken,
} from "../../app/features/authSlice/authSlice";
import { useDispatch, useSelector } from "react-redux";
const Signup = () => {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();
  const { data } = useGetSignupsQuery();
  const token = useSelector(setToken);
  const { data: mydata } = useGetSignupsQuery();
  const [isPharmacy, setIsPharmacy] = useState(false);
  const facilityid = useSelector(facility_id);
  const [pharmacyinfo] = useGetPharmacyInfoMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await mydata;

        setIsPharmacy(res.has_pharmacy);

        dispatch(setHasPharmacy({ ...res }));

        sessionStorage.setItem("storeInfo", JSON.stringify(res));

        // Process the response data here
      } catch (error) {
        // Handle any errors that occur during the request
      }
    };

    fetchData();
  }, [mydata]);

  const handleClick = () => {
    // const remove = toast.loading("Loading...");
    // await axios
    //   .get("/pharmacies/check-whether-owner-has-pharmacy", {
    //     headers: {
    //       "auth-token": auth.token
    //         ? auth.token
    //         : sessionStorage.getItem("userToken"),
    //     },
    //   })
    //   .then((res) => {
    //      ;
    //     sessionStorage.setItem("has_pharmacy", res.data.has_pharmacy);
    //     if (res.data.has_pharmacy) {
    //       navigate("/dashboard");
    //       const [facility_id] = res.data.data.map((id) => {
    //         sessionStorage.setItem("facility_id", id._id);
    //       });
    //       toast.dismiss(remove);
    //       setIsOpen(false);
    //     } else {
    //       navigate("/signup/store-signup");
    //       setIsOpen(false);
    //       toast.dismiss(remove);
    //     }
    //   })
    //   .catch((err) => console.log(err));
    navigate("/dashboard");
  };
  // hodpital
  const handleHospitalClick = async () => {
    const remove = toast.loading("Loading...");
    await axios
      .get("/hospitals/check-whether-owner-has-hospital", {
        headers: {
          "auth-token": auth.token
            ? auth.token
            : sessionStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        sessionStorage.setItem("has_pharmacy", res.data.has_hospital);
        if (res.data.has_hospital) {
          navigate("/hospital/dashboard");
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
          {isPharmacy ? "Continue to pharmacy" : "Sign up for"}{" "}
        </h3>
        <div className="grid my-5">
          <Link to="" onClick={handleHospitalClick}>
            <div className="card border-0">
              <img src={hospital} alt="" className="card-img-top" />
              <div className="card-body">
                <h4 className="text-center text-dark">Hospital</h4>
              </div>
            </div>
          </Link>
          <Link
            to={isPharmacy ? "/pharmacy/dashboard" : "/signup/store-signup"}
            // onClick={handleClick}
          >
            <div data-cy ="pharmacyCard" className="card border-0">
              <img src={store} alt="" className="card-img-top" />
              <div className="card-body">
                <h4
                data-cy ="pharmacyCard-status"
                  className={
                    isPharmacy
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
