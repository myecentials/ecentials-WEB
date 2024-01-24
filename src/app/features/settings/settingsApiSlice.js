import { apiSlice } from "../api/apiSlice";

export const settingsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addPaymentMethod: builder.mutation({
            query: data => ({
                url: "/pharmacies/add-payment-method",
                method: "POST",
                body: data
            })
        }),
        editPaymentMethod: builder.mutation({
            query: data => ({
                url: "/pharmacies/edit-payment-method",
                method: "POST",
                body: data
            })
        }),
        fetchHospitalInfo: builder.mutation({
            query: data => ({
                url: "/hospitals/fetch-hospital-information",
                method: "POST",
                body: data
            })
        })
    })
})

export const { useAddPaymentMethodMutation,useEditPaymentMethodMutation, useFetchHospitalInfoMutation } = settingsApiSlice