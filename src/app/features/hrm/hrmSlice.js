import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staff: sessionStorage.getItem("staff")
    ? JSON.parse(sessionStorage.getItem("staff"))
    : [],
};

export const hrmSlice = createSlice({
  name: "hrm",
  initialState,
  reducers: {
    allStaff: {
      reducer(state, action) {
        state.staff = action?.payload;
        sessionStorage.setItem("staff", JSON.stringify(action?.payload));
      },
    },
  },
});

export const { allStaff } = hrmSlice.actions;

export default hrmSlice.reducer;
