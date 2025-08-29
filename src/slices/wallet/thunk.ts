import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDashboardWallet } from "../../helpers/auth_api_helper"; 
// yaha apka API call function rahega jo axios se GET karega

// ---- GET WALLET ----
export const getWalletApi = createAsyncThunk(
  "wallet/getWallet",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserDashboardWallet();
      return response.data; // API se data return hoga
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? error.message ?? "Failed to fetch wallet data"
      );
    }
  }
);
