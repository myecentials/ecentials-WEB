import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import menulist from "../../assets/icons/svg/menulist.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import expand from "../../assets/icons/svg/expand.svg";
import hvert from "../../assets/icons/svg/more_vertical.svg";
import DateMenu from "../../components/RevenueDashboardComponents/DateMenu";
import ReportRevenueCard from "../../components/RevenueDashboardComponents/ReportRevenueCard";
import ReportInventoryCard from "../../components/RevenueDashboardComponents/ReportInventoryCard";
import ReportActivityMonitorCard from "../../components/RevenueDashboardComponents/ReportActivityMonitorCard";
import RevenueDeliveryCard from "../../components/RevenueDashboardComponents/RevenueDeliveryCard";
const ReportDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Report Dashboard</title>
      </Helmet>
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex mx-4">
              <BreadCrumb
                name="Report Dashboard"
                breadcrumb=""
                width="11.5rem"
                hasStyles={true}
              />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
          </div>

          <div className="mt-4 mx-md-3 mx-2">
            <div className="d-flex justify-content-end align-items-end">
              <DateMenu />
            </div>
            <div className="row mt-4">
              <div className="col-6">
                <ReportRevenueCard />
              </div>
              <div className="col-3">
                <ReportInventoryCard />
              </div>
              <div className="col-3">
                <ReportActivityMonitorCard />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-3">
                <RevenueDeliveryCard />
              </div>
              <div className="col-3">
                <div className="card bg-white border-0 report_container__height"></div>
              </div>
              <div className="col-6">
                <div className="card bg-white border-0 report_container__height">
                  <div className="mx-3">
                    <div className="d-flex justify-content-between pt-3 pb-2 align-items-center">
                      <div className="d-flex">
                        <div className="circle rounded-circle bg-light">
                          <img src={expand} alt="" />
                        </div>
                        <div className="mx-2 small">
                          <div className="text-purple">
                            <b>Revenue</b>
                          </div>
                          <div className="text-gray">Report Center</div>
                        </div>
                      </div>
                      <button className="border-0 btn">
                        <img src={hvert} alt="" />
                      </button>
                    </div>
                  </div>
                  <hr className="mt-1" />
                </div>
              </div>
            </div>
            <div className="row mt-4 mb-4">
              <div className="col-3">
                <div className="card bg-white border-0 report_container__height"></div>
              </div>
              <div className="col-3"></div>
              <div className="col-3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportDashboard;
