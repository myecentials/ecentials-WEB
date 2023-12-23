import React, { useEffect } from "react";
// import { useState } from "react";
import ItemsCard from "../../components/ItemsCard";
// import SearchBar from "../../components/SearchBar";
// import notification from "../../assets/icons/svg/notification.svg";
// import settings from "../../assets/icons/svg/settings.svg";
// import circleperson from "../../assets/icons/svg/circleperson.svg";
// import continueicon from "../../assets/icons/svg/continue.svg";
import { Link } from "react-router-dom";
// import ActiveStaff from "../../components/ActiveStaff";
import CurvedChat from "../../components/CurvedChat";
import SideBar from "../../components/SideBar";
// import { Collapse } from "reactstrap";
// import DeliveryCalander from "../../components/DeliveryCalander";
// import BarGraph from "../../components/BarGraph";
// import Shipment from "../../components/Shipment";
import { Helmet } from "react-helmet";
import NavBar from "../../components/NavBar";
// import dayofWeek from "../../static/todaysDate";
// import dayOfMonth from "../../static/todaysDate";
// import curMonth from "../../static/todaysDate";
// import curYear from "../../static/todaysDate";
// import todaysDate from "../../static/todaysDate";
// import deliverycard from "../../assets/images/svgs/deliverycard.svg";
// import hrmcard from "../../assets/images/svgs/hrmcard.svg";
// import returncard from "../../assets/images/svgs/returncard.svg";
// import NavIcons from "../../components/NavIcons";
// import { BsSearch } from "react-icons/bs";
import Search from "../../components/Search";
import Header from "../../components/Header";
import PharmacyName from "../../components/PharmacyName";
// import axios from "../../config/api/axios";
import product from "../../assets/images/svgs/Finance.svg";
import hrm from "../../assets/images/svgs/hrm.svg";
import invoice from "../../assets/images/svgs/invoices.svg";
import orders from "../../assets/images/svgs/food.svg";
import returns from "../../assets/images/svgs/returns.svg";
import sales from "../../assets/images/svgs/sales.svg";
// import customers from "../../assets/icons/svg/customer.svg";
import DateHeader from "../../components/DateHeader";
// import HomeHeader from "../../components/HomeHeader";
import { useDispatch, useSelector } from "react-redux";
import { useGetMonthlySalesMutation } from "../../app/features/dashboard/dashboardApiSlice";
import { facility_id } from "../../app/features/authSlice/authSlice";
import { monthlySales } from "../../app/features/dashboard/dashboardSlice";

const Dashboard = () => {
  // const [isOpen, setIsOpen] = useState(false);

  // const handleClick = () => {
  //   setIsOpen(!isOpen);
  // };

  // var todays = new Date();

  // Get the start date of this week (Sunday)
  // var thisWeekStart = new Date(
  //   todays.getFullYear(),
  //   todays.getMonth(),
  //   todays.getDate() - todays.getDay()
  // );

  // Get the end date of this week (Saturday)
  // var thisWeekEnd = new Date(
  //   todays.getFullYear(),
  //   todays.getMonth(),
  //   todays.getDate() - todays.getDay() + 6
  // );

  // Get the start date of last week (Sunday)
  // var lastWeekStart = new Date(
  //   todays.getFullYear(),
  //   todays.getMonth(),
  //   todays.getDate() - todays.getDay() - 7
  // );

  // Get the end date of last week (Saturday)
  // var lastWeekEnd = new Date(
  //   todays.getFullYear(),
  //   todays.getMonth(),
  //   todays.getDate() - todays.getDay() - 1
  // );

  // Convert dates to strings in desired format (YYYY-MM-DD)
  // var thisWeekStartStr = thisWeekStart.toISOString().slice(0, 10);
  // var thisWeekEndStr = thisWeekEnd.toISOString().slice(0, 10);
  // var lastWeekStartStr = lastWeekStart.toISOString().slice(0, 10);
  // var lastWeekEndStr = lastWeekEnd.toISOString().slice(0, 10);

  const dispatch = useDispatch();
  const [monthlysales] = useGetMonthlySalesMutation();
  const facilityid = useSelector(facility_id);
  useEffect(() => {
    try{
      const fetchData = async () => {
        const results = await monthlysales(facilityid).unwrap();
        console.log(results);
        dispatch(monthlySales([...results.data]));
        fetchData();
      };
    }catch(error){
      console.log(error)
    }

  }, []);

  const salespermonth = useSelector((state) => state.dashboard.monthlySales);
  // console.log(salespermonth);

  // Output the dates
  // console.log("This week: " + thisWeekStartStr + " to " + thisWeekEndStr);
  // console.log("Last week: " + lastWeekStartStr + " to " + lastWeekEndStr);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
        {/* MIDDLE */}
        <div className="col-md-9 px-3 middle">
          <div className="d-block d-md-flex mt-md-4 mt-2 justify-content-between align-items-center">
            <div>
              <h5 className="mt-2 text-deep">Dashboard</h5>
              <DateHeader />
              <div className="d-md-none">
                <Search />
              </div>
            </div>
            <PharmacyName />
          </div>

          <ItemsCard />

          <div className="cards_grid__container  mt-3">
            <Link
              to="/products"
              className="cards_grid d-flex justify-content-center align-items-center bg-white"
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  backgroundColor: "#F0F5FB",
                  width: "3rem",
                  height: "3rem",
                }}
              >
                <div>
                  <img src={product} width={25} alt="" />
                </div>
              </div>
              <div className="text-deep mx-2">Products</div>
            </Link>
            <Link
              to="/orders"
              className="cards_grid d-flex justify-content-center align-items-center bg-white"
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  backgroundColor: "#F0F5FB",
                  width: "3rem",
                  height: "3rem",
                }}
              >
                <div>
                  <img src={orders} width={25} alt="" />
                </div>
              </div>
              <div className="text-deep mx-2">Orders</div>
            </Link>
            <Link
              to="/invoices/invoice-pos"
              className="cards_grid d-flex justify-content-center align-items-center bg-white"
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  backgroundColor: "#F0F5FB",
                  width: "3rem",
                  height: "3rem",
                }}
              >
                <div>
                  <img src={invoice} width={25} alt="" />
                </div>
              </div>
              <div className="text-deep mx-2">Invoice</div>
            </Link>
            <Link
              to="/sales"
              className="cards_grid d-flex justify-content-center align-items-center bg-white"
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  backgroundColor: "#F0F5FB",
                  width: "3rem",
                  height: "3rem",
                }}
              >
                <div>
                  <img src={sales} width={25} alt="" />
                </div>
              </div>
              <div className="text-deep mx-2">Sales</div>
            </Link>
            <Link
              to="/returns/add-return"
              className="cards_grid d-flex justify-content-center align-items-center bg-white"
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  backgroundColor: "#F0F5FB",
                  width: "3rem",
                  height: "3rem",
                }}
              >
                <div>
                  <img src={returns} width={25} alt="" />
                </div>
              </div>
              <div className="text-deep mx-2">Return</div>
            </Link>
            <Link
              to="/hrm/staff"
              className="cards_grid d-flex justify-content-center align-items-center bg-white"
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  backgroundColor: "#F0F5FB",
                  width: "3rem",
                  height: "3rem",
                }}
              >
                <div>
                  <img src={hrm} width={25} alt="" />
                </div>
              </div>
              <div className="text-deep mx-2">HRM</div>
            </Link>
          </div>

          <div className="my-4 bg-white rounded">
            <div className=" mx-4 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p
                    className="my-0 py-0 text-secondary"
                    style={{ fontSize: "12px" }}
                  >
                    OVERVIEW
                  </p>
                  <h6 className="text-deep my-0 py-0">Sales graph</h6>
                </div>

                <div>
                  <p
                    className="my-0 py-0 text-secondary"
                    style={{ fontSize: "12px" }}
                  >
                    CURRENT MONTH
                  </p>
                  <h6 className="text-deep my-0 py-0">
                    {new Date().toLocaleDateString("en-US", { month: "long" })}
                  </h6>
                </div>
              </div>
            </div>
            <hr className="mt-0 py-0" />
            <CurvedChat data={salespermonth} />
          </div>
          {/* <div className="row my-3 gy-lg-0 gy-3 reverse">
              <div className="col-lg-6">
                <DeliveryCalander />
              </div>
              <div className="col-lg-6 ">
                <BarGraph />
              </div>
            </div> */}

          {/* <Shipment name="Awaiting Shipments" /> */}
        </div>

        {/* RIGHT */}
    </>
  );
};

export default Dashboard;
