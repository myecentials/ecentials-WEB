import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authReducer from "./features/authSlice/authSlice";
import authSlice from "./features/authSlice/authSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import invoiceReducer from "./features/invoice/invoiceSlice";
import productsReducer from "./features/products/productsSlice";
import ordersReducer from "./features/orders/ordersSlice";
import returnsReducer from "./features/returns/returnsSlice";
import hrmReducer from "./features/hrm/hrmSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    invoice: invoiceReducer,
    products: productsReducer,
    orders: ordersReducer,
    returns: returnsReducer,
    hrm: hrmReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
