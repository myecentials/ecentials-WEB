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
  },
});

export const { getOrders, getProducts, getSales } = dashboardSlice.actions;

export default dashboardSlice.reducer;
