import React, { useState, useEffect } from "react";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
import NavIcons from "../../../components/NavIcons";
import SideBar from "../../../components/SideBar";
import BreadOutlined from "../../../components/BreadOutlined";
import { Helmet } from "react-helmet";
import CustomeNav from "../../../components/CustomeNav";
import { OrgChartComponent } from "../../../components/OrgData";
import * as d3 from "d3";
import down from "../../../assets/icons/svg/down.svg";
import zoomicon from "../../../assets/icons/svg/zoomplus.svg";
import zoomout from "../../../assets/icons/svg/zoomminus.svg";
import Header from "../../../components/Header";
import axios from "../../../config/api/axios";
import PharmacyName from "../../../components/PharmacyName";
import { useSelector } from 'react-redux';
import { facility_id ,setToken } from "../../../app/features/authSlice/authSlice";

const OrganizationChart = () => {
  const [data, setData] = useState(null);
  const [mydata, setMyData] = useState({});
  let addNodeChildFunc = null;
  const token = useSelector(setToken)
const facilityId = useSelector(facility_id)

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
    axios
      .post(
        "/pharmacy/staff/fetch-pharmacy-staff",
        { facility_id : facilityId },
        { headers: { "auth-token": token } }
      )
      .then((res) => {
        console.log(res.data.data);
        setMyData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    d3.json(JSON.stringify(mydata))
      .catch((e) => {
        console.log(e);
      })
      .then((data) => {
        setData(data);
        console.log(mydata);
      });
  }, [true]);

  const handleZoom = () => {};

  return (
    <>
      <Helmet>
        <title>Org Chart</title>
      </Helmet>

        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">Settings</h6>
              <DateHeader />
              <div className="d-flex">
                <BreadOutlined name="HRM" breadcrumb="/hrm/staff" />
                <BreadCrumb
                  name="Org Chart"
                  breadcrumb="/hrm/staff"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
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
    </>
  );
};

export default OrganizationChart;
