import React from "react";
import "../../../assets/styles/dashboard.css";
import orders from "../../../assets/icons/svg/orders.svg";
import sales from "../../../assets/icons/svg/sales.svg";
import products from "../../../assets/icons/svg/products.svg";
import CountUp from "react-countup";
// import { useState } from "react";
import { useEffect } from "react";
// import axios from "../../../config/api/axios";
import {
  useGetOrdersMutation,
  useGetProductsMutation,
  useGetSalesMutation,
} from "../../../app/features/dashboard/dashboardApiSlice";
import { facility_id } from "../../../app/features/authSlice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrders,
  setProducts,
  setSales,
} from "../../../app/features/dashboard/dashboardSlice";

import { productCount,salesCount,ordersCount } from "../../../app/features/dashboard/dashboardSlice";

const ItemsCard = () => {
  // const [, setProducts] = useState(0);
  // const [, setSales] = useState(0);
  const [orderValue] = useGetOrdersMutation();
  const [productsValue] = useGetProductsMutation();
  const [salesValue] = useGetSalesMutation();
  const facilityid = useSelector(facility_id);
  const productVal = useSelector(productCount);
  const salesVal = useSelector(salesCount);
  const ordersVal = useSelector(ordersCount);


 

  // Convert dates to strings in desired format (YYYY-MM-DD)
 
  const dispatch = useDispatch();
  // const authData = JSON.parse(sessionStorage.getItem("auth"));
  //   const authToken = authData ? authData.token : null;

  // Orders
  useEffect(() => {
    
    const fetchData = async () => {
      const todays = new Date();

       // Get the start date of this week (Sunday)
  const thisWeekStart = new Date(
    todays.getFullYear(),
    todays.getMonth(),
    todays.getDate() - todays.getDay()
  );
      try {
        const orders = await orderValue(facilityid).unwrap();
        const products = await productsValue(facilityid).unwrap();
        const sales = await salesValue(facilityid, thisWeekStart).unwrap();
        console.log(orders);
        console.log(products);
        console.log(sales);
        dispatch(setProducts(products?.data));
        dispatch(setOrders(orders?.data));
        dispatch(setSales(sales?.data?.totalSales));


        // sessionStorage.setItem("productsValue", products?.data);
        // sessionStorage.setItem("ordersValue", orders?.data);
        // sessionStorage.setItem("salesValue", sales?.data?.totalSales);

        // Process the response data here
      } catch (error) {
        
        // Handle any errors that occur during the request
      }
    };

    fetchData();
  }, [dispatch, facilityid, orderValue, productsValue, salesValue]);

  

  // const pharmOrders = useSelector((state) => state.dashboard.orders);
  // const pharmProducts = useSelector((state) => state.dashboard.products);
  // const pharmSales = useSelector((state) => state.dashboard.sales);

  return (
    <div className="mt-4 itemcard py-3 px-2" style={{ borderRadius: "10px" }}>
      <div className="border-0 d-grid ">
        <div className="d-flex ">
          <div className="circle rounded-circle center orders-st">
            <img src={orders} alt="" width={20} />
          </div>
          <div className="line mx-2 mt-2 small">
            <p>Orders</p>
            <h5 data-testid = "orders-count">
              <CountUp
                start={0}
                end={ordersVal}
                className="bold_font"
                duration={1}
              />
            </h5>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="circle rounded-circle center products">
            <img src={products} alt="" width={20} />
          </div>
          <div className="line mx-2 mt-2 small">
            <p>Products</p>
            <h5 data-testid = "products-count">
              <CountUp
                start={0}
                end={productVal}
                className="bold_font"
                duration={1}
                // suffix="K"
              />
            </h5>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <div className="circle rounded-circle center sales">
            <img src={sales} alt="" width={20} />
          </div>
          <div className="line mx-2 mt-2 small">
            <p className="text-nowrap">Sales this week</p>
            <h5 data-testid = "sales-count">
              GH₵{" "}
              <CountUp
                start={0}
                end={salesVal}
                className="bold_font"
                duration={1}
              />
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsCard;
