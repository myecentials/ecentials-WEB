import { configureStore } from "@reduxjs/toolkit";
import createHospitalReducer from "./redux/reducer/hospitalReducer/createHospitalSlice";

const store = configureStore({
  reducer: {
    createHospital: createHospitalReducer,
  },
});

export default store;
