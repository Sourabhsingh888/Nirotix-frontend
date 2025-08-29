// src/store/addproduct/thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getProductList as getProductListApi,
  addProductList as addProductApi,
  updateProductList as updateProductApi,
  deleteProductList as deleteProductApi,
} from "../../helpers/auth_api_helper";

// ---- GET ALL ----
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (
    {
      offset = 0,
      limit = 10,
      searchValue = "",
      ProductStatus = "",
      categoryId = "",  // 👈 added

    }: {
      offset?: number;
      limit?: number;
      searchValue?: string;
      ProductStatus?: string;
      categoryId?: string;

    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getProductListApi(
        offset,
        limit,
        searchValue,
        ProductStatus,
        categoryId   // 👈 API me bhej do

      );
      return {
        data: response.data,
        recordsTotal: response.recordsTotal,
        recordsFiltered: response.recordsFiltered,
      };
    } catch (error: any) {
      toast.error("Failed to load products");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ---- ADD ----
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (formData: FormData, { rejectWithValue }) => {
  
    try {
      const response = await addProductApi(formData);
      toast.success(response.message, { autoClose: 3000 });
      return response;
    } catch (error: any) {
      toast.error(error.message, { autoClose: 3000 });
      return rejectWithValue(error.message || "Failed to add product");
    }
  }
);


// ---- UPDATE ----
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (
 { id, data }: { id: string | number; data: { price: string; currency: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateProductApi(id, data);
      toast.success(response.message);
    return response;
    } catch (error: any) {
      toast.error(error.message || "Failed to update product", {
        autoClose: 3000,
      });
      return rejectWithValue(error || "Failed to update product");
    }
  }
);


// ---- DELETE ----
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await deleteProductApi(id);

      // ✅ backend message or fallback
      toast.success(response?.message || "Product deleted successfully", {
        autoClose: 3000,
      });
      
      return response;

    } catch (error: any) {
      toast.error(error?.message || "Failed to delete product", {
        autoClose: 3000,
      });
      return rejectWithValue(error || "Failed to delete product");
    }
  }
);
