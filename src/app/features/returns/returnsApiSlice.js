import { apiSlice } from "../api/apiSlice";

export const returnsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllReturns: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/returns",
        method: "POST",
        body: { store_id: data },
      }),
    }),
    
    addReturns: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/returns/add-return",
        method: "POST",
        body: data ,
      }),
    }),
    deleteReturn: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/invoice/delete-invoice",
        method: "DELETE",
        body: data ,
      }),
    }),
  }),
});

export const { useFetchAllReturnsMutation ,useAddReturnsMutation,useDeleteReturnMutation} = returnsApiSlice;
