import { apiSlice } from "../api/apiSlice";

export const hrmApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllStaff: builder.mutation({
      query: (data) => ({
        url: "/pharmacy/staff/fetch-pharmacy-staff",
        method: "POST",
        body: { facility_id: data },
      }),
    }),
  }),
});

export const { useFetchAllStaffMutation } = hrmApiSlice;
