import React from "react";

const DateHeader = () => {
  const weekday = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const day = new Date().toLocaleDateString("en-US", { day: "2-digit" });
  const month = new Date().toLocaleDateString("en-US", { month: "long" });
  const year = new Date().toLocaleDateString("en-US", { year: "numeric" });
  return (
    <div>
      <span className="text-primary">{weekday}</span> {day} {month} {year}
    </div>
  );
};

export default DateHeader;
