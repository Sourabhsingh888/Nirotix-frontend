import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;