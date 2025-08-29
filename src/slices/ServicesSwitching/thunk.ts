// src/store/serviceSwitching/thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getServiceSwitchingList as getServiceSwitchingListApi,
  addServiceSwitching as addServiceSwitchingApi,
  updateServiceSwitching as updateServiceSwitchingApi,
  deleteServiceSwitching as deleteServiceSwitchingApi,
} from "../../helpers/auth_api_helper";

// ---- GET LIST ----
export const getServiceSwitching = createAsyncThunk(
  "serviceSwitching/getList",
  async (
    {
      offset = 0,
      limit = 10,
      searchValue = "",
      product_id,
      apiId,
      status,
    }: {
      offset?: number;
      limit?: number;
      searchValue?: string;
      product_id?: string | number;
      apiId?: string | number;
      status?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getServiceSwitchingListApi(
        offset,
        limit,
        searchValue,
        product_id,
        apiId,
        status
      );
      return {
        data: response.data,
        recordsTotal: response.recordsTotal,
        recordsFiltered: response.recordsFiltered,
      };
    } catch (error: any) {
      toast.error("Failed to load service switching list", { autoClose: 3000 });
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// ---- ADD ----
export const addServiceSwitchingThunk = createAsyncThunk(
  "serviceSwitching/add",
  async (serviceData: any, { rejectWithValue }) => {
    try {
      const response = await addServiceSwitchingApi(serviceData);
      toast.success(response.message, { autoClose: 3000 });
      return response;
    } catch (error: any) {
      toast.error(error?.message || "Failed to add service switching", { autoClose: 3000 });
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// ---- UPDATE ----
export const updateServiceSwitchingThunk = createAsyncThunk(
  "serviceSwitching/update",
  async (
    serviceData: {
      id: string | number;
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
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateServiceSwitchingApi(serviceData);
      toast.success(response.message, { autoClose: 3000 });
      return response;
    } catch (error: any) {
      toast.error(error?.message || "Failed to update service switching", { autoClose: 3000 });
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// ---- DELETE ----
export const deleteServiceSwitchingThunk = createAsyncThunk(
  "serviceSwitching/delete",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await deleteServiceSwitchingApi(id);
      toast.success(response?.message || "Service switching deleted successfully", { autoClose: 3000 });
      return response;
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete service switching", { autoClose: 3000 });
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);
