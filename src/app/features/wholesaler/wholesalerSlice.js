import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wholesaler: sessionStorage.getItem("wholesaler")
    ? JSON.parse(sessionStorage.getItem("wholesaler"))
    : [],
};

export const wholesalerSlice = createSlice({
  name: "wholesalers",
  initialState,
  reducers: {
    wholesalerList: {
      reducer(state, action) {
        state.wholesaler = action?.payload;
        sessionStorage.setItem("wholesaler", JSON.stringify(action?.payload));
      },
    },
  },
});

export const { wholesalerList } = wholesalerSlice.actions;

export default wholesalerSlice.reducer;
