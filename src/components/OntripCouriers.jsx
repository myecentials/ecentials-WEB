import React from "react";
import orders from "../static/orders";
import Couriers from "./Couriers";
const OntripCouriers = () => {
  return (
    <>
      {orders
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
