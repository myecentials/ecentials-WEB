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
    resetHrm: {
      reducer(state, action) {
        state.staff = [];
      },
    },
  },
});

export const { allStaff ,resetHrm} = hrmSlice.actions;

export default hrmSlice.reducer;
