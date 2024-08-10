import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import rateSlice from "./rateSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    rate: rateSlice,
  },
});
