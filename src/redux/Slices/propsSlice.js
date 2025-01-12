import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  props: null,
};

const propsSlice = createSlice({
  name: "props",
  initialState,
  reducers: {
    setProps: (state, action) => {
      state.props = action.payload;
    },
  },
});

export const { setProps } = propsSlice.actions;

export default propsSlice.reducer;
