import React from "react";
import "../assets/styles/dashboard.css";
import staff from "../assets/icons/svg/staff.svg";
import orders from "../assets/icons/svg/orders.svg";
import sales from "../assets/icons/svg/sales.svg";
import products from "../assets/icons/svg/products.svg";

const ItemsCard = () => {
  return (
    <div className="card itemcard">
      <div className="d-flex mx-3">
        <div className="d-flex col">
          <div className="img-container center">
            <img src={staff} alt="" width={20} />
          </div>
          <div className="line mx-2 mt-2 small">
            <p className="">Active staff</p>
            <h5>57</h5>
          </div>
        </div>
        <div className="d-flex col">
          <div className="img-container center orders">
            <img src={orders} alt="" width={20} />
          </div>
          <div className="line mx-2 mt-2 small">
            <p>Orders</p>
            <h5>57</h5>
          </div>
        </div>
        <div className="d-flex col">
          <div className="img-container center sales">
            <img src={sales} alt="" width={20} />
          </div>
          <div className="line mx-2 mt-2 small">
            <p>Sales this week</p>
            <h5>57</h5>
          </div>
        </div>
        <div className="d-flex col">
          <div className="img-container center products">
            <img src={products} alt="" width={20} />
          </div>
          <div className="line mx-2 mt-2 small">
            <p>Products</p>
            <h5>57</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsCard;
