import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

export const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    showData: (state) => {
      state.value = state.value;
    },
    increment: (state) => {
      state.value = state.value + 1;
    },
    incrementByFive: (state, action) => {
      state.value = state.value + action.payload;
    },
  },
});

export const { showData, increment, incrementByFive } = showSlice.actions;

export default showSlice.reducer;
