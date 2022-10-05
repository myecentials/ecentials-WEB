import React from "react";
import orders from "../../static/orders";
import Orders from "../Orders";
import StaffOrders from "./StaffOrders";

const StaffAllOrders = (props) => {
  return (
    <>
      {orders.map(({ orderId, image, isAssigned, timeleft }) => (
        <StaffOrders
          orderId={orderId}
          image={image}
          isAssigned={isAssigned}
          timeleft={timeleft}
        />
      ))}
    </>
  );
};

export default StaffAllOrders;
