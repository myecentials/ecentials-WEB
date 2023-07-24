import { apiSlice } from "../api/apiSlice";

export const invoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDrugs: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/drugs",
        method: "POST",
        body: { store_id: data },
      }),
    }),

    getDrugCategories: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/drug-category/fetch-drug-categories",
        method: "POST",
        body: { pharmacy_id: data },
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
