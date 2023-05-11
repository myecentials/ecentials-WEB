import React from "react";
import orders from "../static/orders";
import Orders from "./Orders";

const AllOrders = (props) => {
  return (
    <>
      {orders.map(({ orderId, image, isAssigned, timeleft }) => (
        <Orders
          orderId={orderId}
          image={image}
          isAssigned={isAssigned}
          timeleft={timeleft}
        />
      ))}
    </>
  );
};

export default AllOrders;
