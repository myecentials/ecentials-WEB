import React from "react";
import orders from "../static/orders";
import { useState } from "react";
import Couriers from "./Couriers";

const AllCouriers = () => {
  const [data, setData] = useState(orders);

  return (
    <>
      {data.map(({ name, image, driverId, timeleft, isAssigned }) => (
        <Couriers
          name={name}
          image={image}
          driverId={driverId}
          timeleft={timeleft}
          isAssigned={isAssigned}
        />
      ))}
    </>
  );
};

export default AllCouriers;
