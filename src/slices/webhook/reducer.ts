import { createSlice } from "@reduxjs/toolkit";
import { updateWebhookApi, getWebhookApi } from "./thunk";

interface RequestState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

interface WebhookState {
  url: string;
  fetchState: RequestState;
}

const initialState: WebhookState = {
  url: "",
  fetchState: { loading: false, success: false, error: null },
};

const webhookSlice = createSlice({
  name: "Webhook",
  initialState,
  reducers: {
    resetWebhook: (state) => {
      state.url = "";
      state.fetchState = { loading: false, success: false, error: null };
    },
  },
  extraReducers: (builder) => {
    // ---- UPDATE WEBHOOK ----
    builder
      .addCase(updateWebhookApi.pending, (state) => {
        state.fetchState.loading = true;
        state.fetchState.success = false;
        state.fetchState.error = null;
      })
      .addCase(updateWebhookApi.fulfilled, (state, action) => {
        state.fetchState.loading = false;
        state.fetchState.success = true;
        state.url = action.payload;
      })
      .addCase(updateWebhookApi.rejected, (state, action) => {
        state.fetchState.loading = false;
        state.fetchState.success = false;
        state.fetchState.error = action.payload as string;
      });

    // GET WEBHOOK 
    builder
      .addCase(getWebhookApi.pending, (state) => {
        state.fetchState.loading = true;
        state.fetchState.success = false;
        state.fetchState.error = null;
      })
      .addCase(getWebhookApi.fulfilled, (state, action) => {
        state.fetchState.loading = false;
        state.fetchState.success = true;
        state.url = action.payload?.url || "";
      })
      .addCase(getWebhookApi.rejected, (state, action) => {
        state.fetchState.loading = false;
        state.fetchState.success = false;
        state.fetchState.error = action.payload as string;
      });
  },
});

export const { resetWebhook } = webhookSlice.actions;
export default webhookSlice.reducer;
