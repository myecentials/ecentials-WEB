import React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DeliveryCalander = () => {
  const [value, onChange] = useState(new Date());
  const handleChange = () => {
    onChange(value);
  };
  return (
    <div className="chat" style={{ borderRadius: "10px" }}>
      <Calendar
        calendarType="US"
        onChange={onChange}
        value={value}
        nextLabel=">"
        next2Label=">>"
        prevLabel="<"
        prev2Label="<<"
        className="w-100 border-0 rounded-pill"
      />
    </div>
  );
};

export default DeliveryCalander;
