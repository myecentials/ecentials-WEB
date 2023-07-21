import { apiSlice } from "../api/apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/orders/total-orders",
        method: "POST",
        body: { store_id: data },
      }),
    }),
    getProducts: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/drugs/count-drugs-in-pharmacy",
        method: "POST",
        body: { store_id: data },
      }),
    }),
    getSales: builder.mutation({
      query: (data, start_date) => ({
        url: "/pharmacy/sales/weekly-sales",
        method: "POST",
        body: { store_id: data, start_date: start_date },
      }),
    }),
  }),
});

export const {
  useGetOrdersMutation,
  useGetProductsMutation,
  useGetSalesMutation,
} = dashboardApiSlice;
