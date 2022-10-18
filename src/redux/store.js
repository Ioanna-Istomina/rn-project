import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";
import { pathSlice } from "./auth/pathReducer";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [pathSlice.name]: pathSlice.reducer,
  },
});
