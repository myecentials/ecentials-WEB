import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drugs: sessionStorage.getItem("drugs")
    ? JSON.parse(sessionStorage.getItem("drugs"))
    : [],
  searchText: "",
  drugCategories: sessionStorage.getItem("categories")
    ? JSON.parse(sessionStorage.getItem("categories"))
    : [],
  checkoutList: sessionStorage.getItem("checkoutlist")
    ? JSON.parse(sessionStorage.getItem("checkoutlist"))
    : [],
  invoicetList: sessionStorage.getItem("invoiceList")
    ? sessionStorage.getItem("invoiceList")
    : [],
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    invoicePOS: {
      reducer(state, action) {
        state.drugs = action?.payload;
        sessionStorage.setItem("drugs", JSON.stringify(action?.payload));
      },
    },
    invoiceDrugCategories: {
      reducer(state, action) {
        state.drugCategories = action.payload;
        sessionStorage.setItem("categories", JSON.stringify(action?.payload));
      },
    },

    addCheckouts: {
      reducer(state, action) {
        state.checkoutList.push(action.payload);
        sessionStorage.setItem("checkoutlist", JSON.stringify(state.checkoutList));
      },
    },
    removeCheckouts: {
      reducer(state, action) {
        state.checkoutList = state.checkoutList.filter(item => item?._id !== action?.payload);
        sessionStorage.setItem("checkoutlist", JSON.stringify(state.checkoutList));
      },
    },

    invoiceList: {
      reducer(state, action) {
        state.invoicetList = action.payload;
        sessionStorage.setItem("invoiceList", JSON.stringify(action?.payload));
      },
    },
    resetInvoice: {
      reducer(state, action) {
        state.drugs = null ;
        state.drugCategories = null ;
        state.checkoutList = null ;
        state.invoicetList = null ;
        state.searchText = null ;
      },
    },
  },
});

export const { invoicePOS, invoiceList, addCheckouts, removeCheckouts,resetInvoice } = invoiceSlice.actions;

export const allDrugs = (state) => state.invoice.drugs;

export const checkedDrugs = state => state.invoice.checkoutList;

export const fetchAllInvoice = (state) => state.invoice.invoiceList;

export default invoiceSlice.reducer;
