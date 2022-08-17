import React from "react";
import orders from "../static/orders";
import Orders from "./Orders";

const UnassignedOrder = (props) => {
  return (
    <>
      {orders
        .filter(({ isAssigned }) => !isAssigned)
        .map(({ orderId, image, isAssigned, timeleft }) => (
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

export default UnassignedOrder;
