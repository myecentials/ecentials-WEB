import React, { useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { Modal, ModalBody } from "reactstrap";


const WorkingHoursBox = ({ hours, onChange }) => {
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false); // State to control modal visibility

  const data = [
    { name: "Working Hours", value: Number(hours) },
    { name: "Remaining Hours", value: 24 - Number(hours) },
  ];
  const COLORS = ["#8884d8", "#eee"]; // Colors for pie chart
  
  const handleClick = () => {
    setClicked(!clicked);
    
  };

  const handlePeriodChange = (newHours) => {
    setOpen(false); // Close the modal
    onChange(`${newHours} hours`); // Trigger onChange event to update the hours
  };
  
  return (
    <div
      style={{
        width: "200px",
        height: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      <PieChart width={120} height={120}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={50}
          innerRadius={30}
          fill="#8884d8"
          dataKey="value"
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <p
        onClick={handleClick}
        style={{ textAlign: "center", margin: "2px 0", cursor: "pointer" }}
        className="text-deep"
      >
        {hours} hrs/day
      </p>
      <button
        type="button"
        className="btn btn-outline-primary btn-sm"
        onClick={() => setOpen(true)} // Open the modal on button click
        style={{
          textAlign: "center",
          margin: "1px auto",
          padding: "4px 16px",
          borderRadius: "5px",
          border: "1px solid #007bff",
          background: "#8884d8",
          color: "#fff",
          cursor: "pointer",
          transition: "background 0.3s, color 0.3s",
        }}
      >
        Change period
      </button>

      {/* Modal for selecting new hours */}
      <Modal isOpen={open} centered={true} toggle={() => setOpen(false)}>
        <ModalBody>
          <h5 className="text-deep">Select new period:</h5>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" ,width:"400px" }} className="d-grid col-6">
            {[...Array(24)].map((_, i) => (
              <button
                key={i + 1}
                type="button"
                className="btn btn-outline-primary btn-sm m-2"
                onClick={() => handlePeriodChange(i + 1)} // Pass selected number as new period
              >
                {i + 1}
              </button>
            ))}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default WorkingHoursBox;
