import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paymentMethods: sessionStorage.getItem("payments") ? JSON.parse(sessionStorage.getItem("payments")) : null
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        paymentMethod: {
            reducer(state, action) {
                state.paymentMethods = action?.payload
                sessionStorage.setItem("payments", JSON.stringify(action?.payload))
            }
        },
        resetSettings: {
            reducer(state, action) {
              state.paymentMethods = null;
            },
          },
    }
})

export const { paymentMethod,resetSettings } = settingsSlice.actions

export const settingsinfo = state => state?.settings?.paymentMethods

export default settingsSlice.reducer