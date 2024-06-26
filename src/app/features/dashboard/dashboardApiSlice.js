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
    getNonProducts: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/non-drugs/count-products-in-pharmacy",
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
    getMonthlySales: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/sales/monthly-sales",
        method: "POST",
        body: { store_id: data },
      }),
    }),
  }),
});

export const {
  useGetOrdersMutation,
  useGetProductsMutation,
  useGetNonProductsMutation,
  useGetSalesMutation,
  useGetMonthlySalesMutation,
} = dashboardApiSlice;
