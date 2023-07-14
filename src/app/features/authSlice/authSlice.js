import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: sessionStorage.getItem("auth")
    ? JSON.parse(sessionStorage.getItem("auth"))
    : null,
  hasPharmacy: sessionStorage.getItem("hasPharmacy")
    ? JSON.parse(sessionStorage.getItem("hasPharmacy"))
    : false,
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
  },
});

export const { setCredentials, setHasPharmacy } = authSlice.actions;

export const userInfo = (state) => state.auth;

export default authSlice.reducer;
