import { apiSlice } from "../api/apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllOrders: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/orders/fetch-all-orders",
        method: "POST",
        body: { store_id: data },
      }),
    }),

    fetchSpecificOrder: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/orders/fetch-specific-orders",
        method: "POST",
        body: data,
      }),
    }),

    fetchAllPrescriptions: builder.mutation({
      query: (data) => ({
        url: "/prescriptions/get-prescriptions-for-pharmacy",
        method: "POST",
        body: { store_id: data },
      }),
    }),
  }),
});

export const { useFetchAllOrdersMutation, useFetchAllPrescriptionsMutation ,useFetchSpecificOrderMutation } =
  ordersApiSlice;
