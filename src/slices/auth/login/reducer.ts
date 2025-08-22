import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  token: string;
}

interface LoginState {
  user: User | null;
  error: string | null;
  loading: boolean;
  isUserLogout: boolean;
  errorMsg: boolean;
}

const initialState: LoginState = {
  user: null,
  error: null,
  loading: false,
  isUserLogout: false,
  errorMsg: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
      state.errorMsg = false;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.loading = false;
      state.errorMsg = false;
    },
apiError(state, action: PayloadAction<any>) {
  state.error = action.payload || "Login failed"; // ✅
  state.loading = false;
  state.isUserLogout = false;
  state.errorMsg = true;
},

  logoutUserSuccess(state) {
  state.isUserLogout = true;
  state.user = null;   // clear user
    },

    reset_login_flag(state) {
      state.error = null;
      state.loading = false;
      state.errorMsg = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  apiError,
  logoutUserSuccess,
  reset_login_flag,
} = loginSlice.actions;

export default loginSlice.reducer;