import { createSlice } from "@reduxjs/toolkit";
import { getWalletApi } from "./thunk";

export interface Wallet {
  id: string | number;
  user_id: string | number;
  balance: number;
  free_balance: number;
  lien_balance: number;
  total_balance: number;
  balance_expire_at: string;
  created_at: string;
  updated_at: string;
}

interface WalletState {
  wallet: Wallet | null;
  loading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  wallet: null,
  loading: false,
  error: null,
};

const walletSlice = createSlice({
  name: "Wallet",
  initialState,
  reducers: {
    resetWallet: (state) => {
      state.wallet = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWalletApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWalletApi.fulfilled, (state, action) => {
        state.loading = false;
        // adjust according to API response shape
        state.wallet = action.payload.data ?? action.payload;
      })
      .addCase(getWalletApi.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || null;
      });
  },
});

export const { resetWallet } = walletSlice.actions;
export default walletSlice.reducer;
