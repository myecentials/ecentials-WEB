import React, { useState, useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import BreadOutlined from "../../components/BreadOutlined";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { OrgChart } from "d3-org-chart";
import { OrgChartComponent } from "../../components/OrgData";
import * as d3 from "d3";

const OrganizationChart = () => {
  const [data, setData] = useState(null);
  let addNodeChildFunc = null;

  function addNode() {
    const node = {
      nodeId: "new Node",
      parentNodeId: "O-6066",
    };

    addNodeChildFunc(node);
  }

  function onNodeClick(nodeId) {
    // console.log("d3", d3.event);
    alert("clicked " + nodeId);
  }

  useEffect(() => {
    d3.csv(
      "https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv"
    ).then((data) => {
      setData(data);
    });
  }, [true]);
  return (
    <>
      <Helmet>
        <title>Org Chart</title>
      </Helmet>
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex mx-4">
              <BreadOutlined name="HRM" breadcrumb="/hrm/staff" />
              <BreadCrumb name="Org Chart" breadcrumb="/hrm/staff" />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
          </div>
          <div className="mt-4 mb-5 border mx-3">
            <OrgChartComponent
              setClick={(click) => (addNodeChildFunc = click)}
              onNodeClick={onNodeClick}
              data={data}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationChart;
