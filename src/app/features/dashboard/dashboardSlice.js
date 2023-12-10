import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: sessionStorage.getItem("ordersValue")
    ? sessionStorage.getItem("ordersValue")
    : null,
  products: sessionStorage.getItem("productsValue")
    ? sessionStorage.getItem("productsValue")
    : null,
  sales: sessionStorage.getItem("salesValue")
    ? sessionStorage.getItem("salesValue")
    : null,
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
        state.sales = [];
        state.orders = [];
        state.products = [];
        state.monthlySales = [];
      },
    },
  },
});

export const { getOrders, getProducts, getSales, monthlySales,resetDashboard } =
  dashboardSlice.actions;

 export const productCount = (state) => state.dashboard.products ;


export default dashboardSlice.reducer;
