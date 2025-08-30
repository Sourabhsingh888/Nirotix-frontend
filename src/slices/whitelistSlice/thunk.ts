import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getWhitelistedIpList,
  addWhitelistedIp,
  deleteWhitelistedIp,
} from "../../helpers/auth_api_helper";

// ---- GET ALL ----
export const getWhitelistedIpApi = createAsyncThunk(
  "whitelist/getWhitelistedIps",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWhitelistedIpList();
      return {
        data: response.data,
        recordsTotal: response.recordsTotal,
        recordsFiltered: response.recordsFiltered,
      };
    } catch (error: any) {
      toast.error("Failed to load whitelisted IPs");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ---- ADD ----
export const addWhitelistedIpApi = createAsyncThunk(
  "whitelist/addWhitelistedIp",
  async (ipData: any, { rejectWithValue }) => {
    try {
      const response = await addWhitelistedIp(ipData);
      toast.success(response.message || "IP added successfully", { autoClose: 3000 });
      return {
        success: true,
        data: response.data,
        message: response.message,
      };
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || error.message || "Failed to add IP";
      toast.error(errorMsg, { autoClose: 3000 });
      return rejectWithValue(errorMsg);
    }
  }
);

// ---- DELETE ----
export const deleteWhitelistedIpApi = createAsyncThunk(
  "whitelist/deleteWhitelistedIp",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await deleteWhitelistedIp(id);
      toast.success(response?.message || "IP deleted successfully", { autoClose: 3000 });
      return response;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || error.message || "Failed to delete IP";
      toast.error(errorMsg, { autoClose: 3000 });
      return rejectWithValue(errorMsg);
    }
  }
);
