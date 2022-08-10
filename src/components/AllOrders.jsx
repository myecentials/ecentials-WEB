import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import orders from "../static/orders";
import Orders from "./Orders";

const AllOrders = (props) => {
  const [data, setData] = useState(orders);
  return (
    <>
      {data.map(({ orderId, image, isAssigned, timeleft }) => (
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
