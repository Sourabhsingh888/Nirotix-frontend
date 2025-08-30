import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateWebhook, getWebhook } from "../../helpers/auth_api_helper";

// UPDATE WEBHOOK 
export const updateWebhookApi = createAsyncThunk(
  "webhook/updateWebhook",
  async (payload: { url: string }, { rejectWithValue }) => {
    try {
      const response = await updateWebhook(payload);
      toast.success(response?.message || "Webhook updated successfully", {
        autoClose: 3000,
      });
      return response.data.url;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || error.message || "Failed to update webhook";
      toast.error(errorMsg, { autoClose: 3000 });
      return rejectWithValue(errorMsg);
    }
  }
);



// Get Webhook
export const getWebhookApi = createAsyncThunk(
  "webhook/getWebhook",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWebhook();
      // toast.success("Webhook fetched successfully", { autoClose: 2000 });
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || error.message || "Failed to fetch webhook";
      toast.error(errorMsg, { autoClose: 3000 });
      return rejectWithValue(errorMsg);
    }
  }
);
