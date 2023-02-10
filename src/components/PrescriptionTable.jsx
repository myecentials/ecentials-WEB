import React from "react";
import leftchev from "../assets/icons/svg/leftchev.svg";
import rightchev from "../assets/icons/svg/rightchev.svg";
import updownchev from "../assets/icons/svg/updownchev.svg";
import { Table } from "reactstrap";
import chev from "../assets/icons/svg/chevfilldown.svg";
import { Link } from "react-router-dom";
import orders from "../static/orders";
import axios from "../config/api/axios";
import { useEffect } from "react";
import { useState } from "react";
import ReactImageMagnify from "react-image-magnify";

const PrescriptionTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post("/prescriptions/get-prescriptions-for-pharmacy", {
        store_id: sessionStorage.getItem("facility_id"),
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (e) => {
    sessionStorage.setItem("orderId", e._id);
  };

  return (
    <div className="mx-3 card bg-white border-0">
      <div className=" ms-bg py-2 gy-md-0 gy-2">
        <div className=" my-0 text-white small ">
          <span className="mx-2 text-nowrap">
            Showing{" "}
            <span className="btn btn-light">
              10 <img src={chev} alt="" width={10} />
            </span>{" "}
            entries
          </span>
        </div>
      </div>
      <div className="table-responsive">
        <Table borderless bgcolor="white" striped>
          <thead className="text-deep">
            <tr className="small">
              <th className="text-nowrap">Order ID</th>
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
              {/* <th className="text-nowrap">Order Status</th>
              <th className="text-nowrap">Action</th>
              <th className="text-nowrap">Date</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({ image, user_name, user_email, user_address }, index) => (
                <tr key={index}>
                  <td className="py-3 ">#{index + 1}</td>
                  <td className="py-3 text-nowrap">
                    <ReactImageMagnify
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
                    />
                  </td>
                  <td className="py-3">{user_name || "N/A"}</td>
                  <td className="py-3">{user_email || "N/A"}</td>
                  <td className="py-3">{user_address || "N/A"}</td>
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
      <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5 mt-5">
        <p className="small text-center">
          Showing <span className="text-lightdeep">1-{data.length}</span> from{" "}
          <span className="text-lightdeep">{data.length}</span> data
        </p>
        <div className="d-flex justify-content-center align-items-center">
          <img src={leftchev} alt="" className="mx-3" />
          <div className="circle rounded-circle mail circle-bgdeep text-white">
            1
          </div>
          <div className="circle rounded-circle mail mx-2">2</div>
          <div className="circle rounded-circle mail">3</div>
          <img src={rightchev} alt="" className="mx-3" />
        </div>
      </div>
    </div>
  );
};

export default PrescriptionTable;