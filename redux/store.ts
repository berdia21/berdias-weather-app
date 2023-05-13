import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./features/weather";

export const store = configureStore({
  reducer: {
    weatherReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
