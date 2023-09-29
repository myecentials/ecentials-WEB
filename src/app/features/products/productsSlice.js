import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: sessionStorage.getItem("products")
    ? JSON.parse(sessionStorage.getItem("products"))
    : [],
  addProduct: {
    name: "",
    price: "",
    selling_price: "",
    description: "",
    medicine_group: "Select medicine group",
    level: "",
    dosage: "250mg",
    total_stock: 1,
    manufacturer: "",
    discount: "",
    nhis: "N/A",
    otc: "N/A",
    expiry_date: "",
    store_id: "",
    category_id: "",
    picture: null,
  },
  massDrugs: sessionStorage.getItem("massDrug") ? JSON.parse(sessionStorage.getItem("massDrug")) : null
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsList: {
      reducer(state, action) {
        state.products = action?.payload;
        sessionStorage.setItem("products", JSON.stringify(action?.payload));
      },
    },

    addProduct: {
      reducer(state, action) {
        state.addProduct = action?.payload;
      },
    },

    massDrugs: {
      reducer(state, action) {
        state.massDrugs = action?.payload
        sessionStorage.setItem("massDrug", JSON.stringify(action?.payload))
      }
    }
  },
});

export const { productsList, massDrugs } = productsSlice.actions;

export const products = state => state?.products?.productsList

export const massdrug = state => state?.products?.massDrugs

export default productsSlice.reducer;
