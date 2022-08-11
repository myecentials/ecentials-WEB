import React from "react";
import orders from "../static/orders";
import { useState } from "react";
import Couriers from "./Couriers";
const OntripCouriers = () => {
  const [data, setData] = useState(orders);

  return (
    <>
      {data
        .filter(({ isAssigned }) => isAssigned)
        .map(({ name, image, driverId, timeleft, isAssigned }) => (
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

export default OntripCouriers;
