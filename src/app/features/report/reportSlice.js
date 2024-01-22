import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reportReview: sessionStorage.getItem("reportReview")
    ? JSON.parse(sessionStorage.getItem("reportReview"))
    : [],
};


export const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: []
})



export default reportSlice.reducer;