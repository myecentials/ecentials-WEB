import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: sessionStorage.getItem("customers")
    ? JSON.parse(sessionStorage.getItem("customers"))
    : [],
    selectedCustomer: null,
};

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: 
  {
    customerList: 
    {
      reducer(state, action) 
      {
        state.customers = action?.payload;
        sessionStorage.setItem("customers", JSON.stringify(action?.payload));
      },
    },
    selectCustomer: 
    {
      reducer(state, action)
      {
        state.selectedCustomer = action.payload;
      },
    },
    resetCustomers: (state) => {
      state.selectedCustomer = null;
      state.customers = null;
    },

  },
});

export const { customerList,selectCustomer ,resetCustomers } = customerSlice.actions;

export const getSelectedCustomer = (state) => state.customers.selectedCustomer;


export default customerSlice.reducer;
