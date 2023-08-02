import { apiSlice } from "../api/apiSlice";

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.mutation({
      query: (data) => ({
        url: "pharmacy/customers/fetch-customers",
        method: "POST",
        body: { facility_id: data },
      }),
    }),
  }),
});

export const { useGetCustomersMutation } = customerApiSlice;
