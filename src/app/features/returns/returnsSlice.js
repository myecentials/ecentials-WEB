import { createSlice } from "@reduxjs/toolkit/dist";

const initialState = {
  returnsList: sessionStorage.getItem("returnsList")
    ? JSON.parse(sessionStorage.getItem("returnsList"))
    : [],
};

export const returnsSlice = createSlice({
  name: "returns",
  initialState,
  reducers: {
    allReturns: {
      reducer(state, action) {
        state.returnsList = action?.payload;
        sessionStorage.setItem("returnsList", JSON.stringify(action?.payload));
      },
    },
  },
});

export const { allReturns } = returnsSlice.actions;

export default returnsSlice.reducer;
