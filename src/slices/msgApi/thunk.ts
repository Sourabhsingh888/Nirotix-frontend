// src/store/message/thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getMessageList as getMessageListApi,
  addMessageList as addMessageListApi,
  updateMessageList as updateMessageListApi,
  getMessageByIdList,
  deleteMessageList as deleteMessageListApi,
  changeMessageApiStatus as changeMessageApiStatusApi,
} from "../../helpers/auth_api_helper";

// ---- GET ALL ----
export const getMessagesApi = createAsyncThunk(
  "message/getMessages",
  async (
    {
      offset = 0,
      limit = 10,
      searchValue = "",
      api_type = "",
      status = "",
    }: {
      offset?: number;
      limit?: number;
      searchValue?: string;
      api_type?: string;
      status?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getMessageListApi(
        offset,
        limit,
        searchValue,
        api_type,
        status
      );
      return {
        data: response.data,
        recordsTotal: response.recordsTotal,
        recordsFiltered: response.recordsFiltered,
      };
    } catch (error: any) {
      toast.error("Failed to load messages");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ---- ADD ----
export const addMessageApi = createAsyncThunk(
  "message/addMessage",
  async (messageData: any, { rejectWithValue }) => {
    try {
      const response = await addMessageListApi(messageData);
      toast.success(response.message || "Message added successfully", {
        autoClose: 3000,
      });
      return response;
    } catch (error: any) {
       const errorMsg = error.response?.data?.message || error.message || "Failed to add message";
      toast.error(errorMsg, { autoClose: 3000 });
      return rejectWithValue(errorMsg);
    }
  }
);

// ---- UPDATE ----
export const updateMessageApi = createAsyncThunk(
  "message/updateMessage",
  async (
    messageData: {
      id: string | number;
      api_name: number;
      api_type: string;
      base_url: string | number;
      params?: string | number;
      method?: string;
      status: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateMessageListApi(messageData);
      toast.success(response.message || "Message updated successfully", {
        autoClose: 3000,
      });
      return response;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to update message";
      toast.error(errorMsg, { autoClose: 3000 });
      return rejectWithValue(errorMsg);
    }
  }
);


// ---- GET BY ID ----
export const getMessageByIdApi = createAsyncThunk(
  "message/getMessageById",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await getMessageByIdList(id);
      return response.data; // ya directly response, API response ke hisaab se
    } catch (error: any) {
      toast.error("Failed to fetch message details", { autoClose: 3000 });
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// ---- DELETE ----
export const deleteMessageApi = createAsyncThunk(
  "message/deleteMessage",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await deleteMessageListApi(id);
      toast.success(response?.message || "Message deleted successfully", {
        autoClose: 3000,
      });
      return response;
    } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message || "Failed to delete message";
      toast.error(errorMsg, { autoClose: 3000 });
      return rejectWithValue(errorMsg);
    }
  }
);

// ---- CHANGE STATUS ----
export const changeMessageStatusApi = createAsyncThunk(
  "message/changeStatus",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await changeMessageApiStatusApi(id);

      toast.success(response?.message || "Message status updated", {
        autoClose: 3000,
      });

      // sirf updated record ka data return karo
      return response.data; // { id: string, status: "active" | "inactive" }

    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || error.message || "Failed to change status";
      toast.error(errorMsg, { autoClose: 3000 });
      return rejectWithValue(errorMsg);
    }
  }
);

