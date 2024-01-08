import { createSlice } from "@reduxjs/toolkit/dist";

const initialState = {
  orders: sessionStorage.getItem("orders")
    ? JSON.parse(sessionStorage.getItem("orders"))
    : [],
  prescriptions: sessionStorage.getItem("prescriptions")
    ? JSON.parse(sessionStorage.getItem("prescriptions"))
    : [],
  singlePrescription:[],
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
    setSinglePrescription: {
      reducer(state, action) {
        state.singlePrescription = action?.payload;
      },
    },
    resetOrders: {
      reducer(state, action) {
        state.orders = [];
        state.prescriptions = [];
        state.singlePrescription = [];
      },
    },
  },
});

export const { allOrders, allPrescriptions ,resetOrders,setSinglePrescription } = ordersSlice.actions;
export const getSinglePrescription = state => state?.orders?.singlePrescription; 
export default ordersSlice.reducer;
