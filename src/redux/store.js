import { configureStore } from "@reduxjs/toolkit";
import { amadeusApi } from "./Slices/apiSlice";
import filterReducer from "./Slices/filterSlice";
import sortReducer from "./Slices/sortSlice";
import propsReducer from "./Slices/propsSlice";
import searchReducer from "./Slices/searchSlice";

export const store = configureStore({
  reducer: {
    [amadeusApi.reducerPath]: amadeusApi.reducer,
    filterReducer,
    sortReducer,
    propsReducer,
    searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(amadeusApi.middleware),
});
