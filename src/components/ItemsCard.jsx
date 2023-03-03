import React from "react";
import "../assets/styles/dashboard.css";
import staff from "../assets/icons/svg/staff.svg";
import orders from "../assets/icons/svg/orders.svg";
import sales from "../assets/icons/svg/sales.svg";
import products from "../assets/icons/svg/products.svg";
import CountUp from "react-countup";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../config/api/axios";

const ItemsCard = () => {
  const [order, setOrders] = useState(0);
  const [product, setProducts] = useState(0);
  const [sale, setSales] = useState(0);

  // Orders
  useEffect(() => {
    axios
      .post(
        "/pharmacy/orders/total-orders",

        {
          store_id: sessionStorage.getItem("facility_id"),
        },
        { headers: { "auth-token": sessionStorage.getItem("userToken") } }
      )
      .then((res) => setOrders(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // Products
  useEffect(() => {
    axios
      .post(
        "/pharmacy/drugs/count-drugs-in-pharmacy",

        {
          store_id: sessionStorage.getItem("facility_id"),
        },
        { headers: { "auth-token": sessionStorage.getItem("userToken") } }
      )
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .post(
        "/pharmacy/sales/sales-payment",
        {
          facility_id: sessionStorage.getItem("facility_id"),
        },
        { headers: { "auth-token": sessionStorage.getItem("userToken") } }
      )
      .then((res) => {
        setSales(res.data.data.length);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mt-4 itemcard py-3 px-2" style={{ borderRadius: "10px" }}>
      <div className="border-0 d-grid ">
        <div className="d-flex ">
          <div className="circle rounded-circle center orders-st">
            <img src={orders} alt="" width={20} />
          </div>
          <div className="line mx-2 mt-2 small">
            <p>Orders</p>
            <h5>
              <CountUp
                start={0}
                end={order}
                className="bold_font"
                duration={2}
              />
            </h5>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="circle rounded-circle center products">
            <img src={products} alt="" width={20} />
          </div>
          <div className="line mx-2 mt-2 small">
            <p>Products</p>
            <h5>
              <CountUp
                start={0}
                end={product}
                className="bold_font"
                duration={1}
                // suffix="K"
              />
            </h5>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <div className="circle rounded-circle center sales">
            <img src={sales} alt="" width={20} />
          </div>
          <div className="line mx-2 mt-2 small">
            <p className="text-nowrap">Sales this week</p>
            <h5>
              <CountUp
                start={0}
                end={sale}
                className="bold_font"
                duration={2}
              />
            </h5>
          </div>
        </div>
        {/* <div className="d-flex">
          <div className="circle rounded-circle center expired">
            <img src={staff} alt="" width={20} />
          </div>
          <div className="line mx-2 mt-2 small">
            <p className="text-nowrap">Expired</p>
            <h5>57</h5>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ItemsCard;
