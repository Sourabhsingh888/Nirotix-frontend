// src/store/productPricing/thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getProductPricingList as getProductPricingListApi,
  getProductPricingByid as getProductPricingByidApi,
  addProductPricingList as addProductPricingApi,
  updateProductPricingList as updateProductPricingApi,
  deleteProductPricingList as deleteProductPricingApi,
} from "../../helpers/auth_api_helper";

// ---- GET ALL ----
export const getProductPricing = createAsyncThunk(
  "productPricing/getList",
  async (
    {
      offset = 0,
      limit = 10,
      searchValue = "",
    }: {
      offset?: number;
      limit?: number;
      searchValue?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getProductPricingListApi(
        offset,
        limit,
        searchValue,
      );

      return {
        data: response.data,
        recordsTotal: response.recordsTotal,
        recordsFiltered: response.recordsFiltered,
      };
    } catch (error: any) {
      toast.error("Failed to load product pricing", { autoClose: 3000 });
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);


// ---- GET ById ----
export const getProductPricingById = createAsyncThunk(
  "productPricing/getById",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await getProductPricingByidApi(id);
      console.log(response);
      return response.data;
      
    } catch (error: any) {
      toast.error("Failed to load product pricing", { autoClose: 3000 });
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// ---- ADD ----

export const addProductPricing = createAsyncThunk(
  "productPricing/add",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await addProductPricingApi(formData);
      toast.success(response.message, { autoClose: 3000 });
      return response;
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error?.message || "Failed to add product pricing";
       if (error.statusCode === 0) {
         toast.warning(errorMessage, { autoClose: 3000 });
       } else {
         toast.error(errorMessage, { autoClose: 3000 });
       }
      return rejectWithValue(
      error?.message || { message: errorMessage }
      );
    }
  }
);


// ---- UPDATE ----
export const updateProductPricing = createAsyncThunk(
  "productPricing/update",
  async (
    data: { id: string | number; payload: { price: string; currency: string } },
    { rejectWithValue }
  ) => {
    console.log(data);
    try {
      const response = await updateProductPricingApi(data);
      toast.success(response.message, { autoClose: 3000 });
      console.log(response);

      return response;
    } catch (error: any) {
      console.log(error?.message);
      
      toast.error(error?.message || "Failed to update product pricing", {
        autoClose: 3000,
      });
      return rejectWithValue(
        error?.message || "Failed to update product pricing"
      );
    }
  }
);

// ---- DELETE ----
export const deleteProductPricing = createAsyncThunk(
  "productPricing/delete",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await deleteProductPricingApi(id);
      toast.success(
        response?.message || "Product pricing deleted successfully",
        { autoClose: 3000 }
      );
      console.log(response);
      return response;
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to delete product pricing", { autoClose: 3000 }
      );
      return rejectWithValue(error?.message || "Failed to delete product pricing");
    }
  }
);