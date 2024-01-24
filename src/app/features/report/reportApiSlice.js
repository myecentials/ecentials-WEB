import { apiSlice } from "../api/apiSlice";

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllReviews: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/report/sales-report",
        method: "GET",
        body: data,
      }),
    }),

  }),
});



export const { useFetchAllReviewsMutation} = reportApiSlice;

