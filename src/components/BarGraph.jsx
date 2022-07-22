import React from "react";
import { Chat as ChatJs } from "chart.js";
import { Bar } from "react-chartjs-2";

const BarGraph = () => {
  return (
    <div
      className="chat d-flex justify-content-center align-items-center"
      style={{ borderRadius: "10px" }}
    >
      {/* <Bar
        data={{
          labels: ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"],
        }}
        width={20}
        height={20}
      /> */}
    </div>
  );
};

export default BarGraph;
