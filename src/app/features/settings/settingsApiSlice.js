import { apiSlice } from "../api/apiSlice";

export const settingsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addPaymentMethod: builder.mutation({
            query: data => ({
                url: "/pharmacies/add-payment-method",
                method: "POST",
                body: data
            })
        })
    })
})

export const { useAddPaymentMethodMutation } = settingsApiSlice