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

    deleteCustomer: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/customers/delete-customer",
        method: "DELETE",
        body:  data ,
      }),
    }),


  }),
});

export const { useGetCustomersMutation ,useDeleteCustomerMutation} = customerApiSlice;
