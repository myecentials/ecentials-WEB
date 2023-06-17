import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "Prof@0545",
  gps_address: "",
  location: "",
  phone_number: "",
  opening_hours: "",
  license_number: "",
  owner_id: sessionStorage.getItem("ownerId"),
  document: null,
};

const createHospitalSlice = createSlice({
  name: "createHospital",
  initialState: initialState,
  reducers: {
    createHospital(state, action) {
      console.log(action.payload);
    },
  },
});

export const { createHospital } = createHospitalSlice.actions;

export default createHospitalSlice.reducer;
