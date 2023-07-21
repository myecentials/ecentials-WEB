import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: sessionStorage.getItem("auth")
    ? JSON.parse(sessionStorage.getItem("auth"))
    : null,
  hasPharmacy: sessionStorage.getItem("storeInfo")
    ? JSON.parse(sessionStorage.getItem("storeInfo"))
    : null,
  data: sessionStorage.getItem("pharmacyInfo")
    ? sessionStorage.getItem("pharmacyInfo")
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: {
      reducer(state, action) {
        state.results = action.payload;
      },
    },
    setHasPharmacy: {
      reducer(state, action) {
        state.hasPharmacy = action.payload;
      },
    },
    pharmacyInfo: {
      reducer(state, action) {
        state.data = action.payload;
      },
    },
    logout: {
      reducer(state, action) {
        state.results = null;
      },
    },
  },
});

export const { setCredentials, setHasPharmacy, pharmacyInfo, setLogout } =
  authSlice.actions;

export const setToken = (state) => state?.auth?.results?.token;

export const userInfo = (state) => state?.auth;

export const storeinfo = (state) => state?.auth?.hasPharmacy;

export const pharmacyinfo = (state) => state?.auth?.data;

export const facility_id = (state) => state?.auth?.hasPharmacy?.data[0]?._id;

export default authSlice.reducer;
