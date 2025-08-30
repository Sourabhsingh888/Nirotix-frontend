import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getWhitelistedIpApi,
  addWhitelistedIpApi,
  deleteWhitelistedIpApi,
} from "./thunk";

//Types 
export interface Whitelist {
  id: number | string;
  ip_address: string;
  status: "Active" | "Inactive";
  created_at: string;
}

export interface WhitelistResponse {
  data: Whitelist[];
  recordsTotal: number;
  recordsFiltered: number;
}

interface RequestState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

interface WhitelistState {
  list: Whitelist[];
  recordsTotal: number;
  recordsFiltered: number;
  fetchState: RequestState;
  addState: RequestState;
  deleteState: RequestState;
}

const initialRequestState: RequestState = {
  loading: false,
  success: false,
  error: null,
};

const initialState: WhitelistState = {
  list: [],
  recordsTotal: 0,
  recordsFiltered: 0,
  fetchState: { ...initialRequestState },
  addState: { ...initialRequestState },
  deleteState: { ...initialRequestState },
};

//  Slice -
const WhitelistSlice = createSlice({
  name: "whitelist",
  initialState,
  reducers: {
    resetFetchState: (state) => {
      state.fetchState = { ...initialRequestState };
    },
    resetAddState: (state) => {
      state.addState = { ...initialRequestState };
    },
    resetDeleteState: (state) => {
      state.deleteState = { ...initialRequestState };
    },
  },
  extraReducers: (builder) => {
    // Fetch 
    builder
      .addCase(getWhitelistedIpApi.pending, (state) => {
        state.fetchState.loading = true;
      })
      .addCase(
        getWhitelistedIpApi.fulfilled,
        (state, action: PayloadAction<WhitelistResponse>) => {
          state.fetchState.loading = false;
          state.fetchState.success = true;
          state.list = action.payload.data;
          state.recordsTotal = action.payload.recordsTotal;
          state.recordsFiltered = action.payload.recordsFiltered;
        }
      )
      .addCase(getWhitelistedIpApi.rejected, (state, action) => {
        state.fetchState.loading = false;
        state.fetchState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch whitelist";
      });

    // Add 
    builder
      .addCase(addWhitelistedIpApi.pending, (state) => {
        state.addState.loading = true;
      })
      .addCase(addWhitelistedIpApi.fulfilled, (state) => {
        state.addState.loading = false;
        state.addState.success = true;
      })
      .addCase(addWhitelistedIpApi.rejected, (state, action) => {
        state.addState.loading = false;
        state.addState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to add whitelist";
      });

    // Delete 
    builder
      .addCase(deleteWhitelistedIpApi.pending, (state) => {
        state.deleteState.loading = true;
      })
      .addCase(deleteWhitelistedIpApi.fulfilled, (state, action) => {
        state.deleteState.loading = false;
        state.deleteState.success = true;
        const id = action.meta.arg;
        state.list = state.list.filter((ip) => ip.id !== id);
        state.recordsTotal = Math.max(state.recordsTotal - 1, 0);
        state.recordsFiltered = Math.max(state.recordsFiltered - 1, 0);
      })
      .addCase(deleteWhitelistedIpApi.rejected, (state, action) => {
        state.deleteState.loading = false;
        state.deleteState.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to delete whitelist";
      });
  },
});

export const { resetFetchState, resetAddState, resetDeleteState, } =
  WhitelistSlice.actions;

export default WhitelistSlice.reducer;
