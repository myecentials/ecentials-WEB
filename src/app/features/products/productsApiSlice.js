import { apiSlice } from "../api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    getProducts: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: { store_id: data },
      }),
    });
  },
});

export const { useGetProductsMutation } = productsApiSlice;
