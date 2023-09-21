import { apiSlice } from "../api/apiSlice";

export const invoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDrugs: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/drugs",
        method: "POST",
        body: { store_id: data, skip: 0, limit: 100 },
      }),
    }),

    getDrugCategories: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/drug-category/fetch-drug-categories",
        method: "POST",
        body: { store_id: data },
      }),
    }),

    getInvoiceList: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/invoice",
        method: "POST",
        body: { store_id: data },
      }),
    }),
  }),
});

export const {
  useGetDrugsMutation,
  useGetDrugCategoriesMutation,
  useGetInvoiceListMutation,
} = invoiceApiSlice;
