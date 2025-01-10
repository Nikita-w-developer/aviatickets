import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "7z0M6AItIqRJ69axokL0epPBeSOJpIc3";
const API_SECRET = "THZpk70We6TamOuF";

export const amadeusApi = createApi({
  reducerPath: "amadeusApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.api.amadeus.com",
    prepareHeaders: async (headers) => {
      const token = await getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFlightOffers: builder.query({
      query: (params) => ({
        url: "/v2/shopping/flight-offers",
        params,
      }),
    }),
  }),
});

export const { useGetFlightOffersQuery } = amadeusApi;

async function getAccessToken() {
  const response = await fetch(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: API_KEY,
        client_secret: API_SECRET,
      }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data.access_token;
  } else {
    console.error("Failed to fetch access token");
    return null;
  }
}
