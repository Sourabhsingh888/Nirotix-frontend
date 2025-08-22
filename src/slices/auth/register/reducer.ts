import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  registrationError: any | null;
  message: string | null;
  loading: boolean;
  user: any | null;
  success: boolean;
  error: boolean;
  isUserLogout?: boolean; // optional, as it's only in apiErrorChange
}

export const initialState: RegisterState = {
  registrationError: null,
  message: null,
  loading: false,
  user: null,
  success: false,
  error: false,
  isUserLogout: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerUserSuccessful(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.loading = false;
      state.success = true;
      state.error = false;
      state.registrationError = null;
    },
    registerUserFailed(state, action: PayloadAction<any>) {
      state.user = null;
      state.loading = false;
      state.registrationError = action.payload;
      state.error = true;
      state.success = false;
    },
    resetRegisterFlagChange(state) {
      state.success = false;
      state.error = false;
      state.registrationError = null;
    },
    apiErrorChange(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
      state.loading = false;
      state.isUserLogout = false; // Optional, clarify usage
    },
  },
});

export const {
  registerUserSuccessful,
  registerUserFailed,
  resetRegisterFlagChange,
  apiErrorChange,
} = registerSlice.actions;

export default registerSlice.reducer;