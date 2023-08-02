import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../private/keys";

const baseQuery = fetchBaseQuery({                   
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.results?.token;

    if (token) {
      headers.set("auth-token", token);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["auth", "dashboard"],
  endpoints: (builder) => ({}),
});

// export const { useGetLoginsQuery } = apiSlice;
