import React from "react";
import { Table } from "reactstrap";
import leftchev from "../assets/icons/svg/leftchev.svg";
import rightchev from "../assets/icons/svg/rightchev.svg";
import oral1 from "../assets/images/png/oraddrug1.png";
import oral2 from "../assets/images/png/oraddrug2.png";
import oral3 from "../assets/images/png/oraddrug3.png";
import oral4 from "../assets/images/png/tablet1.png";
import chev from "../assets/icons/svg/chevfilldown.svg";
import updownchev from "../assets/icons/svg/updownchev.svg";
import eye from "../assets/icons/svg/eye.svg";
import edit from "../assets/icons/svg/edit.svg";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "../config/api/axios";
import { useState } from "react";

const ProductsTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post("/pharmacy/drugs", {
        store_id: localStorage.getItem("facility_id"),
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleProductIndex = (e) => {
    const productData = data[e];
    localStorage.setItem("productInfo", JSON.stringify(productData));
  };

  return (
    <div className="mx-3 card bg-white border-0">
      <div className="d-flex justify-content-between ms-bg py-2 gy-md-0 gy-2 t-header">
        <div className=" my-0 text-white small ">
          <span className="mx-2 text-nowrap">
            Showing{" "}
            <span className="btn btn-light">
              10 <img src={chev} alt="" width={10} />
            </span>{" "}
            entries
          </span>
        </div>

        <span className="mx-3">
          <Link to="/products/category">
            <div className="btn d-flex btn-light">
              <img src={eye} alt="" />
              <span className="small mx-2" style={{ color: "#4D44B5" }}>
                Category
              </span>
            </div>
          </Link>
        </span>
      </div>
      <div className="table-responsive">
        <Table borderless bgcolor="white" striped>
          <thead className="text-deep">
            <tr className="small">
              <th className="text-nowrap">Products ID</th>
              <th className="text-nowrap">Name</th>
              <th className="text-nowrap">
                <img src={updownchev} alt="" className="mx-1" />
                Image
              </th>
              <th className="text-nowrap ">
                <img src={updownchev} alt="" className="mx-1" />
                Dose
              </th>

              <th className="text-nowrap">
                {" "}
                <img src={updownchev} alt="" /> Category
              </th>

              <th className="text-nowrap">Selling Price(GHC)</th>
              <th className="text-nowrap">Total Item</th>
              <th className="text-nowrap">Expiration Date</th>
              <th className="text-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              (
                {
                  name,
                  dosage,
                  total_stock,
                  image,
                  medicine_group,
                  price,
                  expiry_date,
                },
                index
              ) => (
                <tr key={index} className="">
                  <td className="py-3 text-center">#{index + 1}</td>
                  <td className="py-3">{name}</td>
                  <td className="py-3">
                    <img
                      src={image}
                      alt=""
                      className="img-fluid d-block rounded "
                      style={{ width: "5rem", height: "3rem" }}
                    />
                  </td>
                  <td className="py-3">{dosage}</td>
                  <td className="py-3">{medicine_group}</td>
                  <td className="py-3 text-center">{price}</td>
                  <td className="py-3">{total_stock}</td>
                  <td className="py-3">
                    {`${new Date(expiry_date).getDate()}/${new Date(
                      expiry_date
                    ).getMonth() + 1}/${new Date(expiry_date).getFullYear()}`}
                  </td>
                  <td>
                    <Link
                      to="/products/edit-product"
                      onClick={() => handleProductIndex(index)}
                    >
                      <img src={edit} alt="" />
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
      <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5">
        {data.length === 0 ? (
          <p className="text-deep">
            No products available, please add product to see them here
          </p>
        ) : (
          <p className="small text-center">
            Showing <span className="text-lightdeep">1-{data.length}</span> from{" "}
            <span className="text-lightdeep">{data.length}</span> data
          </p>
        )}
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

export default ProductsTable;
