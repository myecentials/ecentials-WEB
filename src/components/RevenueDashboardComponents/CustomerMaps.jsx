import React from "react";

const CustomerMaps = ({name, users, length}) => {
  return (
    <div className="d-flex flex-column mb-4">
      <div
        className="d-flex justify-content-between small mb-1"
        style={{ fontSize: "11px" }}
      >
        <span className="text-purple fw-bold">{name}</span>
        <span className="gray-text">{users}</span>
      </div>

      <div style={{backgroundColor:'#d5e0d8', width:'100%', height:'8px', borderRadius:'10px'}}>
         <div style={{backgroundColor:'#339AEF', width:length, height:'8px', borderRadius:'10px'}}>          
         </div>
      </div>
    </div>
  );
};

export default CustomerMaps;
