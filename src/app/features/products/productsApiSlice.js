import { apiSlice } from "../api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.mutation({
			query: (data) => ({
				url: "/prescriptions/get-prescriptions-for-pharmacy",
				method: "POST",
				body: { store_id: data },
			}),
		}),
		postProducts: builder.mutation({
			query: (data) => ({
				url: "/prescriptions/get-prescriptions-for-pharmacy",
				method: "POST",
				body: { store_id: data },
			}),
		}),

		addProduct: builder.mutation({
			query: (data) => ({
				url: "/pharmacy/drugs/add-new-drug",
				method: "POST",
				body: data,
			}),
		}),
		fetchDefaultProduct: builder.mutation({
			query: (data) => ({
				url: "pharmacy/drugs/fetch-default-drugs",
				method: "GET",
				// body:  data ,
			}),
		}),
		fetchDefaultProductWithBarcode: builder.mutation({
			query: (data) => ({
				url: "pharmacy/drugs/get-drug-by-upc",
				method: "POST",
				body: { upc: data },
			}),
		}),

		deleteProduct: builder.mutation({
			query: (data) => ({
				url: "/pharmacy/drugs/delete-drug",
				method: "DELETE",
				body: data,
			}),
		}),

		searchProductInPharmarcy: builder.mutation({
			query: (data) => ({
				url: "/pharmacy/drugs/pharmacy-specific-drug-search",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetProductsMutation,
	useAddProductMutation,
	useDeleteProductMutation,
	useSearchProductInPharmarcyMutation,
	useFetchDefaultProductMutation,
	useFetchDefaultProductWithBarcodeMutation,
} = productsApiSlice;
