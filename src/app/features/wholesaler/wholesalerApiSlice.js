import { apiSlice } from "../api/apiSlice";

export const wholesalerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWholesalers: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/wholesaler/fetch-wholesalers",
        method: "POST",
        body: { facility_id: data },
      }),
    }),

    deleteWholesaler: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/wholesaler/delete-wholesaler",
        method: "DELETE",
        body:  data ,
      }),
    }),
  }),
});

export const { useGetWholesalersMutation,useDeleteWholesalerMutation } = wholesalerApiSlice;
