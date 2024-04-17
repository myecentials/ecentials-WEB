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
        sessionStorage.setItem("auth", JSON.stringify(action?.payload));
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
    resetAuth: {
      reducer(state, action) {
        state.results = [];
        state.hasPharmacy = [];
        state.data=[];
      },
    },
  },
});

export const { setCredentials, setHasPharmacy, pharmacyInfo, resetAuth } =
  authSlice.actions;

export const setToken = (state) => state?.auth?.results?.token;
export const getOwnerPrivileges = (state) => state?.auth?.results?.data?.owner_privileges ||  state?.auth?.results?.data?.staff_privileges;

export const userInfo = (state) => state?.auth;

export const storeinfo = (state) => state?.auth?.hasPharmacy;

export const pharmacyinfo = (state) => state?.auth?.data;
export const pharmacyName = (state) => state?.auth?.data?.name;
export const userFirstName = (state) => state?.auth?.results?.data?.staff_first_name ||state?.auth?.results?.data?.owner_name

export const facility_id = (state) => state?.auth?.hasPharmacy?.data?.[0]?._id  || state?.auth?.results?.data?.staff_facility;
export const pharmacyLogo = (state) => state?.auth?.data?.logo;
export const pharmacyOpenHours = (state) => state?.auth?.data?.open_hours;
export default authSlice.reducer;
