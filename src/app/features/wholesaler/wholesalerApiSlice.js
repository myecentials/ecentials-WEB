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
  }),
});

export const { useGetWholesalersMutation } = wholesalerApiSlice;
