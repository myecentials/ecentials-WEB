import React from "react";
import orders from "../../static/orders";
import Couriers from "../Couriers";

const StaffAllCouriers = () => {
  return (
    <>
      {orders.map(({ name, image, driverId, timeleft, isAssigned }) => (
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

export default StaffAllCouriers;
