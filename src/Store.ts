import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices"; // Assuming your combined reducers are in slices/index.ts

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;