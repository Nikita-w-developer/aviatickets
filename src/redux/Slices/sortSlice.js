import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coast: true,
  speed: false,
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    toggleActive: (state, action) => {
      state.coast = !state.coast;
      state.speed = !state.speed;
    },
  },
});

export const { toggleActive } = sortSlice.actions;

export default sortSlice.reducer;
