import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: sessionStorage.getItem("customers")
    ? JSON.parse(sessionStorage.getItem("customers"))
    : [],
};

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    customerList: {
      reducer(state, action) {
        state.customers = action?.payload;
        sessionStorage.setItem("customers", JSON.stringify(action?.payload));
      },
    },
  },
});

export const { customerList } = customerSlice.actions;

export default customerSlice.reducer;
