import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders:0,
  products: 0,
  sales: 0,
  monthlySales: sessionStorage.getItem("monthlySales")
    ? JSON.parse(sessionStorage.getItem("monthlySales"))
    : [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getOrders: {
      reducer(state, action) {
        state.orders = action.payload;
      },
    },
    getProducts: {
      reducer(state, action) {
        state.products = action.payload;
      },
    },
    getSales: {
      reducer(state, action) {
        state.sales = action.payload;
      },
    },
    monthlySales: {
      reducer(state, action) {
        state.monthlySales = action?.payload;
        sessionStorage.setItem("monthlySales", JSON.stringify(action?.payload));
      },
    },
    resetDashboard: {
      reducer(state, action) {
        state.sales = 0;
        state.orders = 0;
        state.products = 0;
        state.monthlySales = [];
      },
    },
  },
});

export const { getOrders, getProducts, getSales, monthlySales,resetDashboard } =
  dashboardSlice.actions;

 export const productCount = (state) => state.dashboard.products ;
 export const salesCount = (state) => state.dashboard.sales ;
 export const ordersCount = (state) => state.dashboard.orders ;


export default dashboardSlice.reducer;
