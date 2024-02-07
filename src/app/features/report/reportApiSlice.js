import { apiSlice } from "../api/apiSlice";

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllInvoices: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/report/sales-report", 
        method: "GET",
        body: data,
      }),
    }),


    fetchRevenue: builder.mutation({
      query: (store_id) => ({
        url: `/pharmacy/report/revenue-report/${store_id}`,
        method: "GET",
      })
    }),

    fetchInventory: builder.mutation({
       query: (store_id) => ({
         url: `/pharmacy/report/inventory-report/${store_id}`,
         method: "GET",
       })
    })
  }),
});



export const { useFetchAllInvoicesMutation, useFetchSpecificInvoiceMutation, useFetchRevenueMutation, useFetchInventoryMutation} = reportApiSlice;

