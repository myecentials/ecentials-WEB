import { createSlice } from "@reduxjs/toolkit/dist";

const initialState = {
  orders: sessionStorage.getItem("orders")
    ? JSON.parse(sessionStorage.getItem("orders"))
    : [],
  prescriptions: sessionStorage.getItem("prescriptions")
    ? JSON.parse(sessionStorage.getItem("prescriptions"))
    : [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    allOrders: {
      reducer(state, action) {
        state.orders = action?.payload;
        sessionStorage.setItem("orders", JSON.stringify(action?.payload));
      },
    },
    allPrescriptions: {
      reducer(state, action) {
        state.prescriptions = action?.payload;
        sessionStorage.setItem(
          "prescriptions",
          JSON.stringify(action?.payload)
        );
      },
    },
    resetOrders: {
      reducer(state, action) {
        state.orders = null;
        state.prescriptions = null;
      },
    },
  },
});

export const { allOrders, allPrescriptions ,resetOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
