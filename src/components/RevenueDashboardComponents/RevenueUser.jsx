import React, { useState } from "react";
import MoreMenu from "./MoreMenu";
import RevenueCardBottom from "./RevenueCardBottom";
import RevenueCardHeader from "./RevenueCardHeader";

const RevenueUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="card bg-white border-0 report_container__height">
      <RevenueCardHeader
        header="User"
        subheader="Rol Management"
        handleClick={handleClick}
      />
      <MoreMenu isOpen={isOpen} />
      <div className="report_revenue__card_overflow">
        <div>
          <div className="mx-3 mb-2">
            <div className="row small" style={{ fontSize: "11px" }}>
              <div className="col-4">Andrews</div>
              <div className="col-4">
                <div
                  className="text-center p-1"
                  style={{ backgroundColor: "#D3F9D8", color: "#51CD65" }}
                >
                  Admin
                </div>
              </div>
              <div className="col-4 text-nowrap">2019/06/24</div>
            </div>
          </div>
          <div>
            <ul className="revenue_user">
              <li className="revenue_user__list">Manage User Accounts</li>
              <li className="revenue_user__list">Edit Company Info</li>
              <li className="revenue_user__list">See Analytics</li>
              <li className="revenue_user__list">Export Data</li>
            </ul>
            <hr className="bg-user mt-0" />
          </div>
        </div>
        <div>
          <div className="mx-3 mb-2">
            <div className="row small" style={{ fontSize: "11px" }}>
              <div className="col-4">Andrews</div>
              <div className="col-4">
                <div
                  className="text-center p-1"
                  style={{ backgroundColor: "#D3F9D8", color: "#51CD65" }}
                >
                  Admin
                </div>
              </div>
              <div className="col-4 text-nowrap">2019/06/24</div>
            </div>
          </div>
          <div>
            <ul className="revenue_user">
              <li className="revenue_user__list">Manage User Accounts</li>
              <li className="revenue_user__list">Edit Company Info</li>
              <li className="revenue_user__list">See Analytics</li>
              <li className="revenue_user__list">Export Data</li>
            </ul>
            <hr className="bg-user mt-0" />
          </div>
        </div>
        <div>
          <div className="mx-3 mb-2">
            <div className="row small" style={{ fontSize: "11px" }}>
              <div className="col-4">Andrews</div>
              <div className="col-4">
                <div
                  className="text-center p-1"
                  style={{ backgroundColor: "#D3F9D8", color: "#51CD65" }}
                >
                  Admin
                </div>
              </div>
              <div className="col-4 text-nowrap">2019/06/24</div>
            </div>
          </div>
          <div>
            <ul className="revenue_user">
              <li className="revenue_user__list">Manage User Accounts</li>
              <li className="revenue_user__list">Edit Company Info</li>
              <li className="revenue_user__list">See Analytics</li>
              <li className="revenue_user__list">Export Data</li>
            </ul>
            <hr className="bg-user mt-0" />
          </div>
        </div>
      </div>
      <RevenueCardBottom content="SEE ALL USERS" link="" />
    </div>
  );
};

export default RevenueUser;
