import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/business-owner/create-business-owner",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/business-owner/login-business-owner",
        method: "POST",
        body: data,
      }),
    }),

    getSignups: builder.query({
      query: (token) => ({
        url: "/pharmacies/check-whether-owner-has-pharmacy",
        method: "GET",
      }),
    }),

    getPharmacyInfo: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/information/fetch-pharmacy-information",
        method: "POST",
        body: { pharmacy_id: data },
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetSignupsQuery,
  useGetPharmacyInfoMutation,
 
} = userApiSlice;
