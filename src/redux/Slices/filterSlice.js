import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stops: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setStopsFilter: (state, action) => {
      state.stops = action.payload;
    },
  },
});

export const { setStopsFilter } = filterSlice.actions;

export default filterSlice.reducer;
