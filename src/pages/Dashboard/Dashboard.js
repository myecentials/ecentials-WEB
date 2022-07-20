import React from "react";
import ItemsCard from "../../components/ItemsCard";
import SearchBar from "../../components/SearchBar";

const Dashboard = () => {
  return (
    <div className="row">
      <div className="col-3 bg-warning left"></div>
      <div className="col-6 middle">
        <div className="d-flex mt-5 justify-content-between">
          <h4>Dashboard</h4>
          <SearchBar />
        </div>
      </div>
      <div className="col-3 bg-danger right"></div>
    </div>
  );
};

export default Dashboard;
