// src/slices/apiKeys/thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getApiTokenKeys,
  addApiTokenKey,
//   changeApiTokenKeyStatus,
} from "../../helpers/auth_api_helper";

// ---- GET API KEYS ----
export const getApiKeysApi = createAsyncThunk(
  "apiKeys/getApiKeys",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getApiTokenKeys();
      return response.data; // list of keys
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ??
          error.message ??
          "Failed to fetch API Keys"
      );
    }
  }
);

// ---- ADD API KEY ----
export const addApiKeyApi = createAsyncThunk(
  "apiKeys/addApiKey",
  async (payload: { token_type: string }, { rejectWithValue }) => {
    try {
      const response = await addApiTokenKey(payload);
      return response.data; // newly created key
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ??
          error.message ??
          "Failed to add API Key"
      );
    }
  }
);

// ---- CHANGE STATUS ----
// export const changeApiKeyStatusApi = createAsyncThunk(
//   "apiKeys/changeApiKeyStatus",
//   async (
//     { id, status }: { id: string | number; status: "active" | "inactive" },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await changeApiTokenKeyStatus(id, { status });
//       return {
//         id,
//         status,
//         message: response.data?.message || "Status updated",
//       };
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message ??
//           error.message ??
//           "Failed to update API Key status"
//       );
//     }
//   }
// );
