// src/store/serviceSwitching/slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getServiceSwitching,
  addServiceSwitchingThunk,
  updateServiceSwitchingThunk,
  deleteServiceSwitchingThunk,
} from "./thunk";

export interface ServiceSwitching {
  id: number | string;
  api_id: number;
  product_id: number;
  api_code?: string;
  rate: string | number;
  commission_surcharge?: string | number;
  flat_per?: string;
  gst?: number;
  tds?: number;
  txn_limit?: number;
  status: string;
}

export interface ServiceSwitchingResponse {
  data: ServiceSwitching[];
  recordsTotal: number;
  recordsFiltered: number;
}

interface RequestState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

interface ServiceSwitchingState {
  list: ServiceSwitching[];
  recordsTotal: number;
  recordsFiltered: number;
  fetchState: RequestState;
  addState: RequestState;
  updateState: RequestState;
  deleteState: RequestState;
}

const initialRequestState: RequestState = {
  loading: false,
  success: false,
  error: null,
};

const initialState: ServiceSwitchingState = {
  list: [],
  recordsTotal: 0,
  recordsFiltered: 0,
  fetchState: { ...initialRequestState },
  addState: { ...initialRequestState },
  updateState: { ...initialRequestState },
  deleteState: { ...initialRequestState },
};

const ServiceSwitchingSlice = createSlice({
  name: "ServiceSwitching",
  initialState,
  reducers: {
    resetAddState: (state) => { state.addState = { ...initialRequestState }; },
    resetUpdateState: (state) => { state.updateState = { ...initialRequestState }; },
    resetDeleteState: (state) => { state.deleteState = { ...initialRequestState }; },
    resetFetchState: (state) => { state.fetchState = { ...initialRequestState }; },
  },
  extraReducers: (builder) => {
    // ---- Fetch ----
    builder
      .addCase(getServiceSwitching.pending, (state) => {
        state.fetchState.loading = true;
        state.fetchState.error = null;
      })
      .addCase(getServiceSwitching.fulfilled, (state, action: PayloadAction<ServiceSwitchingResponse>) => {
        state.fetchState.loading = false;
        state.fetchState.success = true;
        state.list = action.payload.data;
        state.recordsTotal = action.payload.recordsTotal;
        state.recordsFiltered = action.payload.recordsFiltered;
      })
      .addCase(getServiceSwitching.rejected, (state, action) => {
        state.fetchState.loading = false;
        state.fetchState.error = (action.payload as string) || action.error.message || "Failed to fetch service switching";
      });

    // ---- Add ----
    builder
      .addCase(addServiceSwitchingThunk.pending, (state) => {
        state.addState.loading = true;
        state.addState.error = null;
      })
      .addCase(addServiceSwitchingThunk.fulfilled, (state, action: PayloadAction<ServiceSwitching>) => {
        state.addState.loading = false;
        state.addState.success = true;
        if (action.payload) state.list.push(action.payload);
      })
      .addCase(addServiceSwitchingThunk.rejected, (state, action) => {
        state.addState.loading = false;
        state.addState.error = (action.payload as string) || action.error.message || "Failed to add service switching";
      });

    // ---- Update ----
    builder
      .addCase(updateServiceSwitchingThunk.pending, (state) => {
        state.updateState.loading = true;
        state.updateState.error = null;
      })
      .addCase(updateServiceSwitchingThunk.fulfilled, (state, action: PayloadAction<ServiceSwitching>) => {
        state.updateState.loading = false;
        state.updateState.success = true;
        const index = state.list.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(updateServiceSwitchingThunk.rejected, (state, action) => {
        state.updateState.loading = false;
        state.updateState.error = (action.payload as string) || action.error.message || "Failed to update service switching";
      });

    // ---- Delete ----
    builder
      .addCase(deleteServiceSwitchingThunk.pending, (state) => {
        state.deleteState.loading = true;
        state.deleteState.error = null;
      })
      .addCase(deleteServiceSwitchingThunk.fulfilled, (state, action: PayloadAction<number | string>) => {
        state.deleteState.loading = false;
        state.deleteState.success = true;
        state.list = state.list.filter((s) => s.id !== action.meta.arg);
      })
      .addCase(deleteServiceSwitchingThunk.rejected, (state, action) => {
        state.deleteState.loading = false;
        state.deleteState.error = (action.payload as string) || action.error.message || "Failed to delete service switching";
      });
  },
});

export const { resetAddState, resetUpdateState, resetDeleteState, resetFetchState } = ServiceSwitchingSlice.actions;

export default ServiceSwitchingSlice.reducer;
