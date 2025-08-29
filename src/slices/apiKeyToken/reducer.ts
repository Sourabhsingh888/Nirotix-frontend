// src/slices/apiKeys/slice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  getApiKeysApi,
  addApiKeyApi,
  changeApiKeyStatusApi,
} from "./thunk";

interface ApiKey {
  id: string | number;
  token: string;
  token_type: string;
  status: "active" | "inactive";
  created_at: string;
}

interface ApiKeysState {
  keys: ApiKey[];
  loading: boolean;
  error: string | null;
}

const initialState: ApiKeysState = {
  keys: [],
  loading: false,
  error: null,
};

const apiKeysSlice = createSlice({
  name: "apiKeys",
  initialState,
  reducers: {
    resetApiKeys: (state) => {
      state.keys = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ---- GET KEYS ----
    builder
      .addCase(getApiKeysApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApiKeysApi.fulfilled, (state, action) => {
        state.loading = false;
        state.keys = action.payload;
      })
      .addCase(getApiKeysApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ---- ADD KEY ----
    builder
      .addCase(addApiKeyApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addApiKeyApi.fulfilled, (state, action) => {
        state.loading = false;
        // ✅ ensure duplicate keys don’t get added
        const exists = state.keys.some((k) => k.id === action.payload.id);
        if (!exists) {
          state.keys.push(action.payload);
        }
      })
      .addCase(addApiKeyApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ---- CHANGE STATUS ----
    // builder
    //   .addCase(changeApiKeyStatusApi.pending, (state) => {
    //     state.error = null; // reset error before update
    //   })
    //   .addCase(changeApiKeyStatusApi.fulfilled, (state, action) => {
    //     const { id, status } = action.payload;
    //     const key = state.keys.find((k) => k.id === id);
    //     if (key) {
    //       key.status = status;
    //     }
    //   })
    //   .addCase(changeApiKeyStatusApi.rejected, (state, action) => {
    //     state.error = action.payload as string;
    //   });
  },
});

export const { resetApiKeys } = apiKeysSlice.actions;
export default apiKeysSlice.reducer;
