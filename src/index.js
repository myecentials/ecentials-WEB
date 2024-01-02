import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import AuthProvider from "./ContextAPI/AuthProvider";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './app/store';
// import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
// import { apiSlice } from "./app/features/api/apiSlice";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthProvider>
        <App />
      </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
