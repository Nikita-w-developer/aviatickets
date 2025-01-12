import { configureStore } from "@reduxjs/toolkit";
import { amadeusApi } from "./Slices/apiSlice";
import filterReducer from "./Slices/filterSlice";
import sortReducer from "./Slices/sortSlice";

export const store = configureStore({
  reducer: {
    [amadeusApi.reducerPath]: amadeusApi.reducer,
    filterReducer,
    sortReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(amadeusApi.middleware),
});
