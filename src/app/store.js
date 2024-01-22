// import { configureStore} from "@reduxjs/toolkit";
// import { apiSlice } from "./features/api/apiSlice";
// import authReducer from "./features/authSlice/authSlice";
// import dashboardReducer from "./features/dashboard/dashboardSlice";
// import invoiceReducer from "./features/invoice/invoiceSlice";
// import productsReducer from "./features/products/productsSlice";
// import ordersReducer from "./features/orders/ordersSlice";
// import returnsReducer from "./features/returns/returnsSlice";
// import hrmReducer from "./features/hrm/hrmSlice";
// import customersReducer from "./features/customers/customerSlice";
// import wholesalerReducer from "./features/wholesaler/wholesalerSlice";
// import settingsReducer from "./features/settings/settingsSlice";

// const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     auth: authReducer,
//     dashboard: dashboardReducer,
//     invoice: invoiceReducer,
//     products: productsReducer,
//     orders: ordersReducer,
//     returns: returnsReducer,
//     hrm: hrmReducer,
//     customers: customersReducer,
//     wholesaler: wholesalerReducer,
//     settings: settingsReducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
// });

// export default store;

import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { apiSlice } from './features/api/apiSlice';
import authReducer from './features/authSlice/authSlice';
import dashboardReducer from './features/dashboard/dashboardSlice';
import invoiceReducer from './features/invoice/invoiceSlice';
import productsReducer from './features/products/productsSlice';
import ordersReducer from './features/orders/ordersSlice';
import returnsReducer from './features/returns/returnsSlice';
import hrmReducer from './features/hrm/hrmSlice';
import customersReducer from './features/customers/customerSlice';
import wholesalerReducer from './features/wholesaler/wholesalerSlice';
import settingsReducer from './features/settings/settingsSlice';
import reportReducer from './features/report/reportSlice'

const persistConfig = {
  key: 'root',
  storage: storageSession,
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
    serialize: false, // Prevent direct access in the developer tools
  deserialize: false, // Prevent direct access in the developer tools
 
};

const rootReducer =combineReducers( {
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  invoice: invoiceReducer,
  products: productsReducer,
  orders: ordersReducer,
  returns: returnsReducer,
  hrm: hrmReducer,
  customers: customersReducer,
  wholesaler: wholesalerReducer,
  settings: settingsReducer,
  reports : reportReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export default store;
