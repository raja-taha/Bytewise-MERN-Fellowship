import { configureStore } from "@reduxjs/toolkit";
import showData from "../features/showSlice";
import gitUser from "../features/gitUserSlice";

export const store = configureStore({
  reducer: {
    show: showData,
    userData: gitUser,
  },
});
