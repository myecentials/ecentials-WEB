import React from "react";
import "../assets/styles/dashboard.css";
import staff from "../assets/icons/svg/staff.svg";
import orders from "../assets/icons/svg/orders.svg";
import sales from "../assets/icons/svg/sales.svg";
import products from "../assets/icons/svg/products.svg";

const ItemsCard = () => {
  return (
    <div className="mt-4 itemcard py-3 px-2" style={{ borderRadius: "10px" }}>
      <div className="border-0 w-100 d-md-flex d-grid justify-content-md-between align-items-center">
        <div className="d-flex">
          <div className="circle rounded-circle center staff">
            <img src={staff} alt="" width={20} />
          </div>
          <div className="line mx-2 mt-2 small">
            <p className="text-nowrap">Active Staff</p>
            <h5>57</h5>
          </div>
        </div>
        <div className="d-flex">
          <div className="circle rounded-circle center orders">
            <img src={orders} alt="" width={20} />
          </div>
          <div className="line mx-2 mt-2 small">
            <p>Orders</p>
            <h5>54</h5>
          </div>
        </div>
        <div className="d-flex">
          <div className="circle rounded-circle center sales">
            <img src={sales} alt="" width={20} />
          </div>
          <div className="line mx-2 mt-2 small">
            <p className="text-nowrap">Sales this week</p>
            <h5>40</h5>
          </div>
        </div>
        <div className="d-flex">
          <div className="circle rounded-circle center products">
            <img src={products} alt="" width={20} />
          </div>
          <div className="line mx-2 mt-2 small">
            <p>Products</p>
            <h5>2K</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsCard;
