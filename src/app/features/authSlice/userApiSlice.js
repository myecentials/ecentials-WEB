import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/business-owner/login-business-owner",
        method: "POST",
        body: data,
      }),
    }),

    getSignups: builder.query({
      query: () => ({
        url: "/pharmacies/check-whether-owner-has-pharmacy",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetSignupsQuery } = userApiSlice;
