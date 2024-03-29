import React from "react";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
// import NavIcons from "../../../components/NavIcons";
import { Helmet } from "react-helmet";
import PharmacyName from "../../../components/PharmacyName";

const ActivityLog = () => {
  return (
    <>
      <Helmet>
        <title>Activity Log</title>
      </Helmet>    
        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">Settings</h6>
              <DateHeader />
              <div className="d-flex flex-wrap ">
                <BreadCrumb
                  name="Report Dashboard"
                  breadcrumb="/pharmacy/reports/report-dashboard"
                  width="11.5rem"
                />
                <BreadCrumb
                  name="Activity Log"
                  breadcrumb=""
                  width="9rem"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="mt-5 mx-3 mb-5">
            <div className="card border-0">
              <div className="mx-3 my-3">
                <h6 className="text-deep mx-4">Today</h6>
                <ul className="mt-3">
                  <li className="list-disc  list">
                    <div className="small gray-text pb-2">
                      Monday, November 24 2022 09:26:08 AM
                    </div>
                    <div className="pb-4 text-deep">
                      <b className="">Andrews Opoku </b> signed in.
                    </div>
                  </li>
                  <li className="list-disc  list">
                    <div className="small gray-text pb-2">
                      Monday, November 24 2022 09:26:08 AM
                    </div>
                    <div className="pb-4 text-deep">
                      <b className="text-tomato">[WARNING] </b> Inventory is
                      below <b className="text-tomato">50%</b> please restock
                    </div>
                  </li>
                  <li className="list-disc  list">
                    <div className="small gray-text pb-2">
                      Monday, November 24 2022 09:26:08 AM
                    </div>
                    <div className="pb-4 text-deep">
                      <b className="">Prince Anumba </b> signed in.
                    </div>
                  </li>
                  <li className="list-disc  list">
                    <div className="small gray-text pb-2">
                      Monday, November 24 2022 09:26:08 AM
                    </div>
                    <div className="pb-4 text-deep">
                      <div className="activity_log">
                        <div className="col-sm-3">
                          <div className="card bg-user border-0 activity_log__card"></div>
                        </div>
                        <div className="col-sm-3">
                          <div className="card bg-user border-0 activity_log__card"></div>
                        </div>
                        <div className="col-sm-3">
                          <div className="card bg-user border-0 activity_log__card"></div>
                        </div>
                        <div className="col-sm-3">
                          <div className="card bg-user border-0 activity_log__card"></div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="list-disc  list">
                    <div className="small gray-text pb-2">
                      Monday, November 24 2022 09:26:08 AM
                    </div>
                    <div className="text-deep">
                      <b className="">Prince Anumba </b> signed in.
                    </div>
                  </li>
                  <li className="list-disc  list"></li>
                </ul>
                <div className="mt-5">
                  <h6 className="text-deep mx-4">Yesterday</h6>
                  <ul className="mt-3">
                    <li className="list-disc  list">
                      <div className="small gray-text pb-2">
                        Monday, November 24 2022 09:26:08 AM
                      </div>
                      <div className="pb-4 text-deep">
                        <b className="">Andrews Opoku </b> signed in.
                      </div>
                    </li>
                    <li className="list-disc  list">
                      <div className="small gray-text pb-2">
                        Monday, November 24 2022 09:26:08 AM
                      </div>
                      <div className="pb-4 text-deep">
                        <b className="">Andrews Opoku </b> signed in.
                      </div>
                    </li>
                    <li className="list-disc  list"></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default ActivityLog;
