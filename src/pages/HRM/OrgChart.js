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
import down from "../../assets/icons/svg/down.svg";
import zoomicon from "../../assets/icons/svg/zoomplus.svg";
import zoomout from "../../assets/icons/svg/zoomminus.svg";

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
    )
      .catch((e) => {
        console.log(e);
      })
      .then((data) => {
        setData(data);
      });
  }, [true]);

  const [zoomValue, setZoomValue] = useState(0.7);
  const handleZoom = () => {};
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
              <BreadCrumb
                name="Org Chart"
                breadcrumb="/hrm/staff"
                hasStyles={true}
              />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
          </div>
          <div className="mt-4 mb-5 border mx-3">
            <div className="d-flex justify-content-md-between justify-content-center align-items-center mx-3 mt-3 flex-wrap">
              <div className="d-flex bg-white px-1 py-3 my-sm-0 my-2">
                <span className="mx-2" style={{ color: "#C1BBEB" }}>
                  Segment
                </span>
                <span className="text-nowrap" style={{ color: "#4D44B5" }}>
                  Whole Company
                </span>
                <img src={down} alt="" className="mx-1" />
              </div>
              <div className="d-flex">
                <button
                  className="btn bg-white text-nowrap"
                  style={{ color: "#4D44B5" }}
                >
                  Collapse All
                </button>
                <button className="btn bg-white mx-2">
                  <img src={zoomout} alt="" />
                </button>
                <button className="btn bg-white " onClick={handleZoom}>
                  <img src={zoomicon} alt="" />
                </button>
              </div>
            </div>
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
