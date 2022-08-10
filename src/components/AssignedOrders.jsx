import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import orders from "../static/orders";
import Orders from "./Orders";
const AssignedOrder = (props) => {
  const [data, setData] = useState(orders);
  return (
    <>
      {data
        .filter(({ isAssigned }) => isAssigned)
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

export default AssignedOrder;
