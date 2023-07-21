import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: sessionStorage.getItem("products")
    ? JSON.parse(sessionStorage.getItem("products"))
    : [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsList: {
        reducer(state, action){
            state.products = action?.payload
            sessionStorage.setItem("products", JSON.stringify(action?.payload))
        }
    }
  },
});

export const {productsList} = productsSlice.actions

export default productsSlice.reducer
