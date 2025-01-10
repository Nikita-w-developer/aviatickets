import { configureStore } from "@reduxjs/toolkit";
import { amadeusApi } from "./Slices/apiSlice";

export const store = configureStore({
  reducer: {
    [amadeusApi.reducerPath]: amadeusApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(amadeusApi.middleware),
});
