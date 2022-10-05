import React from "react";
import { Link } from "react-router-dom";

const StaffOrders = (props) => {
  return (
    <Link
      to={
        !props.isAssigned
          ? "/staff-delivery/orders/assign"
          : "/staff-delivery/orders/order-id"
      }
    >
      <div className="d-flex justify-content-between mb-3">
        <div className="order">
          <h5 className="text-purple">#ORD-{props.orderId}</h5>

          <p className="small text-purple my-0">05/07/2022 1:29 PM</p>
        </div>
        {props.isAssigned === true && (
          <div className="order-img d-flex ">
            <div
              className="rounded-circle"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              <img
                src={props.image}
                alt=""
                width="100%"
                className="rounded-circle"
              />
            </div>
            <div className="order">
              <h5 className="text-purple text-center">{props.timeleft}'</h5>

              <p className="small text-purple my-0 text-center">11:29 PM</p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default StaffOrders;
