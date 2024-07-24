import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const getAllUsers = createAsyncThunk("gitUsers", async () => {
  const response = await fetch("https://api.github.com/users");
  const result = response.json();
  return result;
});

export const gitUserSlice = createSlice({
  name: "gitUser",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.loading = false;
      state.error = "Error fetching users";
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.users = action.payload;
    });
  },
});

export default gitUserSlice.reducer;
