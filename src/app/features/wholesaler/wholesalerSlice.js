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
    resetWholesalers:{
      reducer(state,action){
        state.wholesaler=[];
      }
    }
  },
});

export const { wholesalerList ,resetWholesalers } = wholesalerSlice.actions;

export default wholesalerSlice.reducer;
