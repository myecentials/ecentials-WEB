import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drugs: sessionStorage.getItem("drugs")
    ? JSON.parse(sessionStorage.getItem("drugs"))
    : [],
  searchText: "",
  drugCategories: [],
  checkoutList: sessionStorage.getItem("checkoutlist")
    ? sessionStorage.getItem("checkoutlist")
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
      },
    },

    addCheckouts: {
      reducer(state, action) {
        state.checkoutList.push(action.payload);
      },
    },

    invoiceList: {
      reducer(state, action) {
        state.invoicetList = action.payload;
        sessionStorage.setItem("invoiceList", JSON.stringify(action?.payload));
      },
    },
  },
});

export const { invoicePOS, invoiceList } = invoiceSlice.actions;

export const allDrugs = (state) => state.invoice.drugs;

export default invoiceSlice.reducer;
