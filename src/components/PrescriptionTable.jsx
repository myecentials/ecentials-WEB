import React from "react";
// import leftchev from "../assets/icons/svg/leftchev.svg";
// import rightchev from "../assets/icons/svg/rightchev.svg";
import updownchev from "../assets/icons/svg/updownchev.svg";
import { Table } from "reactstrap";
// import chev from "../assets/icons/svg/chevfilldown.svg";
import { Link } from "react-router-dom";
// import orders from "../static/orders";
import axios from "../config/api/axios";
import { useEffect } from "react";
import { useState } from "react";
//import ReactImageMagnify from "react-image-magnify";
import Loader from "./Loader";
// import useAuth from "../hooks/useAuth";
import { useFetchAllPrescriptionsMutation } from "../app/features/orders/ordersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { facility_id ,setToken } from "../app/features/authSlice/authSlice";
import { allPrescriptions } from "../app/features/orders/ordersSlice";
import { Pagination } from "@mui/material";
import { toast ,Toaster} from 'react-hot-toast';

const PrescriptionTable = ({ search }) => {
  // const { auth } = useAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prescriptions] = useFetchAllPrescriptionsMutation();
  const token = useSelector(setToken)
  const facilityId = useSelector(facility_id)
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, ] = useState(10)
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  // const currentPost = data?.slice(indexOfFirstPost, indexOfLastPost)
  // const [drugTotal, setDrugTotal] = useState(0)
  const paginate = (event, value) => {
    setCurrentPage(value)
  }


  useEffect(() => {
    const fetchData = async () => {
      try{
        const results = await prescriptions(facilityId).unwrap();
        console.log(results)
        dispatch(allPrescriptions({ ...results?.data }));
        setData(results?.data);
      }catch(error){
        if (error.status === "FETCH_ERROR")
				toast.error("Error fetching prescriptions, retry");
      }
    
    };
    fetchData();
  }, [dispatch, facilityId, prescriptions]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        "/prescriptions/get-prescriptions-for-pharmacy",
        {
          store_id: facilityId,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((res) => {
       
        setIsLoading(false);
        setData(res.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [facilityId, token]);

  const handleClick = (item, e) => {
    sessionStorage.setItem("presId", JSON.stringify(item));
  };

  const [, setEnteries] = useState(10);
  const handleEntryChange = (e) => {
    setEnteries(e.target.value);
  };

  return (
    <div className="mx-3 card bg-white border-0">
      <Toaster/>
      <div className=" ms-bg py-2 gy-md-0 gy-2">
        <div className=" my-0 text-white small ">
          <span className="mx-2 text-nowrap">
            Showing{" "}
            <select name="enteries" id="" onChange={handleEntryChange}>
              {data.slice(0, Math.ceil(data.length / 10)).map(( index) => (
                <option value={index * 10 + 10}>{index * 10 + 10}</option>
              ))}
            </select>{" "}
            entries
          </span>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="table-responsive">
          <Table borderless bgcolor="white" striped>
            <thead className="text-deep">
              <tr className="small">
                <th className="text-nowrap">#</th>
                <th className="text-nowrap">Image</th>
                <th className="text-nowrap">
                  <img src={updownchev} alt="" className="mx-1" />
                  Name
                </th>
                <th className="text-nowrap ">
                  <img src={updownchev} alt="" className="mx-1" />
                  Email
                </th>

                <th className="text-nowrap">Address</th>
                <th className="text-nowrap">Action</th>
                {/* <th className="text-nowrap">Order Status</th>
              <th className="text-nowrap">Action</th>
              <th className="text-nowrap">Date</th> */}
              </tr>
            </thead>
            <tbody>
              { data.length === 0? <p>No records to display </p> : data
                .filter(({ user_email }) =>
                  user_email?.toLowerCase() === ""
                    ? user_email?.toLowerCase()
                    : user_email?.toLowerCase().includes(search.toLowerCase())
                )
                .slice(indexOfFirstPost, indexOfLastPost)
                .map(
                  (
                    {
                      image,
                      user_name,
                      user_email,
                      user_address,
                      _id,
                      user_id,
                    },
                    index
                  ) => (
                    <tr key={index}>
                      <td className="py-3 ">{(indexOfFirstPost + 1) + index}</td>
                      <td className="py-3 text-nowrap">
                        {/* <ReactImageMagnify
                          {...{
                            smallImage: {
                              isFluidWidth: true,
                              src: image,
                              alt: "Drug image",
                            },
                            largeImage: {
                              src: image,
                              width: 1200,
                              height: 1800,
                              alt: "Drug image",
                            },
                            lensStyle: {
                              background: "hsla(0, 100%, 100%, .5)",
                              // border: "1px solid #ccc",
                              // borderRadius: "10px",
                            },
                          }}
                          smallImage={{
                            width: 200,
                            height: 200,
                            src: image,
                            sizes:
                              "(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw",
                          }}
                          enlargedImageContainerDimensions={{
                            width: 500,
                            height: 500,
                            src: image,
                          }}
                          enlargedImagePosition="beside"
                          isHintEnabled={true}
                          shouldHideHintAfterFirstActivation={false}
                        /> */}
                        <img src={image || "N/A"} alt="" width={50}/>
                      </td>
                      <td className="py-3">{user_name || "N/A"}</td>
                      <td className="py-3">{user_email || "N/A"}</td>
                      <td className="py-3">{user_address || "N/A"}</td>
                      <td className="py-3">
                        <Link
                          to="/orders/prescription/process"
                          className="border-0 px-3 py-1 small rounded-pill"
                          style={{
                            backgroundColor: "rgba(147, 193, 249, 0.29)",
                            color: "#007AFF",
                          }}
                          onClick={() =>
                            handleClick(
                              {
                                image,
                                user_name,
                                user_email,
                                user_address,
                                user_id,
                                _id,
                              },
                              index
                            )
                          }
                        >
                          Process
                        </Link>
                      </td>
                      {/* <td className="py-3">
                    <span
                      className="rounded-pill border-0 px-3 py-1 small"
                      style={{
                        backgroundColor: `${
                          order_status == "Cancelled"
                            ? "#FBE7E8"
                            : order_status == "New"
                            ? "#C1BBEB"
                            : ""
                        }`,
                        color: `${
                          order_status == "Cancelled"
                            ? "#A30D11"
                            : order_status == "New"
                            ? "#4D44B5"
                            : ""
                        }`,
                      }}
                    >
                      {order_status}
                    </span>
                  </td>
                  <td className="py-3">
                    <Link
                      to="/orders/order-details"
                      className="border-0 px-3 py-1 small rounded-pill"
                      style={{
                        backgroundColor: "rgba(147, 193, 249, 0.29)",
                        color: "#007AFF",
                      }}
                      onClick={() => handleClick(data[index])}
                    >
                      Details
                    </Link>
                  </td>
                  <td className="py-3">{}</td> */}
                    </tr>
                  )
                )}
            </tbody>
          </Table>
        </div>
      )}
      <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5 mt-5">
        <p className="small text-center">
          Showing <span className="text-lightdeep">1-{data.length}</span> from{" "}
          <span className="text-lightdeep">{data.length}</span> data
        </p>
        <Pagination count={Math.ceil(data.length / postPerPage)}   onChange={paginate}/>
      </div>
    </div>
  );
};

export default PrescriptionTable;
