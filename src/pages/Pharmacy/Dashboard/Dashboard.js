import React, { useEffect } from "react";
import ItemsCard from "../../../components/Pharmacy/DAshboard/ItemsCard";
import { Link } from "react-router-dom";
import CurvedChat from "../../../components/Pharmacy/DAshboard/CurvedChat";
import { Helmet } from "react-helmet";
import Search from "../../../components/Search";
import PharmacyName from "../../../components/PharmacyName";
import product from "../../../assets/images/svgs/Finance.svg";
import hrm from "../../../assets/images/svgs/hrm.svg";
import invoice from "../../../assets/images/svgs/invoices.svg";
import orders from "../../../assets/images/svgs/food.svg";
import returns from "../../../assets/images/svgs/returns.svg";
import sales from "../../../assets/images/svgs/sales.svg";
import DateHeader from "../../../components/DateHeader";
import { useDispatch, useSelector } from "react-redux";
import { useGetMonthlySalesMutation } from "../../../app/features/dashboard/dashboardApiSlice";
import { facility_id, pharmacyInfo } from "../../../app/features/authSlice/authSlice";
import { monthlySales } from "../../../app/features/dashboard/dashboardSlice";
import {
  useGetSignupsQuery,
} from "../../../app/features/authSlice/userApiSlice";
import { useGetPharmacyInfoMutation } from "../../../app/features/authSlice/userApiSlice";


import { Toaster,toast } from 'react-hot-toast';
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
  const { data: mydata } = useGetSignupsQuery();
  const [getinfo] = useGetPharmacyInfoMutation();

  useEffect(() => {
   
    const fetchData = async () => {
      try{
        const results = await getinfo(facilityid).unwrap();
        dispatch(pharmacyInfo(results?.data));
        sessionStorage.setItem("pharmacyInfo", JSON.stringify(results?.data));
      }catch (error) {
        console.log(error)
        if (error.status === "FETCH_ERROR")
				toast.error("Network Error ");
      }
      
    };
    fetchData();
  }, [dispatch, facilityid, getinfo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await mydata;

        // setIsPharmacy(res.has_pharmacy);

        // dispatch(setHasPharmacy({ ...res }));

        sessionStorage.setItem("storeInfo", JSON.stringify(res));

        // Process the response data here
      } catch (error) {
        // Handle any errors that occur during the request
      }
    };

    fetchData();
  }, [dispatch, mydata]);

  useEffect(() => {
    const fetchData = async () => {
    try{
        const results = await monthlysales(facilityid).unwrap();
       console.log( "Monthly sales",results);
        dispatch(monthlySales([...results?.data]));
    }catch(error){
      console.log(error)
    }
  }
  fetchData();
},[dispatch, facilityid, monthlysales]);

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
      <Toaster/>
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
              to="/pharmacy/products"
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
              to="/pharmacy/orders"
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
              to="/pharmacy/invoices/invoice-pos"
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
              to="/pharmacy/sales"
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
              to="/pharmacy/returns/add-return"
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
              to="/pharmacy/hrm/staff"
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
