import React from "react";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
// import NavIcons from "../../../components/NavIcons";
// import menulist from "../../../assets/icons/svg/menulist.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../../components/CustomeNav";
import calander from "../../../assets/icons/svg/calendar.svg";
import { BsChevronDown } from "react-icons/bs";
import RevenueCardHeader from "../../../components/RevenueDashboardComponents/RevenueCardHeader";
import InventoryPieChart from "../../../components/RevenueDashboardComponents/InventoryPieChart";
import InventoryReportHeader from "../../../components/RevenueDashboardComponents/InventoryReportHeader";
import InventoryLineChart from "../../../components/RevenueDashboardComponents/InventoryLineChart";
import RevenueCardBottom from "../../../components/RevenueDashboardComponents/RevenueCardBottom";
import InventoryReportBottom from "../../../components/RevenueDashboardComponents/InventoryReportBottom";
// import InventtoryBarChart from "../../../components/RevenueDashboardComponents/InventoryBarChart";
import MoreMenu from "../../../components/RevenueDashboardComponents/MoreMenu";
import { useState } from "react";
import InventoryReportTable from "../../../components/RevenueDashboardComponents/InventoryReportTable";
// import DateMenu from "../../../components/RevenueDashboardComponents/DateMenu";
// import { Collapse } from "reactstrap";
// import { Calendar } from "react-calendar";
import Header from "../../../components/Header";
import PharmacyName from "../../../components/PharmacyName";

const InventoryReport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title>Add Categories</title>
      </Helmet>
        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">Inventory</h6>
              <DateHeader />
              <div className="d-flex flex-wrap">
                <BreadCrumb
                  name="Report Dashboard"
                  breadcrumb="/pharmacy/reports/report-dashboard"
                  width="11.5rem"
                />
                <BreadCrumb
                  name="Inventory Report"
                  breadcrumb=""
                  width="11rem"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="mt-4 mx-md-3 mx-2">
            <div className="mt-5">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="text-deep">Inventory Report</h6>
                <button className="btn shadow-sm bg-white border-0 small d-flex justify-content-center align-items-center">
                  <img src={calander} alt="" width={15} />
                  <span className="mx-2">12 Oct 2022</span>
                  <BsChevronDown />
                </button>
              </div>
            </div>
          </div>






          <div className="mt-4 mx-3">
            <div className="row gy-lg-0 gy-3">


              {/* <div className="col-lg-4 ">
                <div>
                  <div className="inventory_report__card shadow">
                    <InventoryReportHeader header="Inventory" />

                    <div className="inventory_report__height">
                      <InventoryLineChart />
                    </div>
                    <InventoryReportBottom
                      text="CHART TEXT"
                      color1="#6C60FF"
                      data1="PURCHASE"
                      color2="#CE2A96"
                      data2="SALES"
                    />
                  </div>
                </div>
              </div> */}




              <div className="col-lg-6 ">
                <div className="inventory_report__card shadow">
                  <RevenueCardHeader
                    header="Inventory Overview"
                    subheader="Category"
                    handleClick={handleClick}
                  />
                  <MoreMenu isOpen={isOpen} />
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="inventory_report__height">
                      <InventoryPieChart />
                    </div>
                  </div>
                  <InventoryReportBottom />
                </div>
              </div>
              {/* <div className="col-lg-4 ">
                <div className="inventory_report__card shadow">
                  <InventoryReportHeader header="Profit & Loss" />
                  <div className="inventory_report__height">
                    <InventtoryBarChart />
                  </div>
                  <InventoryReportBottom
                    text="CHART TEXT"
                    data1="PROFIT"
                    data2="LOSS"
                    color1="#4BFF5D"
                    color2="#A694FD"
                  />
                </div>
              </div> */}
            </div>
          </div>
        
          <div className="mx-3 mb-5">
            <InventoryReportTable />
          </div>
        </div>
    </>
  );
};

export default InventoryReport;
